"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserProfile } from "@/lib/firebase";
import { isAdminEmail } from "@/lib/adminConfig";

const AuthContext = createContext(null);

/**
 * AuthProvider - Centralized auth state management
 *
 * This provider maintains a SINGLE onAuthStateChanged listener at the root level,
 * eliminating race conditions from multiple competing listeners across components.
 *
 * Key features:
 * - Robust handling of Firebase's transient null states
 * - Loading state during initial auth check
 * - User profile fetching with caching
 * - Admin role detection
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Track initialization to handle transient states properly
  const isInitializedRef = useRef(false);
  const hasSeenUserRef = useRef(false);

  // Track pending profile fetch to avoid duplicate requests
  const profileFetchRef = useRef(null);

  // Track logout timeout to properly clean it up and prevent stale timeouts
  const logoutTimeoutRef = useRef(null);

  // Fetch user profile with deduplication
  const fetchUserProfile = useCallback(async (uid) => {
    // If already fetching this user's profile, return existing promise
    if (profileFetchRef.current?.uid === uid) {
      return profileFetchRef.current.promise;
    }

    const promise = getUserProfile(uid);
    profileFetchRef.current = { uid, promise };

    try {
      const profile = await promise;
      return profile;
    } finally {
      // Clear ref only if it's still this request
      if (profileFetchRef.current?.uid === uid) {
        profileFetchRef.current = null;
      }
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await auth.signOut();
      // State will be updated by onAuthStateChanged listener
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }, []);

  // Refresh user profile (useful after profile updates)
  const refreshProfile = useCallback(async () => {
    if (user?.uid) {
      try {
        const profile = await fetchUserProfile(user.uid);
        setUserProfile(profile);
        return profile;
      } catch (error) {
        console.error("Error refreshing profile:", error);
        throw error;
      }
    }
    return null;
  }, [user?.uid, fetchUserProfile]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is logged in
        hasSeenUserRef.current = true;
        isInitializedRef.current = true;

        setUser(currentUser);
        setIsAdmin(isAdminEmail(currentUser.email));

        try {
          const profile = await fetchUserProfile(currentUser.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUserProfile(null);
        }

        setIsLoading(false);
      } else {
        // currentUser is null - check if this is a real logout or transient state

        if (!isInitializedRef.current) {
          // First load with no user - this is valid, user is not logged in
          setUser(null);
          setUserProfile(null);
          setIsAdmin(false);
          setIsLoading(false);
          isInitializedRef.current = true;
          return;
        }

        // For subsequent null states (potential transient states),
        // check auth.currentUser synchronously first
        if (auth.currentUser) {
          // Firebase SDK still has a user - this is a transient state, ignore it
          console.log("AuthContext: Ignoring transient null state");
          return;
        }

        // Clear any existing logout timeout before setting a new one
        // This prevents stale timeouts from accumulating
        if (logoutTimeoutRef.current) {
          clearTimeout(logoutTimeoutRef.current);
          logoutTimeoutRef.current = null;
        }

        // Double-check after a delay to be extra safe
        // This handles edge cases where the SDK is still initializing
        // Using 200ms instead of 50ms for more reliable detection on slower devices
        logoutTimeoutRef.current = setTimeout(() => {
          if (!auth.currentUser && hasSeenUserRef.current) {
            // User is actually logged out
            console.log("AuthContext: User logged out");
            setUser(null);
            setUserProfile(null);
            setIsAdmin(false);
            hasSeenUserRef.current = false;
          }
          logoutTimeoutRef.current = null;
        }, 200);
      }
    });

    // Proper cleanup: unsubscribe from auth listener AND clear any pending timeout
    return () => {
      unsubscribe();
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
        logoutTimeoutRef.current = null;
      }
    };
  }, [fetchUserProfile]);

  const value = {
    user,
    userProfile,
    isAuthenticated: !!user,
    isLoading,
    isAdmin,
    logout,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth - Hook to access auth state
 *
 * Usage:
 * const { user, isAuthenticated, isLoading, logout } = useAuth();
 *
 * if (isLoading) return <LoadingSpinner />;
 * if (!isAuthenticated) return <LoginModal />;
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
