"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Loader2, Users, Home, CheckCircle, XCircle,

  Star, Send, MoreVertical, 
 } from "lucide-react";
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

  const name   = profile?.name || profile?.displayName || applicant.applicantName || "John Doe";
  const role   = applicant.applicantRole || profile?.role || "Graphic Designer";
  const avatar = profile?.photoURL || null;
  // Hardcoded to match UI, but you can replace with real data later:
  const matchPercentage = applicant.matchScore || 80; 
  const tasksCompleted = profile?.tasksCompleted || 324;
  const rating = profile?.rating || 4.9;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-6 shadow-sm">
      
      {/* Top: Match Progress Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#10A37F] rounded-full" 
            style={{ width: `${matchPercentage}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
          {matchPercentage}% match
        </span>
      </div>

      {/* Middle: Avatar & Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar src={avatar} name={name} />
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-semibold text-gray-900 text-base">{name}</h3>
              <div className="flex items-center text-xs font-bold text-gray-700">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-current mr-1" />
                {rating}
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              {role} <span className="mx-1.5 font-normal text-gray-300">|</span> {tasksCompleted} tasks
            </p>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 text-gray-500">
          <button className="hover:text-gray-900 transition-colors">
            <Send className="w-5 h-5" />
          </button>
          <button className="hover:text-gray-900 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom: Actions */}
      {isPending ? (
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => onAction(applicant.id, APPLICATION_STATUS.REJECTED)}
            disabled={isActing}
            className="flex-1 py-2.5 rounded-lg border border-[#10A37F] text-[#10A37F] text-sm font-semibold hover:bg-emerald-50 disabled:opacity-50 transition-colors"
          >
            {isActing ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Decline"}
          </button>
          <button
            onClick={() => onAction(applicant.id, APPLICATION_STATUS.ACCEPTED)}
            disabled={isActing}
            className="flex-1 py-2.5 rounded-lg bg-[#10A37F] text-white text-sm font-semibold hover:bg-[#0e8c6d] disabled:opacity-50 transition-colors"
          >
            {isActing ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Accept"}
          </button>
        </div>
      ) : (
        /* State for after action is taken */
        <div className="flex items-center justify-between mt-2 py-2.5 px-4 rounded-lg bg-gray-50 border border-gray-100">
           <span className={`inline-flex items-center gap-2 text-sm font-bold ${
            isAccepted ? "text-[#10A37F]" : "text-gray-500"
          }`}>
            {isAccepted ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            {isAccepted ? "Accepted" : "Declined"}
          </span>
          
        </div>
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
    <section className="space-y-8 max-w-7xl mx-auto p-6">

      {/* ── Custom Breadcrumbs (Matching Image) ── */}
      <nav className="flex items-center gap-3 text-sm font-medium mb-12">
        <Link href="/dashboard" className="text-gray-900 hover:text-gray-600 transition-colors">
          Home
        </Link>
        <span className="text-gray-300">/</span>
        <Link href="/dashboard/my-tasks" className="text-gray-900 hover:text-gray-600 transition-colors">
          My Tasks
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-[#10A37F] truncate max-w-sm">
          {taskLoading ? "Loading…" : taskTitle}
        </span>
      </nav>

      {/* ── Page header & Tabs ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4">
        {taskLoading ? (
          <div className="h-10 w-96 animate-pulse bg-gray-100 rounded-xl" />
        ) : (
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            {taskTitle}
          </h1>
        )}

        {/* Tab Buttons from Image */}
        <div className="flex items-center gap-6">
          <button className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">
            Manual Applicants
          </button>
          <button className="text-sm font-medium bg-[#10A37F] text-white px-6 py-2.5 rounded-full hover:bg-[#0e8c6d] transition-colors">
            AI Applicants
          </button>
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ── Applicants Grid ── */}
      <div>
        {appsLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl border border-gray-200 bg-gray-50" />
            ))}
          </div>
        ) : applicants.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 flex flex-col items-center gap-3 text-gray-400">
            <Users className="w-8 h-8 text-gray-200" />
            <p className="text-sm font-medium">No applicants yet.</p>
          </div>
        ) : (
          /* Changed to 2 columns (lg:grid-cols-2) and increased gap-6 to match the image spacing */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
