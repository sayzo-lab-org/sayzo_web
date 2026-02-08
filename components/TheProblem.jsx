
'use client'

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const problems = [
  {
    number: '01',
    title: 'People Have Skills But Unable To Monetise It',
  },
  {
    number: '02',
    title: 'Finding The Right Person Takes Too Much Time',
  },
  {
    number: '03',
    title: 'Poorly Structured Work Causes Payment Delays',
  },
  {
    number: '04',
    title: 'Freelancers Are Unreliable, Prices And Quality Vary',
  },
  {
    number: '05',
    title: 'Urgent Help Requires Endless Calls And Chasing',
  },
];

const TheProblem = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Phase 1: Arrow Travels (0-35% scroll)
  const arrowWidth = useTransform(smoothProgress, [0, 0.35], ["0%", "100%"]);
  const arrowHeight = useTransform(smoothProgress, [0, 0.35], ["0%", "100%"]);
  const arrowOpacity = useTransform(smoothProgress, [0, 0.02, 0.35, 0.38], [0, 1, 1, 0]);

  // Phase 2: Text fades out (33-40%)
  const textSectionOpacity = useTransform(smoothProgress, [0.33, 0.40], [1, 0]);

  // Phase 3: Cards start appearing (40-48%)
  const cardsOpacity = useTransform(smoothProgress, [0.40, 0.48], [0, 1]);

  // ANIMATION TIMINGS FOR 5 CARDS
  // On mobile, we want each card to have its own "moment" in the center of the screen
  // or slide up one by one in the sticky view.
  
  // Desktop X transforms
  const card1X = useTransform(smoothProgress, [0.40, 0.50], [-80, 0]);
  const card2X = useTransform(smoothProgress, [0.44, 0.54], [-80, 0]);
  const card3X = useTransform(smoothProgress, [0.48, 0.58], [-80, 0]);
  const card4X = useTransform(smoothProgress, [0.52, 0.62], [-80, 0]);
  const card5X = useTransform(smoothProgress, [0.56, 0.66], [-80, 0]);

  // Mobile Y transforms: Improved to ensure they slide up into view sequentially
  // We offset the card sequence so users see them one by one.
  const card1Y = useTransform(smoothProgress, [0.40, 0.46], [40, 0]);
  const card2Y = useTransform(smoothProgress, [0.46, 0.52], [40, 0]);
  const card3Y = useTransform(smoothProgress, [0.52, 0.58], [40, 0]);
  const card4Y = useTransform(smoothProgress, [0.58, 0.64], [40, 0]);
  const card5Y = useTransform(smoothProgress, [0.64, 0.70], [40, 0]);

  const card1Opacity = useTransform(smoothProgress, [0.40, 0.46], [0, 1]);
  const card2Opacity = useTransform(smoothProgress, [0.46, 0.52], [0, 1]);
  const card3Opacity = useTransform(smoothProgress, [0.52, 0.58], [0, 1]);
  const card4Opacity = useTransform(smoothProgress, [0.58, 0.64], [0, 1]);
  const card5Opacity = useTransform(smoothProgress, [0.64, 0.70], [0, 1]);

  const cardAnimations = [
    { x: card1X, y: card1Y, opacity: card1Opacity },
    { x: card2X, y: card2Y, opacity: card2Opacity },
    { x: card3X, y: card3Y, opacity: card3Opacity },
    { x: card4X, y: card4Y, opacity: card4Opacity },
    { x: card5X, y: card5Y, opacity: card5Opacity },
  ];

  // Logic to move the whole card container on mobile as we scroll
  // This prevents cards from being "pushed down" out of the viewport.
  // As scrollProgress increases from 40% to 70%, we shift the container up
  // to reveal subsequent cards.
  const mobileContainerY = useTransform(
    smoothProgress,
    [0.40, 0.75],
    ["0%", "-50%"] // Adjust based on how much you want the stack to move up
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh]  "
    >
      <div className="sticky top-0  h-screen flex items-center md:items-center z-20 bg-black overflow-hidden px-4 md:px-8 lg:px-16 pt-0 md:pt-0">
        
        {/* Phase 1: "The Problem" left + Description right with arrow */}
        <motion.div 
          style={{ 
            opacity: textSectionOpacity,
            pointerEvents: smoothProgress.get() > 0.4 ? 'none' : 'auto'
          }}
          className="absolute inset-0 flex items-center px-4 md:px-8 lg:px-16"
        >
          <div className="w-full flex flex-col lg:flex-row gap-8 md:gap-0 md:justify-between items-center relative">
            {/* Left: The Problem */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-[80px] font-medium tracking-tight text-white leading-none">
                The Problem
              </h2>
            </div>

            {/* Right: Description */}
            <div>
              <p className="text-white/80 leading-relaxed font-medium text-sm md:text-base lg:text-lg max-w-112.5">
                People need help and others have skills - but the system connecting them is broken. 
                Often work runs on calls, referrals, and guesswork. Finding the right person is slow, payments get delayed, and trust keeps breaking. 
                There is no fast, fair, reliable system.
              </p>
            </div>
          </div>

          {/* Desktop: Arrow line - left to right */}
          <motion.div 
            style={{ width: arrowWidth, opacity: arrowOpacity }}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-white items-center justify-end z-30"
          >
            <div className="absolute right-0 translate-x-1/2">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-white"
              >
                <path 
                  d="M13 5L20 12L13 19" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* Mobile: Arrow line - top to bottom */}
          <motion.div 
            style={{ height: arrowHeight, opacity: arrowOpacity }}
            className="md:hidden absolute left-1/2 top-0 -translate-x-1/2 w-0.5 bg-white flex flex-col items-center justify-end z-30"
          >
            <div className="absolute bottom-0 translate-y-1/2">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-white rotate-90"
              >
                <path 
                  d="M13 5L20 12L13 19" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Phase 2: Problem cards appear */}
        {/* On mobile, we use overflow-visible and animate the container position to ensure 'one by one' appearance */}
        <motion.div 
          style={{ 
            opacity: cardsOpacity,
            y: isMobile ? mobileContainerY : 0 
          }}
          className="w-full h-full flex flex-col md:flex-row gap-4 md:overflow-visible md:items-center justify-center items-start pt-200 md:pt-0 pb-30 md:pb-0"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={problem.number}
              style={{
                x: isMobile ? 0 : cardAnimations[index].x,
                y: isMobile ? cardAnimations[index].y : 0,
                opacity: cardAnimations[index].opacity,
              }}
              className="shrink-0 w-full md:w-56 lg:w-60"
            >
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 pt-12 min-h-40 md:h-60 relative group hover:border-zinc-700 transition-colors">
                <div className="absolute top-4 right-4 w-7 h-7 bg-primary-btn/20 flex items-center justify-center rounded-full">
                  <ArrowUpRight className="w-4 h-4 text-primary-btn" />
                </div>
                <div className="text-5xl md:text-7xl text-primary-btn font-light tracking-tight mb-2">
                  {problem.number}
                </div>
                <h3 className="text-sm md:text-base font-medium text-gray-300 mt-2 leading-tight pr-4">
                  {problem.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TheProblem;
