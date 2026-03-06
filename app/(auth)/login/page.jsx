"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  loginWithEmail,
  loginWithGoogle,
  getUserProfile,
  saveUserProfile,
} from "@/lib/firebase";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      router.replace("/notifications"); 
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const user = await loginWithGoogle();
      const profile = await getUserProfile(user.uid);

      if (!profile) {
        await saveUserProfile(user.uid, {
          email: user.email,
          profileCompleted: true,
        });
      }
     router.replace("/notifications");
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        // Reduced max-width to 420px for a more compact feel
        className="bg-white rounded-[40px] shadow-sm w-full max-w-[420px] p-8 md:p-10"
      >
        <h1 className="text-[22px] md:text-[24px] font-bold text-gray-900 mb-1.5 tracking-tight">
          Welcome to SAYZO
        </h1>
        <p className="text-[#9CA3AF] mb-8 text-sm md:text-base">
          Sign in to connect with people around you.
        </p>

        <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
          {error && (
            <div className="text-xs md:text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#F8F9FB] border-none rounded-2xl py-3.5 px-5 text-gray-600 text-sm md:text-base focus:ring-2 focus:ring-[#0ca37f] outline-none transition-all placeholder:text-gray-300"
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-900">
                Password
              </label>
              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="text-xs text-[#0ca37f] font-semibold hover:underline"
              >
                Forgot?
              </button>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#F8F9FB] border-none rounded-2xl py-3.5 px-5 text-gray-600 text-sm md:text-base focus:ring-2 focus:ring-[#0ca37f] outline-none transition-all placeholder:text-gray-300"
            />
          </div>

          {/* Remember Me Toggle */}
          <div className="flex items-center gap-2 pt-1">
            <input type="checkbox" id="remember" className="w-3.5 h-3.5 rounded border-gray-300 accent-black cursor-pointer" />
            <label htmlFor="remember" className="text-xs md:text-sm text-gray-400 cursor-pointer">Remember me</label>
          </div>

          {/* Log In Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-[20px] text-base md:text-lg font-semibold mt-2 active:scale-[0.97] transition-all disabled:opacity-50 shadow-lg shadow-black/5"
          >
            {loading ? "Signing In..." : "Log In"}
          </button>

          {/* Social Auth Section */}
          <div className="pt-6 text-center">
            <p className="text-[#9CA3AF] text-[12px] uppercase tracking-widest font-bold mb-4">Or Log In with</p>
            <div className="flex justify-center">
              <button 
                type="button" 
                onClick={handleGoogleLogin} 
                className="w-14 h-14 bg-[#F8F9FB] rounded-2xl flex items-center justify-center text-2xl hover:bg-gray-100 transition-all active:scale-95 border border-gray-50"
              >
                <FcGoogle />
              </button>
            </div>
          </div>

          {/* Footer Link */}
          <p className="text-center text-[#9CA3AF] text-sm md:text-base pt-2">
            New to SAYZO?{" "}
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="text-[#0ca37f] font-bold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
}