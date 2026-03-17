"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { subscribeToUserProfile ,subscribeToTasksByGiver} from "@/lib/firebase";
import { Briefcase, CheckCircle, Users, Activity, ClipboardList, Plus, TrendingUp } from "lucide-react";

export default function DashboardHome() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    totalTasks: 0,
    activeTasks: 0,
    totalApplicants: 0,
    completedTasks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Real-time profile subscription
    const unsubscribeProfile = subscribeToUserProfile(user.uid, (profileData) => {
      setProfile(profileData);
    });

    // Real-time tasks subscription for live stats
    const unsubscribeTasks = subscribeToTasksByGiver(user.uid, (tasks) => {
      let active = 0;
      let completed = 0;
      let applicantsCount = 0;

      tasks.forEach((t) => {
        const status = t.status?.toLowerCase() || "pending_approval";
        if (status === "active" || status === "approved") active++;
        if (status === "completed") completed++;
        applicantsCount += t.applicantsCount || 0;
      });

      setStats({
        totalTasks: tasks.length,
        activeTasks: active,
        totalApplicants: applicantsCount,
        completedTasks: completed,
      });
    });

    return () => {
      unsubscribeProfile();
      unsubscribeTasks();
    };
  }, [user]);

  const displayName =
    profile?.name?.split(" ")[0] ||
    user?.displayName?.split(" ")[0] ||
    "there";

  const profileComplete = profile?.profileCompleted === true;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/60 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome back, {loading ? "..." : displayName}! 👋
            </h1>
            <p className="text-gray-500 max-w-lg text-sm">
              Here&apos;s an overview of your posted tasks and overall activity on Sayzo.
            </p>
            {!loading && profile && !profileComplete && (
              <Link
                href="/onboarding"
                className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors"
              >
                ⚠️ Complete your profile to unlock all features
              </Link>
            )}
          </div>
          <Link
            href="/dashboard/tasks/new"
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm text-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            Post a New Task
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 h-28 animate-pulse shadow-sm">
              <div className="w-1/2 h-4 bg-gray-200 rounded mb-2" />
              <div className="w-1/4 h-8 bg-gray-300 rounded" />
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

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/dashboard/tasks"
          className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-emerald-300 hover:shadow transition-all group"
        >
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-100 transition-colors">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">My Posted Tasks</p>
            <p className="text-sm text-gray-500">Manage and track tasks you&apos;ve posted</p>
          </div>
          <TrendingUp className="w-4 h-4 ml-auto text-gray-300 group-hover:text-emerald-400 transition-colors" />
        </Link>
        <Link
          href="/dashboard/applied-tasks"
          className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow transition-all group"
        >
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-100 transition-colors">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">Applied Tasks</p>
            <p className="text-sm text-gray-500">Track applications you have submitted</p>
          </div>
          <TrendingUp className="w-4 h-4 ml-auto text-gray-300 group-hover:text-blue-400 transition-colors" />
        </Link>
      </div>
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
