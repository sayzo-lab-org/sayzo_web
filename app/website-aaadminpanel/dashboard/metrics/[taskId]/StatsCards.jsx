"use client";

import { Users, Eye, CheckCircle, Wallet, TrendingUp } from "lucide-react";

export default function StatsCards({ totalApplications, taskStatus, budget, views }) {
  const cards = [
    {
      title: "Total Applications",
      value: totalApplications,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Current Status",
      value: taskStatus?.replace("_", " ").toUpperCase() || "UNKNOWN",
      icon: CheckCircle,
      color: taskStatus === "completed" ? "text-green-600" : "text-amber-600",
      bg: taskStatus === "completed" ? "bg-green-50" : "bg-amber-50",
    },
    {
      title: "Budget",
      value: `₹${budget}`,
      icon: Wallet,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Total Views",
      value: views.toLocaleString(),
      icon: Eye,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition duration-300">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${card.bg}`}>
                <Icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">{card.title}</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    {idx === 0 && totalApplications > 0 && (
                        <span className="flex items-center text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                            <TrendingUp className="w-3 h-3 mr-0.5" /> Active
                        </span>
                    )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
