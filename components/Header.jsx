'use client';

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowUpRight, Menu, X, User, LogOut, Mail, Phone, Briefcase, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/app/Context/AuthContext";
import { subscribeToJobApplicationsByApplicant } from "@/lib/firebase";

import Maskgroup from "../public/assets/Maskgroup.svg";
import Maskgroup2 from "../public/assets/Maskgroup2.svg";

import WaitlistModal from "@/components/JoinWaitList/WaitlistModal";
import TaskModal from "@/components/TaskModal";
import MegaMenu from "./MegaMenu";

/* ---------------- DROPDOWN MOBILE MENU ---------------- */
const menuVariants = {
  hidden: { y: "-20px", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    y: "-20px",
    opacity: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const hideMegaMenu = pathname === "/use-cases" || pathname === "/track-tasks" || pathname === "/live-tasks" || pathname.startsWith("/website-aaadminpanel");

  const [open, setOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [myJobApplications, setMyJobApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(false);

  // Use centralized auth context instead of local listener
  const { user, userProfile, isAdmin, logout } = useAuth();

  // Auto-open TaskModal when user returns from magic link with pending task
  useEffect(() => {
    if (user) {
      const pendingTask = localStorage.getItem("sayzo_pending_task");
      if (pendingTask) {
        setIsTaskOpen(true);
        localStorage.removeItem("sayzo_pending_task");
      }
    }
  }, [user]);

  // Subscribe to user's job applications when profile modal opens
  useEffect(() => {
    if (!isProfileOpen || !user) {
      return;
    }

    setLoadingApps(true);
    const unsubscribe = subscribeToJobApplicationsByApplicant(
      user.uid,
      (apps) => {
        setMyJobApplications(apps);
        setLoadingApps(false);
      },
      (err) => {
        console.error('Job applications subscription error:', err);
        setLoadingApps(false);
      }
    );

    return () => unsubscribe();
  }, [isProfileOpen, user]);

  // Format date helper
  const formatAppDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const styles = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      accepted: 'bg-green-500/20 text-green-400',
      rejected: 'bg-red-500/20 text-red-400',
    };
    const labels = {
      pending: 'Pending',
      accepted: 'Accepted',
      rejected: 'Rejected',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.pending}`}>
        {labels[status] || 'Pending'}
      </span>
    );
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      router.push('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <header className="relative z-40 bg-background/95 backdrop-blur">
        <div className="mx-auto flex items-center justify-between px-4 py-5 sm:px-16">
          <Link href="/">
            <Image src={Maskgroup} alt="Sayzo" width={150} />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/track-tasks">
              <span className="text-sm font-medium flex items-center">
                Track Tasks
                <ArrowUpRight
                  className="w-3 h-3 text-gray-400 -mt-2 -ml-0.5"
                  strokeWidth={3.2}
                />
              </span>
            </Link>

            <Link href="/live-tasks">
              <span className="text-sm font-medium flex items-center">
                Live Tasks
                <ArrowUpRight
                  className="w-3 h-3 text-gray-400 -mt-2 -ml-0.5"
                  strokeWidth={3.2}
                />
              </span>
            </Link>

            <Link href="/use-cases">
              <span className="text-sm font-medium flex items-center">
                Use Cases
                <ArrowUpRight
                  className="w-3 h-3 text-gray-400 -mt-2 -ml-0.5"
                  strokeWidth={3.2}
                />
              </span>
            </Link>

            {/* POST TASK */}
            <Button
              onClick={() => setIsTaskOpen(true)}
              className="rounded-full border bg-[#F8FAFC] text-black hover:bg-primary-btn hover:text-white hover:border-primary-btn border-black px-5 py-2 text-sm"
            >
              + Post Task
            </Button>

            {/* WAITLIST */}
            <Button
              onClick={() => setIsWaitlistOpen(true)}
              className="rounded-full px-7 py-2 text-sm bg-black text-white"
            >
              Join Waitlist
            </Button>

            {/* PROFILE ICON - Show when logged in or admin */}
            {(user || isAdmin) && (
              <button
                onClick={() => setIsProfileOpen(true)}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  isAdmin ? "bg-green-100 hover:bg-green-200" : "bg-zinc-100 hover:bg-zinc-200"
                }`}
                aria-label="Open profile menu"
              >
                <User className={`w-5 h-5 ${isAdmin ? "text-green-700" : "text-zinc-700"}`} />
              </button>
            )}
          </nav>

          {/* MOBILE NAV */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              onClick={() => setIsTaskOpen(true)}
              className="rounded-full px-4 py-2 text-sm"
            >
              + Post Task
            </Button>
            {/* PROFILE ICON - Show when logged in or admin */}
            {(user || isAdmin) && (
              <button
                onClick={() => setIsProfileOpen(true)}
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                  isAdmin ? "bg-green-100 hover:bg-green-200" : "bg-zinc-100 hover:bg-zinc-200"
                }`}
                aria-label="Open profile menu"
              >
                <User className={`w-4 h-4 ${isAdmin ? "text-green-700" : "text-zinc-700"}`} />
              </button>
            )}
            <button onClick={() => setOpen(true)}>
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/* TASK MODAL */}
      <TaskModal
        isOpen={isTaskOpen}
        onClose={() => setIsTaskOpen(false)}
      />

      {/* WAITLIST MODAL */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />

      {/* PROFILE MODAL */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProfileOpen(false)}
          >
            <motion.div
              className="w-full max-w-sm bg-black border border-zinc-800 rounded-2xl p-6"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-white">Profile</h2>
                  {isAdmin && (
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* User Info */}
              <div className="space-y-4">
                {/* Profile Avatar & Name */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-3">
                    <User className="w-10 h-10 text-zinc-400" />
                  </div>
                  {userProfile?.fullName && (
                    <p className="text-white text-lg font-semibold">
                      {userProfile.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="bg-zinc-900 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-zinc-500" />
                    <div>
                      <p className="text-zinc-500 text-xs">Email</p>
                      <p className="text-white font-medium">
                        {user?.email || userProfile?.email || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                {userProfile?.phone && (
                  <div className="bg-zinc-900 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-zinc-500" />
                      <div>
                        <p className="text-zinc-500 text-xs">Phone</p>
                        <p className="text-white font-medium">
                          {userProfile.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 py-4 rounded-xl font-semibold transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 right-0 z-[100] bg-white px-6 pb-6 shadow-lg"
          >
            {/* TOP */}
            <div className="flex items-center justify-between">
              <Image src={Maskgroup2} alt="Sayzo Logo" width={120} />
              <button onClick={() => setOpen(false)}>
                <X className="w-7 h-7 text-black" />
              </button>
            </div>

            {/* LINKS */}
            <nav className="mt-6 flex flex-col gap-4 text-black text-base font-medium text-center">
              <Link onClick={() => setOpen(false)} href="/">
                Home
              </Link>

              {/* JOIN WAITLIST (MOBILE) */}
              <button
                onClick={() => {
                  setOpen(false);
                  setIsWaitlistOpen(true);
                }}
                className="bg-primary-btn w-full rounded-xl py-2.5 text-white"
              >
                Join Waitlist
              </button>

              <Link
                onClick={() => setOpen(false)}
                href="/track-tasks"
                className="flex text-left w-full items-center justify-start gap-2 w-full rounded-xl py-2.5"
              >
                Track Tasks
                <ArrowUpRight
                  className="w-3 h-3 text-gray-400 -mt-2"
                  strokeWidth={3.2}
                />
              </Link>

              <Link
                onClick={() => setOpen(false)}
                href="/live-tasks"
                className="flex text-left w-full items-center justify-start gap-2 w-full rounded-xl py-2.5"
              >
                Live Tasks
                <ArrowUpRight
                  className="w-3 h-3 text-gray-400 -mt-2"
                  strokeWidth={3.2}
                />
              </Link>

              <Link
                onClick={() => setOpen(false)}
                href="/use-cases"
                className="flex text-left w-full items-center justify-start gap-2 w-full rounded-xl py-2.5"
              >
                Use Cases
                <ArrowUpRight
                  className="w-3 h-3 text-gray-400 -mt-2"
                  strokeWidth={3.2}
                />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MEGA MENU */}
      <div className="-mt-5 bg-background/95 backdrop-blur">
        {!hideMegaMenu && <MegaMenu />}
      </div>
    </div>
  );
};

export default Header;
