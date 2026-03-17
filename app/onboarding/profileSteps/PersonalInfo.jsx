"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, User, Phone } from "lucide-react";
import { useOnboardingStorage } from "@/hooks/useOnboardingStorage";

const PersonalInfo = ({ onNext, onBack, initialData }) => {
  const [name, setName] = useOnboardingStorage("name", initialData?.name || "");
  const [phone, setPhone] = useOnboardingStorage("phone", initialData?.phone || "");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone.replace(/\s/g, "")))
      newErrors.phone = "Enter a valid 10-digit number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext({ name: name.trim(), phone: phone.trim() });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto px-6 py-10 space-y-8"
    >
      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 leading-tight">
          Welcome to <span className="text-emerald-700">Sayzo.</span>
        </h1>
        <p className="text-zinc-500 font-normal text-sm md:text-base">
          Let&apos;s start with your basic details.
        </p>
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              placeholder="e.g. Mayank Saini"
              className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#F8F9FB] border-2 outline-none transition-all text-sm font-medium text-zinc-800 placeholder:text-zinc-300 ${
                errors.name
                  ? "border-red-400 focus:border-red-400"
                  : "border-transparent focus:border-emerald-500/40"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500 ml-1 font-medium">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">
            Phone Number
          </label>
          <div className="flex gap-2">
            <span className="px-4 py-3.5 bg-[#F8F9FB] border-2 border-transparent rounded-2xl text-zinc-500 text-sm font-bold shrink-0">
              +91
            </span>
            <div className="relative flex-1">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                }}
                placeholder="9876543210"
                className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#F8F9FB] border-2 outline-none transition-all text-sm font-medium text-zinc-800 placeholder:text-zinc-300 ${
                  errors.phone
                    ? "border-red-400 focus:border-red-400"
                    : "border-transparent focus:border-emerald-500/40"
                }`}
              />
            </div>
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500 ml-1 font-medium">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Next */}
      <button
        onClick={handleNext}
        disabled={!name.trim() || !phone.trim()}
        className="w-full py-5 bg-black text-white rounded-[22px] font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.97] disabled:opacity-30 shadow-lg shadow-black/5"
      >
        Next Step
        <ArrowRight size={20} />
      </button>
    </motion.div>
  );
};

export default PersonalInfo;
