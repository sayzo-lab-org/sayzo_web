'use client'
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ProblemCard } from './ProblemCard';

const problems = [
  { number: '01', title: 'People Have Skills But Unable To Monetise It' },
  { number: '02', title: 'Finding The Right Person Takes Too Much Time' },
  { number: '03', title: 'Poorly Structured Work Causes Payment Delays' },
  { number: '04', title: 'Freelancers Are Unreliable, Prices Vary' },
  { number: '05', title: 'Urgent Help Requires Endless Calls' },
];

const TheProblem2 = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [gridHeight, setGridHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
      if (gridRef.current) {
        setGridHeight(gridRef.current.scrollHeight);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    // Poll for changes to ensure measurements are accurate
    const timer = setInterval(handleResize, 1000);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timer);
    };
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Animation Phase Timing
  const headlineExitStart = 0.05;
  const headlineExitEnd = isMobile ? 0.15 : 0.22;
  
  const mainScale = useTransform(smoothProgress, [0, headlineExitEnd], [1, 0.96]);
  const mainOpacity = useTransform(smoothProgress, [0, headlineExitStart, headlineExitEnd - 0.05, headlineExitEnd], [1, 1, 1, 0]);
  const mainTranslateY = useTransform(smoothProgress, [0, headlineExitEnd], ["0px", "-30px"]);

  // Reveal Phase
  const revealStart = headlineExitEnd - 0.05;
  const revealEnd = 0.95;
  
  // Calculate movement range to show the entire grid
  const bottomBreathingRoom = isMobile ? 100 : 150;
  const maxMove = Math.max(0, gridHeight + bottomBreathingRoom - windowHeight * 0.6);
  
  const gridTranslation = useTransform(
    smoothProgress, 
    [revealStart, revealEnd], 
    ["0px", `-${maxMove}px`]
  );

  const gridOpacity = useTransform(smoothProgress, [revealStart, revealStart + 0.1], [0, 1]);
  const bgGridOpacity = useTransform(smoothProgress, [0, 0.2], [0.03, 0.08]);

  return (
    <section ref={containerRef} className="relative h-[800vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-hidden">
        
        {/* Cinematic Grid Background */}
        <motion.div style={{ opacity: bgGridOpacity }} className="absolute inset-0 z-0">
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] md:bg-[size:120px_120px]" />
        </motion.div>

        {/* Phase 1: Header - Side-by-side on desktop */}
        <div className="container mx-auto px-6 md:px-12 relative z-30 w-full max-w-7xl pt-[15vh] md:pt-[20vh] lg:pt-[25vh]">
          <motion.div
            style={{ 
              scale: mainScale, 
              opacity: mainOpacity,
              y: mainTranslateY
            }}
            className="w-full flex flex-col lg:flex-row gap-8 lg:gap-0 lg:justify-between items-center lg:items-center relative"
          >
            {/* Left: The Problem */}
            <div className="w-full lg:w-auto text-center lg:text-left">
              <h2 className="text-5xl md:text-7xl lg:text-[110px] font-medium tracking-tight text-white leading-none">
                The Problem
              </h2>
            </div>

            {/* Right: Description */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <p className="text-white leading-relaxed font-normal text-base md:text-lg lg:text-xl max-w-md md:max-w-xl text-center lg:text-right">
                People need help and others have skills - but the system connecting them is broken. 
                Often work runs on calls, referrals, and guesswork. Finding the right person is slow, payments get delayed, and trust keeps breaking. 
                There is no fast, fair, reliable system.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Phase 2: Problems Grid Reveal */}
        <div className="container mx-auto px-4 md:px-12 relative z-20 w-full h-full max-w-350 flex flex-col items-center justify-start pt-[5vh] md:pt-[10vh]">
          <motion.div 
            ref={gridRef}
            style={{ 
              opacity: gridOpacity,
              y: gridTranslation 
            }}
            className="grid w-full gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 pb-32"
          >
            {problems.map((problem, index) => (
              <div
                key={problem.number}
                className={`
                  w-full 
                  ${isTablet && index === 4 ? 'md:col-span-2' : ''}
                  ${!isMobile && !isTablet && index % 2 !== 0 ? 'translate-y-12' : ''}
                `}
              >
                <ProblemCard 
                  number={problem.number}
                  title={problem.title}
                  isFeatured={index === 2}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Cue */}
        
      </div>
    </section>
  );
};

export default TheProblem2;
