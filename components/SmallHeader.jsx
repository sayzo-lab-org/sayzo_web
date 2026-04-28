'use client';

import { useState } from 'react';
import { Bell, ArrowUpRight } from 'lucide-react';
import CreatorHiringModal from './CreatorHiringModal';

const SmallHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-black text-white relative z-50 h-12 sm:h-11 flex items-center justify-between px-4 md:px-10 border-b border-zinc-800">
        {/* Center group — bell + message + CTA */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-center min-w-0">
          <Bell size={15} className="text-[#10b981] shrink-0" strokeWidth={2.5} />

          <p className="text-[10px] sm:text-[13px] font-semibold tracking-wide text-zinc-100 truncate">
            We&apos;re hiring creators at Sayzo&nbsp;— saw us on Instagram?
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-0.5 text-[10px] sm:text-[12px] font-bold text-[#10b981] hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            Apply now
            <ArrowUpRight size={11} strokeWidth={3} />
          </button>
        </div>

      </div>

      <CreatorHiringModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default SmallHeader;
