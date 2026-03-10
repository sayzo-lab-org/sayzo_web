"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import SplashScreen from "@/components/SplashScreen/SplashScreen";
import ErrorBoundary from "@/components/ErrorBoundary";
import MagicLinkHandler from "@/components/MagicLinkHandler";

export default function ClientLayout({ children }) {

  const router = useRouter();
  const pathname = usePathname();

  const [showSplash, setShowSplash] = useState(pathname === "/");

  const handleFinish = () => {
    setShowSplash(false);

    const seen = localStorage.getItem("sayzo_welcome_seen");

    if (seen) {
      router.replace("/");
    } else {

      router.replace("/");

    }
  };

  return (
    <>
      {showSplash && pathname === "/" && (
        <SplashScreen onFinish={handleFinish} />
      )}

      {!showSplash && (
        <main>
          <ErrorBoundary>
            <MagicLinkHandler>
              {children}
            </MagicLinkHandler>
          </ErrorBoundary>
        </main>
      )}
    </>
  );
}