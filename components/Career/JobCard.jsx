

const JobCard= ({ job }) => {
  return (
    <div className="bg-white py-6 px-8 rounded-sm shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-gray-50 mb-6 group">
      <div className="flex flex-col">
        <h3 className="text-[28px] font-semibold text-[#111827] mb-3">
          {job.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {job.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="px-4.5 py-1 rounded-full border border-black text-sm font-medium "
            >
              {tag}
            </span>
          ))}
        </div>
        
        <p className=" text-base leading-6 mb-4">
          {job.description}
        </p>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-[#13a884] hover:bg-[#0f8c6e] text-white px-7 py-3 rounded-full font-medium text-base transition-all transform active:scale-95">
            Apply now
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
