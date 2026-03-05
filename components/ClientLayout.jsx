"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import SplashScreen from "@/components/SplashScreen/SplashScreen";
import HeaderWrapper from "@/components/HeaderWrapper";
import AllLinks from "@/components/AllLinks";
import ErrorBoundary from "@/components/ErrorBoundary";
import MagicLinkHandler from "@/components/MagicLinkHandler";

export default function ClientLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [showSplash, setShowSplash] = useState(pathname === "/");

  const handleFinish = () => {
    setShowSplash(false);
    router.replace("/welcome");
  };

  return (
    <>
      {/* Splash only on homepage */}
      {showSplash && pathname === "/" && (
        <SplashScreen onFinish={handleFinish} />
      )}

      {/* Main layout */}
      {!showSplash && (
        <>
          <HeaderWrapper />

          <main>
            <ErrorBoundary>
              <MagicLinkHandler>
                {children}
              </MagicLinkHandler>
            </ErrorBoundary>
          </main>

          <AllLinks />
        </>
      )}
    </>
  );
}