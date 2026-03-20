"use client";

import { useMemo } from "react";
import { Banknote, CheckCircle2, Clock } from "lucide-react";
import MetricsCard from "@/components/dashboard/MetricsCard";
import useDashboardData from "@/hooks/useDashboardData";

function formatBudget(value) {
  if (value === null || value === undefined || value === "") return "N/A";
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return String(value);
  return `₹${numeric.toLocaleString("en-IN")}`;
}

function formatDate(value) {
  const date = value?.toDate ? value.toDate() : value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function getTaskTitle(task, application) {
  return task?.title || task?.taskTitle || task?.taskName || application?.taskTitle || "Untitled Task";
}

function getBudget(task, application) {
  return task?.budget ?? task?.amount ?? application?.taskBudget ?? null;
}

export default function EarningsPage() {
  const { appliedTaskItems, applicationsLoading, appliedTasksLoading, error } = useDashboardData({
    includeAppliedTaskDetails: true,
  });

  const loading = applicationsLoading || appliedTasksLoading;

  const { acceptedItems, pendingCount, totalEarned } = useMemo(() => {
    const accepted = appliedTaskItems.filter(({ application }) =>
      String(application.status || "").toLowerCase() === "accepted"
    );
    const pending = appliedTaskItems.filter(({ application }) =>
      String(application.status || "").toLowerCase() === "pending"
    );
    const total = accepted.reduce((sum, { task, application }) => {
      const amount = getBudget(task, application);
      return sum + (amount !== null ? Number(amount) : 0);
    }, 0);
    return { acceptedItems: accepted, pendingCount: pending.length, totalEarned: total };
  }, [appliedTaskItems]);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Earnings</h1>
        <p className="mt-2 text-sm text-gray-600">Track your income from accepted tasks.</p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricsCard
          title="Total Earned"
          value={loading ? "..." : formatBudget(totalEarned)}
          icon={Banknote}
        />
        <MetricsCard
          title="Jobs Accepted"
          value={loading ? "..." : acceptedItems.length}
          icon={CheckCircle2}
        />
        <MetricsCard
          title="Pending Applications"
          value={loading ? "..." : pendingCount}
          icon={Clock}
        />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">Accepted Jobs</h2>
        </div>

        {loading ? (
          <div className="space-y-3 p-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-gray-100" />
            ))}
          </div>
        ) : acceptedItems.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-500">
            No accepted jobs yet. Keep applying!
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {acceptedItems.map(({ application, task, taskGiverName }) => {
              const budget = getBudget(task, application);
              return (
                <li key={application.id} className="flex items-center justify-between gap-4 px-6 py-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {getTaskTitle(task, application)}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      By {taskGiverName} &middot; Accepted{" "}
                      {formatDate(application.updatedAt || application.createdAt)}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                    {formatBudget(budget)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
