'use client';

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowUpRight, Menu, X, User, LogOut, Mail, Phone, Briefcase, Loader2, pluse, Sparkles, Plus } from "lucide-react";
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
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const modalStagger = {
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
  }
};

const modalItem = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
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
        <div className="mx-auto flex items-center justify-between px-3 py-3 sm:px-16">
          <Link href="/">
            <Image src={Maskgroup} alt="Sayzo" width={150} />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {['Track Tasks', 'Live Tasks', 'Use Cases'].map((item) => (
              <Link
                key={item}
                href={item === 'Track Tasks' ? (user ? "/track-tasks" : "/login") : `/${item.toLowerCase().replace(' ', '-')}`}
                className="group relative"
              >
                <motion.span
                  className="text-sm font-semibold text-zinc-600 group-hover:text-black flex items-center transition-colors"
                >
                  {item}
                  <ArrowUpRight
                    className="w-3 h-3 text-gray-400 -mt-2 -ml-0.5 transition-all duration-300 ease-out 
                    group-hover:scale-110 group-hover:text-[#0ca37f] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={3}
                  />
                </motion.span>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <div className="h-6 w-[1px] bg-gray-200 mx-2" />

            {!user ? (
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sayzobtn"
                  onClick={() => router.push('/login')}

                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push('/signup')}
                  size="sayzobtn"
                  className="text-sm hover:scale-105 transition-all shadow-lg shadow-black/5"
                >
                  Get Started
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  size="sayzobtn"

                  onClick={() => setIsTaskOpen(true)}
                  /* Added whitespace-nowrap and adjusted padding for tighter screens */
                  className="  text-sm border bg-[#F8FAFC] text-black hover:bg-primary-btn whitespace-nowrap transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    {/* Ensure the text is also wrapped or defined clearly */}
                    <span className="text-sm font-medium">Post Task</span>
                  </span>
                </Button>

                <Button
                  size="sayzobtn"
                  onClick={() => setIsWaitlistOpen(true)}
                  className="text-sm hover:bg-zinc-800 transition-all"
                >
                  Join Waitlist
                </Button>
              </div>
            )}

            {(user || isAdmin) && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsProfileOpen(true)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${isAdmin ? "border-green-200 bg-green-50" : "border-gray-100 bg-gray-50"
                  } transition-all`}
              >
                <User className={`w-5 h-5 ${isAdmin ? "text-green-600" : "text-zinc-600"}`} />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
              </motion.button>
            )}
          </nav>

          {/* MOBILE NAV */}
          <div className="lg:hidden flex items-center gap-2">
             <Button
                  size="sayzobtn"
                  onClick={() => setIsTaskOpen(true)}
                  /* Added whitespace-nowrap and adjusted padding for tighter screens */
                  className=" border bg-[#F8FAFC] text-black hover:bg-primary-btn whitespace-nowrap transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    {/* Ensure the text is also wrapped or defined clearly */}
                    <span className="text-sm font-medium">Post Task</span>
                  </span>
                </Button>
            {/* PROFILE ICON - Show when logged in or admin */}
            {(user || isAdmin) && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsProfileOpen(true)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${isAdmin ? "border-green-200 bg-green-50" : "border-gray-100 bg-gray-50"
                  } transition-all`}
              >
                <User className={`w-5 h-5 ${isAdmin ? "text-green-600" : "text-zinc-600"}`} />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
              </motion.button>
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
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProfileOpen(false)}
          >
            <motion.div
              className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl shadow-black/20"
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 bg-zinc-950 text-white relative">
                <button onClick={() => setIsProfileOpen(false)} className="absolute right-4 top-4 opacity-70 hover:opacity-100">
                  <X size={20} />
                </button>
                <div className="flex flex-col items-center gap-3 mt-4">
                  <User className="w-10 h-10 text-white" />
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{userProfile?.fullName || 'User'}</h2>
                    {isAdmin && <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400">Administrator</span>}
                  </div>
                </div>
              </div>

              <motion.div variants={modalStagger} initial="initial" animate="animate" className="p-6 space-y-3">
                <motion.div variants={modalItem} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tight">Email Address</p>
                    <p className="text-sm font-semibold truncate text-gray-700">{user?.email || "Not available"}</p>
                  </div>
                </motion.div>

                {userProfile?.phone && (
                  <motion.div variants={modalItem} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tight">Phone</p>
                      <p className="text-sm font-semibold text-gray-700">{userProfile.phone}</p>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  variants={modalItem}
                  onClick={handleLogout}
                  whileHover={{ x: 5 }}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-50 text-red-600 font-bold text-sm transition-colors hover:bg-red-100 mt-4"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </motion.button>
              </motion.div>
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
            className="fixed top-0 left-0 right-0 z-[101] bg-white p-6 shadow-2xl rounded-b-[2.5rem] border-b border-gray-100"
          >
            {/* TOP BAR */}
            <div className="flex items-center justify-between mb-8">
              <Image src={Maskgroup2} alt="Sayzo Logo" width={110} />
              <motion.button
                whileTap={{ scale: 0.9, rotate: 90 }}
                onClick={() => setOpen(false)}
                className="p-2 bg-gray-50 rounded-full"
              >
                <X className="w-6 h-6 text-black" />
              </motion.button>
            </div>

            {/* NAV LINKS */}
            <motion.nav
              variants={{
                visible: { transition: { staggerChildren: 0.05 } }
              }}
              className="flex flex-col gap-2"
            >
              {['Track Tasks', 'Live Tasks', 'Use Cases'].map((item) => (
                <motion.div
                  key={item}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <Link
                    onClick={() => setOpen(false)}
                    href={item === 'Track Tasks' ? (user ? "/track-tasks" : "/login") : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center justify-between py-4 px-2 group"
                  >
                    <span className="text-xl font-bold text-zinc-800 group-hover:text-emerald-600 transition-colors">
                      {item}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))}

              <div className="h-[1px] bg-gray-100 my-4" />

              {/* ACTION BUTTONS */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="space-y-4"
              >
                <button
                  onClick={() => {
                    setOpen(false);
                    setIsWaitlistOpen(true);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl py-4 font-bold shadow-lg shadow-emerald-200 transition-all active:scale-[0.98]"
                >
                  Join Waitlist
                </button>

                {!user && (
                  <Link
                    onClick={() => setOpen(false)}
                    href="/login"
                    className="block text-center text-zinc-500 font-semibold py-2 hover:text-black transition-colors"
                  >
                    Already have an account? <span className="text-black underline underline-offset-4">Login</span>
                  </Link>
                )}
              </motion.div>
            </motion.nav>
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
