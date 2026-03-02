'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Frame1 from "@/public/assets/Frame1.png"
import Frame2 from "@/public/assets/Frame2.png"
import Frame3 from "@/public/assets/Frame3.png"
import Frame4 from "@/public/assets/Frame4.png"
import Frame5 from "@/public/assets/Frame5.png"
import WaitlistModal from './JoinWaitList/WaitlistModal';

const slides = [
  { title: 'Your skills should make you money', image: Frame1 },
  { title: 'Finding help should not take hours', image: Frame2 },
  { title: 'Connect with local experts instantly', image: Frame3 },
  { title: 'Get paid for your skills', image: Frame4 },
  { title: 'Build your local network', image: Frame5 },
];

const CommunityFirst = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => prev === 0 ? slides.length - 1 : prev - 1);

  return (
    <section className="min-h-screen bg-white px-4 py-12 lg:p-8 border-y border-gray-100">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Responsive Grid: Column on Mobile, Row on Desktop */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-20">

          {/* LEFT CONTENT: Dynamic flex-direction for industrial balance */}
          <div className="w-full lg:w-[35%] flex flex-col justify-between lg:min-h-[600px]">
            <div>
              {/* Desktop-only Numbers */}
              <div className="hidden lg:flex items-center gap-4 text-sm text-gray-400 mb-8">
                {slides.map((_, index) => (
                  <div key={index} className="flex items-center gap-2 shrink-0">
                    <span className={index === currentIndex ? 'text-black bg-gray-200 py-2 px-3 rounded-full font-bold text-lg' : 'text-gray-400 italic font-medium'}>
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    {index === currentIndex && index < slides.length - 1 && (
                      <div className="w-24 h-[1px] bg-black" />
                    )}
                  </div>
                ))}
              </div>
              
              <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-sm mb-6 lg:mb-0">
                The hyperlocal workforce infrastructure built for real-life work,
                real urgency, and real money. SAYZO solves the five biggest
                failures of local work at once.
              </p>
            </div>

            <div className="mt-4 lg:mt-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] mb-8">
                Community-First,<br />
                Hyperlocal Task<br />
                Marketplace.
              </h1>

              {/* Responsive Button: Hidden on mobile, visible on tablet/desktop */}
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="hidden md:inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-emerald-600 transition-all"
              >
                Join waitlist
                <ArrowUpRight className="w-5 h-5 rounded-full p-1 bg-white text-black" />
              </button>
            </div>
          </div>

          {/* RIGHT SLIDER: Full-width on mobile with swipe */}
          <div className="flex-1 relative w-full mt-8 lg:mt-0">
            
            {/* MOBILE/TABLET SLIDER (Swipeable) */}
            <div className="lg:hidden relative">
              <motion.div
                className="relative aspect-[4/5] md:aspect-video rounded-[2rem] overflow-hidden"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) nextSlide();
                  if (info.offset.x > 50) prevSlide();
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slides[currentIndex].image}
                      alt={slides[currentIndex].title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Mobile Navigation Dots */}
              <div className="flex items-center justify-center gap-3 mt-8">
                {slides.map((_, index) => (
                  <div 
                    key={index} 
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 transition-all rounded-full ${index === currentIndex ? 'w-8 bg-black' : 'w-2 bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>

            {/* DESKTOP SLIDER (Original Layout Maintained) */}
            <div className="hidden lg:block">
              <div className="flex gap-6 items-start">
                 <div className="w-[60%] relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={slides[currentIndex].image}
                          alt={slides[currentIndex].title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {currentIndex < slides.length - 1 && (
                    <div className="w-[35%] relative h-[500px] rounded-[2.5rem] mt-12 overflow-hidden opacity-40 grayscale hover:grayscale-0 transition-all">
                      <Image
                        src={slides[currentIndex + 1].image}
                        alt={slides[currentIndex + 1].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
              </div>

              {/* Desktop Controls */}
              <div className="flex gap-4 justify-end mt-8 pr-12">
                <button onClick={prevSlide} className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextSlide} className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Mobile-only CTA */}
      <div className="md:hidden mt-12 flex justify-center">
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3"
        >
          Join waitlist
          <ArrowUpRight className="w-5 h-5 p-1 bg-white text-black rounded-full" />
        </button>
      </div>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default CommunityFirst;