"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

const steps = [
  "Add your Bio",
  "Add your Core Skills ✦",
  "Add your Sub Skills ✦",
  "Add your Experience",
  "Add your Education",
  "Add your Languages",
];

const CreateProfile = ({ onNext, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto px-6 py-10 space-y-8"
    >
      {/* Back */}
      <button
        onClick={onBack}
        className="w-11 h-11 rounded-full bg-[#F8F9FB] flex items-center justify-center hover:bg-zinc-100 transition-all active:scale-90"
      >
        <ArrowLeft size={18} className="text-zinc-600" />
      </button>

      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900">
          Create Your <span className="text-emerald-700 font-bold">Profile.</span>
        </h1>
        <p className="text-zinc-500 text-sm md:text-base font-normal">
          Follow these steps to unlock your local earning potential.
        </p>
      </div>

      {/* Steps Timeline */}
      <div className="space-y-3 relative pl-8 py-2">
        <div className="absolute left-[7px] top-4 bottom-4 w-[1px] bg-zinc-100" />
        {steps.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
            className="flex items-center gap-4 relative py-1"
          >
            <div className="w-[15px] h-[15px] rounded-full bg-white border border-zinc-200 absolute -left-[32px] z-10 flex items-center justify-center">
              <div className="w-[5px] h-[5px] rounded-full bg-zinc-300" />
            </div>
            <div className="bg-[#F8F9FB] px-5 py-4 rounded-[20px] w-full text-sm font-medium text-zinc-600 border border-transparent hover:border-emerald-500/20 transition-all cursor-default">
              {item}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pro Tip */}
      <div className="flex items-start gap-3 p-5 bg-emerald-50/50 rounded-3xl border border-emerald-100/50">
        <div className="p-2 bg-emerald-100 rounded-full shrink-0">
          <Sparkles size={16} className="text-emerald-700" />
        </div>
        <p className="text-xs md:text-sm text-emerald-800 leading-relaxed font-normal">
          <span className="font-bold">Pro Tip:</span> Complete your profile fully to appear in local
          searches and unlock task acceptance.
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={() => onNext({})}
        className="w-full py-5 rounded-[22px] bg-black text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-zinc-900 transition-all active:scale-[0.97] shadow-lg shadow-black/5"
      >
        Start Building Profile
        <ArrowRight size={20} />
      </button>
    </motion.div>
  );
};

export default CreateProfile;
