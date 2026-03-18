"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Banknote,
  CalendarDays,
  User2,
  ClipboardCheck,
  Users,
  X,
  Loader2,
  ChevronDown,
  CheckCircle,
  XCircle,
  Lock,
  Info,
} from "lucide-react";
import { subscribeToApplicationsByTask, updateApplicationStatus } from "@/lib/firebase";
import { APPLICATION_STATUS } from "@/lib/constants";

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatDate(value) {
  const date = value?.toDate ? value.toDate() : value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function formatBudget(budget) {
  if (budget === null || budget === undefined || budget === "") return "-";
  const numeric = Number(budget);
  if (Number.isNaN(numeric)) return String(budget);
  return `₹${numeric.toLocaleString("en-IN")}`;
}

function formatAppliedDate(value) {
  const date = value?.toDate ? value.toDate() : value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ─── ContactInfoTooltip ───────────────────────────────────────────────────────

function ContactInfoTooltip() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [open]);

  return (
    <span ref={ref} className="relative inline-flex items-center">
      <button
        type="button"
        aria-label="Why is this hidden?"
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className="group flex items-center justify-center w-4 h-4 rounded-full text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
      >
        <Info className="w-3.5 h-3.5" />
        {/* hover tooltip (desktop) */}
        <span className="pointer-events-none absolute left-1/2 bottom-full mb-2 -translate-x-1/2
          opacity-0 group-hover:opacity-100 transition-opacity duration-150
          w-52 p-3 bg-gray-900 text-white text-xs leading-relaxed rounded-xl shadow-xl z-60 text-left">
          <span className="font-semibold block mb-1">Contact details are hidden.</span>
          Accept the applicant to reveal their phone and email.
          <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0
            border-x-4 border-x-transparent border-t-4 border-t-gray-900" />
        </span>
      </button>

      {/* click tooltip (mobile) */}
      {open && (
        <span className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2
          w-52 p-3 bg-gray-900 text-white text-xs leading-relaxed rounded-xl shadow-xl z-60 text-left lg:hidden">
          <span className="font-semibold block mb-1">Contact details are hidden.</span>
          Accept the applicant to reveal their phone and email.
          <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0
            border-x-4 border-x-transparent border-t-4 border-t-gray-900" />
        </span>
      )}
    </span>
  );
}

// ─── ApplicantRow ─────────────────────────────────────────────────────────────

function ApplicantRow({ applicant, isExpanded, onToggle, onAction, actionLoading }) {
  const isPending = applicant.status === APPLICATION_STATUS.PENDING;

  return (
    <div className={`rounded-lg border border-gray-100 overflow-hidden transition-colors ${isExpanded ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}`}>
      {/* Collapsed header — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {applicant.applicantName || "Applicant"}
            {applicant.applicantRole && (
              <span className="font-normal text-gray-500"> · {applicant.applicantRole}</span>
            )}
          </p>
          {applicant.status !== APPLICATION_STATUS.PENDING && (
            <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
              applicant.status === APPLICATION_STATUS.ACCEPTED
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}>
              {applicant.status === APPLICATION_STATUS.ACCEPTED ? "Accepted" : "Rejected"}
            </span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 ml-2 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
      </button>

      {/* Expanded body */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
          {/* Description / pitch */}
          {applicant.description && (
            <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Pitch / Description</p>
              <p className="text-sm text-gray-700 leading-relaxed wrap-break-word">{applicant.description}</p>
            </div>
          )}

          {/* Answers grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm pt-1">
            {applicant.experience && (
              <div>
                <p className="text-xs text-gray-400">Experience</p>
                <p className="text-gray-800 capitalize">{applicant.experience}</p>
              </div>
            )}
            {applicant.canFinishOnTime != null && (
              <div>
                <p className="text-xs text-gray-400">Finishes on time?</p>
                <p className="text-gray-800 capitalize">{String(applicant.canFinishOnTime)}</p>
              </div>
            )}
            {applicant.city && (
              <div>
                <p className="text-xs text-gray-400">City</p>
                <p className="text-gray-800">{applicant.city}</p>
              </div>
            )}
            {applicant.createdAt && (
              <div>
                <p className="text-xs text-gray-400">Applied on</p>
                <p className="text-gray-800">{formatAppliedDate(applicant.createdAt)}</p>
              </div>
            )}
          </div>

          {/* Contact details */}
          <div className="space-y-1.5 text-sm pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-12 shrink-0">Mobile</span>
              {applicant._contactRevealed ? (
                <span className="text-gray-800 font-medium">
                  {applicant.applicantPhone?.replace("+91", "") || "N/A"}
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-400 text-xs">Hidden</span>
                  <ContactInfoTooltip />
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-12 shrink-0">Email</span>
              {applicant._contactRevealed ? (
                <span className="text-gray-800 font-medium">
                  {applicant.applicantEmail || applicant.email || "N/A"}
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-400 text-xs">Hidden</span>
                  <ContactInfoTooltip />
                </span>
              )}
            </div>
          </div>

          {/* Accept / Reject — pending only */}
          {isPending && (
            <div className="flex gap-2 pt-1">
              <button
                onClick={(e) => { e.stopPropagation(); onAction(applicant.id, APPLICATION_STATUS.ACCEPTED); }}
                disabled={actionLoading === applicant.id}
                className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-sm font-medium py-2 rounded-lg transition-colors"
              >
                {actionLoading === applicant.id
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <><CheckCircle className="w-3.5 h-3.5" /> Accept</>
                }
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onAction(applicant.id, APPLICATION_STATUS.REJECTED); }}
                disabled={actionLoading === applicant.id}
                className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 text-sm font-medium py-2 rounded-lg transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" /> Reject
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── ApplicantsModal ──────────────────────────────────────────────────────────

function ApplicantsModal({ taskId, taskTitle, onClose }) {
  const [applicants, setApplicants]       = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState("");
  const [expanded, setExpanded]           = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  // Real-time subscription — unsubscribes on unmount
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToApplicationsByTask(
      taskId,
      (apps) => { setApplicants(apps); setLoading(false); },
      (err) => {
        console.error("applicants subscription:", err);
        setError("Failed to load applicants.");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [taskId]);

  const handleAction = useCallback(async (applicationId, status) => {
    setActionLoading(applicationId);
    setError("");
    try {
      await updateApplicationStatus(applicationId, status);
      // subscription auto-updates the list
    } catch (err) {
      console.error("updateApplicationStatus:", err);
      setError(err.message || "Failed to update. Please try again.");
    } finally {
      setActionLoading(null);
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600 shrink-0" />
              <h2 className="text-sm font-semibold text-gray-900">
                Applicants
                {!loading && applicants.length > 0 && (
                  <span className="ml-1.5 text-xs font-normal text-gray-400">({applicants.length})</span>
                )}
              </h2>
            </div>
            {taskTitle && (
              <p className="text-xs text-gray-400 mt-0.5 ml-6 truncate max-w-70">{taskTitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0 ml-3"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
          )}

          {loading && (
            <div className="flex items-center justify-center py-12 text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              <span className="text-sm">Loading…</span>
            </div>
          )}

          {!loading && applicants.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-12">No applicants yet.</p>
          )}

          {!loading && applicants.map((applicant) => (
            <ApplicantRow
              key={applicant.id}
              applicant={applicant}
              isExpanded={expanded === applicant.id}
              onToggle={() => setExpanded((p) => (p === applicant.id ? null : applicant.id))}
              onAction={handleAction}
              actionLoading={actionLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TaskCard ─────────────────────────────────────────────────────────────────

export default function TaskCard({
  variant = "posted",
  title,
  description,
  status,
  budget,
  postedDate,
  taskGiver,
  href,
  actionLabel,
  taskId,
}) {
  const [showApplicants, setShowApplicants] = useState(false);

  return (
    <>
      <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{title || "Untitled Task"}</h3>
          {status ? (
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              status.toLowerCase().includes("reject")
                ? "bg-red-50 text-red-600"
                : "bg-emerald-50 text-emerald-700"
            }`}>
              {status}
            </span>
          ) : null}
        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-600">
          {variant === "posted" && description ? (
            <p className="line-clamp-2 text-sm text-gray-600">{description}</p>
          ) : null}

          <div className="flex items-center gap-2">
            <Banknote className="h-4 w-4 text-gray-400" />
            <span>{formatBudget(budget)}</span>
          </div>

          {variant === "posted" ? (
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gray-400" />
              <span>Posted {formatDate(postedDate)}</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <User2 className="h-4 w-4 text-gray-400" />
                <span>{taskGiver || "Task Giver"}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-gray-400" />
                <span>{status || "Pending"}</span>
              </div>
            </>
          )}
        </div>

        <div className="mt-5 flex items-center gap-2 flex-wrap">
          {href ? (
            <Link
              href={href}
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              {actionLabel || "View"}
            </Link>
          ) : null}

          {variant === "posted" && taskId ? (
            <button
              onClick={() => setShowApplicants(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
            >
              <Users className="w-3.5 h-3.5" />
              Applicants
            </button>
          ) : null}
        </div>
      </article>

      {showApplicants && taskId && (
        <ApplicantsModal
          taskId={taskId}
          taskTitle={title}
          onClose={() => setShowApplicants(false)}
        />
      )}
    </>
  );
}
