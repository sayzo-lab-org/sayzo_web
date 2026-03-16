// /Users/mayanksaini/Desktop/GitHub/sayzo_web/components/dashboard/TaskCard.jsx

"use client";

import { ArrowUpRight, Users, Banknote, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { markTaskAsComplete } from "@/lib/firebase";

const STATUS_STYLES = {
  pending_approval: "bg-amber-50 text-amber-700 border-amber-200",
  approved:         "bg-blue-50 text-blue-700 border-blue-200",
  active:           "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed:        "bg-gray-100 text-gray-600 border-gray-200",
  rejected:         "bg-red-50 text-red-700 border-red-200",
};

const STATUS_LABELS = {
  pending_approval: "Pending Approval",
  approved:         "Approved",
  active:           "Active",
  completed:        "Completed",
  rejected:         "Rejected",
};

export default function TaskCard({ task, onMarkComplete }) {
  const [completing, setCompleting] = useState(false);

  const date = task.createdAt?.toDate
    ? task.createdAt.toDate()
    : new Date(task.createdAt || Date.now());
  const postedString = date.toLocaleDateString(undefined, {
    month: "short", day: "numeric", year: "numeric",
  });

  const statusKey = task.status?.toLowerCase() || "pending_approval";
  const statusStyle = STATUS_STYLES[statusKey] || STATUS_STYLES.pending_approval;
  const statusLabel = STATUS_LABELS[statusKey] || task.status;
  const isActive = statusKey === "active";

  const handleMarkComplete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (completing) return;
    setCompleting(true);
    try {
      await markTaskAsComplete(task.id, task.giverId);
      if (onMarkComplete) onMarkComplete(task.id);
    } catch (err) {
      console.error("Mark complete failed:", err);
      alert(err.message || "Failed to mark task as complete.");
    } finally {
      setCompleting(false);
    }
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 hover:border-emerald-300 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1.5 flex-1 pr-4">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {task.category || "General"}
          </span>
          <h3 className="font-semibold text-gray-900 text-base group-hover:text-emerald-700 transition-colors line-clamp-2 leading-tight">
            {task.title}
          </h3>
        </div>
        <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyle}`}>
          {statusLabel}
        </span>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-50 pt-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-gray-700">
            <Banknote className="w-4 h-4 text-gray-400" />
            <span className="font-medium">₹{task.budget || 0}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-gray-400" />
            <span>{task.applicantsCount || 0} Applicants</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="w-3 h-3" />
          {postedString}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <Link
          href={`/dashboard/tasks/${task.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
          View Details
        </Link>
        <Link
          href={`/dashboard/tasks/${task.id}#applicants`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors"
        >
          <Users className="w-3.5 h-3.5" />
          Applicants
        </Link>
        {isActive && (
          <button
            onClick={handleMarkComplete}
            disabled={completing}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {completing ? "Completing..." : "Mark Done"}
          </button>
        )}
      </div>
    </div>
  );
}
