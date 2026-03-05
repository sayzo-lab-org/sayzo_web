"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import communityCircle from "../../public/assets/communityCircle.png"; 

export default function WelcomeScreen({ onSkip }) {
    const router = useRouter()
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#F3F4F6] overflow-hidden">
      {/* Skip Button - Adjusted for mobile visibility */}
      <button
        onClick={router.push("/")}
        className="absolute top-8 right-8 md:top-12 md:right-12 z-50 text-[16px] md:text-[19px] font-medium text-gray-800 hover:opacity-60 transition-opacity"
      >
        Skip
      </button>

      {/* Main Container: Stacks on mobile (col), Side-by-side on desktop (row) */}
      <div className="flex flex-col lg:flex-row items-center justify-center h-full w-full max-w-7xl px-4 md:px-12">
        
        {/* Left/Top Visual: Community Circle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-1 flex justify-center items-center h-[40%] lg:h-auto w-full"
        >
          <div className="relative w-full max-w-[300px] md:max-w-[460px]">
             <Image
              src={communityCircle}
              alt="Community"
              priority
              className="w-full h-auto object-contain transform scale-110 lg:scale-100"
            />
          </div>
        </motion.div>

        {/* Right/Bottom Content: The "Pill" Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white rounded-t-[50px] lg:rounded-[70px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] w-full lg:max-w-[560px] p-8 md:p-16 lg:p-20 flex flex-col z-10 lg:relative"
        >
          {/* Headline - Responsive sizing to prevent breaking */}
          <h1 className="text-[32px] md:text-[40px] lg:text-[44px] font-bold text-gray-900 lg:whitespace-nowrap mb-4 text-center lg:text-left">
            Welcome to SAYZO
          </h1>

          {/* Relatable Content */}
          <p className="text-[#9CA3AF] text-[16px] md:text-[18px] lg:text-[19px] leading-relaxed mb-8 lg:mb-14 text-center lg:text-left">
            Connect with trusted people nearby to get your<br className="hidden lg:block" />
            tasks done instantly, safely, and efficiently.
          </p>

          <div className="flex flex-col gap-3 md:gap-5">
            <button 
            onClick={router.push("/login")}
            className="w-full bg-black text-white py-4 md:py-6 rounded-[20px] md:rounded-[28px] text-[18px] md:text-[20px] font-semibold transition-transform active:scale-[0.98]">
              Log In
            </button>

            <button
            onClick={router.push("/signup")}
            className="w-full bg-[#F8F9FB] text-gray-900 py-4 md:py-6 rounded-[20px] md:rounded-[28px] text-[18px] md:text-[20px] font-semibold transition-transform active:scale-[0.98]">
              Sign Up
            </button>

            <button 
               onClick={router.push("/")}
              className="mt-4 lg:mt-6 text-center text-[#9CA3AF] text-[16px] md:text-[18px] font-medium hover:text-gray-600"
            >
              Continue as a guest
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}