"use client";

import { useEffect, useState } from "react";
import { getTaskMetricsBase, getTaskApplications, getApplicationCount } from "@/lib/firebase";
import StatsCards from "./StatsCards";
import ApplicantList from "./ApplicantList";
import { Loader2, AlertCircle } from "lucide-react";

export default function MetricsDashboard({ taskId }) {
  const [task, setTask] = useState(null);
  const [applications, setApplications] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const [taskData, totalApps, appsList] = await Promise.all([
          getTaskMetricsBase(taskId),
          getApplicationCount(taskId),
          getTaskApplications(taskId)
        ]);

        if (!taskData) {
          setError("Task not found");
          return;
        }

        setTask(taskData);
        setTotalCount(totalApps || appsList.length);
        setApplications(appsList);
      } catch (err) {
        console.error("Metrics failed:", err);
        setError("Failed to load metrics. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    }
    
    if (taskId) {
        fetchMetrics();
    }
  }, [taskId]);

  if (loading) {
      return (
          <div className="flex items-center justify-center p-20">
              <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          </div>
      );
  }

  if (error) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Analytics</h3>
            <p className="text-gray-500 max-w-sm">{error}</p>
        </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{task.taskName || task.title || "Untitled Task"}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Posted by {task.customerName || task.company?.name || "Unknown"}</span>
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
            <span>{task.taskType}</span>
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
            <span className="capitalize">{task.status?.replace("_", " ")}</span>
        </div>
      </div>
      
      {/* 1. Task Performance Metrics */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Task Performance</h2>
        <StatsCards 
            totalApplications={totalCount} 
            taskStatus={task.status} 
            budget={task.amount || task.budget?.amount || "0"} 
            views={task.views || 0}
        />
      </div>

      {/* 2. Applicant Insights Table */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 tracking-tight">Applicant Roster</h2>
        <ApplicantList applications={applications} />
      </div>
    </div>
  );
}
