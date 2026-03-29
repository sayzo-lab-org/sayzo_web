"use client";

import Image from "next/image";
import ApplicationModal from "../ApplicationModal";
import TaskDoerAuthModal from "../TaskDoerAuthModal";
import WaitlistModal from "../JoinWaitList/WaitlistModal";
import { useState } from "react";
import { X, CheckCircle, User, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";

const JobDetailPanel = ({ job, onClose, currentUser, hasApplied, isOwnTask, onApplicationSuccess, mode = "live" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  const { userProfile } = useAuth();
  const router = useRouter();

  console.log("JobDetailPanel Rendered with job:", job);

  const handleApplyClick = () => {
    if (mode === "showcase") {
      setShowWaitlistModal(true);
      return;
    }
    if (!currentUser) {
      router.push(`/login?redirect=/live-tasks/${job.id}`);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setIsModalOpen(true);
  };

  if (!job) return null;

  const LIMIT = 180;
  const desc = job.description ?? "";
  const isLong = desc.length > LIMIT;
  const displayText = isLong && !descExpanded ? desc.slice(0, LIMIT) + "…" : desc;

  return (
    <div className="bg-white p-8">

      {/* CLOSE */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black transition"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      )}

      {/* TITLE */}
      <h2 className="text-2xl font-semibold text-gray-900 leading-snug pr-8">
        {job.title}
      </h2>

      {/* AVATAR + NAME */}
      <div className="flex items-center gap-2 mt-3">
        <Image
          src={job.giver?.photo || "https://github.com/shadcn.png"}
          alt="Task giver"
          width={26}
          height={26}
          className="rounded-full"
        />
        <span className="text-sm text-gray-500">
          {job.company?.name || "Independent Task Giver"}
        </span>
        {isOwnTask && (
          <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-700">
            <User size={11} />
            Your Task
          </span>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1.5">Summary</p>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{displayText}</p>
        {isLong && (
          <button
            onClick={() => setDescExpanded((v) => !v)}
            className="mt-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            {descExpanded ? "View less" : "View more"}
          </button>
        )}
      </div>

      {/* BUDGET */}
      <div className="mt-7">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Budget</p>
        <p className="text-2xl font-semibold text-gray-900">{job.budget?.amount}</p>
      </div>

      {/* META ROW */}
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Budget Type</p>
          <p className="text-sm font-semibold text-gray-800">{job.budget?.type}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Duration</p>
          <p className="text-sm font-semibold text-gray-800">{job.duration}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Experience</p>
          <p className="text-sm font-semibold text-gray-800">{job.experienceLevel}</p>
        </div>
      </div>

      {/* SKILLS */}
      {job.tags?.length > 0 && (
        <div className="mt-5 border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-500 mb-3">Skills Required</p>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ABOUT CLIENT */}
      <div className="mt-1 border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-500 mb-2">About the Client</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {job.company?.about || "Verified task giver on the platform"}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-7">
        {isOwnTask ? (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
            <User className="w-5 h-5 text-gray-500 mx-auto mb-1.5" />
            <p className="text-gray-600 font-medium text-sm">You created this task</p>
            <p className="text-xs text-gray-400 mt-1">Check your dashboard to view applications</p>
          </div>
        ) : hasApplied ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
            <CheckCircle className="w-5 h-5 text-green-500 mx-auto mb-1.5" />
            <p className="text-green-700 font-medium text-sm">Already Applied</p>
            <Link
              href="/track-tasks"
              className="inline-flex items-center gap-1 text-xs text-green-600 mt-1 hover:underline"
            >
              Track your application <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        ) : job.status === "completed" ? (
          <button disabled className="w-full py-3.5 rounded-full bg-gray-200 text-gray-500 font-medium cursor-not-allowed text-sm">
            Task Completed
          </button>
        ) : (
          <button
            onClick={handleApplyClick}
            className="w-full py-3.5 rounded-full bg-primary-btn hover:bg-emerald-600 active:scale-[0.98] text-white font-medium text-sm transition-all"
          >
            {mode === "showcase" ? "Join Waitlist" : "Click here to Apply"}
          </button>
        )}
      </div>

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
    </div>
  );
};

export default JobDetailPanel;
