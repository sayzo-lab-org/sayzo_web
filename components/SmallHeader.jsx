'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/Context/AuthContext';

const announcements = [
  {
    icon: '✨',
    text: 'Sayzo is now live  connect with 40,000+ local helpers near you',
  },
  {
    icon: '✨',
    text: 'Post your first task in under 60 seconds  free forever',
    cta: 'Post Now',
    action: 'postTask',
  },
  {
    icon: '✨',
    text: 'Community-first hyperlocal task infrastructure for India',
    cta: 'Learn More',
    action: 'learnMore',
  },
];

const Separator = () => (
  <span className="mx-8 text-zinc-600 select-none">|</span>
);

const Item = ({ icon, text, cta, onCtaClick }) => (
  <span className="inline-flex items-center gap-2 whitespace-nowrap">
    <span>{icon}</span>
    <span className="text-zinc-300 text-xs font-medium">{text}</span>
    {cta && (
      <button
        onClick={onCtaClick}
        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors cursor-pointer"
      >
        {cta}
      </button>
    )}
  </span>
);

const Track = ({ onAction }) => (
  <>
    {announcements.map((a, i) => (
      <span key={i} className="inline-flex items-center">
        <Item
          {...a}
          onCtaClick={a.action ? () => onAction(a.action) : undefined}
        />
        <Separator />
      </span>
    ))}
  </>
);

const SmallHeader = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleAction = (action) => {
    if (action === 'postTask') {
      if (!user) {
        router.push('/login');
      } else {
        window.dispatchEvent(new CustomEvent('sayzo:openTaskModal'));
      }
    } else if (action === 'learnMore') {
      router.push('/why-sayzo');
    }
  };

  return (
    <div className="bg-zinc-950 text-white relative z-50 h-9 flex items-center overflow-hidden border-b border-zinc-800">
      {/* Duplicate content to create seamless loop */}
      <div className="animate-scroll-left inline-flex items-center will-change-transform">
        <Track onAction={handleAction} />
        <Track onAction={handleAction} />
      </div>
    </div>
  );
};

export default SmallHeader;
