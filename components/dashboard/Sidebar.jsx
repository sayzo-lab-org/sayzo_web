// /Users/mayanksaini/Desktop/GitHub/sayzo_web/components/dashboard/Sidebar.jsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Wallet, 
  User, 
  Settings 
} from "lucide-react";

const menuItems = [
  { name: "Dashboard Home", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Tasks", href: "/dashboard/tasks", icon: Briefcase },
  { name: "Chats", href: "/dashboard/chats", icon: MessageSquare },
  { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ user }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full py-6 px-4">
      <div className="mb-8 px-2">
        <h2 className="text-2xl font-bold tracking-tight text-emerald-700">
          Sayzo
        </h2>
      </div>

      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon 
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-600"
                }`} 
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t px-2">
        <div className="flex items-center gap-3 w-full">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs uppercase overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"
            )}
          </div>
          <div className="flex flex-col min-w-0 overflow-hidden">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || "No email"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
