// /Users/mayanksaini/Desktop/GitHub/sayzo_web/components/dashboard/TaskCard.jsx

import { ArrowUpRight, Users, Banknote } from "lucide-react";

export default function TaskCard({ task }) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-emerald-200">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 mb-2">
            {task.category}
          </span>
          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-emerald-700 transition-colors">
            {task.title}
          </h3>
        </div>
        
        <div className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Banknote className="w-4 h-4" />
            <span className="font-medium text-gray-900">₹{task.budget}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{task.applicants} Applicants</span>
          </div>
        </div>
        
        <span className="text-xs text-gray-400">Posted 2h ago</span>
      </div>
    </div>
  );
}
