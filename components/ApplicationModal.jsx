"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { addApplication, getUserProfile, hasUserApplied } from "@/lib/firebase";

// ─── Reusable UI primitives (matches TaskModal design system) ─────────────────

const baseInput =
  "w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition";

function SelectField({ name, value, onChange, children }) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`${baseInput} appearance-none pr-10 cursor-pointer`}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
    </div>
  );
}

// ─── Error boundary ───────────────────────────────────────────────────────────

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
        <div className="p-8 text-center">
          <p className="text-gray-500 mb-4 text-sm">Something went wrong.</p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              this.props.onClose?.();
            }}
            className="text-sm text-emerald-700 underline hover:text-emerald-800 transition-colors"
          >
            Close and try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

const ApplicationModal = ({ isOpen, onClose, task, onSuccess, currentUser }) => {
  const [loading, setLoading]                     = useState(false);
  const [checkingDuplicate, setCheckingDuplicate] = useState(false);
  const [alreadyApplied, setAlreadyApplied]       = useState(false);
  const [error, setError]                         = useState("");
  const [success, setSuccess]                     = useState(false);
  const [mounted, setMounted]                     = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const [bidAmount, setBidAmount] = useState(0);

  const [form, setForm] = useState({
    applicantName:  "",
    applicantRole:  "",
    description:    "",
    experience:     "",
    canFinishOnTime: "",
    email:          "",
    applicantPhone: "",
    city:           "",
  });

  const isNegotiable = task?.budgetType?.toLowerCase().includes("negotiat");

  // Seed bid from task amount when modal opens
  useEffect(() => {
    if (!isOpen || !task?.amount) return;
    const parsed = parseInt(String(task.amount).replace(/[^\d]/g, ""), 10);
    setBidAmount(isNaN(parsed) ? 0 : parsed);
  }, [isOpen, task?.amount]);

  // Check for duplicate application and pre-fill form when modal opens
  useEffect(() => {
    if (!isOpen || !currentUser || !task?.id) return;

    let isMounted = true;
    setCheckingDuplicate(true);
    setAlreadyApplied(false);
    setError("");

    const initializeModal = async () => {
      try {
        const applied = await hasUserApplied(task.id, currentUser.uid);
        if (!isMounted) return;

        if (applied) {
          setAlreadyApplied(true);
          setCheckingDuplicate(false);
          return;
        }

        try {
          const profile = await getUserProfile(currentUser.uid);
          if (!isMounted) return;
          if (profile) {
            setForm((prev) => ({
              ...prev,
              applicantName:  profile.fullName     || prev.applicantName,
              email:          currentUser?.email   || profile.email || prev.email,
              applicantPhone: profile.phone        || prev.applicantPhone,
            }));
          }
        } catch (profileErr) {
          console.error("Error fetching profile:", profileErr);
        }
      } catch (err) {
        console.error("Error checking application status:", err);
        if (isMounted) setError("Failed to check application status. Please try again.");
      } finally {
        if (isMounted) setCheckingDuplicate(false);
      }
    };

    initializeModal();
    return () => { isMounted = false; };
  }, [isOpen, task?.id, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.applicantName.trim())    return "Your name is required";
    if (!form.applicantRole.trim())    return "Your role/profession is required";
    if (!form.description.trim())      return "Please describe why you're the right fit";
    if (!form.experience)              return "Select your experience level";
    if (!form.canFinishOnTime)         return "Please indicate if you can finish on time";
    if (!form.email.trim())            return "Email is required";
    if (!form.applicantPhone.trim())   return "Mobile number is required";
    if (!/^\d{10}$/.test(form.applicantPhone.trim())) return "Enter a valid 10-digit mobile number";
    if (!form.city.trim())             return "City is required";
    return "";
  };

  const handleSubmit = useCallback(async () => {
    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    if (task?.giverId === currentUser?.uid) {
      setError("You cannot apply to your own task");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const alreadyExists = await hasUserApplied(task.id, currentUser.uid);
      if (alreadyExists) { setAlreadyApplied(true); setLoading(false); return; }

      await addApplication({
        taskId: task.id,
        giverId: task.giverId,
        ...form,
        ...(isNegotiable ? { bidAmount } : {}),
      });
      setSuccess(true);
      setTimeout(() => { onSuccess?.(); onClose(); }, 2000);
    } catch (err) {
      console.error("Application Error:", err);
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
    setBidAmount(0);
    setForm({
      applicantName: "", applicantRole: "", description: "",
      experience: "", canFinishOnTime: "", email: "",
      applicantPhone: "", city: "",
    });
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <ModalErrorBoundary onClose={onClose}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1001] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full sm:max-w-lg bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[95dvh] sm:max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-5 py-4 border-b border-gray-400 shrink-0">
                <h2 className="text-base font-semibold text-gray-900">Apply for Task</h2>
                <button
                  onClick={resetAndClose}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto flex-1 px-5 py-5 scrollbar-hide">

                {/* ── Checking state ── */}
                {checkingDuplicate ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                    <p className="text-sm text-gray-500">Checking application status…</p>
                  </div>

                /* ── Already applied ── */
                ) : alreadyApplied ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                    <AlertCircle className="w-12 h-12 text-amber-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Already Applied</h3>
                    <p className="text-sm text-gray-500 max-w-xs">
                      You have already submitted an application for this task.
                    </p>
                    <button
                      onClick={resetAndClose}
                      className="mt-2 px-6 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      Close
                    </button>
                  </div>

                /* ── Success ── */
                ) : success ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                    <CheckCircle className="w-12 h-12 text-emerald-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Application Submitted!</h3>
                    <p className="text-sm text-gray-500">The task giver will review your application.</p>
                  </div>

                /* ── Form ── */
                ) : (
                  <div className="space-y-4">

                    {/* Task info card */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Applying for</p>
                      <p className="text-sm font-semibold text-gray-900">{task?.taskName}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Budget: {task?.amount}
                        {task?.budgetType && (
                          <span className="ml-1 capitalize">({task.budgetType})</span>
                        )}
                      </p>
                    </div>

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Full Name</label>
                      <input
                        className={baseInput}
                        placeholder="e.g., Priya Sharma"
                        name="applicantName"
                        value={form.applicantName}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Role */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Role / Profession</label>
                      <input
                        className={baseInput}
                        placeholder="e.g., UI/UX Designer, Flutter Developer"
                        name="applicantRole"
                        value={form.applicantRole}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Why fit */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Why are you the right fit?</label>
                      <textarea
                        className={`${baseInput} resize-none`}
                        placeholder="Share relevant experience, similar work, or your approach…"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                      />
                    </div>

                    {/* Experience + Can finish row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Experience Level</label>
                        <SelectField name="experience" value={form.experience} onChange={handleChange}>
                          <option value="">Select level</option>
                          <option value="beginner">Beginner (0–2 yrs)</option>
                          <option value="intermediate">Intermediate (2–5 yrs)</option>
                          <option value="expert">Expert (5+ yrs)</option>
                        </SelectField>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                          Finish within {task?.duration || "deadline"}?
                        </label>
                        <SelectField name="canFinishOnTime" value={form.canFinishOnTime} onChange={handleChange}>
                          <option value="">Select…</option>
                          <option value="yes">Yes, definitely</option>
                          <option value="maybe">Maybe, depends on scope</option>
                          <option value="no">No, need more time</option>
                        </SelectField>
                      </div>
                    </div>

                    {/* Bid stepper — negotiable tasks only */}
                    {isNegotiable && (
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Your Bid</label>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setBidAmount((v) => Math.max(0, v - 50))}
                            className="px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-semibold transition-all shrink-0"
                          >
                            −50
                          </button>
                          <div className="relative flex-1">

  <input
    type="text"
    value={
    bidAmount === 0
      ? ""
      : `₹${bidAmount.toLocaleString("en-IN")}`
  }
    onChange={(e) => {
      const raw = e.target.value.replace(/,/g, ""); // remove commas
      const digits = raw.replace(/\D/g, ""); // keep only numbers
      setBidAmount(digits ? parseInt(digits) : 0);
    }}
    className="w-full text-center pl-7 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    placeholder="Enter bid"
    inputMode="numeric"
  />
</div>
                          <button
                            type="button"
                            onClick={() => setBidAmount((v) => v + 50)}
                            className="px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-semibold transition-all shrink-0"
                          >
                            +50
                          </button>
                        </div>
                        <p className="text-xs text-gray-400">Adjusts in ₹50 steps</p>
                      </div>
                    )}

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Email</label>
                      <input
                        className={baseInput}
                        placeholder="you@example.com"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Phone + City row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Mobile Number</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium select-none pointer-events-none">
                            +91
                          </span>
                          <input
                            className={`${baseInput} pl-11`}
                            placeholder="98765 43210"
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
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">City</label>
                        <input
                          className={baseInput}
                          placeholder="e.g., Bengaluru"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Error */}
                    {error && (
                      <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      disabled={loading}
                      onClick={handleSubmit}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      {loading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" />Submitting…</>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>
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
