"use client";

const PaginationPage = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 justify-center text-black">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded-md text-sm transition ${
            currentPage === i + 1
              ? "bg-primary-btn text-black"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default PaginationPage;
