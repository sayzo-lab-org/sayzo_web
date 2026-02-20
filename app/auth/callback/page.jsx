"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle, Mail } from "lucide-react";
import {
  completeMagicLinkSignIn,
  isEmailSignInLink,
  getUserProfile,
} from "@/lib/firebase";
import { isAdminEmail } from "@/lib/adminConfig";
import ProfileCompletionModal from "@/components/ProfileCompletionModal";

// Validate redirect URL to prevent open redirect attacks
const validateReturnUrl = (url) => {
  // Default to home if no URL
  if (!url) return "/";

  // Ensure it's a string
  if (typeof url !== "string") return "/";

  // Trim whitespace
  const trimmed = url.trim();

  // Must start with / (relative path)
  if (!trimmed.startsWith("/")) return "/";

  // Must not be a protocol-relative URL (//example.com)
  if (trimmed.startsWith("//")) return "/";

  // Must not contain protocol indicators
  if (trimmed.includes("://")) return "/";

  // Block any attempt to use special characters for URL manipulation
  if (trimmed.includes("\\")) return "/";

  // Ensure no query params that could redirect externally
  // Allow only specific safe paths
  const allowedPaths = ["/", "/live-tasks", "/track-tasks", "/browse-tasks", "/website-aaadminpanel/dashboard", "/use-cases"];
  const pathOnly = trimmed.split("?")[0].split("#")[0];

  // Check if path starts with any allowed path
  const isAllowed = allowedPaths.some(
    (allowed) => pathOnly === allowed || pathOnly.startsWith(allowed + "/")
  );

  return isAllowed ? trimmed : "/";
};

// Safe localStorage helper
const safeGetLocalStorage = (key, defaultValue = null) => {
  try {
    return localStorage.getItem(key) ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

const safeRemoveLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
};

const safeSetLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore errors
  }
};

export default function AuthCallbackPage() {
  const router = useRouter();

  const [status, setStatus] = useState("processing"); // processing, success, error, needs_email, needs_profile
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    handleEmailLinkSignIn();
  }, []);

  const handleEmailLinkSignIn = async () => {
    // Check if this is a sign-in link
    if (!isEmailSignInLink()) {
      setStatus("error");
      setError("Invalid sign-in link. Please request a new one.");
      return;
    }

    try {
      const signedInUser = await completeMagicLinkSignIn();
      setUser(signedInUser);
      setUserEmail(signedInUser.email);

      // Check if profile is complete
      const profile = await getUserProfile(signedInUser.uid);

      if (!profile || !profile.profileCompleted) {
        setStatus("needs_profile");
        setShowProfileModal(true);
      } else {
        setStatus("success");
        // Redirect to intended destination or home (validated to prevent open redirect)
        const rawReturnTo = safeGetLocalStorage("sayzo_auth_return", "/");
        const returnTo = validateReturnUrl(rawReturnTo);
        safeRemoveLocalStorage("sayzo_auth_return");
        setTimeout(() => router.push(returnTo), 1500);
      }
    } catch (err) {
      console.error("Auth callback error:", err);

      if (err.message === "EMAIL_NOT_FOUND") {
        setStatus("needs_email");
      } else {
        setStatus("error");
        setError(err.message || "Sign-in failed. Please try again.");
      }
    }
  };

  const handleManualEmailSubmit = async () => {
    if (!emailInput.trim()) return;

    // Store email and retry sign-in
    safeSetLocalStorage("emailForSignIn", emailInput.trim());
    setStatus("processing");
    handleEmailLinkSignIn();
  };

  const handleProfileComplete = useCallback((profileData) => {
    setShowProfileModal(false);
    setStatus("success");
    // Redirect to intended destination or home (validated to prevent open redirect)
    const rawReturnTo = safeGetLocalStorage("sayzo_auth_return", "/");
    const returnTo = validateReturnUrl(rawReturnTo);
    safeRemoveLocalStorage("sayzo_auth_return");
    setTimeout(() => router.push(returnTo), 1500);
  }, [router]);

  const handleProfileClose = useCallback(() => {
    setShowProfileModal(false);
    setStatus("error");
    setError("Profile completion is required to continue.");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {status === "processing" && (
          <>
            <Loader2 className="w-16 h-16 animate-spin text-black mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Signing you in...</h2>
            <p className="text-gray-500">
              Please wait while we verify your email
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
            <p className="text-gray-500">Redirecting you now...</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Sign-in Failed</h2>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => router.push("/")}
              className="bg-black text-white px-6 py-3 rounded-full font-medium"
            >
              Go Home
            </button>
          </>
        )}

        {status === "needs_email" && (
          <>
            <Mail className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Confirm Your Email</h2>
            <p className="text-gray-500 mb-4">
              Please enter the email address you used to sign in
            </p>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              onKeyDown={(e) => e.key === "Enter" && handleManualEmailSubmit()}
            />
            <button
              onClick={handleManualEmailSubmit}
              className="w-full bg-black text-white px-6 py-3 rounded-full font-medium"
            >
              Continue
            </button>
          </>
        )}

        {status === "needs_profile" && !showProfileModal && (
          <>
            <Loader2 className="w-16 h-16 animate-spin text-black mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Almost there...</h2>
            <p className="text-gray-500">Setting up your profile</p>
          </>
        )}
      </div>

      {/* Profile Completion Modal */}
      <ProfileCompletionModal
        isOpen={showProfileModal}
        onClose={handleProfileClose}
        onSuccess={handleProfileComplete}
        userEmail={userEmail}
      />
    </div>
  );
}
