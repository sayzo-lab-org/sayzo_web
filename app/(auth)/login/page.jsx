"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  loginWithEmail,
  loginWithGoogle,
  getUserProfile,
  saveUserProfile,
} from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);

  // Email Login
const handleLogin = async (e) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    await loginWithEmail(email, password);

    router.push("/"); // go home
  } catch (err) {
    setError("Invalid email or password. Please try again.");
  } finally {
    setLoading(false);
  }
};

// Google Login
const handleGoogleLogin = async () => {
  setError(null);
  setGoogleLoading(true);

  try {
    const user = await loginWithGoogle();

    // Optional: Ensure profile exists (for first-time Google users)
    const profile = await getUserProfile(user.uid);

    if (!profile) {
      await saveUserProfile(user.uid, {
        email: user.email,
        role: "task_doer",
        profileCompleted: true,
      });
    }

    router.push("/"); // go home
  } catch (err) {
    console.error("Google Login Error:", err);
    setError(err.message || "Google sign-in failed.");
  } finally {
    setGoogleLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-center">Welcome Back</h1>
          <p className="text-sm text-gray-500 text-center mt-2">
            New to Sayzo?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-[#0ca37f] font-medium hover:underline"
            >
              Create an account
            </button>
          </p>
        </div>

        {/* Google Login */}
        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full h-11 flex gap-2"
        >
          {googleLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Continue with Google"
          )}
        </Button>

        <div className="relative text-center text-xs text-gray-400">
          <span className="bg-white px-2 relative z-10">OR</span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
        </div>

        {/* Email Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
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

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Password</Label>
              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="text-xs text-[#0ca37f] hover:underline"
              >
                Forgot?
              </button>
            </div>

            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}