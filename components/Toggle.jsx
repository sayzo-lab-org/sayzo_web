"use client";
import { useState } from "react";

export default function Toggle() {
  const [viewMode, setViewMode] = useState("giver");

  const toggleMode = () => {
    setViewMode((prev) => (prev === "giver" ? "doer" : "giver"));
  };

  return (
    <button
      onClick={toggleMode}
      className={`relative w-[72px] h-7 rounded-full border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-400 ${
        viewMode === "giver"
          ? "bg-white border-gray-300"
          : "bg-black border-gray-900"
      }`}
    >
      {/* Sliding Knob */}
      <div
        className={`absolute top-[3px] left-[3px] w-10 h-5 rounded-full shadow-md flex items-center justify-center text-[11px] font-semibold transition-transform duration-300 ease-out tracking-wide ${
          viewMode === "giver"
            ? "translate-x-0 bg-[#10A37F] text-white"
            : "translate-x-6 bg-white text-gray-900"
        }`}
      >
        {viewMode === "giver" ? "Giver" : "Doer"}
      </div>
    </button>
  );
}