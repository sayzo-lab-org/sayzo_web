"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupWithEmail, loginWithGoogle, saveUserProfile, getUserProfile } from "@/lib/firebase";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit phone number");
      setLoading(false);
      return;
    }

    try {
      const user = await signupWithEmail(email, password);
      
      await saveUserProfile(user.uid, {
        name: name,
        mobile: mobileNumber,
        email: user.email,
        role: "task_doer",
        profileCompleted: true,
        createdAt: new Date().toISOString()
      });

      router.push("/notifications");
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
          name: user.displayName || user.email.split("@")[0],
          email: user.email,
          avatar: user.photoURL,
          role: "task_doer",
          profileCompleted: true,
          createdAt: new Date().toISOString(),
        });
      }

      router.push("/notifications");
    } catch (err) {
      setError(err.message || "Google sign-up failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        // Narrowed to 420px to match the new Login size
        className="bg-white rounded-[40px] shadow-sm w-full max-w-[420px] p-8 md:p-10"
      >
        <h1 className="text-[22px] md:text-[24px] font-bold text-gray-900 mb-1.5 tracking-tight">
          Create an Account
        </h1>
        <p className="text-[#9CA3AF] mb-8 text-sm md:text-base">
          Join the SAYZO community today.
        </p>

        <form onSubmit={handleSignup} className="space-y-4 md:space-y-5">
          {error && (
            <div className="text-xs md:text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Name</label>
            <input
              type="text"
              placeholder="Joe Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#F8F9FB] border-none rounded-2xl py-3.5 px-5 text-gray-600 text-sm md:text-base focus:ring-2 focus:ring-[#0ca37f] outline-none transition-all"
            />
          </div>

          {/* Mobile Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Mobile number</label>
            <input
              type="tel"
              placeholder="9836578999"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
                setError(null);
              }}
              required
              className="w-full bg-[#F8F9FB] border-none rounded-2xl py-3.5 px-5 text-gray-600 text-sm md:text-base focus:ring-2 focus:ring-[#0ca37f] outline-none transition-all"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
            <input
              type="email"
              placeholder="joedoe75@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#F8F9FB] border-none rounded-2xl py-3.5 px-5 text-gray-600 text-sm md:text-base focus:ring-2 focus:ring-[#0ca37f] outline-none transition-all"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#F8F9FB] border-none rounded-2xl py-3.5 px-5 text-gray-600 text-sm md:text-base focus:ring-2 focus:ring-[#0ca37f] outline-none transition-all"
            />
          </div>

          {/* Create Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-[20px] text-base md:text-lg font-semibold mt-2 active:scale-[0.97] transition-all shadow-lg shadow-black/5"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Social Auth */}
          <div className="pt-6 text-center">
            <p className="text-[#9CA3AF] text-[12px] uppercase tracking-widest font-bold mb-4">Or Sign Up with</p>
            <div className="flex justify-center">
              <button 
                type="button" 
                onClick={handleGoogleSignup} 
                className="w-14 h-14 bg-[#F8F9FB] rounded-2xl flex items-center justify-center text-2xl hover:bg-gray-100 transition-all border border-gray-50"
              >
                <FcGoogle />
              </button>
            </div>
          </div>

          <p className="text-center text-[#9CA3AF] text-sm md:text-base pt-2">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-[#0ca37f] font-bold hover:underline"
            >
              Log In
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
}