"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SplashScreen({ onFinish }) {
  // Steps: 0 = Black (Tight), 1 = Green (Expanded), 2 = Black (Normal)
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);  
    const t2 = setTimeout(() => setStep(2), 1600); 
    const t3 = setTimeout(() => onFinish(), 2600); 

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  const config = [
    { color: "#000000", spacing: "0.1em", scale: 1 },
    { color: "#10b981", spacing: "0.25em", scale: 1.02 }, // "The Breathe"
    { color: "#000000", spacing: "0.1em", scale: 1 },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden"
    >
      {/* 1. SAYZO Logo: Color & Spacing Morph */}
      <motion.h1
        animate={{ 
          color: config[step].color,
          letterSpacing: config[step].spacing,
          scale: config[step].scale
        }}
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1] // Premium Cubic Bezier
        }}
        className="text-4xl md:text-6xl font-black uppercase"
      >
        SAYZO
      </motion.h1>

      {/* 2. Continuous Progress Bar */}
      <div className="w-48 h-[1px] bg-gray-100 mt-14 overflow-hidden relative">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ 
            duration: 2.6, 
            ease: "linear" 
          }}
          className="h-full w-full bg-black" 
        />
      </div>

      {/* Grain Overlay for Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </motion.div>
  );
}