"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import notificationMockup from "../../public/assets/notification.png";

export default function NotificationScreen() {
  const router = useRouter();

  useEffect(() => {
    const seen = localStorage.getItem("sayzo_notifications_seen");

    if (seen || Notification.permission === "granted") {
      router.replace("/location");
    }
  }, [router]);

  const requestNotifications = async () => {
    try {
      const permission = await Notification.requestPermission();

      localStorage.setItem("sayzo_notifications_seen", "true");

      if (permission === "granted") {
        console.log("Notifications allowed");
      }

      router.replace("/location");
    } catch (err) {
      console.error(err);
      router.replace("/location");
    }
  };

  const skipNotifications = () => {
    localStorage.setItem("sayzo_notifications_seen", "true");
    router.replace("/location");
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col lg:flex-row bg-white overflow-hidden">

      {/* Back */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 md:top-10 md:left-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-gray-100 bg-white/90 backdrop-blur-sm shadow-sm hover:bg-gray-50 transition-all z-50"
      >
        ←
      </button>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full lg:w-1/2 h-[50%] lg:h-full bg-white"
      >
        <Image
          src={notificationMockup}
          alt="Notifications Preview"
          fill
          priority
          className="object-cover object-top lg:object-contain"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 text-center lg:text-left"
      >
        <div className="max-w-[480px] w-full">

          <h1 className="text-[30px] md:text-[44px] lg:text-[52px] font-bold text-gray-900 mb-6">
            Don’t miss out on any update
          </h1>

          <p className="text-[#9CA3AF] text-base md:text-lg lg:text-[21px] mb-10">
            Never miss an update, every second counts.
          </p>

          <div className="flex flex-col gap-4 w-full max-w-[340px] mx-auto lg:mx-0">

            <button
              onClick={requestNotifications}
              className="w-full bg-black text-white py-4 md:py-6 rounded-full text-lg md:text-xl font-semibold hover:bg-gray-900"
            >
              Turn on notifications
            </button>

            <button
              onClick={skipNotifications}
              className="text-center text-[#9CA3AF] text-base md:text-[18px] font-medium hover:text-gray-600"
            >
              Another time
            </button>

          </div>
        </div>
      </motion.div>
    </div>
  );
}