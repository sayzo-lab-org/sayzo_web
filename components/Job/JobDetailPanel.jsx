"use client";

import Image from "next/image";
import WaitlistModal from "../JoinWaitList/WaitlistModal";
import { useState } from "react";
import { X } from "lucide-react";

const JobDetailPanel = ({ job, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!job) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a job to see details
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-xl shadow-2xl p-8 sticky top-6">
      
      {/* CLOSE BUTTON */}
      {onClose && (
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            p-2
            flex items-center justify-center
            rounded-full
            bg-gray-100 hover:bg-gray-200
            text-gray-600 hover:text-black
            transition
          "
          aria-label="Close panel"
        >
          <X size={18} />
        </button>
      )}

      {/* TITLE */}
      <h2 className="text-2xl font-medium leading-snug">
        {job.title}
      </h2>

      {/* COMPANY */}
      <div className="flex items-center gap-2 mt-3">
        <Image
          src="https://github.com/shadcn.png"
          alt="Company logo"
          width={28}
          height={28}
          className="rounded-full"
        />
        <p className="text-sm text-gray-700">
          {job.company?.name || "Independent Task Giver"}
        </p>
      </div>

      {/* TASK DESCRIPTION */}
      <div className="mt-7">
        <p className="text-lg text-gray-400 mb-1">
          Task Description
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          {job.description}
        </p>
      </div>

      {/* BUDGET */}
      <div className="mt-6">
        <p className="text-lg text-gray-400">Budget</p>
        <p className="text-2xl font-semibold text-gray-700">
          {job.budget?.amount}
        </p>
      </div>

      {/* INFO GRID */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-10 mt-6 text-sm">
        <div>
          <p className="text-gray-400">Budget Type</p>
          <p className="font-semibold text-gray-700">
            {job.budget?.type}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Category</p>
          <p className="font-semibold text-gray-700">
            {job.category}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Duration</p>
          <p className="font-semibold text-gray-700">
            {job.duration}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Experience</p>
          <p className="font-semibold text-gray-700">
            {job.experienceLevel}
          </p>
        </div>
      </div>

      {/* SKILLS */}
      {job.tags?.length > 0 && (
        <div className="mt-7">
          <p className="text-lg font-medium text-gray-500 mb-2">
            Skills Required
          </p>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-md bg-gray-100 text-gray-700 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ABOUT TASK GIVER */}
      <div className="mt-7">
        <p className="text-lg text-gray-400 mb-1">
          About the Task Giver
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          {job.company?.about || "Verified SAYZO task giver"}
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-8 w-full bg-primary-btn text-white py-3 rounded-lg font-medium flex items-center justify-center gap-3 hover:opacity-95 transition"
      >
        Join Waitlist
       
      </button>

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default JobDetailPanel;
