"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div
      className={`rounded-xl border border-primary-btn/30 p-4 md:p-5 transition-colors ${
        isOpen ? "bg-primary-btn/5" : "bg-primary-btn/3"
      }`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between text-left gap-4"
      >
        <h3 className="font-medium text-sm md:text-base">
          {question}
        </h3>

        <span className="flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-full bg-primary-btn text-white transition-transform duration-500">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${
          isOpen
            ? "max-h-40 opacity-100 mt-3"
            : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FAQItem;
