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
  Lock,
  Info,
  ChevronRight,
} from "lucide-react";
import { subscribeToApplicationsByTask, updateApplicationStatus, getUserProfile } from "@/lib/firebase";
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

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ src, name, size = "md" }) {
  const dim = size === "lg" ? "w-12 h-12 text-base" : "w-9 h-9 text-sm";
  const initial = (name || "?").charAt(0).toUpperCase();
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={name} className={`${dim} rounded-full object-cover shrink-0`} />
    );
  }
  return (
    <div className={`${dim} rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0`}>
      {initial}
    </div>
  );
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
        <span className="pointer-events-none absolute left-1/2 bottom-full mb-2 -translate-x-1/2
          opacity-0 group-hover:opacity-100 transition-opacity duration-150
          w-52 p-3 bg-gray-900 text-white text-xs leading-relaxed rounded-xl shadow-xl z-60 text-left">
          <span className="font-semibold block mb-1">Contact details are hidden.</span>
          Accept the applicant to reveal their phone and email.
          <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0
            border-x-4 border-x-transparent border-t-4 border-t-gray-900" />
        </span>
      </button>

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

// ─── ApplicantCard ────────────────────────────────────────────────────────────

function ApplicantCard({ applicant, profile, isExpanded, onToggle, onAction, actionLoading }) {
  const isPending   = applicant.status === APPLICATION_STATUS.PENDING;
  const isAccepted  = applicant.status === APPLICATION_STATUS.ACCEPTED;
  const isRejected  = applicant.status === APPLICATION_STATUS.REJECTED;
  const isActing    = actionLoading === applicant.id;

  const name    = profile?.name || profile?.displayName || applicant.applicantName || "Applicant";
  const role    = applicant.applicantRole || profile?.role || null;
  const avatar  = profile?.photoURL || null;
  const skills  = profile?.skills
    ? (Array.isArray(profile.skills) ? profile.skills : [profile.skills])
    : [];

  return (
    <div className={`rounded-xl border overflow-hidden transition-all duration-200 ${
      isExpanded ? "border-emerald-200 shadow-sm" : "border-gray-200 hover:border-gray-300"
    }`}>
      {/* ── Collapsed section (always visible) ── */}
      <div className="p-4">
        {/* Top row: avatar + name + chevron */}
        <div className="flex items-start gap-3">
          <Avatar src={avatar} name={name} size="lg" />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
            {role && <p className="text-xs text-gray-500 mt-0.5 truncate">{role}</p>}

            {/* Status badge (non-pending) */}
            {!isPending && (
              <span className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${
                isAccepted ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
              }`}>
                {isAccepted ? "Accepted" : "Declined"}
              </span>
            )}
          </div>

          {/* Expand toggle */}
          <button
            onClick={onToggle}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Action buttons — always visible for pending */}
        {isPending && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={(e) => { e.stopPropagation(); onAction(applicant.id, APPLICATION_STATUS.REJECTED); }}
              disabled={isActing}
              className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              {isActing ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Decline"}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onAction(applicant.id, APPLICATION_STATUS.ACCEPTED); }}
              disabled={isActing}
              className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium disabled:opacity-50 transition-colors"
            >
              {isActing ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Accept"}
            </button>
          </div>
        )}
      </div>

      {/* ── Expanded section ── */}
      {isExpanded && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-3 bg-gray-50">
          {/* Cover message */}
          {applicant.description && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Cover message</p>
              <p className="text-sm text-gray-700 leading-relaxed">{applicant.description}</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1.5">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.slice(0, 6).map((s, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 bg-white border border-gray-200 rounded-full text-gray-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            {applicant.experience && (
              <div>
                <p className="text-gray-400 mb-0.5">Experience</p>
                <p className="text-gray-800 font-medium capitalize">{applicant.experience}</p>
              </div>
            )}
            {applicant.canFinishOnTime != null && (
              <div>
                <p className="text-gray-400 mb-0.5">Finishes on time?</p>
                <p className="text-gray-800 font-medium capitalize">{String(applicant.canFinishOnTime)}</p>
              </div>
            )}
            {applicant.city && (
              <div>
                <p className="text-gray-400 mb-0.5">City</p>
                <p className="text-gray-800 font-medium">{applicant.city}</p>
              </div>
            )}
            {applicant.createdAt && (
              <div>
                <p className="text-gray-400 mb-0.5">Applied on</p>
                <p className="text-gray-800 font-medium">{formatAppliedDate(applicant.createdAt)}</p>
              </div>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-1.5 pt-1 border-t border-gray-200">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400 w-12 shrink-0">Mobile</span>
              {applicant._contactRevealed ? (
                <span className="text-gray-800 font-medium">{applicant.applicantPhone?.replace("+91", "") || "N/A"}</span>
              ) : (
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Lock className="w-3 h-3" /> Hidden <ContactInfoTooltip />
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400 w-12 shrink-0">Email</span>
              {applicant._contactRevealed ? (
                <span className="text-gray-800 font-medium">{applicant.applicantEmail || applicant.email || "N/A"}</span>
              ) : (
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Lock className="w-3 h-3" /> Hidden <ContactInfoTooltip />
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ApplicantsModal ──────────────────────────────────────────────────────────

function ApplicantsModal({ taskId, taskTitle, onClose }) {
  const [applicants, setApplicants]       = useState([]);
  const [profiles, setProfiles]           = useState({});   // { [applicantId]: profile }
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState("");
  const [expanded, setExpanded]           = useState(null); // accordion: one at a time
  const [actionLoading, setActionLoading] = useState(null);
  const fetchedIds                        = useRef(new Set());

  // Fetch user profile for each applicant — deduplicated, non-blocking
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

  // Real-time applications subscription
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToApplicationsByTask(
      taskId,
      (apps) => {
        setApplicants(apps);
        setLoading(false);
        apps.forEach((app) => fetchProfile(app.applicantId));
      },
      (err) => {
        console.error("applicants subscription:", err);
        setError("Failed to load applicants.");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [taskId, fetchProfile]);

  const handleAction = useCallback(async (applicationId, status) => {
    setActionLoading(applicationId);
    setError("");
    try {
      await updateApplicationStatus(applicationId, status);
    } catch (err) {
      console.error("updateApplicationStatus:", err);
      setError(err.message || "Failed to update. Please try again.");
    } finally {
      setActionLoading(null);
    }
  }, []);

  const handleToggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">

        {/* ── Header with breadcrumb ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <span>My Tasks</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-600 font-medium truncate max-w-60">{taskTitle || taskId}</span>
            </nav>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600 shrink-0" />
              <h2 className="text-base font-semibold text-gray-900">
                Applicants
                {!loading && applicants.length > 0 && (
                  <span className="ml-1.5 text-sm font-normal text-gray-400">({applicants.length})</span>
                )}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">{error}</p>
          )}

          {loading && (
            <div className="flex items-center justify-center py-16 text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              <span className="text-sm">Loading applicants…</span>
            </div>
          )}

          {!loading && applicants.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Users className="w-8 h-8 mb-3 text-gray-200" />
              <p className="text-sm">No applicants yet.</p>
              <p className="text-xs mt-1 text-gray-300">Applications will appear here once submitted.</p>
            </div>
          )}

          {/* 2-col grid on md+, single col on mobile */}
          {!loading && applicants.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {applicants.map((applicant) => (
                <ApplicantCard
                  key={applicant.id}
                  applicant={applicant}
                  profile={profiles[applicant.applicantId] ?? null}
                  isExpanded={expanded === applicant.id}
                  onToggle={() => handleToggle(applicant.id)}
                  onAction={handleAction}
                  actionLoading={actionLoading}
                />
              ))}
            </div>
          )}
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
