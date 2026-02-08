'use client';

import { motion } from 'framer-motion';

const SmallHeader = () => {
  return (
    <div className="bg-black text-white relative z-50 h-10 flex items-center overflow-hidden">
      <motion.div
        className="whitespace-nowrap px-6 lg:w-full w-50 font-medium text-base"
        initial={{ x: '140%' }}
        animate={{ x: '-100%' }}
        transition={{
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        A Community First Hyperlocal Task Infrastructure |  SAYZO is not just a gig app | It is infrastructure for the neighbourhood economy
      </motion.div>
    </div>
  );
};

export default SmallHeader;