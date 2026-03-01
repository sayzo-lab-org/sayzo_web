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
    <section className="relative lg:mt-30 md:mt-20 mt-70 md:pt-32 md:pb-32 pb-30 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
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
          <div className="font-semibold tracking-tight leading-tight mb-6">
            <motion.span
              variants={itemDown}
              className="block text-black text-5xl  md:text-6xl lg:text-8xl"
            >
              Post a task.
            </motion.span>
            <motion.span
              variants={itemDown}
              className="block text-primary-btn text-5xl  md:text-6xl lg:text-8xl"
            >
              Get it done.
            </motion.span>
          </div>

<HomeMap />
          {/* CTAs with Magnetic Hover */}
          <motion.div
            variants={itemUp}
            className="flex justify-center items-center gap-4 sm:gap-6 mt-6 mb-8 w-80 sm:w-auto"
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="sm:w-auto bg-black text-white px-10 py-3 rounded-full text-sm sm:text-base md:text-lg font-medium transition-all"
            >
              Find Help
            </motion.button>
            <Link href="/live-tasks">
              <motion.button 
                whileHover={{ x: 5 }}
                className="group flex items-center gap-1 sm:w-auto cursor-pointer text-black text-sm sm:text-base md:text-lg font-medium hover:text-emerald-600 transition-all"
              >
                Browse Tasks
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Enhanced Search Bar */}
          {/* <motion.div
            variants={itemUp}
            className="w-full max-w-xl md:max-w-3xl group"
          >
            <div className="flex items-center bg-[#f4f7f9] rounded-full border border-gray-200 px-2 sm:py-2 py-1.5 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-50 focus-within:border-emerald-200 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <input
                type="text"
                placeholder="Search by roles, skills, keywords..."
                className="flex-1 bg-transparent pl-1 md:px-6 text-sm md:text-lg font-medium text-gray-700 placeholder-gray-400 outline-none"
              />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="h-10 md:h-12 px-4 md:px-6 bg-black text-white rounded-full flex items-center gap-2 font-semibold text-sm md:text-base hover:bg-neutral-800 transition-all shadow-lg shadow-black/10"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5 text-emerald-700" />
                <span>Search</span>
              </motion.button>
            </div>
          </motion.div> */}

        </motion.div>
      </div>

      {/* Animated Decorative blobs */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 -left-24 w-72 md:w-96 h-72 md:h-96 bg-[#2eb67d]/10 rounded-full blur-3xl -z-10" 
      />
      <motion.div 
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.05, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-0 -right-24 w-72 md:w-96 h-72 md:h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" 
      />
    </section>
  );
};

export default HeroSection1;