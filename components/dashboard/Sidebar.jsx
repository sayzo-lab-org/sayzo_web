"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Maskgroup from "../../public/assets/Maskgroup.svg";
import sayzoLogo from "../../public/assets/SAYZO_LOGO.png";
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
  X,
} from "lucide-react";
import { logoutUser, subscribeToUserProfile } from "@/lib/firebase";

const menuItems = [
  { name: "Home",          href: "/dashboard",               icon: Home          },
  { name: "My Tasks",      href: "/dashboard/my-tasks",         icon: Briefcase     },
  { name: "Applied Tasks", href: "/dashboard/applied-tasks", icon: ClipboardList },
  { name: "Earnings",      href: "/dashboard/earnings",      icon: TrendingUp    },
  { name: "Chat",          href: "/dashboard/chat",          icon: MessageSquare },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell          },
  { name: "Profile",       href: "/dashboard/profile",       icon: User          },
];

function AvatarDropdown({ user, profile, onLogout, direction }) {
  const src  = profile?.photoURL || user?.photoURL || user?.providerData?.[0]?.photoURL;
  const name = profile?.name || user?.displayName || "User";
  const email = user?.email || "";

  const posClass =
    direction === "right"
      ? "left-full ml-3 bottom-0"
      : "bottom-full mb-2 left-0 right-0";

  return (
    <div className={`absolute z-50 bg-white rounded-2xl shadow-xl border border-gray-100 w-56 overflow-hidden ${posClass}`}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm uppercase overflow-hidden shrink-0">
          {src
            ? <img src={src} alt="Avatar" className="w-full h-full object-cover" /> // eslint-disable-line @next/next/no-img-element
            : name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-gray-400 leading-none mb-0.5">Signed in as</p>
          <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
          <p className="text-xs text-gray-400 truncate">{email}</p>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      <div className="py-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-4 h-4 text-gray-400 shrink-0" />
          Settings
        </Link>
        <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          <HelpCircle className="w-4 h-4 text-gray-400 shrink-0" />
          Support
        </button>
      </div>

      <div className="border-t border-gray-100" />

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

export default function Sidebar({ user, collapsed, onToggle, onClose }) {
  const pathname     = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile]           = useState(null);
  const dropdownRef  = useRef(null);
  const closeTimer   = useRef(null);

  useEffect(() => {
    if (!user?.uid) return;
    const unsub = subscribeToUserProfile(user.uid, setProfile);
    return () => unsub();
  }, [user?.uid]);

  const handleLogout = async () => {
    try { await logoutUser(); window.location.href = "/"; }
    catch (e) { console.error("Logout failed", e); }
  };

  const openDropdown   = () => { clearTimeout(closeTimer.current); setDropdownOpen(true); };
  const scheduleClose  = () => { closeTimer.current = setTimeout(() => setDropdownOpen(false), 150); };

  const avatarSrc = profile?.photoURL || user?.photoURL || user?.providerData?.[0]?.photoURL;
  const displayName = profile?.name || user?.displayName || "User";

  // ── single unified layout — CSS transitions only, no DOM swap ──────────────
  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className={`flex items-center shrink-0 py-4 transition-all duration-300 ${
        collapsed ? "justify-center px-2" : "justify-between px-4"
      }`}>

        {/* Collapsed logo icon */}
        <Link
          href="/"
          className={`transition-all duration-300 overflow-hidden ${
            collapsed ? "opacity-100 w-8" : "opacity-0 w-0 pointer-events-none"
          }`}
        >
          <Image src={sayzoLogo} alt="Sayzo" width={32} height={32} className="rounded-lg shrink-0" />
        </Link>

        {/* Expanded full logo */}
        <Link
          href="/"
          className={`transition-all duration-300 overflow-hidden ${
            collapsed ? "opacity-0 w-0 pointer-events-none" : "opacity-100 w-auto"
          }`}
        >
          <Image src={Maskgroup} alt="Sayzo" width={110} className="shrink-0" />
        </Link>

        {/* Toggle chevron (desktop only) */}
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`hidden md:flex p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0 ${
            collapsed ? "mt-0" : ""
          }`}
        >
          {collapsed
            ? <ChevronRight className="w-4 h-4" />
            : <ChevronLeft  className="w-4 h-4" />}
        </button>

        {/* X close button (mobile only) */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── Search ─────────────────────────────────────────────────── */}
      <div className={`shrink-0 px-2 transition-all duration-300 overflow-hidden ${
        collapsed ? "py-0 opacity-0 max-h-0" : "pb-3 opacity-100 max-h-12"
      }`}>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
            tabIndex={collapsed ? -1 : 0}
          />
        </div>
      </div>

      {/* Search icon (collapsed only) */}
      <div className={`shrink-0 flex justify-center mb-1 transition-all duration-300 overflow-hidden ${
        collapsed ? "opacity-100 max-h-10" : "opacity-0 max-h-0"
      }`}>
        <button
          title="Search"
          className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Search className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* ── Nav ────────────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 space-y-0.5">
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
              title={collapsed ? item.name : undefined}
              onClick={onClose}
              className={`flex items-center py-2.5 rounded-lg transition-all duration-150 group ${
                collapsed ? "justify-center px-2" : "gap-3 px-3"
              } ${
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`w-4.5 h-4.5 shrink-0 transition-colors ${
                isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-500"
              }`} />
              <span className={`whitespace-nowrap text-sm font-medium overflow-hidden transition-all duration-300 ${
                collapsed ? "max-w-0 opacity-0" : "max-w-50 opacity-100"
              }`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <div className={`shrink-0 pt-3 border-t border-gray-100 pb-3 px-2 space-y-0.5`}>

        {/* Settings */}
        <Link
          href="/dashboard/settings"
          title={collapsed ? "Settings" : undefined}
          onClick={onClose}
          className={`flex items-center py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group ${
            collapsed ? "justify-center px-2" : "gap-3 px-3"
          }`}
        >
          <Settings className="w-4.5 h-4.5 shrink-0 text-gray-400 group-hover:text-gray-500 transition-colors" />
          <span className={`whitespace-nowrap text-sm font-medium overflow-hidden transition-all duration-300 ${
            collapsed ? "max-w-0 opacity-0" : "max-w-50 opacity-100"
          }`}>
            Settings
          </span>
        </Link>

        {/* Support */}
        <button
          title={collapsed ? "Support" : undefined}
          className={`flex items-center w-full py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group ${
            collapsed ? "justify-center px-2" : "gap-3 px-3"
          }`}
        >
          <HelpCircle className="w-4.5 h-4.5 shrink-0 text-gray-400 group-hover:text-gray-500 transition-colors" />
          <span className={`whitespace-nowrap text-sm font-medium overflow-hidden transition-all duration-300 ${
            collapsed ? "max-w-0 opacity-0" : "max-w-50 opacity-100"
          }`}>
            Support
          </span>
        </button>

        {/* Avatar row / dropdown */}
        <div
          className="relative"
          ref={dropdownRef}
          onMouseEnter={openDropdown}
          onMouseLeave={scheduleClose}
        >
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className={`flex items-center w-full py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-left ${
              collapsed ? "justify-center px-2" : "gap-2.5 px-2"
            }`}
            aria-label="Open profile menu"
          >
            {/* Avatar circle */}
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs uppercase overflow-hidden shrink-0">
              {avatarSrc
                ? <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" /> // eslint-disable-line @next/next/no-img-element
                : (displayName.charAt(0) || "U")}
            </div>

            {/* Name + email (expanded only) */}
            <div className={`flex flex-col min-w-0 overflow-hidden transition-all duration-300 ${
              collapsed ? "max-w-0 opacity-0" : "max-w-40 opacity-100"
            }`}>
              <p className="text-sm font-medium text-gray-900 truncate whitespace-nowrap">{displayName}</p>
              <p className="text-xs text-gray-400 truncate whitespace-nowrap">{user?.email || ""}</p>
            </div>
          </button>

          {dropdownOpen && (
            <AvatarDropdown
              user={user}
              profile={profile}
              onLogout={handleLogout}
              direction={collapsed ? "right" : "up"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
