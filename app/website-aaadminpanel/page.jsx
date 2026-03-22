"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/app/Context/AuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (user && isAdmin) {
      router.replace("/website-aaadminpanel/dashboard");
    } else {
      router.replace("/login");
    }
  }, [user, isAdmin, isLoading, router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center pt-32">
      <Loader2 className="w-8 h-8 text-white animate-spin" />
    </div>
  );
}
