// /Users/mayanksaini/Desktop/GitHub/sayzo_web/app/dashboard/layout.jsx

"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Fixed width */}
      <aside className="hidden md:block w-64 flex-shrink-0 border-r bg-white h-full overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Topbar - Fixed height */}
        <header className="h-16 flex-shrink-0 bg-white border-b">
          <Topbar />
        </header>

        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
