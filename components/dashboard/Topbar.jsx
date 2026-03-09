// /Users/mayanksaini/Desktop/GitHub/sayzo_web/components/dashboard/Topbar.jsx

"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";

export default function Topbar() {
  const pathname = usePathname();

  // Helper to get page title from path
  const getPageTitle = () => {
    const path = pathname.split("/").pop();
    if (!path || path === "dashboard") return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="h-full flex items-center justify-between px-6">
      {/* Left: Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-800">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <Search className="w-5 h-5" />
        </button>
        
        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-gray-200 mx-1" />
        
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
           {/* Placeholder for user avatar image */}
           <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
             IMG
           </div>
        </div>
      </div>
    </div>
  );
}
