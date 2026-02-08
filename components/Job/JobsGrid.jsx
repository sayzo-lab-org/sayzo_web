"use client";

import JobCard from "./JobCard";
import { jobs } from "./jobsData";

const JobsGrid = () => {
  return (
    <section className="max-w-350 mx-auto px-4 py-12">
      
      {/* DESKTOP + TABLET GRID */}
      <div
        className="
          hidden sm:grid
          grid-cols-2
          lg:grid-cols-3
          gap-4
        "
      >
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* MOBILE SLIDER */}
      <div className="sm:hidden">
        <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="min-w-[85%] shrink-0"
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center mt-3">
          Swipe to see more →
        </p>
      </div>
    </section>
  );
};

export default JobsGrid;
