"use client";

import { motion } from "framer-motion";
import { CheckCircle, User, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ApplicationModal from "../ApplicationModal";
import TaskDoerAuthModal from "../TaskDoerAuthModal";
import WaitlistModal from "../JoinWaitList/WaitlistModal";
import { useRouter } from "next/navigation";

const JobBottomSheet = ({ job, onClose, currentUser, hasApplied, isOwnTask, onApplicationSuccess, mode = "live" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  const router = useRouter();

  const handleApplyClick = () => {
    if (mode === "showcase") {
      setShowWaitlistModal(true);
    } else if (!currentUser) {
      router.push("/login");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setIsModalOpen(true);
  };

  /* 🔒 Lock background scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* BOTTOM SHEET */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="
          fixed bottom-0 left-0 right-0 z-50
          bg-white rounded-t-2xl
          h-[65vh]
          flex flex-col
        "
      >
        {/* HANDLE */}
        <div className="flex justify-center py-3">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* SCROLLABLE CONTENT */}
        <div
          className="
            flex-1
            px-4
            overflow-y-auto
            touch-pan-y
            overscroll-contain
            pb-5
          "
        >
          {/* CLIENT INFO */}
          <div className="flex items-center gap-2 mb-3">
            <Image
              src={job.giver?.photo || "https://github.com/shadcn.png"}
              alt="Task giver"
              width={24}
              height={24}
              className="rounded-full"
            />
            <p className="text-sm text-gray-500">
              {job.company?.name || "Independent Task Giver"}
            </p>
          </div>

          <h2 className="text-xl font-medium">
            {job.title}
          </h2>

          {/* YOUR TASK BADGE */}
          {isOwnTask && (
            <div className="flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-full w-fit">
              <User size={14} className="text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Your Task</span>
            </div>
          )}

          {/* TASK DESCRIPTION */}
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-1">Task Description</p>
            <p className="text-sm text-gray-800 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
            <div>
              <p className="text-gray-400">Budget</p>
              <p className="font-medium text-lg">
                {job.budget.amount}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Budget Type</p>
              <p className="font-medium">
                {job.budget.type}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Duration</p>
              <p className="font-medium">
                {job.duration}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Experience</p>
              <p className="font-medium">
                {job.experienceLevel}
              </p>
            </div>
          </div>

          {/* SKILLS */}
          <div className="mt-6">
            <p className="font-medium text-gray-800 mb-3">Skills Required</p>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md bg-gray-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ABOUT TASK GIVER */}
          <div className="mt-6">
            <p className="font-medium text-gray-800 mb-3">About the Task Giver</p>
            <p className="text-sm text-gray-600">
              {job.company?.about || "Verified SAYZO task giver"}
            </p>
          </div>
        </div>

        {/* FIXED CTA (INSIDE SHEET) */}
        <div className="px-4 py-3 bg-white">
          {isOwnTask ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
              <p className="text-gray-600 text-sm font-medium">You created this task</p>
            </div>
          ) : hasApplied ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-700 font-medium">Already Applied</span>
              </div>
              <Link
                href="/track-tasks"
                className="inline-flex items-center gap-1 text-sm text-green-600 mt-1 hover:text-green-700 hover:underline transition"
              >
                To check the status, go to Track Tasks
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ) : job.status === 'completed' ? (
            <button
              disabled
              className="w-full bg-gray-200 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed"
            >
              Task Completed
            </button>
          ) : (
            <button
              onClick={handleApplyClick}
              className="w-full bg-primary-btn text-white py-3 rounded-lg font-medium"
            >
              {mode === "showcase" ? "Join Waitlist" : "Apply now"}
            </button>
          )}
        </div>
      </motion.div>

      <TaskDoerAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={{
          id: job.id,
          giverId: job.giverId,
          taskName: job.title,
          amount: job.budget?.amount,
          budgetType: job.budget?.type,
          duration: job.duration,
          experience: job.experienceLevel,
        }}
        onSuccess={() => {
          setIsModalOpen(false);
          onApplicationSuccess?.();
        }}
        currentUser={currentUser}
      />

      <WaitlistModal
        isOpen={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
      />
    </>
  );
};

export default JobBottomSheet;
