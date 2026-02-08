'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Frame1 from"@/public/assets/Frame1.png"
import Frame2 from"@/public/assets/Frame2.png"
import Frame3 from"@/public/assets/Frame3.png"
import Frame4 from"@/public/assets/Frame4.png"
import Frame5 from"@/public/assets/Frame5.png"
import WaitlistModal from './JoinWaitList/WaitlistModal';



const slides = [
  {
    title: 'Your skills should make you money',
    image: Frame1,
  },
  {
    title: 'Finding help should not take hours',
    image: Frame2,
  },
  {
    title: 'Connect with local experts instantly',
    image: Frame3,
  },
  {
    title: 'Get paid for your skills',
    image: Frame4,
  },
  {
    title: 'Build your local network',
    image: Frame5,
  },
];

const CommunityFirst = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  // Auto-scroll for mobile only
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 10000); // Change slide every 4 seconds

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <section className="min-h-screen bg-white px-4 lg:px-8 ">
      <div className="max-w-350 mx-auto w-full">

        {/* MOBILE/TABLET = COLUMN | DESKTOP = ROW */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

          {/* LEFT CONTENT */}
          <div
            className="w-full lg:w-[35%] flex md:flex-col flex-col-reverse md:justify-between md:h-150"
            
          >
            <div>
              {/* NUMBERS */}
              <div className="md:flex items-center hidden gap-4 text-sm text-gray-400 mb-6 overflow-x-auto lg:overflow-visible">
                {slides.map((_, index) => (
                  <div key={index} className="flex items-center gap-2 shrink-0">
                    <span
                      className={
                        index === currentIndex
                          ? 'text-black bg-gray-300 py-2 px-2.5 rounded-full font-medium text-lg'
                          : 'text-black italic'
                      }
                    >
                      {(index + 1).toString().padStart(2, '0')}
                    </span>

                    {/* LINE ONLY ON DESKTOP */}
                    {index === currentIndex &&
                      index < slides.length - 1 && (
                        <div className="hidden lg:block w-40 h-0.5 bg-black" />
                      )}
                  </div>
                ))}
              </div>
              
              <p className="text-gray-600 md:text-sm text-xs leading-relaxed max-w-sm">
                The hyperlocal workforce infrastructure built for real-life work,
                real urgency, and real money. SAYZO solves the five biggest
                failures of local work at once.
              </p>
            </div>

            <div className="mt-8 lg:mt-auto md:mb-10">
              <h1 className="md:text-4xl text-3xl lg:text-5xl font-semibold leading-[1.1] mb-6">
                Community-First,
                <br className='md:flex hidden' />
                Hyperlocal Task
                <br className='md:flex hidden' />
                Marketplace.
              </h1>

              <button onClick={() => setIsModalOpen(true)} className="md:inline-flex items-center gap-2 bg-black text-white px-6 py-3 hidden  rounded-full text-sm font-medium">
                Join waitlist
                <ArrowUpRight className="w-8 h-8 rounded-full p-1 bg-white text-black" />
              </button>
            </div>
          </div>

          {/* RIGHT SLIDER */}
          <div className="flex-1 relative w-full">

            {/* MOBILE + TABLET (SINGLE IMAGE, SWIPE + AUTO-SCROLL) */}
            <motion.div
              className="relative h-150 md:h-105 rounded-3xl overflow-hidden lg:hidden"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) nextSlide();
                if (info.offset.x > 80) prevSlide();
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 rounded-2xl z-20"
                >
                  <Image
                    src={slides[currentIndex].image}
                    alt={slides[currentIndex].title}
                    width={2000}
                    height={100}
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* DESKTOP (YOUR ORIGINAL DESIGN - UNCHANGED) */}
            <div className="hidden lg:block">
              <div className="relative mb-6 ml-20">
                <div className="flex ">

                  {/* ACTIVE SLIDE */}
                 <div className="w-[50%] relative h-150 rounded-3xl overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={slides[currentIndex].image}
                          alt={slides[currentIndex].title}
                          width={2000}
                          height={100}
                          className="object-center"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* NEXT PREVIEW */}
                  {currentIndex < slides.length - 1 && (
                    <div className="w-[50%] relative h-125 mb-24.5 rounded-3xl mt-1 overflow-hidden">
                      <Image
                        src={slides[currentIndex + 1].image}
                        alt={slides[currentIndex + 1].title}
                        fill
                        className="object-contain opacity-85"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* DESKTOP NAV */}
              <div className="flex gap-3 justify-end -mt-24 mr-27 relative z-30">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-black"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>
        <div className="flex md:hidden items-center justify-center -mt-10  md:mt-0  gap-4 text-sm text-gray-400 md:mb-6 overflow-x-auto lg:overflow-visible">
                {slides.map((_, index) => (
                  <div key={index} className="flex items-center gap-2 shrink-0">
                    <span
                      className={
                        index === currentIndex
                          ? 'text-black bg-gray-300 py-2 px-2.5 rounded-full font-medium text-lg'
                          : 'text-black italic'
                      }
                    >
                      {(index + 1).toString().padStart(2, '0')}
                    </span>

                    {/* LINE ONLY ON DESKTOP */}
                    {index === currentIndex &&
                      index < slides.length - 1 && (
                        <div className="flex  mg-auto w-10 h-0.5 bg-black" />
                      )}
                  </div>
                ))}
              </div>
      </div>
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default CommunityFirst;
