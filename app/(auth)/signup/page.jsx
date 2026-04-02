"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupWithEmail, loginWithGoogle, saveUserProfile, getUserProfile } from "@/lib/firebase";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, MailCheck } from "lucide-react";
import { sendEmailVerification } from "firebase/auth";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await signupWithEmail(email, password);
      await sendEmailVerification(user);
      await saveUserProfile(user.uid, {
        name: name,
        email: user.email,
        profileCompleted: false,
        createdAt: new Date().toISOString()
      });

      setShowVerifyDialog(true);

    } catch (err) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    setGoogleLoading(true);
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
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-4 py-6 md:p-6">
      {/* Email Verification Dialog */}
      {showVerifyDialog && (
        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-white/40 backdrop-blur-md"
>
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: "spring", damping: 25, stiffness: 400 }}
    className="relative w-full max-w-[380px] bg-white p-10 md:p-12 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] flex flex-col items-center text-center border border-gray-50"
  >
    {/* Icon Section - Glassmorphism touch */}
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-[#0ca37f] blur-2xl opacity-10 rounded-full" />
     
        <MailCheck className="text-[#0ca37f]" size={26} strokeWidth={1.5} />
      
    </div>

    {/* Content */}
    <div className="space-y-3 mb-10">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900">
        Verify your email
      </h2>
      <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
        We sent a link to <span className="text-gray-900 font-medium">{email}</span>. 
        It expires in 24 hours.
      </p>
    </div>

    {/* Action */}
    <button
      onClick={() => { setShowVerifyDialog(false); router.replace("/login"); }}
      className="group relative w-full py-4 bg-[#111] hover:bg-black text-white rounded-2xl text-sm font-semibold transition-all duration-300 active:scale-[0.97] overflow-hidden"
    >
      <span className="relative z-10">Back to Login</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </button>
  </motion.div>
</motion.div>
      )}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[28px] md:rounded-[40px] shadow-sm w-full max-w-[360px] md:max-w-[420px] p-5 md:p-10"
      >
        <h1 className="text-lg md:text-[24px] font-bold text-gray-900 mb-0.5 tracking-tight">
          Create an Account
        </h1>
        <p className="text-[#9CA3AF] mb-5 md:mb-8 text-[11px] md:text-base">
          Join the SAYZO community today.
        </p>

        <form onSubmit={handleSignup} className="space-y-3 md:space-y-5">
          {error && (
            <div className="text-[10px] md:text-sm text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 ml-1">Name</label>
            <input
              type="text"
              placeholder="Joe Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#F8F9FB] border-none rounded-xl md:rounded-2xl py-2.5 md:py-3.5 px-4 text-gray-600 text-xs md:text-base focus:ring-1 focus:ring-[#0ca37f] outline-none transition-all"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 ml-1">Email</label>
            <input
              type="email"
              placeholder="joedoe75@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#F8F9FB] border-none rounded-xl md:rounded-2xl py-2.5 md:py-3.5 px-4 text-gray-600 text-xs md:text-base focus:ring-1 focus:ring-[#0ca37f] outline-none transition-all"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#F8F9FB] border-none rounded-xl md:rounded-2xl py-2.5 md:py-3.5 pl-4 pr-10 text-gray-600 text-xs md:text-base focus:ring-1 focus:ring-[#0ca37f] outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label="Toggle password visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0ca37f] transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Create Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 md:py-4 rounded-xl md:rounded-[20px] text-xs md:text-lg font-bold mt-1 active:scale-[0.98] transition-all shadow-md shadow-black/5"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Social Auth */}
        <div className="pt-4 md:pt-6 text-center border-t border-gray-50 mt-4">
          <p className="text-[#9CA3AF] text-[9px] md:text-[12px] uppercase tracking-widest font-bold mb-3">Or Sign Up with</p>
          <div className="flex justify-center">
            <button 
              type="button" 
              onClick={handleGoogleSignup} 
              disabled={googleLoading}
              className="w-10 h-10 md:w-14 md:h-14 bg-[#F8F9FB] rounded-lg md:rounded-2xl flex items-center justify-center text-lg md:text-2xl hover:bg-gray-100 transition-all active:scale-95"
            >
              <FcGoogle />
            </button>
          </div>
        </div>

        <p className="text-center text-[#9CA3AF] text-[10px] md:text-base pt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.replace("/login")}
            className="text-[#0ca37f] font-bold hover:underline"
          >
            Log In
          </button>
        </p>
      </motion.div>
    </div>
  );
}