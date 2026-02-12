"use client";

import { useEffect, useMemo, useState } from "react";
import { jobs } from "@/public/data/job";

import JobCard from "@/components/Job/JobCard";
import JobDetailPanel from "@/components/Job/JobDetailPanel";
import JobBottomSheet from "@/components/Job/JobBottomSheet";
import SearchWithPagination from "@/components/SearchWithPagination";
import CustomIcons from "@/components/CustomIcons";
import MegaMenu from "./MegaMenu";

export const metadata = {
  title: "Use Cases | How to use SAYZO",
  description: "Discover real-world examples of how people are using SAYZO to solve problems and find local help.",
  openGraph: {
    title: "SAYZO Use Cases",
    url: "https://sayzo.in/use-cases",
  },
};

const UserPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  /* ================= SCREEN SIZE ================= */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= RESET PAGE ON SEARCH ================= */
  useEffect(() => {
    setCurrentPage(1);
    setSelectedJob(null);
  }, [searchQuery]);

  /* ================= PAGINATION ================= */
  const ITEMS_PER_PAGE = useMemo(
    () => (isMobile ? 10 : 15),
    [isMobile]
  );

  /* ================= SEARCH + FILTER ================= */
  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return jobs;

    const query = searchQuery.toLowerCase();

    return jobs.filter((job) => {
      const titleMatch = job.title.toLowerCase().includes(query);
      const categoryMatch = job.category?.toLowerCase().includes(query);
      const skillsMatch = job.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      );

      return titleMatch || categoryMatch || skillsMatch;
    });
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ================================================= */
  return (
    <div className="">
      {/* ================= SEARCH ================= */}
      <SearchWithPagination onSearch={setSearchQuery} />

      <MegaMenu />

      {/* ================= DESKTOP ================= */}
      {!isMobile && (
        <>
          {!selectedJob && (
            <section className="max-w-350 mx-auto px-4 py-12 grid grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="cursor-pointer border-2 border-gray-200 rounded-xl p-4 hover:border-primary-btn transition"
                >
                  <JobCard job={job} />
                </div>
              ))}
            </section>
          )}

          {selectedJob && (
            <section className="max-w-350 mx-auto relative z-10 px-4 py-12 grid grid-cols-[1.2fr_1fr] gap-6">
              <div className="space-y-4 overflow-y-auto max-h-[80vh] pr-2">
                {paginatedJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`cursor-pointer rounded-xl border-2 p-4 transition
                      ${
                        selectedJob.id === job.id
                          ? "border-primary-btn bg-primary-btn/5"
                          : "border-gray-200 hover:border-primary-btn"
                      }`}
                  >
                    <JobCard job={job} />
                  </div>
                ))}
              </div>

              <JobDetailPanel
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
              />
            </section>
          )}

          {filteredJobs.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No jobs match your search
            </div>
          )}

          <CustomIcons
            page={currentPage}
            count={totalPages}
            onChange={setCurrentPage}
          />
        </>
      )}

      {/* ================= MOBILE ================= */}
      {isMobile && (
        <section className="px-4 py-6 space-y-4">
          {paginatedJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="border-2 border-gray-200 rounded-xl p-4"
            >
              <JobCard job={job} />
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No jobs match your search
            </div>
          )}

          <CustomIcons
            page={currentPage}
            count={totalPages}
            onChange={setCurrentPage}
          />

          {selectedJob && (
            <JobBottomSheet
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
            />
          )}
        </section>
      )}
    </div>
  );
};

export default UserPage;
