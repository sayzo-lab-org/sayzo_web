import { FileQuestion, Plus } from "lucide-react";
import Link from "next/link";

export default function EmptyState({ 
  title = "No data found", 
  message = "There's nothing to show here yet.",
  actionLabel = "Create New",
  actionHref = "/dashboard/tasks/new",
  showAction = true
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-xl border-2 border-dashed border-gray-200">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <FileQuestion className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-6">{message}</p>
      
      {showAction && (
        <Link 
          href={actionHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium text-sm shadow-sm hover:shadow"
        >
          <Plus className="w-4 h-4" />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
