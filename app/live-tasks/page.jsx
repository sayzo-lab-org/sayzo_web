import UserPage from "@/components/UserPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Suspense } from "react";

export const metadata = {
  title: "Browse Live Tasks Near You | Earn Money Helping Neighbors Today",
  description: "Looking to earn extra income? Browse real tasks posted by people nearby. Apply instantly, set your rate, and start earning with SAYZO today.",
  openGraph: {
    title: "Browse Live Tasks Near You | Earn Money Today",
    description: "Find real tasks posted by people nearby. Apply instantly and start earning with SAYZO.",
    url: "https://sayzo.in/live-tasks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Live Tasks Near You",
    description: "Find real tasks posted by people nearby. Apply instantly and start earning.",
  },
};

export default function LiveTasksPage() {
  return (
               <Suspense fallback={<div className="p-10 text-center">Loading tasks...</div>}>
      <UserPage mode="live" />
    </Suspense>
  );
}
