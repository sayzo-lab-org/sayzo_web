"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupWithEmail, loginWithGoogle, saveUserProfile, getUserProfile } from "@/lib/firebase";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await signupWithEmail(email, password);
      await saveUserProfile(user.uid, {
        email: user.email,
        role: "task_doer",
        profileCompleted: true,
      });
      router.push("/");
    } catch (err) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    try {
      const user = await loginWithGoogle();
      const existingProfile = await getUserProfile(user.uid);
      if (!existingProfile) {
        await saveUserProfile(user.uid, {
          email: user.email,
          role: "task_doer",
          profileCompleted: true,
        });
      }
      router.push("/notifications")
    } catch (err) {
      setError(err.message || "Google sign-up failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] shadow-sm w-full max-w-[440px] p-8 md:p-12"
      >
        <h1 className="text-[25px] font-semibold text-gray-900 mb-2">
          Create Account
        </h1>
        <p className="text-[#9CA3AF] mb-10 text-lg">
          Join SAYZO and get things done instantly.
        </p>

        <form onSubmit={handleSignup} className="space-y-6">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#F8F9FB] border-none rounded-3xl py-5 px-6 text-gray-600 text-lg focus:ring-2 focus:ring-[#0ca37f] outline-none transition-all"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Password
            </label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#F8F9FB] border-none rounded-3xl py-5 px-6 text-gray-600 text-lg focus:ring-2 focus:ring-[#0ca37f] outline-none transition-all"
            />
          </div>

          {/* Sign Up Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-5 rounded-[24px] text-xl font-semibold mt-4 active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          {/* Social Auth */}
          <div className="pt-8 text-center">
            <p className="text-[#9CA3AF] text-lg mb-6">Or Sign Up with</p>
            <div className="flex justify-center gap-4">
              {/* <button type="button" className="w-20 h-20 bg-[#F8F9FB] rounded-3xl flex items-center justify-center text-3xl hover:bg-gray-100 transition-colors">
                <FaFacebook className="text-[#1877F2]" />
              </button> */}
              <button type="button" onClick={handleGoogleSignup} className="w-20 h-20 bg-[#F8F9FB] rounded-3xl flex items-center justify-center text-3xl hover:bg-gray-100 transition-colors">
                <FcGoogle />
              </button>
              {/* <button type="button" className="w-20 h-20 bg-[#F8F9FB] rounded-3xl flex items-center justify-center text-3xl hover:bg-gray-100 transition-colors">
                <FaApple className="text-black" />
              </button> */}
            </div>
          </div>

          {/* Footer Link */}
          <p className="text-center text-[#9CA3AF] text-lg pt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-[#0ca37f] font-semibold hover:underline"
            >
              Log In
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
}