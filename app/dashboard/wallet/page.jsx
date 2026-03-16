"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserProfile } from "@/lib/firebase";
import {
  Wallet,
  TrendingUp,
  Clock,
  ArrowDownToLine,
  IndianRupee,
  Info,
} from "lucide-react";

function WalletCard({ title, value, icon: Icon, color, subtitle }) {
  const colorMap = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
    amber:   "bg-amber-50 text-amber-600 border-amber-200",
    blue:    "bg-blue-50 text-blue-600 border-blue-200",
  };
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className={`p-2 rounded-lg border ${colorMap[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900">
        ₹{typeof value === "number" ? value.toLocaleString("en-IN") : value}
      </p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}

export default function WalletPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="bg-white rounded-xl border h-20 p-6" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Wallet</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your earnings and payments on Sayzo.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-full text-xs font-medium">
          <Info className="w-3.5 h-3.5" />
          Coming Soon
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <WalletCard
          title="Total Earnings"
          value={0}
          icon={TrendingUp}
          color="emerald"
          subtitle="All-time earnings"
        />
        <WalletCard
          title="Pending Payments"
          value={0}
          icon={Clock}
          color="amber"
          subtitle="Awaiting release"
        />
        <WalletCard
          title="Withdrawn"
          value={0}
          icon={ArrowDownToLine}
          color="blue"
          subtitle="Total withdrawals"
        />
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-emerald-600" />
          <h2 className="font-semibold text-gray-900">Transaction History</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="p-4 bg-gray-50 rounded-full mb-4">
            <IndianRupee className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="font-medium text-gray-700">No transactions yet</h3>
          <p className="text-sm text-gray-400 mt-1 max-w-xs">
            Complete tasks to start earning. Your transaction history will appear here.
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
        <p className="text-sm text-blue-700">
          Wallet functionality with real earnings data, UPI withdrawals, and payment history is
          coming soon. Stay tuned!
        </p>
      </div>
    </div>
  );
}
