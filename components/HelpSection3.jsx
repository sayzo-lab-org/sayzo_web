"use client";

import Image from "next/image";

const HelpSection3 = () => {
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
  ];

  return (
    <section className="pb-12 max-w-350 mx-auto px-4 mt-30">
      {/* TITLE */}
      <div className="text-center mb-15">
        <h1 className="text-[56px] font-medium leading-[1.1]">
          Practical reads to help <br />
          you move{" "}
          <span className="font-serif italic font-normal">faster.</span>
        </h1>
      </div>

      {/* THREE IMAGES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {helpItems.map((item) => (
          <div
            key={item.id}
            className="relative h-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-zinc-900"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover opacity-70"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

            {/* Text */}
            <div className="absolute bottom-0 left-0 p-6">
              <h2 className="text-white text-[26px] font-semibold mb-2 max-w-md">
                {item.title}
              </h2>
              <p className="text-white/70 text-sm max-w-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HelpSection3;
