'use client'
import { useState, useMemo } from 'react';
import Sidebar from '@/components/Career/Sidebar';
import JobCard from '@/components/Career/JobCard';
import Pagination from '@/components/Career/Pagination';
import { MOCK_JOBS, CATEGORY_STATS } from '@/public/data/MockJob';

const JOBS_PER_PAGE = 5;

const CareersClient = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredJobs = useMemo(() => {
    let jobs = MOCK_JOBS;
    if (activeCategory !== 'All') {
      jobs = MOCK_JOBS.filter(job => job.category === activeCategory);
    }
    return jobs;
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  const currentJobs = useMemo(() => {
    const start = (currentPage - 1) * JOBS_PER_PAGE;
    return filteredJobs.slice(start, start + JOBS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="mt-20 bg-[#f8fafc] py-16 px-4 md:px-8">
      <div className="max-w-300 mx-auto">
        <header className="mb-20 mt-30 text-center">
          <h1 className=" text-[40px] md:text-6xl font-medium text-[#111827]">
            We have <span className="text-[#111827]">17</span> open positions now!
          </h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          <Sidebar 
            categories={CATEGORY_STATS} 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />
          <main className="flex-1">
            <div className="flex flex-col">
              {currentJobs.length > 0 ? (
                <>
                  {currentJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                  {totalPages > 1 && (
                    <Pagination 
                      currentPage={currentPage} 
                      totalPages={totalPages} 
                      onPageChange={setCurrentPage} 
                    />
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-transparent border-2 border-dashed border-[#e5e7eb]">
                  <p className="text-[#9ca3af] text-[15px]">No positions found for this category.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CareersClient;