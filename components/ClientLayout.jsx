"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import SplashScreen from "@/components/SplashScreen/SplashScreen";
import ErrorBoundary from "@/components/ErrorBoundary";
import MagicLinkHandler from "@/components/MagicLinkHandler";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [showSplash, setShowSplash] = useState(pathname === "/");

  return (
    <>
      {showSplash && pathname === "/" && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      <ErrorBoundary>
        <MagicLinkHandler>
          {children}
        </MagicLinkHandler>
      </ErrorBoundary>
    </>
  );
}