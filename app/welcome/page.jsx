"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/app/Context/AuthContext";
import communityCircle from "../../public/assets/communityCircle.png"; 

export default function WelcomeScreen() {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
      if (user) {
        router.replace("/notifications");
      }
    }, [user, router]);

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#F3F4F6] overflow-hidden">
      {/* Skip Button - Smaller & more subtle */}
      <button
        onClick={() => router.replace("/")}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-50 text-sm md:text-base font-medium text-gray-500 hover:text-black transition-colors uppercase tracking-wider"
      >
        Skip
      </button>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center h-full w-full max-w-6xl px-5 md:px-12">
        
        {/* Left/Top Visual: Community Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-[0.8] lg:flex-1 flex justify-center items-center w-full"
        >
          <div className="relative w-full max-w-[260px] md:max-w-[400px]">
             <Image
              src={communityCircle}
              alt="Community"
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Right/Bottom Content: The "Pill" Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white rounded-[40px] lg:rounded-[60px] shadow-[0_10px_40px_rgba(0,0,0,0.02)] w-full lg:max-w-[480px] p-8 md:p-12 lg:p-16 flex flex-col z-10 relative mb-6 lg:mb-0"
        >
          {/* Headline - Decreased size */}
          <h1 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold text-gray-900 lg:whitespace-nowrap mb-3 text-center lg:text-left tracking-tight">
            Welcome to SAYZO
          </h1>

          {/* Relatable Content - Decreased size */}
          <p className="text-[#9CA3AF] text-[15px] md:text-[17px] leading-relaxed mb-8 lg:mb-10 text-center lg:text-left">
            Connect with trusted people nearby to get your<br className="hidden lg:block" />
            tasks done instantly, safely, and efficiently.
          </p>

          <div className="flex flex-col gap-3 md:gap-4">
            <button 
              onClick={() => router.replace("/login")}
              className="w-full bg-black text-white py-3.5 md:py-5 rounded-[18px] md:rounded-[24px] text-base md:text-lg font-semibold transition-transform active:scale-[0.97]"
            >
              Log In
            </button>

            <button
              onClick={() => router.replace("/signup")}
              className="w-full bg-[#F8F9FB] text-gray-900 py-3.5 md:py-5 rounded-[18px] md:rounded-[24px] text-base md:text-lg font-semibold transition-transform active:scale-[0.97]"
            >
              Sign Up
            </button>

            <button 
              onClick={() => router.replace("/notifications")}
              className="mt-3 lg:mt-5 text-center text-[#9CA3AF] text-sm md:text-base font-medium hover:text-gray-600 transition-colors"
            >
              Continue as a guest
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}