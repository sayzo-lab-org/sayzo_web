"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { addApplication, getUserProfile, hasUserApplied } from "@/lib/firebase";

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
    console.error("ApplicationModal Error:", error, errorInfo);
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

const ApplicationModal = ({ isOpen, onClose, task, onSuccess, currentUser }) => {
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
    applicantName: "",
    applicantRole: "",
    description: "",
    experience: "",
    canFinishOnTime: "",
    email: "",
    applicantPhone: "",
    city: "",
  });

  // Check for duplicate application and pre-fill form when modal opens
  useEffect(() => {
    if (!isOpen || !currentUser || !task?.id) return;

    let isMounted = true;
    setCheckingDuplicate(true);
    setAlreadyApplied(false);
    setError("");

    const initializeModal = async () => {
      try {
        // Check if user already applied
        const applied = await hasUserApplied(task.id, currentUser.uid);
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
              applicantName: profile.fullName || prev.applicantName,
              email: currentUser?.email || profile.email || prev.email,
              applicantPhone: profile.phone || prev.applicantPhone,
            }));
          }
        } catch (profileErr) {
          console.error("Error fetching profile:", profileErr);
          // Continue without pre-fill if profile fetch fails
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
  }, [isOpen, task?.id, currentUser]);

  const input =
    "w-full bg-[#18181B] text-white placeholder:text-zinc-500 px-4 py-4 my-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.applicantName.trim()) return "Your name is required";
    if (!form.applicantRole.trim()) return "Your role/profession is required";
    if (!form.description.trim()) return "Description is required";
    if (!form.experience) return "Select your experience level";
    if (!form.canFinishOnTime) return "Please indicate if you can finish on time";
    if (!form.email.trim()) return "Email is required";
    if (!form.applicantPhone.trim()) return "Mobile number is required";
    if (!/^\d{10}$/.test(form.applicantPhone.trim())) return "Enter a valid 10-digit mobile number";
    if (!form.city.trim()) return "City is required";
    return "";
  };

  const handleSubmit = useCallback(async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Safety check: Prevent self-application
    if (task?.giverId === currentUser?.uid) {
      setError("You cannot apply to your own task");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Double-check for duplicate before submitting
      const alreadyExists = await hasUserApplied(task.id, currentUser.uid);
      if (alreadyExists) {
        setAlreadyApplied(true);
        setLoading(false);
        return;
      }

      await addApplication({
        taskId: task.id,
        giverId: task.giverId,
        ...form,
      });
      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Application Error:", err);
      // Map specific error codes to user-friendly messages
      if (err.message?.includes("duplicate") || err.message?.includes("already applied")) {
        setAlreadyApplied(true);
      } else {
        setError("Failed to submit application. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [form, task, onClose, onSuccess]);

  const resetAndClose = () => {
    setError("");
    setSuccess(false);
    setForm({
      applicantName: "",
      applicantRole: "",
      description: "",
      experience: "",
      canFinishOnTime: "",
      email: "",
      applicantPhone: "",
      city: "",
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
              className="w-full max-w-md bg-black border border-zinc-800 rounded-2xl"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">
                <h2 className="text-xl text-white font-semibold">
                  Apply for this Task
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
                      You have already submitted an application for this task.
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
                    The task giver will review your application
                  </p>
                </div>
              ) : (
                <>
                  {/* Task Info */}
                  <div className="bg-zinc-900 rounded-lg p-4 mb-4">
                    <p className="text-zinc-400 text-xs mb-1">Applying for:</p>
                    <p className="text-white font-medium">{task?.taskName}</p>
                    <p className="text-zinc-500 text-sm mt-1">
                      Budget: {task?.amount} ({task?.budgetType})
                    </p>
                  </div>

                  {/* Form */}
                  <input
                    className={input}
                    placeholder="Your Name *"
                    name="applicantName"
                    value={form.applicantName}
                    onChange={handleChange}
                  />

                  <input
                    className={input}
                    placeholder="Your Role/Profession (UI/UX Designer, Flutter Developer, Tutor etc) *"
                    name="applicantRole"
                    value={form.applicantRole}
                    onChange={handleChange}
                  />

                  <textarea
                    className={`${input} h-24 resize-none`}
                    placeholder="Why are you the right fit? Share relevant experience, similar work, or approach. *"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  />

                  <select
                    name="experience"
                    className={input}
                    value={form.experience}
                    onChange={handleChange}
                  >
                    <option value="">Select Experience Level *</option>
                    <option value="beginner">Beginner (0-2 years)</option>
                    <option value="intermediate">Intermediate (2-5 years)</option>
                    <option value="expert">Expert (5+ years)</option>
                  </select>

                  <select
                    name="canFinishOnTime"
                    className={input}
                    value={form.canFinishOnTime}
                    onChange={handleChange}
                  >
                    <option value="">Can you finish within {task?.duration}? *</option>
                    <option value="yes">Yes, definitely</option>
                    <option value="maybe">Maybe, depends on scope</option>
                    <option value="no">No, I need more time</option>
                  </select>

                  <input
                    className={input}
                    placeholder="Email *"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />

                  <div className="relative my-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium select-none pointer-events-none">
                      +91
                    </span>
                    <input
                      className={`${input} pl-14 my-0`}
                      placeholder="Mobile Number *"
                      type="tel"
                      name="applicantPhone"
                      maxLength={10}
                      inputMode="numeric"
                      value={form.applicantPhone}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setForm((prev) => ({ ...prev, applicantPhone: cleaned }));
                      }}
                    />
                  </div>

                  <input
                    className={input}
                    placeholder="City *"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                  />

                  {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

                  <button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="w-full mt-4 bg-white text-black py-4 rounded-full font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
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

export default ApplicationModal;
