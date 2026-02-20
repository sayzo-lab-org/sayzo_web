"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  sendMagicLink,
  getUserProfile,
  isProfileComplete,
} from "@/lib/firebase";
import ProfileCompletionModal from "./ProfileCompletionModal";
import { useAuth } from "@/app/Context/AuthContext";

// Error boundary wrapper for modal content
class ModalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Modal Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <p className="text-red-400 mb-4">Something went wrong.</p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
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

// Need to import React for class component
import React from "react";

const TaskDoerAuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Use centralized auth context instead of own listener
  const { user: authUser, isLoading: authLoading } = useAuth();

  // Use ref to store latest onSuccess callback to avoid stale closures
  const onSuccessRef = useRef(onSuccess);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Watch AuthContext for user changes (user returning from magic link)
  // This replaces the direct onAuthStateChanged listener to avoid racing with AuthContext
  useEffect(() => {
    if (!isOpen || authLoading) return;

    let isMounted = true;

    const checkUserProfile = async () => {
      if (!authUser) return;

      setUserEmail(authUser.email);
      try {
        // User signed in - check profile completion
        const complete = await isProfileComplete(authUser.uid);
        if (!isMounted) return;

        if (complete) {
          const profile = await getUserProfile(authUser.uid);
          if (!isMounted) return;

          onSuccessRef.current?.({
            uid: authUser.uid,
            email: authUser.email,
            phone: profile?.phone,
            fullName: profile?.fullName,
          });
        } else {
          setShowProfileCompletion(true);
        }
      } catch (err) {
        console.error("Auth state change error:", err);
        if (isMounted) {
          setError("Failed to verify profile. Please try again.");
        }
      }
    };

    checkUserProfile();

    return () => {
      isMounted = false;
    };
  }, [isOpen, authUser, authLoading]);

  const input =
    "w-full bg-[#18181B] text-white placeholder:text-zinc-500 px-4 py-4 my-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600";

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Safe localStorage helper
  const safeSetLocalStorage = useCallback((key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.warn("localStorage not available:", err);
    }
  }, []);

  const handleSendLink = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Store return URL for after auth
      safeSetLocalStorage("sayzo_auth_return", window.location.pathname);
      await sendMagicLink(email);
      setEmailSent(true);
    } catch (err) {
      console.error("Magic Link Error:", err);
      // Map Firebase error codes to user-friendly messages
      const errorMessages = {
        "auth/invalid-email": "Invalid email address",
        "auth/too-many-requests": "Too many requests. Please try again later.",
        "auth/network-request-failed": "Network error. Please check your connection.",
        "auth/user-disabled": "This account has been disabled.",
      };
      setError(errorMessages[err.code] || "Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileComplete = useCallback((profileData) => {
    setShowProfileCompletion(false);
    onSuccessRef.current?.(profileData);
  }, []);

  const handleProfileClose = useCallback(() => {
    setShowProfileCompletion(false);
    setError("Profile completion is required to continue.");
  }, []);

  const resetAndClose = () => {
    setError("");
    setEmailSent(false);
    setEmail("");
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <ModalErrorBoundary onClose={resetAndClose}>
      <AnimatePresence>
        {isOpen && !showProfileCompletion && (
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
                  Sign in to Apply
                </h2>
                <button onClick={resetAndClose}>
                  <X className="text-zinc-400 hover:text-white" />
                </button>
              </div>

              <div className="px-6 py-6">
                {emailSent ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                      <Mail className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-white text-xl font-semibold mb-2">
                      Check Your Email
                    </h3>
                    <p className="text-zinc-400 mb-4">
                      We've sent a sign-in link to
                    </p>
                    <p className="text-white font-medium mb-6">{email}</p>
                    <p className="text-zinc-500 text-sm">
                      Click the link in the email to sign in
                    </p>
                    <p className="text-zinc-500 text-sm mt-2">
                      If you don't see it, please check your spam folder
                    </p>
                    <button
                      onClick={() => setEmailSent(false)}
                      className="mt-6 text-zinc-400 hover:text-white text-sm underline"
                    >
                      Use a different email
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-zinc-400 text-sm mb-4">
                      Enter your email to apply for this task
                    </p>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        type="email"
                        className={`${input} pl-12`}
                        placeholder="Enter your email *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendLink()}
                      />
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm mt-2">{error}</p>
                    )}

                    <button
                      disabled={loading || !email}
                      onClick={handleSendLink}
                      className="w-full mt-4 bg-white text-black py-4 rounded-full font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Sign-In Link"
                      )}
                    </button>

                    <p className="text-zinc-500 text-xs text-center mt-4">
                      By continuing, you agree to our Terms of Service and
                      Privacy Policy
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Completion Modal */}
      <ProfileCompletionModal
        isOpen={showProfileCompletion}
        onClose={handleProfileClose}
        onSuccess={handleProfileComplete}
        userEmail={userEmail || email}
      />
    </ModalErrorBoundary>,
    document.body
  );
};

export default TaskDoerAuthModal;
