

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center justify-center gap-6 py-8">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-[16px] font-medium transition-all ${
            p === currentPage 
              ? 'bg-[#13a884] text-white' 
              : 'text-[#9ca3af] hover:text-[#13a884]'
          }`}
        >
          {p}
        </button>
      ))}
      
      {totalPages > pages.length && <span className="text-[#9ca3af]">...</span>}
      
      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`flex items-center justify-center transition-colors ${
          currentPage === totalPages ? 'text-gray-200 cursor-not-allowed' : 'text-[#9ca3af] hover:text-[#13a884]'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
