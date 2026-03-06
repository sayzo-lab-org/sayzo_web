"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import locationMap from "../../public/assets/location.png"; 

export default function LocationPermissionScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAllowLocation = () => {
  setLoading(true);
  setError(null);

  if (!navigator.geolocation) {
    setError("Geolocation is not supported by your browser.");
    setLoading(false);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      const coords = {
        lat: latitude,
        lng: longitude
      };

      localStorage.setItem(
        "sayzo_user_location",
        JSON.stringify(coords)
      );

      console.log("Location captured:", coords);

      setLoading(false);
      router.replace("/");
    },
    (err) => {
      setLoading(false);

      switch (err.code) {
        case err.PERMISSION_DENIED:
          setError("Please allow location access to continue.");
          break;
        case err.POSITION_UNAVAILABLE:
          setError("Location information is unavailable.");
          break;
        case err.TIMEOUT:
          setError("Location request timed out.");
          break;
        default:
          setError("Something went wrong.");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
};
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col lg:flex-row bg-white overflow-hidden">
      
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 md:top-10 md:left-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-gray-100 bg-white/90 backdrop-blur-sm shadow-sm hover:bg-gray-50 transition-all z-50"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>

      {/* LEFT/TOP: Map Visual */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full lg:w-1/2 h-[50%] lg:h-full bg-[#f8f8f8] overflow-hidden"
      >
        <div className="relative w-full h-full">
          <Image
            src={locationMap}
            alt="Map location preview"
            priority
            fill
            className="object-cover object-center"
          />
        </div>
      </motion.div>

      {/* RIGHT/BOTTOM: Interaction Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white px-6 md:px-12 lg:px-24 text-center lg:text-left h-[50%] lg:h-full z-20"
      >
        <div className="max-w-[480px] w-full">
          <h1 className="text-[32px] md:text-[44px] lg:text-[52px] font-bold text-gray-900 leading-[1.2] lg:leading-[1.1] tracking-tight mb-4 md:mb-6">
            Allow us to <br className="hidden lg:block" /> fetch location
          </h1>

          <p className="text-[#9CA3AF] text-base md:text-lg lg:text-[21px] mb-8 md:mb-12 leading-relaxed">
            Connect with trusted people nearby to get your tasks done instantly, safely, and efficiently.
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4 font-medium animate-pulse">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-4 w-full max-w-[340px] mx-auto lg:mx-0">
            <button 
              onClick={handleAllowLocation}
              disabled={loading}
              className="w-full bg-black text-white py-4 md:py-6 rounded-full text-lg md:text-xl font-semibold active:scale-[0.98] transition-all hover:bg-gray-900 shadow-xl shadow-black/5 flex items-center justify-center gap-2"
            >
              {loading ? "Fetching..." : "Turn on location"}
            </button>

            <button 
              onClick={() => router.push("/signup")}
              className="text-center text-[#9CA3AF] text-base md:text-[18px] font-medium hover:text-gray-600 transition-colors py-2"
            >
              Another time
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}