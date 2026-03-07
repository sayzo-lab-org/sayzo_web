"use client";


import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";


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
  const words = ["matched", "talent", "skill"];
  const [index, setIndex] = useState(0);

  const router = useRouter();
  const { user } = useAuth();


  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1500); // 1 second

    return () => clearInterval(interval);
  }, []);
  return (
 <section className="relative py-16 md:py-24 mt-20 lg:mt-22  bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 relative z-10 ">
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center text-center gap-10 md:gap-14 md:gap-12"
    >

      {/* Badge */}
      <motion.div
        variants={itemDown}
        className="inline-flex items-center gap-3 bg-white rounded-full  py-2 px-5 shadow-sm hover:shadow-md transition-all cursor-default"
      >
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>

        <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
          <span>Get</span>
          <div className="relative h-5 overflow-hidden flex items-center min-w-[55px] justify-center">
            <motion.span className="absolute font-serif italic text-emerald-600">
              {words[0]}
            </motion.span>
          </div>
          <span className="font-semibold text-gray-800">in 10 mins</span>
        </div>
      </motion.div>

      {/* Headline */}
      <div className="flex flex-col md:flex-row items-center justify-center text-center  sm:gap-x-4 md:gap-x-4 md:px-4 font-semibold tracking-tight leading-tight gap-2">
  <motion.span 
    variants={itemDown} 
    className="text-black text-4xl md:text-5xl lg:text-8xl whitespace-nowrap"
  >
    Post a task.
  </motion.span>
  
  <motion.span 
    variants={itemDown} 
    className="text-primary-btn text-4xl md:text-5xl lg:text-8xl whitespace-nowrap"
  >
    Get it done.
  </motion.span>
</div>

      {/* Map */}
      <motion.div
        variants={itemUp}
        className="w-full max-w-5xl mx-auto rounded-xl shadow-sm "
      >
        <HomeMap />
      </motion.div>

      {/* CTA */}
      <motion.div
        variants={itemUp}
        className="flex flex-row justify-center items-center gap-6 -mt-2  w-full"
      >
        <Button
          size="sayzobtn"
          className="md:text-lg hover:scale-105 shadow-lg "
          onClick={() => {
            if (!user) {
              router.push('/login')
              return;
            } else {
              router.push('/post-task')
            }
          }}
        >
          Find Help
        </Button>

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

  <motion.div className="absolute top-1/4 -left-24 w-72 h-72 bg-[#2eb67d]/10 rounded-full blur-3xl -z-10" />
</section>
  );
};

export default HeroSection1;