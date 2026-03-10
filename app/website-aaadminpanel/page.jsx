"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminAuthModal from "@/components/admin/AdminAuthModal";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/app/Context/AuthContext";

export default function AdminLoginPage() {
  const router = useRouter();

  // Use centralized auth context instead of own listener
  const { user, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    // Check if already logged in as admin
    if (user && isAdmin) {
      router.push("/website-aaadminpanel/dashboard");
    }
    // Check if logged in but NOT an admin
    else if (user && !isAdmin) {
      router.push("/dashboard"); // Or "/"
    }
  }, [user, isAdmin, isLoading, router]);

  const handleAuthSuccess = (user) => {
    router.push("/website-aaadminpanel/dashboard");
  };

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-32">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  // If already admin, will redirect via useEffect - show loading briefly
  if (user && isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-32">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return <AdminAuthModal onSuccess={handleAuthSuccess} />;
}
