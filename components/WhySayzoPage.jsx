'use client'

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";

// Replace these with your actual asset paths
import whySayzo from "@/public/assets/whySayzo.jpg"; 
import Maskgroup2 from "@/public/assets/Maskgroup2.svg";
import WaitlistModal from "./JoinWaitList/WaitlistModal";

const menuVariants = {
    hidden: { x: "-100%" },
    visible: {
        x: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        x: "-100%",
        transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
    },
};

const WhySayzoPage = () => {
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="relative w-full h-[97vh] bg-white p-2 sm:p-4 md:p-6 md:-mt-4">
            
            {/* 1. HEADER BAR (Absolute so it floats over the hero) */}
            <header className="w-full absolute top-6 sm:top-10 left-0 z-50 px-6 sm:px-10">
                <div className="flex items-center justify-between max-w-350 mx-auto">
                    {/* LOGO */}
                    <Image
                        src={Maskgroup2}
                        alt="Sayzo Logo"
                        width={160}
                        height={40}
                        className="w-20 sm:w-24 lg:w-40"
                    />

                    {/* DESKTOP NAVIGATION */}
                    <nav className="hidden lg:flex items-center text-white gap-6 text-sm">
                        <Link href="/" className="hover:opacity-80 transition-opacity">Home</Link>
                        <span>|</span>
                        <Link href="/why-sayzo">Why Sayzos</Link>
                        <span>|</span>
                        <Link href="/how-sayzo-works">How Sayzo Works</Link>
                        <span>|</span>
                        <Link href="/policies" className="hover:opacity-80 transition-opacity">Policies</Link>
                        <Button onClick={() => setIsModalOpen(true)} className="rounded-full text-black bg-white px-7 py-5 font-normal hover:bg-white cursor-pointer transition-colors">
                            Join WaitList
                        </Button>
                    </nav>

                    {/* MOBILE/TABLET TOGGLE */}
                    <div onClick={() => setIsModalOpen(true)} className="flex items-center gap-3 lg:hidden">
                        <Button className="rounded-full px-4 py-2 text-[10px] sm:text-xs font-normal hover:bg-white cursor-pointer bg-white text-black">
                            Join Waitlist 
                        </Button>
                        <button onClick={() => setOpen(true)} className="p-1">
                            <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </button>
                    </div>
                </div>
            </header>

            {/* 2. MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {open && (
                    <motion.aside
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-[100] bg-primary-btn px-6 py-6 flex flex-col text-white"
                    >
                        <div className="flex items-center justify-between">
                            <Image src={Maskgroup2} alt="Logo" width={100} height={28} />
                            <button onClick={() => setOpen(false)}><X className="w-8 h-8" /></button>
                        </div>
                        <nav className="mt-20 flex flex-col gap-8 text-white text-4xl font-medium">
              <Link onClick={() => setOpen(false)} href="/">Home</Link>
              <Link onClick={() => setOpen(false)} href="/why-sayzo">Why SAYZO</Link>
              
              <Link onClick={() => setOpen(false)} href="/how-sayzo-works">How Sayzo Works</Link>
              <Link onClick={() => setOpen(false)} href="/policies">Policies</Link>
            </nav>

            {/* SOCIALS */}
            {/* <div className="mt-auto flex justify-center gap-6 text-white/80">
              <span>f</span>
              <span>in</span>
              <span>𝕏</span>
              <span>ig</span>
            </div> */}
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* 3. MAIN HERO SECTION */}
            <div className="relative w-full h-[85vh] sm:h-[90vh] rounded-[32px] sm:rounded-2xl overflow-hidden bg-black">
                <Image
                    src={whySayzo}
                    alt="Hero Background"
                    fill
                    className="object-cover opacity-85"
                    priority
                />

                {/* HERO TEXT */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center px-6">
                    <div className="text-start">
                    <p className="font-semibold text-sm sm:text-lg lg:text-3xl mb-2 ml-2.5">
                        Talent is closure than you think
                    </p>
                    <h1 className="font-bold text-[22vw] sm:text-[18vw] lg:text-[240px] leading-[0.8]">
                        Sayzo
                    </h1>
                    </div>
                    <p className="text-xs sm:text-base lg:text-lg md:mt-13 mt-7 max-w-80 sm:max-w-2xl opacity-80 leading-relaxed">
                    Within 3 km, over 10,000+ families live nearby. That’s 10,000+ potential skills, SAYZO connects local talent with real work - instantly.
                    </p>
                    <p className="text-xs sm:text-base lg:text-lg max-w-60 sm:max-w-2xl opacity-80 leading-relaxed"></p>
                </div>

                {/* 4. THE INVERTED "PUNCH-OUT" CORNER (Bottom Right) */}
                <div className="absolute bottom-0 right-0 flex items-end z-20">
                    
                    {/* TOP INVERTED CURVE (Vertical intersection) */}
                    <div className="absolute -top-[40px] right-0 w-[40px] h-[40px] overflow-hidden bg-transparent">
                        <div className="w-full h-full rounded-br-2xl shadow-[20px_20px_0_20px_white]" />
                    </div>

                    {/* LEFT INVERTED CURVE (Horizontal intersection) */}
                    <div className="absolute bottom-0 -left-[40px] w-[40px] h-[40px] overflow-hidden bg-transparent">
                        <div className="w-full h-full rounded-br-2xl shadow-[20px_20px_0_20px_white]" />
                    </div>

                    {/* THE WHITE BOX HOLDING THE BUTTON */}
                    <div className="bg-white pt-4 pl-2 sm:pt-4 sm:pl-3 pr-2 pb-2 rounded-tl-2xl sm:rounded-tl-2xl">
                        <Button className="bg-white text-black border-[1.5px] border-black rounded-full px-8 py-4 sm:px-14 sm:py-8 text-sm sm:text-lg lg:text-xl font-bold hover:bg-black hover:text-white transition-all duration-300">
                            Explore Why SAYZO
                        </Button>
                    </div>
                </div>
            </div>
            <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default WhySayzoPage;