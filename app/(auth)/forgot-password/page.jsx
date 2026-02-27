"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, MailCheck } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-[#0ca37f]">
            <MailCheck size={32} />
          </div>

          <h1 className="text-xl font-semibold">Check your email</h1>

          <p className="text-sm text-gray-500">
            We've sent a password reset link to{" "}
            <span className="font-semibold text-black">{email}</span>
          </p>

          <Button
            onClick={() => router.push("/login")}
            className="w-full"
          >
            Return to login
          </Button>

          <button
            onClick={() => setIsSent(false)}
            className="text-sm text-gray-500 hover:underline"
          >
            Didn't receive the email? Try again
          </button>
        </div>
      </div>
    );
  }

  // DEFAULT STATE
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-center">
            Forgot Password?
          </h1>
          <p className="text-sm text-gray-500 text-center mt-2">
            We’ll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading || !email}
            className="w-full"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset Password
          </Button>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="flex w-full items-center justify-center gap-2 text-sm text-gray-500 hover:text-black"
          >
            <ArrowLeft size={16} />
            Back to login
          </button>
        </form>
      </div>
    </div>
  );
}