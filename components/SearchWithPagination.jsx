"use client";

import { useEffect, useRef, useState } from "react";

const SearchWithPagination = ({ onSearch }) => {
  const [value, setValue] = useState("");
  const isFirstRender = useRef(true);

  /* ================= AUTO SEARCH (DEBOUNCE) ================= */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const delay = setTimeout(() => {
      onSearch(value);
    }, 300);

    return () => clearTimeout(delay);
  }, [value, onSearch]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value); // button search
      }}
      className="max-w-350 mx-auto px-4 mt-32"
    >
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-body"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search jobs (Marketing, Design, React...)"
          className="
            block w-full p-3 ps-9 rounded-xl border-gray-200
            bg-neutral-secondary-medium
            border border-default-medium
            text-heading sm:text-sm text-xs
            rounded-base
            focus:ring-primary-btn focus:border-primary-btn
            placeholder:text-body
            outline-none
          "
        />

        {/* Button */}
        <button
          type="submit"
          className="
            absolute end-3 bottom-2
            text-white bg-primary-btn hover:bg-primary-btn/90
            text-xs font-medium
            px-3 py-1.5 rounded-lg
          "
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchWithPagination;
