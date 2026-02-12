import { Suspense } from "react";
import PolicyPageClient from "@/components/Policy/PolicyPageClient";


export const metadata = {
  title: "Policies & Guidelines | SAYZO",
  description: "Read our User Manual, Terms of Service, and Privacy Policies to understand how SAYZO protects our community.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading policies...</div>}>
      <PolicyPageClient />
    </Suspense>
  );
}
