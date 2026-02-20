"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Loader2, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { saveUserProfile, auth } from "@/lib/firebase";

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
    console.error("ProfileCompletionModal Error:", error, errorInfo);
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

const ProfileCompletionModal = ({
  isOpen,
  onClose,
  onSuccess,
  userEmail,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
  });

  // Safe localStorage helper
  const safeSetLocalStorage = useCallback((key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.warn("localStorage not available:", err);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);


  const input =
    "w-full bg-[#18181B] text-white placeholder:text-zinc-500 px-4 py-4 my-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600";

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "").slice(0, 10);
      setForm((prev) => ({ ...prev, phone: cleaned }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Full name is required";
    if (form.phone.length !== 10) return "Enter valid 10-digit phone number";
    return "";
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("No authenticated user found");
      }

      await saveUserProfile(currentUser.uid, {
        fullName: form.fullName.trim(),
        phone: form.phone,
        email: userEmail || currentUser.email,
        profileCompleted: true,
        emailVerified: true,
      });

      setSuccess(true);

      // Store name in localStorage for form pre-fill
      safeSetLocalStorage("sayzo_user_name", form.fullName.trim());

      setTimeout(() => {
        onSuccess?.({
          uid: currentUser.uid,
          fullName: form.fullName.trim(),
          phone: form.phone,
          email: userEmail || currentUser.email,
        });
      }, 1500);
    } catch (err) {
      console.error("Profile save error:", err);
      setError("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
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
            className="fixed inset-0 z-[1002] bg-black/80 backdrop-blur flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-black border border-zinc-800 rounded-2xl"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">
                <h2 className="text-xl text-white font-semibold">
                  Complete Your Profile
                </h2>
                {onClose && (
                  <button
                    onClick={onClose}
                    disabled={loading}
                    className="text-zinc-400 hover:text-white disabled:opacity-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

            <div className="px-6 py-6">
              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-white text-xl font-semibold">
                    Profile Completed!
                  </h3>
                  <p className="text-zinc-400 mt-2">
                    You're all set to get started
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-zinc-400 text-sm mb-4">
                    Please complete your profile to continue
                  </p>

                  {/* Email Display (read-only) */}
                  <div className="bg-zinc-900 rounded-xl px-4 py-3 mb-2">
                    <p className="text-zinc-500 text-xs mb-1">Email</p>
                    <p className="text-white">{userEmail}</p>
                  </div>

                  {/* Full Name */}
                  <input
                    className={input}
                    placeholder="Full Name *"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                  />

                  {/* Phone Number */}
                  <input
                    className={input}
                    placeholder="Phone Number (10 digits) *"
                    name="phone"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={handleChange}
                  />

                  {error && (
                    <p className="text-red-400 text-sm mt-2">{error}</p>
                  )}

                  <button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="w-full mt-4 bg-white text-black py-4 rounded-full font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Complete Profile"
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

export default ProfileCompletionModal;
