"use client";

import { useState } from "react";
import { ArrowLeft, Plus, X, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboardingStorage } from "@/hooks/useOnboardingStorage";

const suggestedSkills = [
  "Brand Design",
  "UI Design",
  "UX Research",
  "Logo Design",
  "Web Design",
  "Product Design",
  "Illustration",
  "Motion Design",
  "Graphic Design",
];

const AddCoreSkills = ({ onNext, onBack, initialData }) => {
  const [skills, setSkills] = useOnboardingStorage(
    "coreSkills",
    initialData?.coreSkills || []
  );
  const [input, setInput] = useState("");

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (!trimmed || skills.includes(trimmed) || skills.length >= 3) return;
    setSkills([...skills, trimmed]);
  };

  const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill));

  const addCustomSkill = (e) => {
    if (e.key === "Enter") {
      addSkill(input);
      setInput("");
    }
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
          Add your <span className="text-emerald-700 font-bold">Core Skills.</span>
        </h1>
        <p className="text-zinc-500 font-normal text-sm md:text-base leading-relaxed">
          Select up to 3 primary skills. This helps the Sayzo engine match you with high-precision
          tasks.
        </p>
      </div>

      {/* Skills Input */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">
          Your Selected Skills ({skills.length}/3)
        </label>
        <div className="min-h-[64px] bg-[#F8F9FB] rounded-[24px] p-3 flex flex-wrap gap-2 transition-all border-2 border-transparent focus-within:border-emerald-500/20">
          <AnimatePresence>
            {skills.map((skill) => (
              <motion.div
                key={skill}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-emerald-600 text-white pl-4 pr-2 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="p-1 hover:bg-emerald-500 rounded-full transition-colors"
                >
                  <X size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={addCustomSkill}
            placeholder={skills.length < 3 ? "Type a skill and press Enter…" : "Limit reached"}
            disabled={skills.length >= 3}
            className="bg-transparent outline-none flex-1 min-w-[150px] text-sm py-2 px-2 text-zinc-700 placeholder:text-zinc-300 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Suggested Chips */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 ml-1">
          <Sparkles size={14} className="text-emerald-600" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Suggested for you
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills.map((skill) => {
            const isSelected = skills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                disabled={isSelected || skills.length >= 3}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all flex items-center gap-2 border ${
                  isSelected
                    ? "bg-zinc-100 border-transparent text-zinc-400 cursor-not-allowed"
                    : "bg-white border-zinc-200 text-zinc-600 hover:border-emerald-500 hover:text-emerald-600 active:scale-95"
                }`}
              >
                {!isSelected && <Plus size={14} />}
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end pt-6 border-t border-zinc-50">
        <button
          onClick={() => onNext({ coreSkills: skills })}
          disabled={skills.length === 0}
          className="px-8 py-4 bg-black text-white rounded-[20px] font-bold text-base md:text-lg flex items-center gap-3 transition-all active:scale-[0.97] disabled:opacity-20 shadow-lg shadow-black/5"
        >
          Next Step
          <ArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default AddCoreSkills;