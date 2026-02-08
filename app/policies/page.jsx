import { Suspense } from "react";
import PolicyPageClient from "@/components/Policy/PolicyPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading policies...</div>}>
      <PolicyPageClient />
    </Suspense>
  );
}
