"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Loader2, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { saveUserProfile, auth ,getUserProfile} from "@/lib/firebase";

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
        <div className="p-6 text-center bg-white rounded-2xl">
          <p className="text-red-500 text-sm font-medium mb-4">Something went wrong.</p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              this.props.onClose?.();
            }}
            className="text-emerald-600 text-sm font-semibold underline underline-offset-2"
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
  const [autoClosing, setAutoClosing] = useState(false);

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

  useEffect(() => {
    if (!isOpen) {
      setAutoClosing(false);
      setSuccess(false);
      setError("");
      return;
    }

    const fetchProfile = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const existingProfile = await getUserProfile(currentUser.uid);
        if (existingProfile?.profileCompleted) {
          setAutoClosing(true);
          onSuccess?.(existingProfile);
          return;
        }

        if (existingProfile) {
          setForm({
            fullName: existingProfile.fullName || "",
            phone: existingProfile.phone || "",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [isOpen]);


  const input =
    "w-full bg-white text-zinc-900 placeholder:text-zinc-400 px-4 py-3 my-1.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all";

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
    if (!form.phone || form.phone.length !== 10) return "Enter valid 10-digit phone number";
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
        ...form,
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
            className="fixed inset-0 z-[1002] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden"
            >
             
        

              {/* Header */}
              <div className="flex justify-between items-start px-6 pt-6 pb-4 border-b border-zinc-100">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
                    Complete Your Profile
                  </h2>
                  {/* <p className="text-zinc-500 text-sm mt-0.5">
                    Just a few details to get started
                  </p> */}
                </div>
                {/*  todo : add border base */}
                {onClose && (
                  <button
                    onClick={onClose}
                    disabled={loading}
                    className="text-zinc-400 hover:text-zinc-700 disabled:opacity-40 mt-0.5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="px-6 pb-6 pt-4">
                {autoClosing ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-3" />
                    <p className="text-zinc-500 text-sm">Verifying profile...</p>
                  </div>
                ) : success ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-zinc-900 text-lg font-bold">
                      Profile Completed!
                    </h3>
                    <p className="text-zinc-500 text-sm mt-1">
                      You&apos;re all set to get started
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Email Display (read-only) */}
                    <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">Email</p>
                        <p className="text-sm font-medium text-zinc-700 truncate">{userEmail}</p>
                      </div>
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
                      <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>
                    )}

                    <button
                      disabled={loading}
                      onClick={handleSubmit}
                      className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-xl font-semibold text-sm disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
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