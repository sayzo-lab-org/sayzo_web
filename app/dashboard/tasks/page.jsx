"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getTasksByGiver } from "@/lib/firebase";
import TaskList from "@/components/dashboard/TaskList";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function MyTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userTasks = await getTasksByGiver(user.uid);
          setTasks(userTasks);
        } catch (err) {
          console.error("Failed to fetch tasks:", err);
          setError("Failed to load your tasks. Please try again later.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Posted Tasks</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all the tasks you have posted on Sayzo.</p>
        </div>
        <Link 
          href="/dashboard/tasks/new" 
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create Task
        </Link>
      </div>

      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
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
