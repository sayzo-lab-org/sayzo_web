'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const hideMegaMenu = pathname === "/use-cases";

  const [open, setOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);

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
          </nav>

          {/* MOBILE NAV */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              onClick={() => setIsWaitlistOpen(true)}
              className="rounded-full px-4 py-2 text-sm"
            >
              Join Waitlist
            </Button>
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

              {/* POST TASK (MOBILE) */}
              <button
                onClick={() => {
                  setOpen(false);
                  setIsTaskOpen(true);
                }}
                className="bg-primary-btn w-full rounded-xl py-2.5 text-white"
              >
                Post Task
              </button>

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
