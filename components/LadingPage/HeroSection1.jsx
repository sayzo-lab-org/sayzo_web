"use client";

import { Clock, Search } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const HomeMap = dynamic(() => import("../HomeMap"), {
  ssr: false,
});

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemDown = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const HeroSection1 = () => {
  return (
    <section className="relative mt-50 lg:mt-20 md:mt-20 md:pt-32 md:pb-32 bg-white overflow-hidden">
      <div className=" max-w-7xl mx-auto px-3 lg:px-1 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          {/* Badge with pulse effect */}
          <motion.div
            variants={itemDown}
            className="inline-flex items-center gap-2 bg-[#f0f9f4] text-primary-btn px-4 py-2 rounded-full border border-[#e2f3ea] mb-6 hover:bg-[#e2f3ea] transition-colors cursor-default"
          >
            <Clock className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-semibold text-emerald-700">
              Get matched in 10mins
            </span>
          </motion.div>

          {/* Headline */}
          <div className="font-semibold tracking-tight leading-tight mb-12">
            <motion.span
              variants={itemDown}
              className="block text-black text-6xl md:text-6xl lg:text-8xl"
            >
              Post a task.
            </motion.span>
            <motion.span
              variants={itemDown}
              className=" text-primary-btn text-5xl md:text-6xl lg:text-8xl"
            >
              Get it done.
            </motion.span>
          </div>
        <motion.div 
  variants={itemUp} 
  /* max-w-5xl: keeps the rectangle from getting too wide on large screens.
     mx-auto: centers it.
     shadow-sm: provides a subtle, professional depth.
     border: adds the industrial framing.
  */
  className="w-full max-w-5xl mx-auto border border-gray-200 rounded-xl shadow-sm overflow-hidden"
>
  <HomeMap />
</motion.div>
          
          {/* CTAs - Reduced margin-top from mt-12 to mt-8 to keep it compact */}
          <motion.div
            variants={itemUp}
            className="flex flex-row sm:flex-row justify-center items-center gap-6 mt-8 mb-4 w-full"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black text-white rounded-full px-7 py-2.5 md:text-lg shadow-lg"
            >
              Find Help
            </motion.button>
            <Link href="/live-tasks">
              <motion.button 
                whileHover={{ x: 5 }}
                className="group flex items-center gap-1 cursor-pointer text-black text-base md:text-lg font-medium hover:text-emerald-600 transition-all"
              >
                Browse Tasks
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative blobs */}
      <motion.div className="absolute top-1/4 -left-24 w-72 h-72 bg-[#2eb67d]/10 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default HeroSection1;