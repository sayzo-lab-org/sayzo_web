"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingGate({ children }) {
  const router = useRouter();

  useEffect(() => {
    const welcome = localStorage.getItem("sayzo_welcome_seen");
    const notifications = localStorage.getItem("sayzo_notifications_seen");
    const location = localStorage.getItem("sayzo_user_location");

    if (!welcome) {
      router.replace("/welcome");
      return;
    }

    if (!notifications) {
      router.replace("/notifications");
      return;
    }

    if (!location) {
      router.replace("/location");
      return;
    }

  }, [router]);

  return children;
}