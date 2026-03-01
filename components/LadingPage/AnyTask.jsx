"use client"

import Image from "next/image";
import taskDoer from "../../public/assets/taskDoer.png"
import taskGiver from "../../public/assets/taskGiver.png"

import { motion } from "framer-motion";
import Link from "next/link";


const AnyTask = () => {
  return (
    <section className="max-w-250 mx-auto p-4 pb-30 mt-2">
      <div className='flex justify-center mb-10'>
        <p className='font-medium text-[30px] sm:text-[40px] md:text-5xl lg:text-6xl text-center leading-tight'>
          Any Task. Any Moment.<br/>Any Skills.
          <span className="font-serif italic text-[#0ca37f]"> In 10 Minutes</span>
        </p>
      </div>
     <TaskSection/>
    </section>
  )
}



const TaskSection = () => {
  return (
    <div className="max-w-5xl mx-auto"> 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        
        {/* Card 1: Task Giver */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative group bg-[#B3B3B3] rounded-[32px] min-h-[280px] hover:shadow-lg shadow-black/20 overflow-hidden cursor-pointer transition-all"
        >
          {/* Background Image */}
          <Image 
           src={taskGiver} 
            alt="Task Giver" 
            fill 
            className="object-cover transition-transform duration-500 blur-xs  group-hover:scale-110"
          />
          
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />

          <div className="relative z-20 p-8">
             <h3 className="text-3xl font-black text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
               Let's hire in <br/> minutes
             </h3>
          </div>
          {/* working on onbarding route */}
         <Link href="/login" className="absolute bottom-8 right-8 z-30">
             <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-emerald-600 hover:text-white px-6 py-3.5 rounded-2xl font-bold text-[13px] uppercase tracking-wider transition-all shadow-xl active:scale-95">
              Join as a Task Giver
            </button>
          </Link>
        </motion.div>

        {/* Card 2: Task Doer */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative group bg-[#B3B3B3] rounded-[32px] min-h-[280px] hover:shadow-lg shadow-black/20 overflow-hidden cursor-pointer transition-all "
        >
          {/* Background Image */}
          <Image 
            src={taskDoer} 
            alt="Task Doer" 
            fill 
            className="object-cover transition-transform duration-500 blur-xs group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />

          <div className="relative z-20 p-8">
            <h3 className="text-3xl font-black text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              Guaranteed<br/> Earning
            </h3>
          </div>
            {/* working on onbarding route */}
          <Link href="/" className="absolute bottom-8 right-8 z-30">
           <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-black hover:text-white px-6 py-3.5 rounded-2xl font-bold text-[13px] uppercase tracking-wider transition-all shadow-xl active:scale-95">
              Join as a Task Doer
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Banner */}
      <div className="bg-black rounded-[24px] py-6 text-center shadow-lg">

<h2 className="text-white text-4xl font-black mb-0">10,000+</h2>

<p className="text-white text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">

Active Task Doers

</p>

</div>
    </div>
  );
};

export default AnyTask;