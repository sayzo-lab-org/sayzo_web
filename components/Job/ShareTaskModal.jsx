"use client";

import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaTelegram, FaXTwitter } from "react-icons/fa6";

export default function ShareTaskModal({ job, onClose }) {
  const [copied, setCopied] = useState(false);

  const canNativeShare = typeof navigator !== "undefined" && navigator.share;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/live-tasks?task=${job?.id || "default"}`
      : "";

  // Shared message template
  const shareMessage = `${job?.title || "Task"}
Budget: ${job?.budget?.amount || ""}

${shareUrl}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: job?.title,
        text: `${job?.title}\nBudget: ${job?.budget?.amount}`,
        url: shareUrl,
      });
    } catch (err) {
      console.log("Share cancelled");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Share Task</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">

          {/* Link */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <input
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 text-sm outline-none"
            />

            <button
              onClick={copyLink}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
                copied ? "bg-green-600 text-white" : "bg-black text-white"
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          {/* Native Share */}
          {canNativeShare && (
            <button
              onClick={nativeShare}
              className="w-full py-3 rounded-lg bg-black text-white text-sm"
            >
              Share
            </button>
          )}

          {/* Social Buttons */}
          <div className="grid grid-cols-3 gap-4 text-center">

            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
              target="_blank"
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
            >
              <FaWhatsapp size={22} className="text-green-500" />
              <span className="text-xs font-medium">WhatsApp</span>
            </a>

            {/* Twitter / X */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                shareMessage
              )}`}
              target="_blank"
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
            >
              <FaXTwitter size={20} />
              <span className="text-xs font-medium">Twitter</span>
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(
                shareUrl
              )}&text=${encodeURIComponent(
                `${job?.title}\nBudget: ${job?.budget?.amount}`
              )}`}
              target="_blank"
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
            >
              <FaTelegram size={22} className="text-sky-500" />
              <span className="text-xs font-medium">Telegram</span>
            </a>

          </div>
        </div>
      </motion.div>
    </div>
  );
}