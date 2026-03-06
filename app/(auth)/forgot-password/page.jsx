"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/firebase";
import { motion } from "framer-motion";
import { MailCheck, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSent, setIsSent] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await resetPassword(email);
      setIsSent(true);
    } catch (err) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS STATE - Premium Design
  if (isSent) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[40px] shadow-sm w-full max-w-[440px] p-10 md:p-14 text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-[#0ca37f] mb-8">
            <MailCheck size={40} />
          </div>

          <h1 className="text-[24px] font-bold text-gray-900 mb-3">
            Check your email
          </h1>

          <p className="text-[#9CA3AF] text-base leading-relaxed mb-10">
            We've sent a password reset link to <br />
            <span className="font-semibold text-gray-900">{email}</span>
          </p>

          <button
            onClick={() => router.push("/login")}
            className="w-full bg-black text-white py-4 rounded-[20px] text-lg font-semibold active:scale-[0.98] transition-transform"
          >
            Return to login
          </button>

          <button
            onClick={() => setIsSent(false)}
            className="mt-6 text-[#9CA3AF] text-sm font-medium hover:text-[#0ca37f] transition-colors"
          >
            Didn't receive the email? Try again
          </button>
        </motion.div>
      </div>
    );
  }

  // DEFAULT STATE - Consistent with Login/Signup
  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] shadow-sm w-full max-w-[440px] p-10 md:p-14"
      >
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mb-8 flex items-center gap-2 text-[#9CA3AF] hover:text-black transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h1 className="text-[24px] font-bold text-gray-900 mb-2">
          Forgot Password?
        </h1>
        <p className="text-[#9CA3AF] mb-10 text-base leading-relaxed">
          Enter your email and we'll send you <br />
          instructions to reset your password.
        </p>

        <form onSubmit={handleReset} className="space-y-6">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#F8F9FB] border-none rounded-2xl py-4 px-5 text-gray-600 text-base focus:ring-2 focus:ring-[#0ca37f] outline-none transition-all"
            />
          </div>

          <button 
            type="submit"
            disabled={loading || !email}
            className="w-full bg-black text-white py-4 rounded-[20px] text-lg font-semibold mt-4 active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}