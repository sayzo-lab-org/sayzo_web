/**
 * POST /api/process-notification-queue
 *
 * Server-side worker that:
 * 1. Fetches up to 10 "pending" / "retry" jobs from `notification_queue`
 * 2. Renders the correct HTML email template
 * 3. Sends via Resend
 * 4. Updates the job doc to "sent" or "retry" / "failed"
 *
 * This route can be triggered by:
 *  - The standalone Node.js worker (workers/notificationWorker.js) every 30s
 *  - A cron job / cloud scheduler hitting `POST /api/process-notification-queue`
 */

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getApps as getAdminApps, initializeApp as initAdminApp, cert } from "firebase-admin/app";
import fs from "fs";
import path from "path";

// ─── Resend client ────────────────────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Sayzo <notifications@sayzo.net>";
const APP_URL    = process.env.NEXT_PUBLIC_APP_URL || "https://www.sayzo.in";
const MAX_RETRIES = 3;
const MAX_BATCH_SIZE = 10;
const PROCESSING_LEASE_MS = 5 * 60 * 1000;
const WORKER_NAME = process.env.WORKER_NAME || "notification-worker";

// ─── Template renderer ────────────────────────────────────────────────────────
function renderTemplate(templateName, vars) {
  const templatePath = path.join(process.cwd(), "templates", `${templateName}.html`);
  let html = fs.readFileSync(templatePath, "utf-8");
  Object.entries(vars).forEach(([key, value]) => {
    html = html.replaceAll(`{{${key}}}`, value ?? "");
  });
  return html;
}

// ─── Email builder ────────────────────────────────────────────────────────────
function buildEmail(job) {
  const appLink = `${APP_URL}`;

  switch (job.type) {
    case "application_received":
      return {
        subject: `New Application for Your Task: ${job.taskTitle}`,
        html: renderTemplate("application_received", {
          giverName: job.recipientName || "there",
          doerName:  job.senderName   || "Someone",
          taskTitle: job.taskTitle    || "your task",
          appLink,
        }),
      };

    case "application_accepted":
      return {
        subject: `Your Application Was Accepted — ${job.taskTitle}`,
        html: renderTemplate("application_accepted", {
          doerName:  job.recipientName || "there",
          giverName: job.senderName    || "The task giver",
          taskTitle: job.taskTitle     || "the task",
          appLink,
        }),
      };  

    case "application_rejected":
      return {
        subject: `Application Update — ${job.taskTitle}`,
        html: renderTemplate("application_rejected", {
          doerName:  job.recipientName || "there",
          taskTitle: job.taskTitle     || "the task",
          appLink,
        }),
      };

    default:
      return null;
  }
}

// ─── Firebase Admin (server-safe Firestore) ───────────────────────────────────
function getAdminDb() {
  const appName = "notification-worker";
  const apps = getAdminApps();
  let app = apps.find((a) => a.name === appName);

  if (!app) {
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || "";

    // Robust parsing for private key:
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.substring(1, privateKey.length - 1);
    }
    privateKey = privateKey.replace(/\\n/g, "\n");

    try {
      app = initAdminApp(
        {
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        },
        appName
      );
      // console.log(`[getAdminDb] Firebase Admin [${appName}] initialized successfully.`);
    } catch (error) {
      // console.error(`[getAdminDb] Firebase Admin [${appName}] initialization error:`, error.message);
      throw error;
    }
  }

  const { getFirestore: getAdminFirestore } = require("firebase-admin/firestore");
  return getAdminFirestore(app);
}

async function claimJobs(queueRef, batchSize) {
  const snapshot = await queueRef
    .where("status", "in", ["pending", "retry"])
    .orderBy("createdAt", "asc")
    .limit(batchSize)
    .get();

  const claimed = [];
  const now = Date.now();

  for (const docSnap of snapshot.docs) {
    const jobRef = queueRef.doc(docSnap.id);

    try {
      const claimedJob = await queueRef.firestore.runTransaction(async (transaction) => {
        const freshSnap = await transaction.get(jobRef);
        if (!freshSnap.exists) {
          return null;
        }

        const job = freshSnap.data();
        const lockedAtMs = job.lockedAt?.toMillis?.() || 0;
        const leaseExpired = lockedAtMs > 0 && now - lockedAtMs > PROCESSING_LEASE_MS;
        const claimableStatuses = ["pending", "retry"];
        const isClaimable = claimableStatuses.includes(job.status) || (job.status === "processing" && leaseExpired);

        if (!isClaimable) {
          return null;
        }

        transaction.update(jobRef, {
          status: "processing",
          lockedAt: new Date(now),
          processingStartedAt: new Date(now),
          workerName: WORKER_NAME,
          lastError: null,
        });

        return { id: freshSnap.id, ...job };
      });

      if (claimedJob) {
        claimed.push(claimedJob);
      }
    } catch (claimError) {
      // console.warn(`[queue-worker] Failed to claim job ${docSnap.id}:`, claimError.message);
    }
  }

  if (claimed.length >= batchSize) {
    return claimed;
  }

  const recoverySnapshot = await queueRef
    .where("status", "==", "processing")
    .orderBy("createdAt", "asc")
    .limit(batchSize - claimed.length)
    .get();

  for (const docSnap of recoverySnapshot.docs) {
    const jobRef = queueRef.doc(docSnap.id);

    try {
      const claimedJob = await queueRef.firestore.runTransaction(async (transaction) => {
        const freshSnap = await transaction.get(jobRef);
        if (!freshSnap.exists) {
          return null;
        }

        const job = freshSnap.data();
        const lockedAtMs = job.lockedAt?.toMillis?.() || 0;
        const leaseExpired = lockedAtMs > 0 && now - lockedAtMs > PROCESSING_LEASE_MS;

        if (job.status !== "processing" || !leaseExpired) {
          return null;
        }

        transaction.update(jobRef, {
          status: "processing",
          lockedAt: new Date(now),
          processingStartedAt: new Date(now),
          workerName: WORKER_NAME,
          lastError: null,
        });

        return { id: freshSnap.id, ...job };
      });

      if (claimedJob) {
        claimed.push(claimedJob);
      }
    } catch (claimError) {
      // console.warn(`[queue-worker] Failed to recover stuck job ${docSnap.id}:`, claimError.message);
    }
  }

  return claimed;
}

// ─── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req) {
  // Simple shared-secret guard — optional but recommended
  const authHeader = req.headers.get("authorization") || "";
  const workerSecret = process.env.WORKER_SECRET;
  if (workerSecret && authHeader !== `Bearer ${workerSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let db;
  try {
    db = getAdminDb();
  } catch (err) {
    console.error("[queue-worker] Firebase Admin init failed:", err.message);
    return NextResponse.json(
      { error: "Firebase Admin not configured correctly.", message: err.message },
      { status: 500 }
    );
  }

  try {
    const queueRef = db.collection("notification_queue");
    const jobs = await claimJobs(queueRef, MAX_BATCH_SIZE);

    if (jobs.length === 0) {
      return NextResponse.json({ processed: 0, message: "Queue empty" });
    }

    const results = [];

    for (const job of jobs) {
      const jobRef = queueRef.doc(job.id);

      if (!job.recipientEmail) {
        await jobRef.update({
          status: "failed",
          processedAt: new Date(),
          lastError: "no recipientEmail",
          lockedAt: null,
        });
        results.push({ id: job.id, status: "failed", reason: "no recipientEmail" });
        continue;
      }

      const email = buildEmail(job);
      if (!email) {
        await jobRef.update({
          status: "failed",
          processedAt: new Date(),
          lastError: "unknown job type",
          lockedAt: null,
        });
        results.push({ id: job.id, status: "failed", reason: "unknown job type" });
        continue;
      }

      try {
        await resend.emails.send({
          from:    FROM_EMAIL,
          to:      job.recipientEmail,
          subject: email.subject,
          html:    email.html,
        });

        await jobRef.update({
          status:      "sent",
          processedAt: new Date(),
          lockedAt:    null,
        });
        results.push({ id: job.id, status: "sent", to: job.recipientEmail });

      } catch (sendErr) {
        console.error(`[queue-worker] Failed to send email for job ${job.id}:`, sendErr.message);
        const newRetryCount = (job.retryCount || 0) + 1;
        const newStatus     = newRetryCount >= MAX_RETRIES ? "failed" : "retry";

        await jobRef.update({
          status:      newStatus,
          retryCount:  newRetryCount,
          processedAt: new Date(),
          lastError:   sendErr.message,
          lockedAt:    null,
        });
        results.push({ id: job.id, status: newStatus, error: sendErr.message });
      }
    }

    return NextResponse.json({ processed: results.length, results });

  } catch (err) {
    console.error("[queue-worker] Unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected error during queue processing.", message: err.message },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: "ok", worker: "notification-queue" });
}
