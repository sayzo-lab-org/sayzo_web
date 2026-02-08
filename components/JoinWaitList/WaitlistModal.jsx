'use client';

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import StepIndicator from "./StepIndicator"; // ⏸️ FUTURE USE
// import PillSelector from "./PillSelector"; // ⏸️ FUTURE USE
// import FormSlider from "./FormSlider"; // ⏸️ FUTURE USE

/* ---------- JS ENUM (KEEP FOR FUTURE) ---------- */
// const FormStep = {
//   PERSONAL_DETAILS: 1,
//   PROFESSIONAL_INFO: 2,
//   RESOURCE_ALLOCATION: 3,
//   SUMMARY: 4,
// };

const WAITLIST_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzYdGLHwF19bgMLs0RU6R_pSXzT1Vq933CErzbTKC7pOXZvGrHlZDRq8VKOKebVFLoTFg/exec";

const WaitlistModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

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
  };

  const handleSubmit = async () => {
    // basic validation (keep yours)
    if (!formData.fullName.trim()) {
      alert("Full name is required");
      return;
    }
  
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert("Enter a valid email");
      return;
    }
  
    if (!formData.phoneNumber || formData.phoneNumber.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }
  
    try {
      setIsSubmitting(true);
  
      // ===============================
      // ❌ SUPABASE (KEEP COMMENTED)
      // ===============================
      /*
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      */
  
      // ===============================
      // ✅ GOOGLE SHEET (WAITLIST)
      // ===============================
      await fetch(WAITLIST_SHEET_URL, {
        method: "POST",
        mode: "no-cors", // 🔥 REQUIRED
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber,
        }),
      });
  
      setSuccessMessage("You're officially on the waitlist 🚀");
    } catch (err) {
      console.error(err);
      alert("Failed to submit waitlist");
    } finally {
      setIsSubmitting(false);
    }
  };
  const resetForm = () => {
    onClose();
    setSuccessMessage(null);
    setFormData({
      fullName: "",
      phoneNumber: "",
      email: "",
    });
  };

  /* ---------- STYLES ---------- */
  const inputClasses =
    "w-full bg-[#18181B] text-white placeholder:text-zinc-500 px-4 py-4 rounded-xl border border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-600";

  const primaryBtnClasses =
    "w-full bg-white text-black font-semibold py-4 px-6 rounded-full hover:bg-white/90 disabled:opacity-50";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md bg-black border border-zinc-800 rounded-2xl p-6 relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            {/* HEADER */}
            <div className="flex justify-end mb-6">
              <button onClick={resetForm} className="text-zinc-500 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* SUCCESS STATE */}
            {successMessage ? (
              <div className="text-center space-y-4 py-10">
                <h2 className="text-3xl font-bold text-white">Welcome 🎉</h2>
                <p className="text-zinc-400">{successMessage}</p>
                <button onClick={resetForm} className={primaryBtnClasses}>
                  Done
                </button>
              </div>
            ) : (
              /* STEP 1 ONLY */
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-white">
                  Join the Waitlist
                </h2>

                <input
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={inputClasses}
                />

                <input
                  name="phoneNumber"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Phone Number (10 digits)"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setFormData((p) => ({ ...p, phoneNumber: value }));
                    }
                  }}
                  className={inputClasses}
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClasses}
                />

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={primaryBtnClasses}
                >
                  {isSubmitting ? "Submitting..." : "Join Waitlist"}
                </button>
              </div>
            )}
  
            

            {/* ⏸️ FUTURE MULTI-STEP FORM LOGIC KEPT SAFE */}
            {/*
              StepIndicator
              Professional Info
              Skills / Occupation
              Sliders
              Multi-step navigation
            */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
