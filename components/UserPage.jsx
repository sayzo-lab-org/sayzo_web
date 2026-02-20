"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import {
  subscribeToApprovedTasks,
  subscribeToApplicationsByApplicant
} from "@/lib/firebase";
import { jobs as dummyJobs } from "@/public/data/job";
import { useAuth } from "@/app/Context/AuthContext";

import JobCard from "@/components/Job/JobCard";
import JobDetailPanel from "@/components/Job/JobDetailPanel";
import JobBottomSheet from "@/components/Job/JobBottomSheet";
import SearchWithPagination from "@/components/SearchWithPagination";
import CustomIcons from "@/components/CustomIcons";
import MegaMenu from "./MegaMenu";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";

// Map Firestore task to job card format
const mapTaskToJob = (task) => ({
  id: task.id,
  giverId: task.giverId, // Preserve for ownership check
  status: task.status, // For completed task check
  type: task.taskType || "online",
  title: task.taskName || "Untitled Task",
  deadline: task.duration || "Flexible",
  price: task.amount || "0",
  work_mode: task.location === "Online" ? "Online" : "Offline",
  skills: task.skills ? task.skills.split(",").map((s) => s.trim()) : [],
  tags: task.skills ? task.skills.split(",").map((s) => s.trim()) : [],
  description: task.description || "",
  company: {
    name: task.customerName || "Anonymous",
    about: "Verified task giver on the platform",
  },
  budget: {
    amount: `₹${task.amount || "0"}`,
    type: task.budgetType === "fixed" ? "Fixed" : "Open to Negotiate",
  },
  duration: task.duration || "Flexible",
});

const UserPage = ({ mode = "live" }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [myApplications, setMyApplications] = useState([]);

  // Use centralized auth context
  const { user: currentUser } = useAuth();

  // Retry handler for error recovery
  const handleRetry = useCallback(() => {
    setError("");
    setLoading(true);
    // Force re-mount by updating key (subscriptions will re-establish)
    window.location.reload();
  }, []);

  /* ================= REAL-TIME TASKS SUBSCRIPTION ================= */
  useEffect(() => {
    // Showcase mode: Show only dummy data, no auth required
    if (mode === "showcase") {
      setJobs(dummyJobs);
      setMyApplications([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    // Real-time subscription to approved tasks
    const unsubscribeTasks = subscribeToApprovedTasks(
      (tasks) => {
        if (!isMounted) return;
        const mappedJobs = tasks.map(mapTaskToJob);
        setJobs(mappedJobs);
        setLoading(false);
        setError("");
      },
      (err) => {
        if (!isMounted) return;
        console.error("Tasks subscription error:", err);
        setError("Failed to load tasks. Please try again.");
        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      if (unsubscribeTasks) unsubscribeTasks();
    };
  }, [mode]);

  /* ================= APPLICATIONS SUBSCRIPTION ================= */
  useEffect(() => {
    if (mode === "showcase" || !currentUser) {
      setMyApplications([]);
      return;
    }

    let isMounted = true;

    // Real-time subscription to user's applications
    const unsubscribeApps = subscribeToApplicationsByApplicant(
      currentUser.uid,
      (applications) => {
        if (!isMounted) return;
        setMyApplications(applications);
      },
      (err) => {
        if (!isMounted) return;
        console.error("Applications subscription error:", err);
        // Don't show error for applications - just log it
      }
    );

    return () => {
      isMounted = false;
      if (unsubscribeApps) unsubscribeApps();
    };
  }, [mode, currentUser]);

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
  const ITEMS_PER_PAGE = useMemo(() => (isMobile ? 10 : 15), [isMobile]);

  /* ================= SEARCH + FILTER ================= */
  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return jobs;

    const query = searchQuery.toLowerCase();

    return jobs.filter((job) => {
      const titleMatch = job.title?.toLowerCase().includes(query);
      const categoryMatch = job.category?.toLowerCase().includes(query);
      const skillsMatch = job.skills?.some((tag) =>
        tag.toLowerCase().includes(query)
      );

      return titleMatch || categoryMatch || skillsMatch;
    });
  }, [searchQuery, jobs]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ================= APPLICATION HELPERS ================= */
  const hasApplied = (taskId) => {
    return myApplications.some((app) => app.taskId === taskId);
  };

  const isOwnTask = (task) => {
    // Return false if user is not authenticated or task has no giverId
    if (!currentUser?.uid || !task?.giverId) return false;
    return task.giverId === currentUser.uid;
  };

  const handleApplicationSuccess = useCallback(() => {
    // With real-time subscriptions, applications will auto-update
    // This callback can still be used for optimistic UI updates if needed
    console.log("Application submitted - subscription will auto-update");
  }, []);

  /* ================= ERROR STATE ================= */
  if (error && !loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h3>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-btn text-white rounded-full font-medium hover:bg-opacity-90 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary-btn mx-auto mb-4" />
          <p className="text-gray-500">Loading tasks...</p>
        </div>
      </div>
    );
  }

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
                  className={`cursor-pointer border-2 border-gray-200 rounded-xl p-4 transition ${
                    job.status === 'completed' ? 'hover:border-red-500' : 'hover:border-primary-btn'
                  }`}
                >
                  <JobCard job={job} status={job.status} />
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
                          : `border-gray-200 ${job.status === 'completed' ? 'hover:border-red-500' : 'hover:border-primary-btn'}`
                      }`}
                  >
                    <JobCard job={job} status={job.status} />
                  </div>
                ))}
              </div>

              <JobDetailPanel
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
                currentUser={currentUser}
                hasApplied={hasApplied(selectedJob?.id)}
                isOwnTask={isOwnTask(selectedJob)}
                onApplicationSuccess={handleApplicationSuccess}
                mode={mode}
              />
            </section>
          )}

          {filteredJobs.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No tasks match your search
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
              <JobCard job={job} status={job.status} />
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No tasks match your search
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
              currentUser={currentUser}
              hasApplied={hasApplied(selectedJob?.id)}
              isOwnTask={isOwnTask(selectedJob)}
              onApplicationSuccess={handleApplicationSuccess}
              mode={mode}
            />
          )}
        </section>
      )}
    </div>
  );
};

export default UserPage;
