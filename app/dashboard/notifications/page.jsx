"use client";

import { Bell } from "lucide-react";
import ComingSoon from "@/components/dashboard/ComingSoon";

export default function NotificationsPage() {
  return (
    <ComingSoon
      icon={Bell}
      title="Notifications"
      message="Catch up on your latest alerts, messages, and updates. This feature is coming soon."
    />
  );
}