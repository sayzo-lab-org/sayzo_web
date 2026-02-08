"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Card from "./Card"; // 👈 your existing card

const cards = [1, 2, 3, 4, 5];

export default function StickyShowcase() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // HERO CARD transforms
  const scale = useTransform(scrollYProgress, [0, 0.35], [1, 0.6]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.35], [0, 24]);

  // Cards reveal
  const cardsOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const cardsY = useTransform(scrollYProgress, [0.35, 0.6], [60, 0]);

  return (
    <div ref={ref} className="sticky top-0 h-screen flex items-center justify-center">
      
      <div className="relative w-full max-w-7xl px-4">

        {/* HERO CARD */}
        <motion.div
          style={{ scale, borderRadius }}
          className="mx-auto h-[70vh] w-full bg-black text-white flex items-center justify-center"
        >
          <Card large /> {/* 👈 your card */}
        </motion.div>

        {/* ROW OF CARDS (desktop only) */}
        <motion.div
          style={{ opacity: cardsOpacity, y: cardsY }}
          className="hidden md:flex gap-6 justify-center mt-16"
        >
          {cards.map((i) => (
            <Card key={i} />
          ))}
        </motion.div>

      </div>
    </div>
  );
}
