"use client";

import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onFinish }) {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);  
    const t2 = setTimeout(() => setStep(2), 1600); 
    const t3 = setTimeout(() => {
      setIsVisible(false);
      // Wait for exit animation to finish before calling onFinish
      setTimeout(onFinish, 600); 
    }, 2400); 

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  const config = [
    { bg: "#FFFFFF", text: "#000000" }, 
    { bg: "#000000", text: "#10B981" }, 
    { bg: "#FFFFFF", text: "#000000" }, 
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "circOut" }}
          style={{ backgroundColor: config[step].bg }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden touch-none"
        >
          <div className="flex flex-col items-center">
            <motion.h1
              animate={{ color: config[step].text }}
              transition={{ duration: 0.3 }}
              className="text-4xl md:text-6xl font-black font-semibold"
            >
              SAYZO
            </motion.h1>

            <div className="mt-12 w-32 md:w-48 h-[1.5px] bg-zinc-100 overflow-hidden relative">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2.4, ease: "linear" }}
                className="absolute inset-0 h-full w-full bg-[#10B981]" 
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}