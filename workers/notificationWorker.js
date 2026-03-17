/**
 * workers/notificationWorker.js
 *
 * Standalone Node.js process that polls the notification queue every 30 seconds.
 *
 * Run with:
 *   node workers/notificationWorker.js
 *
 * Or add to package.json scripts:
 *   "worker": "node workers/notificationWorker.js"
 *
 * In production, run this alongside your Next.js server using:
 *   - PM2:  pm2 start workers/notificationWorker.js --name notification-worker
 *   - Forever: forever start workers/notificationWorker.js
 *   - Docker: as a separate container/service
 *   - Render.com: as a Background Worker service
 */

"use strict";

const https  = require("https");
const http   = require("http");
const path   = require("path");

// Load .env in local dev (not needed when deployed with env vars)
try {
  require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
} catch {
  // dotenv not installed or not needed — silently continue
}

// ─── Config ──────────────────────────────────────────────────────────────────
const DEFAULT_INTERVAL_MS = 30_000;
const WORKER_INTERVAL_MS = Number(process.env.WORKER_INTERVAL_MS || DEFAULT_INTERVAL_MS);
const REQUEST_TIMEOUT_MS = Number(process.env.WORKER_REQUEST_TIMEOUT_MS || 15_000);
const API_PATH = "/api/process-notification-queue";

function buildApiUrl() {
  if (process.env.WORKER_API_URL) {
    return process.env.WORKER_API_URL;
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL
    || process.env.APP_URL
    || "http://localhost:3000";

  return `${baseUrl.replace(/\/+$/, "")}${API_PATH}`;
}

const API_URL = buildApiUrl();

const WORKER_SECRET = process.env.WORKER_SECRET || "";
const WORKER_NAME = process.env.WORKER_NAME || "notification-worker";

let isPolling = false;
let intervalHandle;
let shuttingDown = false;

// ─── HTTP helper ─────────────────────────────────────────────────────────────
function postToWorkerAPI() {
  return new Promise((resolve, reject) => {
    const url    = new URL(API_URL);
    const isHttps = url.protocol === "https:";
    const client  = isHttps ? https : http;

    console.log("Worker calling:", API_URL);
    console.log("Using worker secret:", !!WORKER_SECRET);

    const options = {
      hostname: url.hostname,
      port:     url.port || (isHttps ? 443 : 80),
      path:     `${url.pathname}${url.search}`,
      method:   "POST",
      timeout:  REQUEST_TIMEOUT_MS,
      headers: {
        "Content-Type":  "application/json",
        "Content-Length": 0,
        ...(WORKER_SECRET ? { Authorization: `Bearer ${WORKER_SECRET}` } : {}),
        "User-Agent": `sayzo-${WORKER_NAME}`,
      },
    };

    const req = client.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode === 401) {
          console.error("Worker unauthorized. Check WORKER_SECRET configuration.");
        }
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`API responded with ${res.statusCode}: ${data || "no response body"}`));
        }
        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error(`API returned non-JSON response: ${data || "<empty>"}`));
        }
      });
    });

    req.on("timeout", () => {
      req.destroy(new Error(`Request timed out after ${REQUEST_TIMEOUT_MS}ms`));
    });
    req.on("error", reject);
    req.end();
  });
}

// ─── Poll loop ────────────────────────────────────────────────────────────────
async function runWorker() {
  if (isPolling) {
    console.warn(`[${WORKER_NAME}] Previous poll still running — skipping this cycle.`);
    return;
  }

  isPolling = true;
  const now = new Date().toISOString();
  console.log(`[${WORKER_NAME}] ${now} — polling queue...`);

  try {
    const result = await postToWorkerAPI();
    const { processed = 0, results = [] } = result;

    if (processed === 0) {
      console.log(`[${WORKER_NAME}] Queue empty — no jobs to process.`);
    } else {
      console.log(`[${WORKER_NAME}] Processed ${processed} job(s):`);
      results.forEach((r) => {
        if (r.status === "sent") {
          console.log(`  ✓ [${r.id}] sent → ${r.to}`);
        } else {
          console.warn(`  ✗ [${r.id}] ${r.status} — ${r.error || r.reason || ""}`);
        }
      });
    }
  } catch (err) {
    console.error(`[${WORKER_NAME}] Error contacting API:`, err.message);
    console.error("  Is your Next.js server running at:", API_URL);
  } finally {
    isPolling = false;
  }
}

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`[${WORKER_NAME}] Received ${signal}. Shutting down gracefully...`);

  if (intervalHandle) {
    clearInterval(intervalHandle);
  }

  if (isPolling) {
    console.log(`[${WORKER_NAME}] Waiting for active poll to finish before exit...`);
    while (isPolling) {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  console.log(`[${WORKER_NAME}] Shutdown complete.`);
  process.exit(0);
}

// ─── Start ─────────────────────────────────────────────────────────────────
console.log("═══════════════════════════════════════════════");
console.log("  Sayzo — Notification Queue Worker");
console.log(`  API endpoint : ${API_URL}`);
console.log(`  Poll interval: ${WORKER_INTERVAL_MS / 1000}s`);
console.log(`  Request timeout: ${REQUEST_TIMEOUT_MS / 1000}s`);
console.log("═══════════════════════════════════════════════");

if (!WORKER_SECRET) {
  console.warn(`[${WORKER_NAME}] WORKER_SECRET is not set. Requests will be unauthenticated.`);
}

if (!Number.isFinite(WORKER_INTERVAL_MS) || WORKER_INTERVAL_MS < 5_000) {
  throw new Error("WORKER_INTERVAL_MS must be a number greater than or equal to 5000.");
}

if (!Number.isFinite(REQUEST_TIMEOUT_MS) || REQUEST_TIMEOUT_MS < 1_000) {
  throw new Error("WORKER_REQUEST_TIMEOUT_MS must be a number greater than or equal to 1000.");
}

// Run immediately on startup, then on interval
runWorker();
intervalHandle = setInterval(runWorker, WORKER_INTERVAL_MS);

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});
