'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



export default function ScrollSection({
  title,
  description,
  imageUrl,
  imagePosition,
  index,
}) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!section || !image || !text) return;

    // Set initial states
    gsap.set(image, {
      x: imagePosition === 'left' ? -100 : 100,
      opacity: 0,
    });

    gsap.set(text, {
      x: imagePosition === 'left' ? 100 : -100,
      opacity: 0,
    });

    // Create scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(image, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    })
      .to(
        text,
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.7'
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [imagePosition]);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-4 md:px-8"
    >
      <div
        className={`max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center ${
          imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Image */}
        <div
          ref={imageRef}
          className={`${imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'}`}
        >
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div
          ref={textRef}
          className={`${imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-purple-400">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
