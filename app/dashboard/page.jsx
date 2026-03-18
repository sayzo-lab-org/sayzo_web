"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Maskgroup from "../../public/assets/Maskgroup.svg";
import { Image as ImageIcon, Code, Mic, ArrowUp } from "lucide-react";
import { BriefcaseBusiness, PlayCircle, CheckCircle2, ClipboardCheck } from "lucide-react";
import MetricsCard from "@/components/dashboard/MetricsCard";
import useDashboardData from "@/hooks/useDashboardData";

const QUICK_ACTIONS = [
  "Post an Online Task",
  "Post an Offline Task",
  "Understand the App Better",
  "Other Queries",
];

export default function DashboardHomePage() {
  const { user, profile, metrics, loading, error } = useDashboardData({
    includeProfile: true,
  });
  const [prompt, setPrompt] = useState("");

  const userName = useMemo(() => {
    const source = profile?.name || user?.displayName || user?.email || "User";
    return source.split("@")[0].trim();
  }, [profile?.name, user?.displayName, user?.email]);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-128px)] py-35 gap-10">

      {/* Metrics Row
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricsCard
          title="Total Posted"
          value={loading ? "..." : metrics.totalTasksPosted}
          icon={BriefcaseBusiness}
        />
        <MetricsCard
          title="Active"
          value={loading ? "..." : metrics.activeTasks}
          icon={PlayCircle}
        />
        <MetricsCard
          title="Completed"
          value={loading ? "..." : metrics.completedTasks}
          icon={CheckCircle2}
        />
        <MetricsCard
          title="Applied"
          value={loading ? "..." : metrics.appliedTasks}
          icon={ClipboardCheck}
        />
      </div> */}

      {/* Help Center */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-6">
        <Image src={Maskgroup} alt="Sayzo" width={140} />

        <h2 className="text-3xl font-bold text-gray-900 text-center">
          What can I help you with?
        </h2>

        {/* Input Box */}
        <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
          <textarea
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What would you like to know?"
            className="w-full resize-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 text-gray-400">
              <button className="p-1.5 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <ImageIcon className="w-5 h-5" />
              </button>
              <button className="p-1.5 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Code className="w-5 h-5" />
              </button>
              <button className="p-1.5 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            <button
              disabled={!prompt.trim()}
              className="p-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action}
              className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              {action}
            </button>
          ))}
        </div>

        {error && (
          <div className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
