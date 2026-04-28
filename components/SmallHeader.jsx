'use client';

import { useState } from 'react';
import { Bell, X, ArrowUpRight } from 'lucide-react';
import CreatorHiringModal from './CreatorHiringModal';

const SmallHeader = () => {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [modalOpen, setModalOpen]         = useState(false);

  if (!bannerVisible) return null;

  return (
    <>
      <div className="bg-black text-white relative z-50 h-10 flex items-center justify-between px-4 md:px-10 border-b border-zinc-800">
        {/* Center group — bell + message + CTA */}
        <div className="flex items-center gap-3 flex-1 justify-center min-w-0">
          <Bell size={14} className="text-[#10b981] shrink-0" strokeWidth={2.5} />
          <p className="text-[11px] sm:text-xs font-medium tracking-wide text-zinc-200 truncate">
            We&apos;re hiring creators at Sayzo&nbsp;— saw us on Instagram?
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="hidden sm:flex items-center gap-0.5 text-[11px] font-semibold text-[#10b981] hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            Apply now
            <ArrowUpRight size={12} strokeWidth={3} />
          </button>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setBannerVisible(false)}
          aria-label="Dismiss banner"
          className="text-zinc-500 hover:text-white transition-colors shrink-0 ml-2"
        >
          <X size={13} />
        </button>
      </div>

      <CreatorHiringModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default SmallHeader;
