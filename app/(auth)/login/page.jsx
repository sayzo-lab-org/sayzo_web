"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  loginWithEmail,
  loginWithGoogle,
  getUserProfile,
  saveUserProfile,
} from "@/lib/firebase";
import { useAuth } from "@/app/Context/AuthContext";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);

  // FIXED: Check for user existence before accessing properties
  useEffect(() => {
  if (authLoading) return;
  if (user && user.emailVerified) {
    router.replace("/");
  }
}, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8F9FB]">
        <Loader2 className="animate-spin text-[#0ca37f] w-8 h-8" />
      </div>
    );
  }

  const handleLogin = async (e) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    const loggedUser = await loginWithEmail(email, password);

    await loggedUser.reload();

    if (!loggedUser.emailVerified) {
      setError("Please verify your email before logging in.");
      return;
    }

    router.replace("/");
  } catch (err) {
    console.log(err);
  setError(err.message);
  } finally {
    setLoading(false);
  }
};

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      const userRes = await loginWithGoogle();
      const profile = await getUserProfile(userRes.uid);
      if (!profile) {
        await saveUserProfile(userRes.uid, {
          email: userRes.email,
          role: "task_doer",
          profileCompleted: true,
        });
      }
      router.replace("/");
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-4 py-6 md:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[28px] md:rounded-[40px] shadow-sm w-full max-w-[360px] md:max-w-[420px] p-5 md:p-10"
      >
        <h1 className="text-lg md:text-[24px] font-bold text-gray-900 mb-0.5 tracking-tight">
          Welcome to SAYZO
        </h1>
        <p className="text-[#9CA3AF] mb-5 md:mb-8 text-[11px] md:text-base">
          Sign in to connect with people around you.
        </p>

        <form onSubmit={handleLogin} className="space-y-3 md:space-y-5">
          {error && (
            <div className="text-[10px] md:text-sm text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              required
              className="w-full bg-[#F8F9FB] border-none rounded-xl md:rounded-2xl py-2.5 md:py-3.5 px-4 text-gray-600 text-xs md:text-base focus:ring-1 focus:ring-[#0ca37f] outline-none transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">
                Password
              </label>
              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="text-[10px] text-[#0ca37f] font-bold hover:underline"
              >
                Forgot?
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-[#F8F9FB] border-none rounded-xl md:rounded-2xl py-2.5 md:py-3.5 px-4 text-gray-600 text-xs md:text-base focus:ring-1 focus:ring-[#0ca37f] outline-none transition-all"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 md:py-4 rounded-xl md:rounded-[20px] text-xs md:text-lg font-bold mt-1 active:scale-[0.98] transition-all"
          >
            {loading ? "Signing In..." : "Log In"}
          </button>
        </form>

        <div className="pt-4 md:pt-6 text-center border-t border-gray-50 mt-4">
          <p className="text-[#9CA3AF] text-[9px] md:text-[12px] uppercase tracking-widest font-bold mb-3">
            Or Log In with
          </p>
          <div className="flex justify-center">
            <button 
              type="button" 
              onClick={handleGoogleLogin} 
              disabled={googleLoading}
              className="w-10 h-10 md:w-14 md:h-14 bg-[#F8F9FB] rounded-lg md:rounded-2xl flex items-center justify-center text-lg md:text-2xl hover:bg-gray-100 transition-all active:scale-95"
            >
              {googleLoading ? (
                <Loader2 className="animate-spin h-5 w-5 text-gray-400" />
              ) : (
                <FcGoogle />
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-[#9CA3AF] text-[10px] md:text-base pt-4">
          New to SAYZO?{" "}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="text-[#0ca37f] font-bold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </motion.div>
    </div>
  );
}