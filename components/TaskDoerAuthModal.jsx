"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getUserProfile, isProfileComplete } from "@/lib/firebase";
import ProfileCompletionModal from "./ProfileCompletionModal";
import { useAuth } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";

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

const TaskDoerAuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [mounted, setMounted] = useState(false);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const { user: authUser, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const onSuccessRef = useRef(onSuccess);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // When user becomes authenticated while modal is open, check profile and call onSuccess
  useEffect(() => {
    if (!isOpen || authLoading) return;

    let isMounted = true;

    const checkUserProfile = async () => {
      if (!authUser) return;

      setUserEmail(authUser.email);
      try {
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
      }
    };

    checkUserProfile();

    return () => {
      isMounted = false;
    };
  }, [isOpen, authUser, authLoading]);

  const handleProfileComplete = useCallback((profileData) => {
    setShowProfileCompletion(false);
    onSuccessRef.current?.(profileData);
  }, []);

  const handleProfileClose = useCallback(() => {
    setShowProfileCompletion(false);
  }, []);

  const resetAndClose = () => {
    onClose();
  };

  const handleGoToLogin = () => {
    resetAndClose();
    router.push("/login");
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

              <div className="px-6 py-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  Login Required
                </h3>
                <p className="text-zinc-400 text-sm mb-6">
                  You need to be logged in to apply for this task.
                </p>

                <button
                  onClick={handleGoToLogin}
                  className="w-full bg-white text-black py-4 rounded-full font-semibold flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  Go to Login
                </button>

                <p className="text-zinc-500 text-xs text-center mt-4">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProfileCompletionModal
        isOpen={showProfileCompletion}
        onClose={handleProfileClose}
        onSuccess={handleProfileComplete}
        userEmail={userEmail}
      />
    </ModalErrorBoundary>,
    document.body
  );
};

export default TaskDoerAuthModal;
