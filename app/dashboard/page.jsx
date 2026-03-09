"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getTasksByGiver } from "@/lib/firebase";
import Link from "next/link";
import { Briefcase, CheckCircle, Users, Activity } from "lucide-react";

export default function DashboardHome() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalTasks: 0,
    activeTasks: 0,
    totalApplicants: 0,
    completedTasks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          // Fetch tasks for current user
          const tasks = await getTasksByGiver(currentUser.uid);
          
          let active = 0;
          let completed = 0;
          let applicantsCount = 0;
          
          tasks.forEach(t => {
            const status = t.status?.toLowerCase() || "pending";
            if (status === "active" || status === "approved" || status === "open") active++;
            if (status === "completed") completed++;
            applicantsCount += (t.applicantsCount || 0);
          });

          setStats({
            totalTasks: tasks.length,
            activeTasks: active,
            totalApplicants: applicantsCount,
            completedTasks: completed
          });
        } catch (error) {
          console.error("Error fetching stats:", error);
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
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.displayName ? user.displayName.split(" ")[0] : "User"}!
            </h1>
            <p className="text-gray-500 max-w-lg">
              Here's an overview of your posted tasks and overall activity on Sayzo.
            </p>
          </div>
          <Link 
            href="/dashboard/tasks/new" 
            className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm text-sm shrink-0 inline-flex items-center justify-center"
          >
            Post a New Task
          </Link>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 h-28 animate-pulse shadow-sm">
              <div className="w-1/2 h-4 bg-gray-200 rounded mb-2"></div>
              <div className="w-1/4 h-8 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Tasks Posted" value={stats.totalTasks} icon={Briefcase} color="emerald" />
          <StatCard title="Active Tasks" value={stats.activeTasks} icon={Activity} color="blue" />
          <StatCard title="Total Applicants" value={stats.totalApplicants} icon={Users} color="purple" />
          <StatCard title="Completed Tasks" value={stats.completedTasks} icon={CheckCircle} color="teal" />
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  const colorMaps = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    teal: "bg-teal-50 text-teal-600",
  };
  
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-shadow group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${colorMaps[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
