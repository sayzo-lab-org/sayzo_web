"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  subscribeToApplicationsByApplicant,
  getTaskById,
} from "@/lib/firebase";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import { ClipboardList, Banknote, User, RefreshCw, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const STATUS_STYLES = {
  pending:  "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_LABELS = {
  pending:  "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
};

function ApplicationCard({ application }) {
  const statusKey = application.status?.toLowerCase() || "pending";
  const statusStyle = STATUS_STYLES[statusKey] || STATUS_STYLES.pending;
  const statusLabel = STATUS_LABELS[statusKey] || application.status;

  const date = application.createdAt?.toDate
    ? application.createdAt.toDate()
    : new Date(application.createdAt || Date.now());
  const appliedString = date.toLocaleDateString(undefined, {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all hover:border-blue-300 flex flex-col gap-3">
      <div className="flex justify-between items-start gap-3">
        <h3 className="font-semibold text-gray-900 text-base line-clamp-2 leading-tight flex-1">
          {application.taskTitle || "Task"}
        </h3>
        <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyle}`}>
          {statusLabel}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        {application.giverName && (
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>{application.giverName}</span>
          </div>
        )}
        {application.taskBudget && (
          <div className="flex items-center gap-1.5 text-gray-700">
            <Banknote className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-medium">₹{application.taskBudget}</span>
          </div>
        )}
        <span className="text-xs text-gray-400 ml-auto">Applied {appliedString}</span>
      </div>

      {application.taskId && (
        <Link
          href={`/browse-tasks/${application.taskId}`}
          className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
          View Task
        </Link>
      )}
    </div>
  );
}

export default function AppliedTasksPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToApplicationsByApplicant(
      user.uid,
      async (apps) => {
        // Enrich each application with task details
        const enriched = await Promise.all(
          apps.map(async (app) => {
            if (!app.taskId) return app;
            try {
              const task = await getTaskById(app.taskId);
              return {
                ...app,
                taskTitle: task?.title || app.taskTitle || "Task",
                taskBudget: task?.budget || app.taskBudget,
                giverName: task?.giverName || app.giverName,
              };
            } catch {
              return app;
            }
          })
        );
        setApplications(enriched);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to fetch applications:", err);
        setError("Failed to load your applications. Please try again.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Applied Tasks</h1>
        <p className="text-gray-500 text-sm mt-1">
          Track the status of tasks you&apos;ve applied for.{" "}
          {!loading && (
            <span className="text-gray-400">
              ({applications.length} application{applications.length !== 1 ? "s" : ""})
            </span>
          )}
        </p>
      </div>

      {/* Content */}
      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 flex items-center gap-3">
          <RefreshCw className="w-4 h-4 shrink-0" />
          {error}
        </div>
      ) : loading ? (
        <LoadingSkeleton count={3} />
      ) : applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] bg-white rounded-xl border border-gray-200 border-dashed">
          <div className="p-4 bg-blue-50 rounded-full mb-4">
            <ClipboardList className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No applications yet</h3>
          <p className="text-gray-500 mt-1 text-sm">Browse tasks and apply to get started.</p>
          <Link
            href="/browse-tasks"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Browse Tasks
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
}
