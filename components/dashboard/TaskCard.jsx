"use client";

import Link from "next/link";
import { Banknote, CalendarDays, User2, ClipboardCheck } from "lucide-react";

function formatDate(value) {
  const date = value?.toDate ? value.toDate() : value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatBudget(budget) {
  if (budget === null || budget === undefined || budget === "") return "-";
  const numeric = Number(budget);
  if (Number.isNaN(numeric)) return String(budget);
  return `₹${numeric.toLocaleString("en-IN")}`;
}

export default function TaskCard({
  variant = "posted",
  title,
  description,
  status,
  budget,
  postedDate,
  taskGiver,
  href,
  actionLabel,
}) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{title || "Untitled Task"}</h3>
        {status ? (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            {status}
          </span>
        ) : null}
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        {variant === "posted" && description ? (
          <p className="line-clamp-2 text-sm text-gray-600">{description}</p>
        ) : null}

        <div className="flex items-center gap-2">
          <Banknote className="h-4 w-4 text-gray-400" />
          <span>{formatBudget(budget)}</span>
        </div>

        {variant === "posted" ? (
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gray-400" />
            <span>Posted {formatDate(postedDate)}</span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <User2 className="h-4 w-4 text-gray-400" />
              <span>{taskGiver || "Task Giver"}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4 text-gray-400" />
              <span>{status || "Pending"}</span>
            </div>
          </>
        )}
      </div>

      {href ? (
        <Link
          href={href}
          className="mt-5 inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          {actionLabel || "View"}
        </Link>
      ) : null}
    </article>
  );
}
