import { Inter, Instrument_Serif } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

import "./globals.css";

import { PolicyProvider } from "@/app/Context/PolicyContext";
import { AuthProvider } from "@/app/Context/AuthContext";
import ClientLayout from "@/components/ClientLayout";

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
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
      </head>

      <body>
        <PolicyProvider>
          <AuthProvider>

            <Toaster position="top-right" />

            <ClientLayout>
              {children}
            </ClientLayout>

          </AuthProvider>
        </PolicyProvider>
      </body>
    </html>
  );
}