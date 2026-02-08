
import React from 'react';
import { ArrowUpRight } from 'lucide-react';


export const ProblemCard= ({ number, title, isFeatured }) => {
  return (
    <div className={`group relative w-full h-[180px] sm:h-[220px] md:h-[380px] lg:h-[480px] overflow-hidden rounded-xl md:rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-500 shadow-2xl ${isFeatured ? 'lg:scale-105 z-30' : ''}`}>
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-800/20 to-black opacity-40" />
      
      {/* Glow Effect on Hover (Green Tint) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.05),transparent_70%)]" />

      {/* Card Content */}
      <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-4xl md:text-7xl font-black text-primary-btn transition-colors duration-700 leading-none tracking-tighter">
            {number}
          </span>
          <div className="p-2 md:p-3 bg-primary-btn/20 rounded-full group-hover:bg-primary-btn transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-primary-btn group-hover:text-black transition-colors" />
          </div>
        </div>

        <div>
          <h3 className="text-base md:text-2xl font-medium text-gray-300 group-hover:text-white leading-tight tracking-tight mb-4 transition-colors line-clamp-3 md:line-clamp-none">
            {title}
          </h3>
          
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-6 md:w-10 bg-zinc-800 group-hover:w-16 group-hover:bg-primary-btn transition-all duration-500" />
            <p className="text-[9px] md:text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] group-hover:text-primary-btn/80 transition-colors">
              Issue {number}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Border Bottom (Green) */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary-btn group-hover:w-full transition-all duration-700 shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
    </div>
  );
};
