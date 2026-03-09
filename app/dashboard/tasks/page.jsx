// /Users/mayanksaini/Desktop/GitHub/sayzo_web/app/dashboard/page.jsx

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, User!</h1>
        <p className="text-gray-500">
          Here is what's happening with your tasks today.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats Placeholders */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Active Tasks</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">₹12,400</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
        </div>
      </div>
    </div>
  );
}
