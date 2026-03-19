"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Banknote,
  Briefcase,
  Clock,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";
import TaskCard from "@/components/dashboard/TaskCard";
import useDashboardData from "@/hooks/useDashboardData";

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatStatus(status) {
  const value = String(status || "pending").toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getTaskTitle(task, application) {
  return task?.title || task?.taskTitle || task?.taskName || application?.taskTitle || "Untitled Task";
}

function getTaskBudget(task, application) {
  return task?.budget ?? task?.amount ?? application?.taskBudget ?? null;
}

function formatBudget(value) {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  if (Number.isNaN(n)) return String(value);
  return `₹${n.toLocaleString("en-IN")}`;
}

function getSkillsArray(skills) {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills.filter(Boolean);
  return String(skills).split(",").map((s) => s.trim()).filter(Boolean);
}

// ─── TaskDetailModal ──────────────────────────────────────────────────────────

function TaskDetailModal({ task, application, onClose }) {
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const title    = task?.title    || task?.taskTitle    || task?.taskName    || "Untitled Task";
  const desc     = task?.description || task?.taskDescription || "";
  const budget   = formatBudget(getTaskBudget(task, application));
  const budgetType = task?.budgetType ?? null;
  const duration = task?.duration ?? null;
  const experience = task?.experience ?? null;
  const taskType = task?.taskType ?? null;
  const location = task?.location ?? task?.taskLocation ?? null;
  const skills   = getSkillsArray(task?.skills);
  const status   = application?.status ? formatStatus(application.status) : null;
  const isRejected = status?.toLowerCase().includes("reject");

  return (
    /* Backdrop */
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Panel */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl flex flex-col max-h-[90vh] animate-modal-in">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">Task Details</p>
            <h2 className="text-lg font-bold text-gray-900 leading-snug">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 mt-0.5 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

          {/* Status badge */}
          {status && (
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              isRejected ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700"
            }`}>
              {status}
            </span>
          )}

          {/* Description */}
          {desc && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-1.5">Description</p>
              <p className="text-sm leading-relaxed text-gray-700">{desc}</p>
            </div>
          )}

          {/* Budget + Budget Type */}
          {(budget || budgetType) && (
            <div className="grid grid-cols-2 gap-3">
              {budget && (
                <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Budget</p>
                  <p className="text-base font-bold text-gray-900">{budget}</p>
                </div>
              )}
              {budgetType && (
                <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Budget Type</p>
                  <p className="text-sm font-medium text-gray-700 capitalize">{budgetType}</p>
                </div>
              )}
            </div>
          )}

          {/* Duration + Experience */}
          {(duration || experience) && (
            <div className={`grid gap-3 ${duration && experience ? "grid-cols-2" : "grid-cols-1"}`}>
              {duration && (
                <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Duration</p>
                  <p className="text-sm font-medium text-gray-700">{duration}</p>
                </div>
              )}
              {experience && (
                <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Experience</p>
                  <p className="text-sm font-medium text-gray-700 capitalize">{experience}</p>
                </div>
              )}
            </div>
          )}

          {/* Task Type + Location */}
          {(taskType || location) && (
            <div className={`grid gap-3 ${taskType && location ? "grid-cols-2" : "grid-cols-1"}`}>
              {taskType && (
                <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Task Type</p>
                  <p className="text-sm font-medium text-gray-700 capitalize">{taskType}</p>
                </div>
              )}
              {location && (
                <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Location</p>
                  <p className="text-sm font-medium text-gray-700">{location}</p>
                </div>
              )}
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-2">Skills Required</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AppliedTasksPage() {
  const { appliedTaskItems, applicationsLoading, appliedTasksLoading, error } = useDashboardData({
    includeAppliedTaskDetails: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // { task, application }

  const loading = applicationsLoading || appliedTasksLoading;

  const countLabel = useMemo(
    () => `${appliedTaskItems.length} application${appliedTaskItems.length === 1 ? "" : "s"}`,
    [appliedTaskItems.length]
  );

  function openModal(task, application) {
    setSelectedItem({ task, application });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedItem(null);
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Applied Tasks</h1>
        <p className="mt-2 text-sm text-gray-600">Tasks where you have applied as a task doer.</p>
        {!loading ? <p className="mt-1 text-xs text-gray-500">{countLabel}</p> : null}
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      {loading ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {[1, 2, 3].map((index) => (
            <div key={index} className="h-40 animate-pulse rounded-xl border border-gray-200 bg-white" />
          ))}
        </div>
      ) : appliedTaskItems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
          No task applications found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {appliedTaskItems.map(({ application, task, taskGiverName }) => (
            <TaskCard
              key={application.id}
              variant="applied"
              title={getTaskTitle(task, application)}
              description={task?.description || task?.taskDescription || ""}
              taskGiver={taskGiverName}
              budget={getTaskBudget(task, application)}
              status={formatStatus(application.status)}
              actionLabel="View Task"
              onView={() => openModal(task, application)}
            />
          ))}
        </div>
      )}

      {/* Task Detail Modal */}
      {isModalOpen && selectedItem && (
        <TaskDetailModal
          task={selectedItem.task}
          application={selectedItem.application}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
