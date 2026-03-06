"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupWithEmail, loginWithGoogle, saveUserProfile, getUserProfile } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);

  // Email Signup
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

      router.replace("/");
    } catch (err) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    setError(null);
    setGoogleLoading(true);

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

      router.replace("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Google sign-up failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-center">Create Account</h1>
          <p className="text-sm text-gray-500 text-center mt-2">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-[#0ca37f] font-medium hover:underline"
            >
              Log in
            </button>
          </p>
        </div>

        {/* Google Button */}
        <Button
          variant="outline"
          onClick={handleGoogleSignup}
          disabled={googleLoading}
          className="w-full h-11 flex gap-2"
        >
          {googleLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Sign up with Google"
          )}
        </Button>

        <div className="relative text-center text-xs text-gray-400">
          <span className="bg-white px-2 relative z-10">OR</span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
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
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}