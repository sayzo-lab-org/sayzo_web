"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { addJobApplication, getUserProfile, hasUserAppliedToJob } from "@/lib/firebase";

// Error boundary for modal
class ModalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("JobApplicationModal Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <p className="text-red-400 mb-4">Something went wrong.</p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              this.props.onClose?.();
            }}
            className="text-white underline"
          >
            Close and try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const JobApplicationModal = ({ isOpen, onClose, job, onSuccess, currentUser }) => {
  const [loading, setLoading] = useState(false);
  const [checkingDuplicate, setCheckingDuplicate] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure we're on client side for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    roleApplyingFor: "",
    measurableResults: "",
    ownershipSituation: "",
    hoursCommitment: "",
    failureConsequence: "",
    whyChooseYou: "",
  });

  // Check for duplicate application and pre-fill form when modal opens
  useEffect(() => {
    if (!isOpen || !currentUser || !job?.id) return;

    let isMounted = true;
    setCheckingDuplicate(true);
    setAlreadyApplied(false);
    setError("");

    const initializeModal = async () => {
      try {
        // Check if user already applied
        const applied = await hasUserAppliedToJob(job.id, currentUser.uid);
        if (!isMounted) return;

        if (applied) {
          setAlreadyApplied(true);
          setCheckingDuplicate(false);
          return;
        }

        // Pre-fill form from user profile
        try {
          const profile = await getUserProfile(currentUser.uid);
          if (!isMounted) return;

          if (profile) {
            setForm((prev) => ({
              ...prev,
              fullName: profile.fullName || prev.fullName,
              email: currentUser?.email || profile.email || prev.email,
              phoneNumber: profile.phone || prev.phoneNumber,
              roleApplyingFor: job?.title || prev.roleApplyingFor,
            }));
          } else {
            // Pre-fill with job title even if no profile
            setForm((prev) => ({
              ...prev,
              email: currentUser?.email || prev.email,
              roleApplyingFor: job?.title || prev.roleApplyingFor,
            }));
          }
        } catch (profileErr) {
          console.error("Error fetching profile:", profileErr);
          // Continue without pre-fill if profile fetch fails
          setForm((prev) => ({
            ...prev,
            roleApplyingFor: job?.title || prev.roleApplyingFor,
          }));
        }
      } catch (err) {
        console.error("Error checking application status:", err);
        if (isMounted) {
          setError("Failed to check application status. Please try again.");
        }
      } finally {
        if (isMounted) {
          setCheckingDuplicate(false);
        }
      }
    };

    initializeModal();

    return () => {
      isMounted = false;
    };
  }, [isOpen, job?.id, job?.title, currentUser]);

  const input =
    "w-full bg-[#18181B] text-white placeholder:text-zinc-500 px-4 py-4 my-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Full name is required";
    if (!form.phoneNumber.trim()) return "Phone number is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.roleApplyingFor.trim()) return "Role you're applying for is required";
    if (!form.measurableResults.trim()) return "Please share your measurable results";
    if (!form.ownershipSituation.trim()) return "Please describe an ownership situation";
    if (!form.hoursCommitment.trim()) return "Please specify your time commitment";
    if (!form.failureConsequence.trim()) return "Please answer the failure consequence question";
    if (!form.whyChooseYou.trim()) return "Please tell us why we should choose you";
    return "";
  };

  const handleSubmit = useCallback(async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Double-check for duplicate before submitting
      const alreadyExists = await hasUserAppliedToJob(job.id, currentUser.uid);
      if (alreadyExists) {
        setAlreadyApplied(true);
        setLoading(false);
        return;
      }

      await addJobApplication({
        jobId: job.id,
        jobTitle: job.title,
        ...form,
      });
      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Job Application Error:", err);
      if (err.message?.includes("duplicate") || err.message?.includes("already applied")) {
        setAlreadyApplied(true);
      } else {
        setError("Failed to submit application. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [form, job, onClose, onSuccess, currentUser]);

  const resetAndClose = () => {
    setError("");
    setSuccess(false);
    setForm({
      fullName: "",
      phoneNumber: "",
      email: "",
      roleApplyingFor: "",
      measurableResults: "",
      ownershipSituation: "",
      hoursCommitment: "",
      failureConsequence: "",
      whyChooseYou: "",
    });
    onClose();
  };

  // Don't render on server
  if (!mounted) return null;

  return createPortal(
    <ModalErrorBoundary onClose={onClose}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1001] bg-black/80 backdrop-blur flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-black border border-zinc-800 rounded-2xl"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">
                <h2 className="text-xl text-white font-semibold">
                  Apply for Position
                </h2>
                <button onClick={resetAndClose}>
                  <X className="text-zinc-400 hover:text-white" />
                </button>
              </div>

              <div className="max-h-[75vh] overflow-y-auto px-6 py-4 scrollbar-hide">
                {/* Loading state while checking duplicate */}
                {checkingDuplicate ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-zinc-400 mb-4" />
                    <p className="text-zinc-400">Checking application status...</p>
                  </div>
                ) : alreadyApplied ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
                    <h3 className="text-white text-xl font-semibold">
                      Already Applied
                    </h3>
                    <p className="text-zinc-400 mt-2">
                      You have already submitted an application for this position.
                    </p>
                    <button
                      onClick={resetAndClose}
                      className="mt-6 px-6 py-2 bg-zinc-800 text-white rounded-full font-medium hover:bg-zinc-700 transition"
                    >
                      Close
                    </button>
                  </div>
                ) : success ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <h3 className="text-white text-xl font-semibold">
                      Application Submitted!
                    </h3>
                    <p className="text-zinc-400 mt-2">
                      We will review your application and get back to you soon.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Job Info */}
                    <div className="bg-zinc-900 rounded-lg p-4 mb-4">
                      <p className="text-zinc-400 text-xs mb-1">Applying for:</p>
                      <p className="text-white font-medium">{job?.title}</p>
                      {job?.category && (
                        <p className="text-zinc-500 text-sm mt-1">
                          Category: {job.category}
                        </p>
                      )}
                    </div>

                    {/* Form */}
                    <div className="space-y-1">
                      <label className="block text-zinc-400 text-sm mt-4">Full Name *</label>
                      <input
                        className={input}
                        placeholder="Enter your full name"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                      />

                      <label className="block text-zinc-400 text-sm mt-2">Phone Number *</label>
                      <input
                        className={input}
                        placeholder="Enter your phone number"
                        name="phoneNumber"
                        type="tel"
                        value={form.phoneNumber}
                        onChange={handleChange}
                      />

                      <label className="block text-zinc-400 text-sm mt-2">Email *</label>
                      <input
                        className={input}
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                      />

                      <label className="block text-zinc-400 text-sm mt-2">Role You're Applying For *</label>
                      <input
                        className={input}
                        placeholder="e.g., Frontend Developer, UI Designer"
                        name="roleApplyingFor"
                        value={form.roleApplyingFor}
                        onChange={handleChange}
                      />

                      <label className="block text-zinc-400 text-sm mt-2">
                        What measurable results have you created in your previous work? *
                      </label>
                      <p className="text-zinc-500 text-xs mb-1">
                        Share numbers, outcomes, proof links if any.
                      </p>
                      <textarea
                        className={`${input} h-28 resize-none`}
                        placeholder="e.g., Increased conversion by 40%, reduced load time by 2 seconds..."
                        name="measurableResults"
                        value={form.measurableResults}
                        onChange={handleChange}
                      />

                      <label className="block text-zinc-400 text-sm mt-2">
                        Describe a situation where you took full ownership of a problem and solved it. *
                      </label>
                      <textarea
                        className={`${input} h-28 resize-none`}
                        placeholder="Tell us about a challenge you faced and how you resolved it..."
                        name="ownershipSituation"
                        value={form.ownershipSituation}
                        onChange={handleChange}
                      />

                      <label className="block text-zinc-400 text-sm mt-2">
                        How many hours can you commit daily, and for how long (months/years)? *
                      </label>
                      <input
                        className={input}
                        placeholder="e.g., 8 hours/day for at least 2 years"
                        name="hoursCommitment"
                        value={form.hoursCommitment}
                        onChange={handleChange}
                      />

                      <label className="block text-zinc-400 text-sm mt-2">
                        If you fail to deliver on a committed deadline at Sayzo, what should be the consequence? *
                      </label>
                      <input
                        className={input}
                        placeholder="Share your thoughts..."
                        name="failureConsequence"
                        value={form.failureConsequence}
                        onChange={handleChange}
                      />

                      <label className="block text-zinc-400 text-sm mt-2">
                        Why should Sayzo choose you over 100 other applicants? *
                      </label>
                      <textarea
                        className={`${input} h-28 resize-none`}
                        placeholder="Tell us what makes you stand out..."
                        name="whyChooseYou"
                        value={form.whyChooseYou}
                        onChange={handleChange}
                      />
                    </div>

                    {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

                    <button
                      disabled={loading}
                      onClick={handleSubmit}
                      className="w-full mt-6 bg-[#13a884] hover:bg-[#0f8c6e] text-white py-4 rounded-full font-semibold disabled:opacity-50 flex items-center justify-center gap-2 transition"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalErrorBoundary>,
    document.body
  );
};

export default JobApplicationModal;
