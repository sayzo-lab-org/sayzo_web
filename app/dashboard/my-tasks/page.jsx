"use client";

import { useMemo } from "react";
import TaskCard from "@/components/dashboard/TaskCard";
import useDashboardData from "@/hooks/useDashboardData";

function formatStatus(status) {
  const value = String(status || "pending").toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " ");
}

function getTaskTitle(task) {
  return task?.title || task?.taskTitle || task?.taskName || "Untitled Task";
}

function getTaskDescription(task) {
  return task?.description || task?.taskDescription || task?.details || "";
}

function getTaskBudget(task) {
  return task?.budget ?? task?.amount ?? task?.taskBudget ?? "";
}

export default function MyTasksPage() {
  const { postedTasks, postedLoading, error } = useDashboardData();

  const taskCountLabel = useMemo(
    () => `${postedTasks.length} task${postedTasks.length === 1 ? "" : "s"}`,
    [postedTasks.length]
  );

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">My Tasks</h1>
        <p className="mt-2 text-sm text-gray-600">Tasks posted by you.</p>
        {!postedLoading ? <p className="mt-1 text-xs text-gray-500">{taskCountLabel}</p> : null}
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      {postedLoading ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {[1, 2, 3].map((index) => (
            <div key={index} className="h-40 animate-pulse rounded-xl border border-gray-200 bg-white" />
          ))}
        </div>
      ) : postedTasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
          No posted tasks found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {postedTasks.map((task) => (
            <TaskCard
              key={task.id}
              variant="posted"
              title={getTaskTitle(task)}
              description={getTaskDescription(task)}
              status={formatStatus(task.status)}
              budget={getTaskBudget(task)}
              postedDate={task.createdAt}
              href={`/dashboard/tasks/${task.id}`}
              actionLabel="View Details"
            />
          ))}
        </div>
      )}
    </section>
  );
}
