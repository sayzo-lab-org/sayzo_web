"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { RoleProvider } from "@/context/RoleContext";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <RoleProvider>
    <div className="flex h-screen overflow-hidden">

      {/* ── Desktop Sidebar (md+) ─────────────────────────────────── */}
      <aside
        className={`hidden md:block shrink-0 border-r bg-white h-full overflow-y-auto transition-all duration-300 ${
          sidebarCollapsed ? "w-15" : "w-64"
        }`}
      >
        <Sidebar
          user={user}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((v) => !v)}
        />
      </aside>

      {/* ── Mobile Sidebar Drawer (< md) ──────────────────────────── */}
      <div className="md:hidden">
        {/* Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          className={`fixed top-0 left-0 z-50 h-full w-64 overflow-y-auto border-r bg-white transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar
            user={user}
            collapsed={false}
            onToggle={() => {}}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        <header className="h-16 shrink-0 bg-white border-b border-gray-100">
          <Topbar user={user} onMenuClick={() => setIsSidebarOpen(true)} />
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
    </RoleProvider>
  );
}
