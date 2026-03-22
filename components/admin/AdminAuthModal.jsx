"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { loginWithEmail } from "@/lib/firebase";
import { isAdminEmail } from "@/lib/adminConfig";
import { useAuth } from "@/app/Context/AuthContext";

const AdminAuthModal = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { user: authUser, isLoading: authLoading, logout } = useAuth();

  const onSuccessRef = useRef(onSuccess);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  const input =
    "w-full bg-[#18181B] text-white placeholder:text-zinc-500 px-4 py-4 my-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600";

  // If user is already authenticated, verify admin and call onSuccess
  useEffect(() => {
    if (authLoading) return;

    let isMounted = true;

    const verifyAdmin = async () => {
      if (!authUser) return;

      try {
        if (!isAdminEmail(authUser.email)) {
          await logout();
          if (isMounted) {
            setError("Unauthorized: This email is not authorized for admin access");
          }
          return;
        }

        onSuccessRef.current?.({
          uid: authUser.uid,
          email: authUser.email,
        });
      } catch (err) {
        console.error("Admin auth error:", err);
        if (isMounted) {
          setError("Authentication failed. Please try again.");
        }
      }
    };

    verifyAdmin();

    return () => {
      isMounted = false;
    };
  }, [authUser, authLoading, logout]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isAdminEmail(email)) {
      setError("This email is not authorized for admin access");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      // onSuccess will be triggered by the useEffect above when authUser updates
    } catch (err) {
      console.error("Admin Login Error:", err);
      const errorMessages = {
        "auth/invalid-email": "Invalid email address",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/user-not-found": "No account found with this email.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
        "auth/network-request-failed": "Network error. Please check your connection.",
        "auth/invalid-credential": "Incorrect email or password.",
      };
      setError(errorMessages[err.code] || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 pt-32">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl text-white font-bold">Admin Login</h1>
          <p className="text-zinc-400 text-sm mt-2">
            Enter your admin credentials to continue
          </p>
        </div>

        <div className="relative">
          <input
            className={input}
            type="email"
            placeholder="Admin Email Address *"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        <div className="relative">
          <input
            className={`${input} pr-12`}
            type={showPassword ? "text" : "password"}
            placeholder="Password *"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

        <button
          disabled={loading || !validateEmail(email) || !password}
          onClick={handleLogin}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-4 rounded-full font-semibold disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminAuthModal;
