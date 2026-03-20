"use client";

export default function MetricsCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
