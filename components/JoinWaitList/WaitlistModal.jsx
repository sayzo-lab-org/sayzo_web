'use client';

import { useState, useEffect } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- JS ENUM (KEEP FOR FUTURE) ---------- */
// const FormStep = {
//   PERSONAL_DETAILS: 1,
//   PROFESSIONAL_INFO: 2,
//   RESOURCE_ALLOCATION: 3,
//   SUMMARY: 4,
// };

const inputBase = (hasError) =>
  `w-full bg-white border rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400
   focus:outline-none focus:ring-2 transition
   ${hasError ? "border-red-400 focus:ring-red-300" : "border-gray-200 focus:ring-emerald-500 hover:border-gray-300"}`;

const WaitlistModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess]           = useState(false);
  const [fieldErrors, setFieldErrors]   = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",

    // ⏸️ FUTURE FIELDS (DO NOT REMOVE)
    // linkedIn: "",
    // location: "",
    // skills: [],
    // occupation: [],
    // hoursPerWeek: 10,
    // outsourcingBudget: 500,
  });

  /* ---------- HANDLERS ---------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim())
      errors.fullName = "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errors.email = "Enter a valid email address";
    if (!formData.phoneNumber || formData.phoneNumber.length !== 10)
      errors.phoneNumber = "Phone number must be 10 digits";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Server error (${res.status})`);
      }

      setSuccess(true);
    } catch (err) {
      console.error("[waitlist] submit error:", err);
      setFieldErrors((p) => ({ ...p, _form: err.message || "Failed to submit. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    onClose();
    setSuccess(false);
    setFieldErrors({});
    setFormData({ fullName: "", phoneNumber: "", email: "" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-y-auto max-h-[calc(100dvh-2rem)]"
          >
            {success ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center text-center px-8 py-10 gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-1">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">You're on the list!</h3>
                {/* <p className="text-sm text-gray-500">
                  We'll reach out as soon as a spot opens up.
                </p> */}
                <button
                  onClick={resetForm}
                  className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <>
                {/* Header */}
                <div className="flex justify-between items-start p-5 ">
                  <div>
                    <h2 className="text-[15px] font-semibold text-gray-900 leading-tight">
                      Join the Waitlist
                    </h2>
                    {/* <p className="text-xs text-gray-400 mt-0.5">
                      Be first to know when we launch. No spam, ever.
                    </p> */}
                  </div>
                  <button
                    onClick={resetForm}
                    className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors -mt-0.5 -mr-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 mx-5" />

                {/* Fields */}
                <div className="px-5 py-5 space-y-4">
                  {/* Form-level error */}
                  {fieldErrors._form && (
                    <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                      {fieldErrors._form}
                    </p>
                  )}

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                    <input
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={inputBase(!!fieldErrors.fullName)}
                    />
                    {fieldErrors.fullName && (
                      <p className="text-[11px] text-red-500 mt-1">{fieldErrors.fullName}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Phone Number</label>
                    <input
                      name="phoneNumber"
                      type="tel"
                      inputMode="numeric"
                      placeholder="10-digit number"
                      value={formData.phoneNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 10) {
                          setFormData((p) => ({ ...p, phoneNumber: value }));
                          if (fieldErrors.phoneNumber)
                            setFieldErrors((p) => ({ ...p, phoneNumber: "" }));
                        }
                      }}
                      className={inputBase(!!fieldErrors.phoneNumber)}
                    />
                    {fieldErrors.phoneNumber && (
                      <p className="text-[11px] text-red-500 mt-1">{fieldErrors.phoneNumber}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={inputBase(!!fieldErrors.email)}
                    />
                    {fieldErrors.email && (
                      <p className="text-[11px] text-red-500 mt-1">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 pt-2 pb-6">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      "Join Waitlist"
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
