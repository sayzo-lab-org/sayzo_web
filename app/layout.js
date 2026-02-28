"use client";

import { Inter, Instrument_Serif } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";

import "./globals.css";
import Footer from "@/components/Footer";
import HeaderWrapper from "@/components/HeaderWrapper";
import { PolicyProvider } from "@/app/Context/PolicyContext";
import { AuthProvider } from "@/app/Context/AuthContext";
import AllLinks from "@/components/AllLinks";
import ErrorBoundary from "@/components/ErrorBoundary";
import MagicLinkHandler from "@/components/MagicLinkHandler";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${instrumentSerif.variable} scroll-smooth selection:bg-emerald-100 selection:text-emerald-900`}
    >
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      
      <PolicyProvider>
        <AuthProvider>
          <body className="antialiased bg-white min-h-screen">
            {/* Subtle Grain Overlay for texture */}
            <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            <Toaster 
              position="top-right" 
              toastOptions={{
                className: 'rounded-2xl font-medium text-sm',
                duration: 4000,
                style: {
                  background: '#fff',
                  color: '#1a1a1a',
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
                }
              }} 
            />

            <HeaderWrapper />
            
            <main>
              <ErrorBoundary>
                <MagicLinkHandler>
                  {/* Smooth Page Entry Animation */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {children}
                    </motion.div>
                  </AnimatePresence>
                </MagicLinkHandler>
              </ErrorBoundary>
            </main>

            <AllLinks />

            {/* Global Hover Glow Effect (Optional - add to global.css for best perf) */}
            <style jsx global>{`
              ::-webkit-scrollbar {
                width: 8px;
              }
              ::-webkit-scrollbar-track {
                background: transparent;
              }
              ::-webkit-scrollbar-thumb {
                background: #e2e8f0;
                border-radius: 10px;
              }
              ::-webkit-scrollbar-thumb:hover {
                background: #cbd5e1;
              }
            `}</style>
          </body>
        </AuthProvider>
      </PolicyProvider>
    </html>
  );
}