"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Loader2, Users, Home, CheckCircle, XCircle } from "lucide-react";
import {
  getTaskById,
  subscribeToApplicationsByTask,
  updateApplicationStatus,
  getUserProfile,
} from "@/lib/firebase";
import { APPLICATION_STATUS } from "@/lib/constants";

// ─── helpers ──────────────────────────────────────────────────────────────────

function getTaskTitle(task) {
  return task?.taskName || task?.title || task?.taskTitle || "Untitled Task";
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ src, name }) {
  const initial = (name || "?").charAt(0).toUpperCase();
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={name} className="w-16 h-16 rounded-full object-cover" />
    );
  }
  return (
    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 text-xl font-bold flex items-center justify-center">
      {initial}
    </div>
  );
}

// ─── ApplicantCard ────────────────────────────────────────────────────────────

function ApplicantCard({ applicant, profile, onAction, actionLoading }) {
  const isActing   = actionLoading === applicant.id;
  const isPending  = applicant.status === APPLICATION_STATUS.PENDING;
  const isAccepted = applicant.status === APPLICATION_STATUS.ACCEPTED;
  const isRejected = applicant.status === APPLICATION_STATUS.REJECTED;

  const name   = profile?.name || profile?.displayName || applicant.applicantName || "Applicant";
  const role   = applicant.applicantRole || profile?.role || null;
  const avatar = profile?.photoURL || null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-4 shadow-sm">
      {/* Top: avatar + info */}
      <div className="flex flex-col items-center text-center gap-2">
        <Avatar src={avatar} name={name} />
        <div>
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          {role && <p className="text-xs text-gray-500 mt-0.5">{role}</p>}
        </div>

        {/* Status badge (once actioned) */}
        {!isPending && (
          <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
            isAccepted ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
          }`}>
            {isAccepted
              ? <><CheckCircle className="w-3 h-3" /> Accepted</>
              : <><XCircle   className="w-3 h-3" /> Declined</>
            }
          </span>
        )}
      </div>

      {/* Actions */}
      {isPending ? (
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onAction(applicant.id, APPLICATION_STATUS.REJECTED)}
            disabled={isActing}
            className="flex-1 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {isActing ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Decline"}
          </button>
          <button
            onClick={() => onAction(applicant.id, APPLICATION_STATUS.ACCEPTED)}
            disabled={isActing}
            className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium disabled:opacity-50 transition-colors"
          >
            {isActing ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Accept"}
          </button>
        </div>
      ) : (
        /* Re-action button */
        <button
          onClick={() => onAction(
            applicant.id,
            isAccepted ? APPLICATION_STATUS.REJECTED : APPLICATION_STATUS.ACCEPTED
          )}
          disabled={isActing}
          className="w-full py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors mt-auto"
        >
          {isActing
            ? <Loader2 className="w-4 h-4 animate-spin mx-auto" />
            : isAccepted ? "Undo Accept" : "Undo Decline"
          }
        </button>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TaskApplicantsPage() {
  const { taskId } = useParams();

  const [task,          setTask]          = useState(null);
  const [taskLoading,   setTaskLoading]   = useState(true);
  const [applicants,    setApplicants]    = useState([]);
  const [profiles,      setProfiles]      = useState({});
  const [appsLoading,   setAppsLoading]   = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error,         setError]         = useState("");
  const fetchedIds = useRef(new Set());

  // ── Fetch task details ──
  useEffect(() => {
    if (!taskId) return;
    setTaskLoading(true);
    getTaskById(taskId)
      .then((t) => { setTask(t); setTaskLoading(false); })
      .catch(() => { setError("Failed to load task details."); setTaskLoading(false); });
  }, [taskId]);

  // ── Fetch user profile (deduplicated) ──
  const fetchProfile = useCallback(async (applicantId) => {
    if (!applicantId || fetchedIds.current.has(applicantId)) return;
    fetchedIds.current.add(applicantId);
    try {
      const profile = await getUserProfile(applicantId);
      if (profile) setProfiles((prev) => ({ ...prev, [applicantId]: profile }));
    } catch {
      // profile unavailable — fall back to application-level name
    }
  }, []);

  // ── Real-time applications subscription ──
  useEffect(() => {
    if (!taskId) return;
    setAppsLoading(true);
    const unsubscribe = subscribeToApplicationsByTask(
      taskId,
      (apps) => {
        setApplicants(apps);
        setAppsLoading(false);
        apps.forEach((app) => fetchProfile(app.applicantId));
      },
      (err) => {
        console.error("applicants subscription:", err);
        setError("Failed to load applicants.");
        setAppsLoading(false);
      }
    );
    return () => unsubscribe();
  }, [taskId, fetchProfile]);

  // ── Accept / Decline ──
  const handleAction = useCallback(async (applicationId, status) => {
    setActionLoading(applicationId);
    setError("");
    try {
      await updateApplicationStatus(applicationId, status);
      // subscription auto-refreshes the list
    } catch (err) {
      console.error("updateApplicationStatus:", err);
      setError(err.message || "Failed to update. Please try again.");
    } finally {
      setActionLoading(null);
    }
  }, []);

  const taskTitle = task ? getTaskTitle(task) : taskId;

  return (
    <section className="space-y-6">

      {/* ── Breadcrumbs ── */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400">
        <Link href="/dashboard" className="flex items-center gap-1 hover:text-gray-600 transition-colors">
          <Home className="w-3.5 h-3.5" />
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/dashboard/my-tasks" className="hover:text-gray-600 transition-colors">
          My Tasks
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium truncate max-w-xs">
          {taskLoading ? "Loading…" : taskTitle}
        </span>
      </nav>

      {/* ── Page header ── */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {taskLoading ? (
          <div className="h-7 w-64 animate-pulse bg-gray-100 rounded-lg" />
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-gray-900">{taskTitle}</h1>
            {task?.description && (
              <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{task.description}</p>
            )}
          </>
        )}
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ── Applicants section ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-emerald-600" />
          <h2 className="text-base font-semibold text-gray-900">
            Applicants
            {!appsLoading && applicants.length > 0 && (
              <span className="ml-1.5 text-sm font-normal text-gray-400">({applicants.length})</span>
            )}
          </h2>
        </div>

        {appsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-52 animate-pulse rounded-2xl border border-gray-200 bg-white" />
            ))}
          </div>
        ) : applicants.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 flex flex-col items-center gap-3 text-gray-400">
            <Users className="w-8 h-8 text-gray-200" />
            <p className="text-sm">No applicants yet.</p>
            <p className="text-xs text-gray-300">Applications will appear here once submitted.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {applicants.map((applicant) => (
              <ApplicantCard
                key={applicant.id}
                applicant={applicant}
                profile={profiles[applicant.applicantId] ?? null}
                onAction={handleAction}
                actionLoading={actionLoading}
              />
            ))}
          </div>
        )}
      </div>

    </section>
  );
}
