"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, MailCheck, ArrowUpRight } from "lucide-react";

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

  // SUCCESS STATE
  if (isSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[420px] bg-white rounded-[40px] shadow-sm p-8 md:p-10 text-center space-y-6"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <MailCheck size={40} />
          </div>

          <div className="space-y-2">
            <h1 className="text-[22px] md:text-[24px] font-bold text-gray-900 tracking-tight">
              Check your email
            </h1>
            <p className="text-sm md:text-base text-[#9CA3AF] leading-relaxed">
              We've sent a recovery link to <br />
              <span className="font-bold text-black">{email}</span>
            </p>
          </div>

          <button
            onClick={() => router.push("/login")}
            className="w-full bg-black text-white py-4 rounded-[20px] text-base md:text-lg font-semibold active:scale-[0.97] transition-all shadow-lg shadow-black/5 flex items-center justify-center gap-2"
          >
            Return to Login
            <ArrowUpRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsSent(false)}
            className="text-xs md:text-sm text-[#0ca37f] font-bold hover:underline"
          >
            Didn't receive it? Try again
          </button>
        </motion.div>
      </div>
    );
  }

  // DEFAULT STATE
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] shadow-sm w-full max-w-[420px] p-8 md:p-10"
      >
        <div className="space-y-1.5 mb-8">
          <h1 className="text-[22px] md:text-[24px] font-bold text-gray-900 tracking-tight">
            Forgot Password?
          </h1>
          <p className="text-[#9CA3AF] text-sm md:text-base">
            We’ll send you recovery instructions.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">
          {error && (
            <div className="text-xs md:text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900 mb-2 ml-1">
              Registered Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              required
              className="w-full bg-[#F8F9FB] border-none rounded-2xl py-3.5 px-5 text-gray-600 text-sm md:text-base focus:ring-2 focus:ring-[#0ca37f] outline-none transition-all placeholder:text-gray-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-black text-white py-4 rounded-[20px] text-base md:text-lg font-semibold mt-2 active:scale-[0.97] transition-all disabled:opacity-50 shadow-lg shadow-black/5"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Sending...</span>
              </div>
            ) : (
              "Reset Password"
            )}
          </button>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="flex w-full items-center justify-center gap-2 pt-2 text-sm font-bold text-[#9CA3AF] hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            Back to login
          </button>
        </form>
      </motion.div>
    </div>
  );
}