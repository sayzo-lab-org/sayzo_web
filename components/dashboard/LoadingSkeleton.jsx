export function TaskSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm animate-pulse flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="w-2/3 h-6 bg-gray-200 rounded"></div>
        <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
      </div>
      <div className="w-1/3 h-4 bg-gray-100 rounded"></div>
      <div className="flex gap-6 mt-4 pt-4 border-t border-gray-50">
        <div className="w-20 h-4 bg-gray-100 rounded"></div>
        <div className="w-20 h-4 bg-gray-100 rounded"></div>
        <div className="w-24 h-4 bg-gray-100 rounded"></div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm animate-pulse flex flex-col gap-3">
      <div className="w-1/2 h-5 bg-gray-200 rounded"></div>
      <div className="w-1/3 h-8 bg-gray-300 rounded mt-1"></div>
    </div>
  );
}

export default function LoadingSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <TaskSkeleton key={i} />
      ))}
    </div>
  );
}
