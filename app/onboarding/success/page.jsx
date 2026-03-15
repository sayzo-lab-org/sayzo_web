"use client";

import { Check, Sparkles, LayoutDashboard, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function OnboardingSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full"
      >
        {/* The Success Bento Box */}
        <div className="bg-[#F8F9FB] rounded-[40px] p-10 md:p-16 text-center border border-zinc-100 shadow-sm relative overflow-hidden">
          
          {/* Subtle Industrial Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-emerald-500 rounded-b-full" />

          {/* Icon Architecture */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/20"
          >
            <Check size={40} className="text-white" strokeWidth={3} />
          </motion.div>

          {/* Typography Hierarchy */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-emerald-600" />
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-700">Verification Complete</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tighter leading-tight">
              Profile <span className="text-emerald-700">Created.</span>
            </h1>

            <p className="text-zinc-500 font-medium text-base md:text-lg max-w-sm mx-auto leading-relaxed">
              Your infrastructure is ready. You are now live on the Sayzo hyperlocal marketplace.
            </p>
          </div>

          {/* Industrial Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/")}
            className="w-full py-5 bg-black text-white rounded-[24px] font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl shadow-black/20 group"
          >
            Go to Home
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* System Meta Info */}
        <div className="mt-8 flex items-center justify-center gap-6 opacity-40">
           <div className="flex items-center gap-2">
              <LayoutDashboard size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">System Live</span>
           </div>
           <div className="h-4 w-[1px] bg-zinc-300" />
           <p className="text-[10px] font-bold uppercase tracking-widest">Version 1.0.4</p>
        </div>
      </motion.div>
    </div>
  );
}