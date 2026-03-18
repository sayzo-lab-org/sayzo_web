"use client";

import { useMemo, useState } from "react";
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

const TABS = ["offline", "online"];

export default function MyTasksPage() {
  const { postedTasks, postedLoading, error } = useDashboardData();
  const [activeTab, setActiveTab] = useState("offline");

  const filteredTasks = useMemo(
    () => postedTasks.filter((t) => (t.taskType ?? "offline") === activeTab),
    [postedTasks, activeTab]
  );

  const taskCountLabel = useMemo(
    () => `${filteredTasks.length} task${filteredTasks.length === 1 ? "" : "s"}`,
    [filteredTasks.length]
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

      {/* Offline / Online toggle */}
      <div className="flex bg-gray-100 rounded-xl p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {postedLoading ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {[1, 2, 3].map((index) => (
            <div key={index} className="h-40 animate-pulse rounded-xl border border-gray-200 bg-white" />
          ))}
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
          No {activeTab} tasks posted yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredTasks.map((task) => (
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
              taskId={task.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}
