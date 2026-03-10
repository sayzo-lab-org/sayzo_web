// /Users/mayanksaini/Desktop/GitHub/sayzo_web/components/dashboard/TaskCard.jsx

import { ArrowUpRight, Users, Banknote } from "lucide-react";
import Link from "next/link";

export default function TaskCard({ task }) {
  // Format the date if it's a firebase timestamp
  const date = task.createdAt?.toDate ? task.createdAt.toDate() : new Date(task.createdAt || Date.now());
  const postedString = date.toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <Link 
      href={`/dashboard/tasks/${task.id}`}
      className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 block hover:border-emerald-300 cursor-pointer text-left"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1.5 flex-1 pr-4">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {task.category || "General"}
          </span>
          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-emerald-700 transition-colors line-clamp-2 leading-tight">
            {task.title}
          </h3>
        </div>
        
        <div className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors shrink-0">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-gray-700">
            <Banknote className="w-4 h-4 text-gray-400" />
            <span className="font-medium">₹{task.budget || 0}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-gray-400" />
            <span>{task.applicantsCount || 0} Applicants</span>
          </div>
        </div>
        
        <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
          {postedString}
        </span>
      </div>
    </Link>
  );
}
