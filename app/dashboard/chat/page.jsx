"use client";

import { MessageSquareText } from "lucide-react";
import ComingSoon from "@/components/dashboard/ComingSoon";

export default function ChatPage() {
  return (
    <ComingSoon
      icon={MessageSquareText}
      title="Chat System"
      message="Real-time chat between task giver and task doer will be available soon."
    />
  );
}
