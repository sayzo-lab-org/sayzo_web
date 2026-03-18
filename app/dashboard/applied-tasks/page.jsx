"use client";

import { useMemo } from "react";
import TaskCard from "@/components/dashboard/TaskCard";
import useDashboardData from "@/hooks/useDashboardData";

function formatStatus(status) {
  const value = String(status || "pending").toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getTaskTitle(task, application) {
  return task?.title || task?.taskTitle || task?.taskName || application?.taskTitle || "Untitled Task";
}

function getTaskBudget(task, application) {
  return task?.budget ?? task?.amount ?? application?.taskBudget ?? "";
}

export default function AppliedTasksPage() {
  const { appliedTaskItems, applicationsLoading, appliedTasksLoading, error } = useDashboardData({
    includeAppliedTaskDetails: true,
  });

  const loading = applicationsLoading || appliedTasksLoading;

  const countLabel = useMemo(
    () => `${appliedTaskItems.length} application${appliedTaskItems.length === 1 ? "" : "s"}`,
    [appliedTaskItems.length]
  );

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
              taskGiver={taskGiverName}
              budget={getTaskBudget(task, application)}
              status={formatStatus(application.status)}
              href={application.taskId ? `/browse-tasks/${application.taskId}` : undefined}
              actionLabel="View Task"
            />
          ))}
        </div>
      )}
    </section>
  );
}
