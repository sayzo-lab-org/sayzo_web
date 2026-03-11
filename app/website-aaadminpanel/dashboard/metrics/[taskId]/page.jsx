"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import MetricsDashboard from "./MetricsDashboard";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/app/Context/AuthContext";

export default function TaskMetricsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuth();
  const taskId = params.taskId;

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.replace("/login");
    }
  }, [user, isAdmin, isLoading, router]);

  if (isLoading || !user || !isAdmin) {
    return <div className="min-h-screen bg-[#F8F9FB]" />;
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
        <MetricsDashboard taskId={taskId} />
      </div>
    </AdminLayout>
  );
}
