"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import notificationMockup from "../../public/assets/notification.png"; 

export default function NotificationScreen() {
  const router = useRouter();

  return (
    // Remove all padding from the main wrapper to allow edge-to-edge on mobile
    <div className="fixed inset-0 z-[9999] flex flex-col lg:flex-row bg-white overflow-hidden">
      
      {/* Back Button - Positioned absolutely so it floats over the image */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 md:top-10 md:left-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-gray-100 bg-white/90 backdrop-blur-sm shadow-sm hover:bg-gray-50 transition-all z-50"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>

      {/* LEFT/TOP: Visual Section - Flush to edges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full lg:w-1/2 h-[50%] lg:h-full bg-white overflow-hidden"
      >
        {/* The Image Container - No padding, no margin */}
        <div className="relative w-full h-full">
          <Image
            src={notificationMockup}
            alt="Notifications Preview"
            priority
            fill
            // object-top ensures the notch and top of the phone are flush with the screen top on mobile
            className="object-cover object-top lg:object-contain lg:object-left"
          />
        </div>
      </motion.div>

      {/* RIGHT/BOTTOM: Interaction Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white px-6 md:px-12 lg:px-24 text-center lg:text-left h-[50%] lg:h-full z-20"
      >
        <div className="max-w-[480px] w-full">
          <h1 className="text-[30px] md:text-[44px] lg:text-[52px] font-bold text-gray-900 leading-[1.2] lg:leading-[1.1] tracking-tight mb-4 md:mb-6">
            Don’t miss out on <br className="hidden lg:block" /> any new update.
          </h1>

          <p className="text-[#9CA3AF] text-base md:text-lg lg:text-[21px] mb-8 md:mb-12">
            Never miss an update, every second counts.
          </p>

          <div className="flex flex-col gap-4 w-full max-w-[340px] mx-auto lg:mx-0">
            <button 
              onClick={() => router.push("/location")}
              className="w-full bg-black text-white py-4 md:py-6 rounded-full text-lg md:text-xl font-semibold active:scale-[0.98] transition-all hover:bg-gray-900"
            >
              Turn on notifications
            </button>

            <button 
              onClick={() => router.push("/location")}
              className="text-center text-[#9CA3AF] text-base md:text-[18px] font-medium hover:text-gray-600 transition-colors"
            >
              Another time
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}