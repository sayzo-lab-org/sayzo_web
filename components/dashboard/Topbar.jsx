// /Users/mayanksaini/Desktop/GitHub/sayzo_web/components/dashboard/Topbar.jsx

"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Search ,Send,send } from "lucide-react";
import { subscribeToUserProfile } from "@/lib/firebase";
import Toggle from "../Toggle";

function getInitials(nameOrEmail) {
  const source = String(nameOrEmail || "").trim();
  if (!source) return "U";

  const words = source
    .replace(/@.*$/, "")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

export default function Topbar({ user }) {
  const pathname = usePathname();
  const [profile, setProfile] = useState(null);
  

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = subscribeToUserProfile(user.uid, (profileData) => {
      setProfile(profileData);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const displayName = useMemo(
    () => profile?.name || user?.displayName || user?.email || "User",
    [profile?.name, user?.displayName, user?.email]
  );
  const avatarSource = profile?.photoURL || user?.photoURL || "";
  const avatarInitials = getInitials(displayName);

  const getPageTitle = () => {
    const segment = pathname.split("/").pop();
    const titles = {
      dashboard: "Dashboard",
      tasks: "My Tasks",
      "my-tasks": "My Tasks",
      "applied-tasks": "Applied Tasks",
      earnings: "Earnings",
      chat: "Chat",
      wallet: "Wallet",
      profile: "Profile",
      settings: "Settings",
    };
    return titles[segment] ?? (segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : "Dashboard");
  };

  return (
    <div className="h-full flex items-center justify-between px-6">
      {/* Left: Title */}
      <div className="flex items-center gap-4">
        {/* <h1 className="text-xl font-semibold text-gray-800">
          {getPageTitle()}
        </h1> */}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
      {/* 1. The Custom Toggle */}
      <Toggle />

      {/* 2. Notification Bell */}
      <button 
        aria-label="Notifications"
        className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-400"
      >
        <Bell className="w-5 h-5" />
        {/* Slightly larger dot so the red is more visible inside the border */}
        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
      </button>

      {/* 3. Send / Message Button */}
      <button 
        aria-label="Send Message"
        className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-400"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
    </div>
  );
}






//profile icons 

 {/* <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-emerald-100 overflow-hidden border border-emerald-200 flex items-center justify-center text-emerald-700 font-medium text-xs uppercase">
            {avatarSource ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarSource} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              avatarInitials
            )}
          </div>
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-gray-900">
              {displayName}
            </span>
            <span className="text-xs text-gray-500">Sayzo Member</span>
          </div>
        </Link> */}