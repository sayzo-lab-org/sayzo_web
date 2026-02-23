import { Suspense } from "react";
import PolicyPageClient from "@/components/Policy/PolicyPageClient";


export const metadata = {
  title: "SAYZO Terms, Privacy & Guidelines | Your Safety Comes First",
  description: "Read our terms of service, privacy policy, and community guidelines. Learn how SAYZO protects your data and ensures safe, trusted interactions.",
  openGraph: {
    title: "SAYZO Terms, Privacy & Community Guidelines",
    description: "Learn how SAYZO protects your data and ensures safe, trusted interactions.",
    url: "https://sayzo.in/policies",
    type: "website",
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading policies...</div>}>
      <PolicyPageClient />
    </Suspense>
  );
}
