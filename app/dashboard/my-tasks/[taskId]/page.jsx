"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  IndianRupee,
  Loader2,
  Lock,
  MapPin,
  Users,
  XCircle,
} from "lucide-react";
import {
  getTaskById,
  getUserProfile,
  subscribeToApplicationsByTask,
  updateApplicationStatus,
} from "@/lib/firebase";
import { APPLICATION_STATUS } from "@/lib/constants";

// ─── helpers ──────────────────────────────────────────────────────────────────

function getTaskTitle(task) {
  return task?.title || task?.taskTitle || task?.taskName || "Untitled Task";
}

function getTaskBudget(task) {
  return task?.budget ?? task?.amount ?? task?.taskBudget ?? null;
}

function getTaskLocation(task) {
  return task?.location || task?.taskLocation || task?.city || null;
}

function formatBudget(value) {
  if (value === null || value === undefined || value === "") return null;
  const amount = Number(value);
  if (Number.isNaN(amount)) return String(value);
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatStatus(status) {
  const value = String(status || "pending").toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " ");
}

function formatDate(value) {
  const date = value?.toDate ? value.toDate() : value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function getApplicantName(applicant, profile) {
  return profile?.name || profile?.fullName || applicant?.applicantName || "Applicant";
}

function getApplicantRole(applicant, profile) {
  if (applicant?.applicantRole) return applicant.applicantRole;
  if (profile?.profession) return profile.profession;
  if (Array.isArray(profile?.coreSkills) && profile.coreSkills.length > 0) {
    return profile.coreSkills.slice(0, 2).join(", ");
  }
  return null;
}

function getApplicantSkills(profile) {
  if (Array.isArray(profile?.skills) && profile.skills.length > 0) return profile.skills;
  if (Array.isArray(profile?.coreSkills) && profile.coreSkills.length > 0) return profile.coreSkills;
  return [];
}

// Default to "manual" — all real applications without a source tag land here
function getApplicantTab(applicant) {
  const source = String(
    applicant?.applicationSource || applicant?.source || applicant?.type || ""
  ).toLowerCase();
  if (source.includes("ai")) return "ai";
  return "manual";
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ src, name }) {
  const initials = String(name || "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p.charAt(0))
    .join("")
    .toUpperCase();

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={name} className="h-12 w-12 rounded-full object-cover shrink-0" />
    );
  }
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
      {initials || "U"}
    </div>
  );
}

// ─── ApplicantCard ────────────────────────────────────────────────────────────

function ApplicantCard({ applicant, profile, onAction, actionLoading, expanded, onToggle }) {
  const isPending  = applicant.status === APPLICATION_STATUS.PENDING;
  const isAccepted = applicant.status === APPLICATION_STATUS.ACCEPTED;
  const isRejected = applicant.status === APPLICATION_STATUS.REJECTED;
  const isActing   = actionLoading === applicant.id;

  const name        = getApplicantName(applicant, profile);
  const role        = getApplicantRole(applicant, profile);
  const skills      = getApplicantSkills(profile);
  const appliedDate = formatDate(applicant.createdAt);

  // Match bar — only shown when a real score exists in Firestore
  const rawScore = applicant?.matchScore ?? applicant?.aiMatchScore ?? null;
  const matchPct = rawScore !== null ? Math.max(0, Math.min(100, Number(rawScore))) : null;

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Match bar — real data only */}
      {matchPct !== null && (
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${matchPct}%` }}
            />
          </div>
          <span className="shrink-0 text-xs font-semibold text-gray-500">{matchPct}% match</span>
        </div>
      )}

      <div className="p-5">
        {/* Identity row */}
        <div className="flex items-start gap-3">
          <Avatar src={profile?.photoURL || ""} name={name} />

          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-gray-900">{name}</p>
            {role        && <p className="mt-0.5 truncate text-sm text-gray-500">{role}</p>}
            {appliedDate && <p className="mt-0.5 text-xs text-gray-400">Applied {appliedDate}</p>}
          </div>

          {/* Expand / collapse toggle */}
          <button
            type="button"
            onClick={onToggle}
            className="shrink-0 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Expanded details (accordion) */}
        {expanded && (
          <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">

            {/* Cover message */}
            {applicant.description && (
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">Cover message</p>
                <p className="text-sm leading-relaxed text-gray-700">{applicant.description}</p>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-gray-400">Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.slice(0, 8).map((s, i) => (
                    <span key={i} className="rounded-full border border-gray-200 px-2.5 py-0.5 text-xs text-gray-600">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Details grid */}
            {(applicant.experience || applicant.canFinishOnTime != null || applicant.city) && (
              <div className="grid grid-cols-2 gap-3 text-sm">
                {applicant.experience && (
                  <div>
                    <p className="text-xs text-gray-400">Experience</p>
                    <p className="mt-0.5 font-medium capitalize text-gray-800">{applicant.experience}</p>
                  </div>
                )}
                {applicant.canFinishOnTime != null && (
                  <div>
                    <p className="text-xs text-gray-400">Finishes on time</p>
                    <p className="mt-0.5 font-medium capitalize text-gray-800">{String(applicant.canFinishOnTime)}</p>
                  </div>
                )}
                {applicant.city && (
                  <div>
                    <p className="text-xs text-gray-400">City</p>
                    <p className="mt-0.5 font-medium text-gray-800">{applicant.city}</p>
                  </div>
                )}
              </div>
            )}

            {/* Contact — locked until accepted */}
            <div className="space-y-1.5 border-t border-gray-100 pt-3">
              {[
                { label: "Mobile", value: applicant.applicantPhone?.replace("+91", "") },
                { label: "Email",  value: applicant.applicantEmail || applicant.email },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2 text-xs">
                  <span className="w-12 shrink-0 text-gray-400">{label}</span>
                  {applicant._contactRevealed ? (
                    <span className="font-medium text-gray-800">{value || "N/A"}</span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-400">
                      <Lock className="h-3 w-3" /> Revealed on accept
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-5">
          {isPending ? (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onAction(applicant.id, APPLICATION_STATUS.REJECTED)}
                disabled={isActing}
                className="flex-1 rounded-xl border border-emerald-500 py-2.5 text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-50 disabled:opacity-60"
              >
                {isActing ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Decline"}
              </button>
              <button
                type="button"
                onClick={() => onAction(applicant.id, APPLICATION_STATUS.ACCEPTED)}
                disabled={isActing}
                className="flex-1 rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 disabled:opacity-60"
              >
                {isActing ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Accept"}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <span className={`inline-flex items-center gap-2 text-sm font-semibold ${isAccepted ? "text-emerald-600" : "text-gray-500"}`}>
                {isAccepted ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                {isAccepted ? "Accepted" : isRejected ? "Declined" : formatStatus(applicant.status)}
              </span>
              {applicant.updatedAt?.toDate && (
                <span className="text-xs text-gray-400">
                  {applicant.updatedAt.toDate().toLocaleDateString("en-IN")}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
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
  const [activeTab,     setActiveTab]     = useState("manual"); // real apps default here
  const [expandedId,    setExpandedId]    = useState(null);     // one open at a time
  const fetchedIds = useRef(new Set());

  // Fetch task details
  useEffect(() => {
    if (!taskId) return;
    setTaskLoading(true);
    getTaskById(taskId)
      .then((t) => { setTask(t); setTaskLoading(false); })
      .catch(() => { setError("Failed to load task details."); setTaskLoading(false); });
  }, [taskId]);

  // Fetch user profile — lazy, deduplicated
  const fetchProfile = useCallback(async (applicantId) => {
    if (!applicantId || fetchedIds.current.has(applicantId)) return;
    fetchedIds.current.add(applicantId);
    try {
      const profile = await getUserProfile(applicantId);
      if (profile) setProfiles((prev) => ({ ...prev, [applicantId]: profile }));
    } catch { /* card stays usable without profile */ }
  }, []);

  // Real-time applications subscription
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

  // Accept / Decline
  const handleAction = useCallback(async (applicationId, status) => {
    setActionLoading(applicationId);
    setError("");
    try {
      await updateApplicationStatus(applicationId, status);
    } catch (err) {
      console.error("updateApplicationStatus:", err);
      setError(err.message || "Failed to update applicant status.");
    } finally {
      setActionLoading(null);
    }
  }, []);

  // Derived
  const taskTitle    = task ? getTaskTitle(task) : String(taskId || "");
  const taskBudget   = formatBudget(getTaskBudget(task));
  const taskLocation = getTaskLocation(task);
  const taskStatus   = formatStatus(task?.status);

  const counts = useMemo(() => applicants.reduce(
    (acc, a) => { acc[getApplicantTab(a)] += 1; return acc; },
    { manual: 0, ai: 0 }
  ), [applicants]);

  const visibleApplicants = useMemo(
    () => applicants.filter((a) => getApplicantTab(a) === activeTab),
    [activeTab, applicants]
  );

  const metaTags = [
    taskBudget   && { icon: IndianRupee, label: taskBudget },
    taskLocation && { icon: MapPin,      label: taskLocation },
    task         && { icon: Clock3,      label: taskStatus },
    !appsLoading && { icon: Users,       label: `${applicants.length} applicant${applicants.length === 1 ? "" : "s"}` },
  ].filter(Boolean);

  return (
    <section className="space-y-6 pb-10">

      {/* Breadcrumbs */}
      <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
        <Link href="/dashboard" className="text-gray-500 transition-colors hover:text-gray-800">Home</Link>
        <span className="text-gray-300">/</span>
        <Link href="/dashboard/my-tasks" className="text-gray-500 transition-colors hover:text-gray-800">My Tasks</Link>
        <span className="text-gray-300">/</span>
        <span className="max-w-[180px] truncate text-emerald-600 sm:max-w-xs">
          {taskLoading ? "Loading…" : taskTitle}
        </span>
      </nav>

      {/* Page header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 space-y-3">
          {taskLoading ? (
            <div className="h-9 w-64 animate-pulse rounded-xl bg-gray-100" />
          ) : (
            <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
              {taskTitle}
            </h1>
          )}

          {!taskLoading && metaTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {metaTags.map(({ icon: Icon, label }, i) => (
                <div key={i} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Manual / AI tab toggle */}
        <div className="inline-flex shrink-0 self-start rounded-full bg-gray-100 p-1 lg:self-auto">
          {[
            { key: "manual", label: "Manual" },
            { key: "ai",     label: "AI" },
          ].map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === key
                  ? key === "ai"
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
              <span className={`ml-1.5 text-xs ${activeTab === key && key === "ai" ? "text-emerald-100" : "text-gray-400"}`}>
                {counts[key]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Task description */}
      {!taskLoading && task?.description && (
        <p className="max-w-3xl text-sm leading-7 text-gray-500">{task.description}</p>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Applicants grid */}
      {appsLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-56 animate-pulse rounded-2xl border border-gray-200 bg-gray-50" />
          ))}
        </div>
      ) : visibleApplicants.length === 0 ? (
        <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
          <Users className="h-8 w-8 text-gray-200" />
          <p className="mt-4 text-sm font-medium text-gray-700">
            No {activeTab === "manual" ? "manual" : "AI"} applicants yet.
          </p>
          <p className="mt-1 text-xs text-gray-400">Applications will appear here automatically.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-start">
          {visibleApplicants.map((applicant) => (
            <ApplicantCard
              key={applicant.id}
              applicant={applicant}
              profile={profiles[applicant.applicantId] ?? null}
              onAction={handleAction}
              actionLoading={actionLoading}
              expanded={expandedId === applicant.id}
              onToggle={() => setExpandedId((prev) => prev === applicant.id ? null : applicant.id)}
            />
          ))}
        </div>
      )}

    </section>
  );
}
