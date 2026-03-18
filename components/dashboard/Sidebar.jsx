"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Maskgroup from "../../public/assets/Maskgroup.svg";
import sayzoLogo from "../../public/assets/SAYZO_LOGO.png";

;
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  MessageSquare,
  Wallet,
  User,
  ClipboardList,
  TrendingUp,
  Search,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
 
} from "lucide-react";
import { logoutUser, subscribeToUserProfile } from "@/lib/firebase";

const menuItems = [
  { name: "Home",          href: "/dashboard",               icon: Home          },
  { name: "My Tasks",      href: "/dashboard/tasks",         icon: Briefcase     },
  { name: "Applied Tasks", href: "/dashboard/applied-tasks", icon: ClipboardList },
  { name: "Earnings",      href: "/dashboard/earnings",      icon: TrendingUp    },
  { name: "Chat",          href: "/dashboard/chat",          icon: MessageSquare },
  { name: "Notifications",        href: "/dashboard/notifications",        icon: Bell        },
  { name: "Profile",       href: "/dashboard/profile",       icon: User          },
];

function Avatar({ user, photoURL, size = "sm" }) {
  const dim = size === "sm" ? "w-8 h-8 text-xs" : "w-9 h-9 text-sm";
  const src = 
    photoURL ||
    user?.photoURL ||
    user?.providerData?.[0]?.photoURL;
  return (
    <div
      className={`${dim} rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold uppercase overflow-hidden shrink-0`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"
      )}
    </div>
  );
}

//avataar dropdown 
function AvatarDropdown({ user, profile, onLogout, direction }) {
  const src = profile?.photoURL || user?.photoURL;
  const name = profile?.name || user?.displayName || "User";
  const email = user?.email || "";

  // direction: "right" (collapsed → open to the right) | "up" (expanded → open upward)
  const posClass =
    direction === "right"
      ? "left-full ml-3 bottom-0"
      : "bottom-full mb-2 left-0 right-0";

  return (
    <div
      className={`absolute z-50 bg-white rounded-2xl shadow-xl border border-gray-100 w-56 overflow-hidden ${posClass}`}
    >
      {/* Header — signed in as */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm uppercase overflow-hidden shrink-0">
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            name.charAt(0)
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-gray-400 leading-none mb-0.5">Signed in as</p>
          <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
          <p className="text-xs text-gray-400 truncate">{email}</p>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Menu items */}
      <div className="py-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-4 h-4 text-gray-400 shrink-0" />
          Settings
        </Link>

        <button
          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-gray-400 shrink-0" />
          Support
        </button>
      </div>

      <div className="border-t border-gray-100" />

      {/* Sign out */}
      <div className="py-1">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </div>
    </div>
  );
}


export default function Sidebar({ user, collapsed, onToggle }) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    if (!user?.uid) return;
    const unsub = subscribeToUserProfile(user.uid,(data)=>{
         console.log("PROFILE DATA:", data);
           setProfile(data);
    });
 
    return () => unsub();
  }, [user?.uid]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/";
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  const openDropdown = () => {
    clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  // ─── Collapsed Layout ───────────────────────────────────────────────────────
  if (collapsed) {
    return (
      <div className="flex flex-col items-center h-full py-4 px-2 gap-1">

        {/* Logo icon */}
        <Link href="/" className=" mt-1">
          <Image src={sayzoLogo} alt="Sayzo" width={32} height={32} className="rounded-lg" />
        </Link>

        {/* Search icon — mirrors search bar position in expanded mode */}
        <button
          title="Search"
          className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Search className="w-4.5 h-4.5" />
        </button>

        {/* Nav icons */}
        <nav className="flex flex-col items-center gap-0.5 flex-1 w-full">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.name}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-150 ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
              </Link>
            );
          })}
        </nav>

        {/* Chevron toggle */}
        <button
          onClick={onToggle}
          aria-label="Expand sidebar"
          className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Settings */}
        <Link
          href="/dashboard/settings"
          title="Settings"
          className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Settings className="w-4.5 h-4.5" />
        </Link>

        {/* Help / Support */}
        <button
          title="Support"
          className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <HelpCircle className="w-4.5 h-4.5" />
        </button>

        {/* Avatar + dropdown */}
        <div
          className="relative"
          ref={dropdownRef}
          onMouseEnter={openDropdown}
          onMouseLeave={scheduleClose}
        >
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="focus:outline-none rounded-full"
            aria-label="Open profile menu"
          >
            <Avatar user={user} photoURL={
           user?.photoURL ||
           user?.providerData?.[0]?.photoURL
            } />
          </button>

          {dropdownOpen && (
            <AvatarDropdown
              user={user}
              profile={profile}
              onLogout={handleLogout}
              direction="right"
            />
          )}
        </div>
      </div>
    );
  }

  // ─── Expanded Layout ────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full py-5 px-3">

      {/* Brand + Collapse Toggle */}
      <div className="mb-5 flex items-center justify-between px-2">
        <Link href="/" className="flex items-center">
          <Image src={Maskgroup} alt="Sayzo" width={110} />
        </Link>
        <button
          onClick={onToggle}
          aria-label="Collapse sidebar"
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 px-1 animate-in fade-in duration-200">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="space-y-0.5 flex-1">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
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
                className={`w-4.5 h-4.5 shrink-0 transition-colors ${
                  isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-500"
                }`}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-100 space-y-1">

        {/* Help & Support */}
        {/* <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
          <span className="font-medium">Help & Support</span>
        </div> */}

        {/* User row + dropdown */}

         <div className="py-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-4 h-4 text-gray-400 shrink-0" />
          Settings
        </Link>

        <button
          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-gray-400 shrink-0" />
          Support
        </button>
      </div>
        <div
          className="relative"
          // ref={dropdownRef}
          // onMouseEnter={openDropdown}
          // onMouseLeave={scheduleClose}
        >
          
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2.5 w-full px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-left min-w-0"
          >
            <Avatar user={user} photoURL={
             
              user?.photoURL ||
              user?.providerData?.[0]?.photoURL
            } />
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {profile?.name || user?.displayName || "User"}
              </p>
              <p className="text-xs text-gray-400 truncate">{user?.email || ""}</p>
            </div>
          </button>

          {dropdownOpen && (
            <AvatarDropdown
              user={user}
              profile={profile}
              onLogout={handleLogout}
              direction="up"
            />
          )}
        </div>
      </div>
    </div>
  );
}
