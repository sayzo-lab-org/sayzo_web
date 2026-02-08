'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const problems = [
  { number: '01', title: 'People Have Skills But Unable To Monetise It' },
  { number: '02', title: 'Finding The Right Person Takes Too Much Time' },
  { number: '03', title: 'Poorly Structured Work Causes Payment Delays' },
  { number: '04', title: 'Freelancers Are Unreliable, Prices And Quality Vary' },
  { number: '05', title: 'Urgent Help Requires Endless Calls And Chasing' },
]

const TheProblem = () => {
  const containerRef = useRef(null)

  const [device, setDevice] = useState('desktop')
  // mobile <640 | tablet 640–1023 | desktop ≥1024
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setDevice('mobile')
      else if (w < 1024) setDevice('tablet')
      else setDevice('desktop')
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // SLOWER spring
  const progress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 30,
  })

  // Intro text fades slower
  const headingOpacity = useTransform(progress, [0, 0.22], [1, 0])

  // CARD APPEARANCE TIMING (SLOW)
  const BASE_START = 0.28
  const GAP = 0.13 // 👈 makes reading comfortable
  const DURATION = 0.12

  const cardAnimations = problems.map((_, i) => {
    const start = BASE_START + i * GAP
    const end = start + DURATION

    // X / Y based on device
    const x =
      device === 'desktop'
        ? useTransform(progress, [start, end], [-140, 0])
        : 0

    const y =
      device !== 'desktop'
        ? useTransform(progress, [start, end], [90, 0])
        : 0

    const scaleFrom =
      device === 'tablet' ? 0.85 : 0.92

    return {
      opacity: useTransform(progress, [start, end], [0, 1]),
      x,
      y,
      scale: useTransform(progress, [start, end], [scaleFrom, 1]),
    }
  })

  return (
    <section
      ref={containerRef}
      className="relative h-[480vh] max-w-350 mx-auto px-4"
    >
      <div className="sticky top-0 h-screen bg-black rounded-4xl overflow-hidden flex items-center">
        
        {/* INTRO */}
        <motion.div
          style={{ opacity: headingOpacity }}
          className="absolute inset-0 flex items-center justify-center text-center z-10 px-6"
        >
          <div>
            <h2 className="text-white text-5xl md:text-[80px] font-medium leading-none mb-6">
              The Problem
            </h2>
            <p className="text-white/70 max-w-xl mx-auto text-base md:text-lg">
              People need help. Others have skills.  
              But speed, trust, and structure are broken.
            </p>
          </div>
        </motion.div>

        {/* CARD STACK */}
        <div className="relative w-full h-full flex items-center justify-center">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.number}
              style={cardAnimations[index]}
              className="
                absolute
                w-[92%]
                sm:w-[70%]
                md:w-[280px]
                lg:w-[360px]
              "
            >
              {/* CARD */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 pt-12 min-h-40 md:h-60 relative">
                <div className="absolute top-4 right-4 w-7 h-7 bg-primary-btn/20 flex items-center justify-center rounded-full">
                  <ArrowUpRight className="w-4 h-4 text-primary-btn" />
                </div>

                <div className="text-5xl md:text-7xl text-primary-btn font-light tracking-tight mb-2">
                  {problem.number}
                </div>

                <h3 className="text-sm md:text-base font-medium text-gray-300 mt-2 leading-tight pr-4">
                  {problem.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TheProblem
