'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const helpItems = [
  {
    id: 0,
    title: "Because your skills should make you money",
    description:
      "Millions of people have usable skills, but their free time produces no income because we lack the right tools.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 1,
    title: "Because finding help should not take hours",
    description:
      "Stop sifting through infinite profiles. Get matched with the right expertise instantly and get back to your core work.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Because freelancing shouldn’t feel like a gamble",
    description:
      "Consistency is key. We provide verified benchmarks so you know exactly what level of quality to expect every single time.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Because people deserve to get paid fairly and on time",
    description:
      "No more chasing invoices. Our automated smart-contracts ensure payments are released immediately upon verified delivery.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Because when it’s urgent, you shouldn’t have to panic",
    description:
      "Urgent tasks require urgent solutions. Our real-time infrastructure handles high-pressure needs with calm efficiency.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop",
  },
];

const HelpSection2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = helpItems[activeIndex];

  return (
    <section className="pb-12 max-w-350 mx-auto px-4 -mb-100 sm:mb-0">
      {/* TITLE */}
      <div className="text-center mb-15">
        <h1 className="text-[56px] font-medium leading-[1.1]">
          Practical reads to help <br />
          you move{" "}
          <span className="font-serif italic font-normal">faster.</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:min-h-157.5 min-h-350">

        {/* IMAGE - TOP on mobile, LEFT on desktop */}
        <div className="order-1 lg:order-none flex-[1] relative lg:h-auto overflow-hidden md:rounded-[2.5rem] rounded-xl shadow-2xl bg-zinc-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                priority
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-0 left-0 p-4 pb-6 lg:p-12 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-white text-2xl lg:text-[32px] font-semibold leading-tight mb-2 max-w-md">
                  {activeItem.title}
                </h2>
                <p className="text-white/70 text-sm lg:text-base max-w-sm">
                  {activeItem.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* LIST - BELOW image on mobile, RIGHT on desktop */}
        <div className="order-2 lg:order-none flex-1 flex flex-col md:justify-between gap-4 ">
          {helpItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`flex items-center gap-4 rounded-xl transition-all duration-300 text-left group ${
                activeIndex === index
                  ? 'bg-zinc-900 text-white shadow-lg'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-900 border border-zinc-100'
              }`}
            >
              {/* THUMB */}
              <div className="w-24.5 h-24.5 lg:w-38.5 lg:h-27 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={item.image}
                  alt=""
                  width={100}
                  height={100}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* TITLE */}
              <span
                className={`text-base lg:text-[20px] font-semibold leading-snug grow ${
                  activeIndex === index ? 'text-white' : 'text-zinc-800'
                }`}
              >
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpSection2;