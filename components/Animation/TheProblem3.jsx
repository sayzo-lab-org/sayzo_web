"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProblemCard } from "./ProblemCard";

const problems = [
  { number: "01", title: "People Have Skills But Unable To Monetise It" },
  { number: "02", title: "Finding The Right Person Takes Too Much Time" },
  { number: "03", title: "Poorly Structured Work Causes Payment Delays" },
  { number: "04", title: "Freelancers Are Unreliable, Prices Vary" },
  { number: "05", title: "Urgent Help Requires Endless Calls" },
];

const TheProblem3 = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 🔹 HEADER ANIMATION (HIDE ON SCROLL)
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.18],
    [1, 0]
  );

  const headerY = useTransform(
    scrollYProgress,
    [0, 0.18],
    [0, -120]
  );

  return (
    <section ref={containerRef} className="relative bg-black">
      {/* ================= HEADER SECTION ================= */}
      <motion.div
        style={{ opacity: headerOpacity, y: headerY }}
        className="h-screen sticky top-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="max-w-6xl px-6 text-center">
          <h2 className="text-white text-6xl md:text-8xl font-medium mb-6">
            The Problem
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
            People need help and others have skills — but the system connecting
            them is broken. Finding the right person is slow, payments get
            delayed, and trust keeps breaking.
          </p>
        </div>
      </motion.div>

      {/* ================= STACKED PROBLEM CARDS ================= */}
      <div className="relative z-50">
        {problems.map((problem, index) => {
          const start = index * 0.15;
          const end = start + 0.3;

          const scale = useTransform(
            scrollYProgress,
            [start, end],
            [1, 0.92]
          );

          const y = useTransform(
            scrollYProgress,
            [start, end],
            [0, -80]
          );

          return (
            <motion.div
              key={problem.number}
              style={{ scale, y }}
              className="sticky top-[30vh] h-[70vh] flex items-center justify-center"
            >
              <div className="w-full max-w-5xl px-6">
                <ProblemCard
                  number={problem.number}
                  title={problem.title}
                  isFeatured={index === 4}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= SCROLL SPACE ================= */}
      <div className="h-[5vh]" />
    </section>
  );
};

export default TheProblem3;
