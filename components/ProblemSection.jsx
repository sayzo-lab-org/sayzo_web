'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lightbulb } from 'lucide-react';
import Image from 'next/image';

const cards = [
  {
    id: 0,
    title: "People Have Skills But unable to monetise it",
    description:
      "Millions of people have usable skills, but their free time produces no income because we lack the infrastructure to monetize micro-engagements.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 1,
    title: "Finding The Right Person Takes Too Much Time",
    description:
      "Traditional platforms are cluttered. Sifting through hundreds of profiles to find one reliable expert takes hours of valuable management time.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Freelancers Are Unreliable, Prices And Quality Vary",
    description:
      "Without standardized benchmarks, businesses face inconsistent quality and unpredictable pricing models that disrupt long-term planning.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Poorly Structured Work Causes Payment Delays",
    description:
      "Undefined scopes and manual tracking lead to friction. Automating the workflow ensures that delivery meets expectations and payments are instant.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop",
  },
];

const ProblemSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeIndex < cards.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    if (isRightSwipe && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <section className="max-w-8xl">
      {/* Desktop: Horizontal expanding cards */}
      <div className="hidden lg:flex gap-4 h-100 ">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            onClick={() => setActiveIndex(index)}
            layout
            animate={{ flex: activeIndex === index ? 2.5 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 shadow-xl"
          >
            {/* Background */}
            <div className="absolute inset-0">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-8 lg:px-4 lg:py-10">
              <div className="flex justify-between items-start gap-4">
                <h3
                  className={`text-white font-bold leading-tight ${
                    activeIndex === index
                      ? "text-3xl lg:text-3xl max-w-[80%]"
                      : "text-xl lg:text-2xl"
                  }`}
                >
                  {card.title}
                </h3>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-14 h-14 bg-white rounded-full flex items-center justify-center"
                    >
                      <ArrowRight className="w-6 h-6 text-zinc-900" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-white/70 text-base lg:text-lg max-w-lg -mt-25"
                  >
                    {card.description}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="flex">
                <div className="bg-gray-200/20 backdrop-blur-md rounded-full flex items-center gap-2">
                  <div className="bg-gray-200/20 rounded-full p-2">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-xs font-semibold uppercase px-4 py-2">
                    Solution
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile: Swipeable horizontal cards */}
      <div 
        className="lg:hidden overflow-x-auto scrollbar-hide"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex gap-4 pb-4 pl-4">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => setActiveIndex(index)}
              className="relative cursor-pointer overflow-hidden rounded-3xl bg-zinc-900 shadow-xl min-w-[320px] h-[300px]"
            >
              {/* Background */}
              <div className="absolute inset-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="320px"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6">
                {/* Title at top */}
                <h3 className="text-white font-bold leading-tight text-xl">
                  {card.title}
                </h3>

                {/* Description in middle */}
                <p className="text-white/80 text-sm leading-relaxed -mt-10">
                  {card.description}
                </p>

                {/* Bottom row: Solution badge left, Arrow right */}
                <div className="flex justify-between items-center">
                  <div className="bg-white/20 backdrop-blur-md rounded-full flex items-center gap-2 px-4 py-2">
                    <Lightbulb className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-semibold uppercase">
                      Solution
                    </span>
                  </div>

                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-zinc-900" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Swipe indicator dots */}
       
      </div>

    
    </section>
  );
};

export default ProblemSection;