import { Inter,Instrument_Serif } from "next/font/google";
import { Toaster } from "react-hot-toast";

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
  weight:"400",
  variable: "--font-instrument-serif",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SAYZO",
  "alternateName": ["Sayzo", "sayzo.in"],
  "url": "https://sayzo.in/"
};

export const metadata = {
  title: "Sayzo — Get Tasks Done Fast | Find Local Help Anytime",
  description:
    "Sayzo helps you get everyday tasks done quickly by connecting you with trusted local helpers. Post a task, set your budget, and get it completed fast — anytime, anywhere.",

  keywords: [
    "task marketplace",
    "local services",
    "hire helpers",
    "post tasks online",
    "get work done fast",
    "Sayzo India",
    "freelance tasks",
  ],

  metadataBase: new URL("https://sayzo.in"),

  openGraph: {
    title: "Sayzo — Get Tasks Done Fast",
    description:
      "Post tasks, set your budget, and get help from trusted local people instantly.",
    url: "https://sayzo.in",
    siteName: "Sayzo",
    type: "website",
  },
  verification: {
    google: "863C8rGepBCeS7A97VIQdnrSCu3LpQiUZtSv7_1uj5g",
  },
  icons: {
   
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    
    shortcut: '/favicon.ico',
   
    apple: '/apple-touch-icon.png',
  },
  
  manifest: '/site.webmanifest',
};


export default function RootLayout({ children }) {
  
  return (
    <html lang="en"  className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <PolicyProvider>
      <AuthProvider>
      <body>
        <Toaster position="top-right" />
        {/* FULL WIDTH */}
        <HeaderWrapper />

        {/* CENTERED APP CONTENT */}
        <div >

          <main>
            <ErrorBoundary>
              <MagicLinkHandler>
                {children}
              </MagicLinkHandler>
            </ErrorBoundary>
          </main>

        </div>
        <AllLinks/>
        <Footer/>
      </body>
      </AuthProvider>
      </PolicyProvider>
    </html>
  );
}
