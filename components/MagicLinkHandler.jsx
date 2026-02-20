"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  isEmailSignInLink,
  completeMagicLinkSignIn,
  getUserProfile,
} from "@/lib/firebase";
import { isAdminEmail } from "@/lib/adminConfig";
import ProfileCompletionModal from "./ProfileCompletionModal";

/**
 * MagicLinkHandler - Detects magic links on any page and handles auth
 * Wraps the app in layout.js to catch magic links that land on pages
 * other than /auth/callback
 */
export default function MagicLinkHandler({ children }) {
  const pathname = usePathname();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");

  // Use ref to prevent race conditions with processing state
  const isProcessingRef = useRef(false);

  const handleMagicLink = useCallback(async () => {
    // Prevent concurrent calls using ref (not state to avoid race conditions)
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    try {
      const user = await completeMagicLinkSignIn();
      if (user) {
        setUserEmail(user.email);

        try {
          // Check if profile needs completion
          const profile = await getUserProfile(user.uid);

          if (!profile?.profileCompleted) {
            setShowProfileModal(true);
          }
        } catch (profileErr) {
          console.error("Error fetching profile:", profileErr);
          // Still show profile modal if we can't fetch profile
          setShowProfileModal(true);
        }

        // Clear URL params without refresh (remove magic link tokens)
        if (typeof window !== "undefined") {
          window.history.replaceState({}, "", pathname);
        }
      }
    } catch (error) {
      console.error("Magic link handler error:", error);
      // If email not found, redirect to callback page which has UI for entering email
      if (error.message === "EMAIL_NOT_FOUND") {
        window.location.href = `/auth/callback${window.location.search}`;
      } else {
        setError("Failed to sign in. Please try again.");
      }
    } finally {
      isProcessingRef.current = false;
    }
  }, [pathname]);

  useEffect(() => {
    // Skip if already on callback page (it handles its own auth)
    if (pathname === "/auth/callback") return;

    // Check if current URL is a magic link
    if (isEmailSignInLink() && !isProcessingRef.current) {
      handleMagicLink();
    }
  }, [pathname, handleMagicLink]);

  const handleProfileComplete = useCallback(() => {
    setShowProfileModal(false);
    // Page will automatically update with new auth state
  }, []);

  const handleProfileClose = useCallback(() => {
    setShowProfileModal(false);
    setError("Profile completion is required to continue. Please sign in again.");
  }, []);

  return (
    <>
      {children}
      {error && (
        <div className="fixed bottom-4 right-4 z-[9999] bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {error}
          <button
            onClick={() => setError("")}
            className="ml-2 underline"
          >
            Dismiss
          </button>
        </div>
      )}
      <ProfileCompletionModal
        isOpen={showProfileModal}
        onClose={handleProfileClose}
        onSuccess={handleProfileComplete}
        userEmail={userEmail}
      />
    </>
  );
}
