"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, subscribeToTasksByGiver } from "@/lib/firebase";
import TaskList from "@/components/dashboard/TaskList";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import Link from "next/link";
import { Plus, RefreshCw } from "lucide-react";

export default function MyTasksPage() {
  const [tasks, setTasks] = useState([]);
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

    const unsubscribe = subscribeToTasksByGiver(
      user.uid,
      (updatedTasks) => {
        setTasks(updatedTasks);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to fetch tasks:", err);
        setError("Failed to load your tasks. Please try again.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Posted Tasks</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage all the tasks you have posted on Sayzo.{" "}
            {!loading && (
              <span className="text-gray-400">
                ({tasks.length} task{tasks.length !== 1 ? "s" : ""})
              </span>
            )}
          </p>
        </div>
        <Link
          href="/dashboard/tasks/new"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create Task
        </Link>
      </div>

      {/* Content */}
      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 flex items-center gap-3">
          <RefreshCw className="w-4 h-4 shrink-0" />
          {error}
        </div>
      ) : loading ? (
        <LoadingSkeleton count={3} />
      ) : (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
}
