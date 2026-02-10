'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SmallHeader = () => {
  const [duration, setDuration] = useState(20);

  useEffect(() => {
   
    const handleResize = () => {
      const width = window.innerWidth;
      
      const calculatedDuration = width / 80; 
      setDuration(Math.max(12, Math.min(calculatedDuration, 30)));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-black text-white relative z-50 h-10 flex items-center overflow-hidden border-b border-zinc-800">
      <motion.div
        className="whitespace-nowrap font-medium text-sm md:text-base inline-block"
        initial={{ x: "100vw" }} 
        animate={{ x: "-100%" }} 
        transition={{
          duration: duration,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <span className="px-10">
          A Community First Hyperlocal Task Infrastructure | SAYZO is not just a gig app | It is infrastructure for the neighbourhood economy
        </span>
      </motion.div>
    </div>
  );
};

export default SmallHeader;