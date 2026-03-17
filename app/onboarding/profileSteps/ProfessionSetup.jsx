"use client";

import { useState } from "react";
import { ChevronDown, ArrowLeft, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboardingStorage } from "@/hooks/useOnboardingStorage";

const professions = [
  "Student",
  "Salaried Professional",
  "Homemaker",
  "Independent Professional",
  "Startup Founder / Operator",
  "Others",
];

const ProfessionSetup = ({ onNext, onBack, initialData }) => {
  const [profession, setProfession] = useOnboardingStorage(
    "profession",
    initialData?.profession || ""
  );
  const [hours, setHours] = useOnboardingStorage(
    "hours",
    initialData?.hours || 24
  );
  const [open, setOpen] = useState(false);

  // Read name from storage for personalised greeting
  const savedName =
    typeof window !== "undefined"
      ? (() => {
          try {
            return JSON.parse(localStorage.getItem("sayzo_onboarding") || "{}").name;
          } catch {
            return null;
          }
        })()
      : null;
  const firstName = (initialData?.name || savedName || "there").split(" ")[0];

  const handleSubmit = () => {
    if (!profession) return;
    onNext({ profession, hours });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto px-6 py-10 space-y-10"
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
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 leading-tight">
          Hey <span className="text-emerald-700">{firstName}</span>. Ready for your{" "}
          <br />
          <span className="font-bold">next big opportunity?</span>
        </h1>
        <p className="text-zinc-500 font-normal text-sm md:text-base">
          Answer a few questions and start building your profile.
        </p>
      </div>

      {/* Profession Select */}
      <div className="space-y-3 relative">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">
          Choose your profession
        </label>
        <div
          onClick={() => setOpen(!open)}
          className={`w-full bg-[#F8F9FB] rounded-2xl px-6 py-4 flex justify-between items-center cursor-pointer transition-all border-2 ${
            open ? "border-emerald-600" : "border-transparent"
          }`}
        >
          <span className={`text-base font-normal ${profession ? "text-black" : "text-zinc-400"}`}>
            {profession || "Click here to select"}
          </span>
          <ChevronDown
            className={`text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
            size={20}
          />
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute z-50 w-full bg-white rounded-2xl mt-2 p-2 shadow-xl border border-zinc-100 overflow-hidden"
            >
              {professions.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setProfession(item);
                    setOpen(false);
                  }}
                  className="px-5 py-3.5 hover:bg-[#F8F9FB] rounded-xl cursor-pointer flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full transition-colors ${
                        profession === item ? "bg-emerald-600" : "bg-transparent border border-zinc-300"
                      }`}
                    />
                    <span
                      className={`text-sm font-normal ${
                        profession === item ? "text-black" : "text-zinc-500"
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                  {profession === item && <Check size={14} className="text-emerald-600" />}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hours Slider */}
      <div className="space-y-6 pt-2">
        <div className="flex justify-between items-end">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">
            Weekly commitment
          </label>
          <span className="text-md font-bold text-emerald-600 tracking-tighter">
            {hours} hr/week
          </span>
        </div>

        <div className="relative pt-1">
          <input
            type="range"
            min="4"
            max="40"
            step="1"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[9px] text-zinc-300 font-bold uppercase tracking-widest mt-3 px-1">
            <span>4 hr/week</span>
            <span>40 hr/week</span>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={!profession}
        className="w-full py-5 bg-black text-white text-lg rounded-[22px] font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.97] disabled:opacity-30 shadow-lg shadow-black/5"
      >
        Get Started
        <ArrowRight size={20} />
      </button>
    </motion.div>
  );
};

export default ProfessionSetup;
