// /Users/mayanksaini/Desktop/GitHub/sayzo_web/components/dashboard/Sidebar.jsx

"use client";

import Link from "next/link";
import Image from "next/image";
import Maskgroup from "../../public/assets/Maskgroup.svg";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  MessageSquare,
  Wallet,
  User,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { logoutUser } from "@/lib/firebase";

const menuItems = [
  { name: "My Tasks",       href: "/dashboard/tasks",         icon: Briefcase      },
  { name: "Applied Tasks",  href: "/dashboard/applied-tasks", icon: ClipboardList  },
  { name: "Chats",          href: "/dashboard/chats",         icon: MessageSquare  },
  { name: "Wallet",         href: "/dashboard/wallet",        icon: Wallet         },
  { name: "Profile",        href: "/dashboard/profile",       icon: User           },
];

export default function Sidebar({ user }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/";
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <div className="flex flex-col h-full py-5 px-3">
      {/* Brand */}
      <div className="mb-7 px-2">
  <Link href="/" className="flex flex-col items-start">
    <Image src={Maskgroup} alt="Sayzo" width={150} />
    {/* <p className="text-xs text-gray-400 mt-1">Dashboard</p> */}
  </Link>
</div>
      {/* Nav */}
      <nav className="space-y-0.5 flex-1">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 group ${
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                  isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-500"
                }`}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="mt-auto pt-4 border-t border-gray-100 px-1 space-y-3">
        <div className="flex items-center gap-2.5 w-full min-w-0">
          <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs uppercase overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.email || ""}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
        >
          <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
          Sign out
        </button>
      </div>
    </div>
  );
}
