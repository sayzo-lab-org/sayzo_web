"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MarqueeCard from "./MarqueeCard";

const MarqueeRow = ({ items, direction = "left", speed = 30 }) => {
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    if (!trackRef.current) return;
    setTrackWidth(trackRef.current.scrollWidth / 2);
  }, []);

  if (!trackWidth) {
    return (
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max opacity-0">
          {[...items, ...items].map((item, i) => (
            <MarqueeCard key={i} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max"
        initial={{ x: direction === "left" ? 0 : -trackWidth }}
        animate={{ x: direction === "left" ? -trackWidth : 0 }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((item, i) => (
          <MarqueeCard key={i} item={item} />
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeRow;
