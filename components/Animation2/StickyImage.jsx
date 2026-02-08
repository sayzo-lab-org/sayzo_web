
import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { SECTIONS } from '../constants';
import Mascot from './Mascot';


const StickyImage = ({ scrollYProgress }) => {
  // Match the side-to-side logic from screenshots
  const x = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.5, 0.7, 0.9],
    ["-22vw", "-22vw", "22vw", "22vw", "-22vw"]
  );

  const y = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.5, 0.7, 0.8, 0.9],
    [0, 150, 0, 0, 150, 0] // Dip down during swaps
  );

  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Image Transitions
  const img1Opacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0]);
  const img2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.75, 0.85], [0, 1, 1, 0]);
  const img3Opacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-20 overflow-hidden">
      <motion.div style={{ x, y, opacity }} className="relative pointer-events-auto flex items-center justify-center">
        
        {/* The Mascot character next to phone */}
        <Mascot scrollYProgress={scrollYProgress} />

        {/* Professional iPhone Mockup */}
        <div className="relative border-[#1a1c23] bg-[#1a1c23] border-[10px] rounded-[3.5rem] h-[640px] w-[310px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] flex-shrink-0">
          {/* Screen Content */}
          <div className="rounded-[2.8rem] overflow-hidden w-full h-full bg-white relative">
            <motion.img 
              src={SECTIONS[0].image} 
              style={{ opacity: img1Opacity }}
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <motion.img 
              src={SECTIONS[1].image} 
              style={{ opacity: img2Opacity }}
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <motion.img 
              src={SECTIONS[2].image} 
              style={{ opacity: img3Opacity }}
              className="absolute inset-0 w-full h-full object-cover" 
            />
            
            {/* Phone UI Mockup Overlays */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/20 to-transparent z-10" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/20 rounded-full z-10" />
          </div>

          {/* Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#05070a] rounded-full z-20 flex items-center justify-center shadow-inner">
             <div className="w-1.5 h-1.5 bg-blue-500/20 rounded-full absolute right-5" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StickyImage;
