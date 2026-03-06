"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupWithEmail, loginWithGoogle, saveUserProfile, getUserProfile } from "@/lib/firebase";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";

export default function SignupPage() {
  const router = useRouter();

  // State for all fields based on the provided design
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
  setError("Please enter a valid phone number");
  setLoading(false);
  return;
}

    try {
     
      const user = await signupWithEmail(email, password);
      
      // Save all profile data securely in Firestore
      await saveUserProfile(user.uid, {
        name: name,
        mobile: mobileNumber,
        email: user.email,
        role: "task_doer", // Default role
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
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] shadow-sm w-full max-w-[500px] p-8 md:p-12"
      >
        <h1 className="text-[28px] font-bold text-gray-900 mb-2">
          Create an Account
        </h1>
        <p className="text-[#9CA3AF] mb-10 text-lg">
          Join the SAYZO community today.
        </p>

        <form onSubmit={handleSignup} className="space-y-5">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-base font-medium text-gray-900 mb-2">Name</label>
            <input
              type="text"
              placeholder="Joe Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#F8F9FB] border-none rounded-2xl py-4 px-5 text-gray-600 text-base focus:ring-2 focus:ring-[#0ca37f] outline-none transition-all"
            />
          </div>

          {/* Mobile Number Field */}
          <div>
            <label className="block text-base font-medium text-gray-900 mb-2">Mobile number</label>
            <div className="relative">
              <input
  type="tel"
  placeholder="+91 9836578999"
  value={mobileNumber}
  onChange={(e) => {
    setMobileNumber(e.target.value);
    setError(null);
  }}
  required
  className="w-full bg-[#F8F9FB] border-none rounded-2xl py-4 px-5 text-gray-600 text-base focus:ring-2 focus:ring-[#0ca37f] outline-none transition-all"
/>
              {/* <button type="button" className="absolute right-5 top-1/2 -translate-y-1/2 text-[#0ca37f] font-semibold text-sm hover:underline">
                Verify
              </button> */}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-base font-medium text-gray-900 mb-2">Email</label>
            <input
              type="email"
              placeholder="joedoe75@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#F8F9FB] border-none rounded-2xl py-4 px-5 text-gray-600 text-base focus:ring-2 focus:ring-[#0ca37f] outline-none transition-all"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-base font-medium text-gray-900 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#F8F9FB] border-none rounded-2xl py-4 px-5 text-gray-600 text-base focus:ring-2 focus:ring-[#0ca37f] outline-none transition-all"
            />
          </div>

          {/* Create Account Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-5 rounded-[24px] text-lg font-semibold mt-4 active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Social Auth */}
          <div className="pt-6 text-center">
            <p className="text-[#9CA3AF] text-sm mb-5">Or Sign In with</p>
            <div className="flex justify-center gap-4">
              {/* <button type="button" className="w-16 h-16 bg-[#F8F9FB] rounded-2xl flex items-center justify-center text-2xl hover:bg-gray-200 transition-colors">
                <FaFacebook className="text-[#1877F2]" />
              </button> */}
              <button type="button" onClick={handleGoogleSignup} className="w-16 h-16 bg-[#F8F9FB] rounded-2xl flex items-center justify-center text-2xl hover:bg-gray-200 transition-colors">
                <FcGoogle />
              </button>
              {/* <button type="button" className="w-16 h-16 bg-[#F8F9FB] rounded-2xl flex items-center justify-center text-2xl hover:bg-gray-200 transition-colors">
                <FaApple className="text-black" />
              </button> */}
            </div>
          </div>

          <p className="text-center text-[#9CA3AF] text-base pt-2">
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