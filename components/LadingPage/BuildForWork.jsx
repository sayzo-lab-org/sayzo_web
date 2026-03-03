import React from "react";
import MarqueeRow from "../MarqueeRow";
import { MARQUEE_DATA } from "@/public/data/MARQUEE_DATA";

const BuildForWork = () => {
  return (
    <section className="mb-24 border border-red-700">
      <div className="max-w-5xl mx-auto px-4 text-center border border-blue-300">
        <p className="font-medium text-[40px] md:text-5xl lg:text-6xl border border-green-300">
          Built for <span className="font-serif italic">real work</span>
        </p>

        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed border border-yellow-300">
          Within 3km, over{" "}
          <span className="font-bold text-gray-700">40,000+ families</span> live
          nearby. That’s{" "}
          <span className="font-bold text-gray-700">40,000+ potential skills.</span>
          Yet people look online for help while talent sits next door, unused.{" "}
          <span className="font-bold text-gray-700">SAYZO</span> connects local
          talent with real work - instantly.
        </p>
      </div>

      <div className="md:mt-12 mt-10 flex flex-col gap-3 border border-purple-300">
        <MarqueeRow items={MARQUEE_DATA[0]} direction="left" speed={550} />
        <MarqueeRow items={MARQUEE_DATA[1]} direction="right" speed={600} />
        <MarqueeRow items={MARQUEE_DATA[2]} direction="left" speed={570} />
      </div>
    </section>
  );
};

export default BuildForWork;