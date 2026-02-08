"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import WaitlistModal from "../JoinWaitList/WaitlistModal";

const JobBottomSheet = ({ job, onClose }) => {
  const [showSkills, setShowSkills] = useState(false);
  const [showClient, setShowClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <h2 className="text-xl font-medium">
            {job.title}
          </h2>

          {/* COMPANY */}
          <div className="flex items-center gap-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
              {job.company?.name?.[0]}
            </div>
            <p className="text-sm text-gray-500">
              {job.company?.name}
            </p>
          </div>

          {/* SUMMARY */}
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-1">Summary</p>
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
          <div className="mt-5">
            <button
              onClick={() => setShowSkills(!showSkills)}
              className="w-full flex items-center justify-between font-medium"
            >
              Skills Required
              <ChevronDown
                className={`transition ${showSkills ? "rotate-180" : ""}`}
              />
            </button>

            {showSkills && (
              <div className="flex flex-wrap gap-2 mt-3">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md bg-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* CLIENT */}
          <div className="mt-5">
            <button
              onClick={() => setShowClient(!showClient)}
              className="w-full flex items-center justify-between font-medium"
            >
              About the Client
              <ChevronDown
                className={`transition ${showClient ? "rotate-180" : ""}`}
              />
            </button>

            {showClient && (
              <p className="text-sm text-gray-600 mt-3">
                {job.company?.name} is looking for skilled professionals.
              </p>
            )}
          </div>
        </div>

        {/* FIXED CTA (INSIDE SHEET) */}
        <div className="px-4 py-3 bg-white">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-primary-btn text-white py-3 rounded-lg font-medium"
          >
            Join Waitlist
          </button>
        </div>
      </motion.div>

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default JobBottomSheet;
