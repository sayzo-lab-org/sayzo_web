"use client";

import { useState } from "react";
import { ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useOnboardingStorage } from "@/hooks/useOnboardingStorage";

const MAX_CHAR = 500;

const AddBio = ({ onNext, onBack, initialData }) => {
  const [bio, setBio] = useOnboardingStorage("bio", initialData?.bio || "");

  const remaining = MAX_CHAR - bio.length;
  const isNearLimit = remaining < 50;

  const handleNext = () => {
    onNext({ bio });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-6 py-10 space-y-8"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full bg-[#F8F9FB] flex items-center justify-center hover:bg-zinc-100 transition-all active:scale-90"
        >
          <ArrowLeft size={18} className="text-zinc-600" />
        </button>
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 leading-tight">
          Add your <span className="text-emerald-700 font-bold">Bio.</span>
        </h1>
        <p className="text-zinc-500 font-normal text-sm md:text-base leading-relaxed">
          A professional bio is your digital first impression. It increases your trust score and
          hiring chances.
        </p>
      </div>

      {/* Textarea */}
      <div className="relative group">
        <textarea
          value={bio}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHAR) setBio(e.target.value);
          }}
          placeholder="e.g. I am a detail-oriented professional with 3 years of experience in local delivery and home assembly..."
          className="w-full h-56 p-6 bg-[#F8F9FB] rounded-[32px] border-2 border-transparent focus:border-emerald-500/30 outline-none resize-none transition-all text-zinc-700 placeholder:text-zinc-300 font-normal text-base md:text-lg leading-relaxed"
        />
        <div
          className={`absolute bottom-6 right-8 text-[10px] font-bold uppercase tracking-widest transition-colors ${
            isNearLimit ? "text-orange-500" : "text-zinc-300"
          }`}
        >
          {remaining} chars left
        </div>
      </div>

      {/* Pro Tip */}
      <div className="flex items-start gap-3 p-5 bg-emerald-50/50 rounded-3xl border border-emerald-100/50">
        <div className="p-2 bg-emerald-100 rounded-full shrink-0">
          <Sparkles size={16} className="text-emerald-700" />
        </div>
        <p className="text-xs md:text-sm text-emerald-800 leading-relaxed font-normal">
          <span className="font-bold uppercase tracking-tighter mr-1">Pro Tip:</span>
          Be specific about your reliability and skills. Mentioning past local work helps build
          immediate rapport.
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-end pt-4 border-t border-zinc-50">
        <button
          onClick={handleNext}
          disabled={!bio.trim()}
          className="px-8 py-4 bg-black text-white rounded-[20px] font-bold text-base md:text-lg flex items-center gap-3 transition-all active:scale-[0.97] disabled:opacity-30 shadow-lg shadow-black/5"
        >
          Next Step
          <ArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default AddBio;