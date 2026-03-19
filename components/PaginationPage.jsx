"use client";

const PaginationPage = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 justify-center text-black">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currentPage === i + 1
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-emerald-50 hover:text-emerald-700"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default PaginationPage;
