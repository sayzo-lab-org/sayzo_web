import { Inter,Instrument_Serif } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

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
  applicationName: "SAYZO",
  title: "SAYZO - Hire Local Help in Minutes | Post Tasks, Get It Done Today",
  description:
    "Need help with errands, repairs, or deliveries? Post your task on SAYZO and connect with trusted local helpers near you. Fast, affordable, reliable.",

  keywords: [
    "hire local help",
    "task marketplace India",
    "find helpers near me",
    "post tasks online",
    "local services app",
    "neighborhood helpers",
    "gig work India",
    "errand services",
    "home services",
  ],

  metadataBase: new URL("https://sayzo.in"),

  openGraph: {
    title: "SAYZO - Hire Local Help in Minutes | Get Tasks Done Today",
    description:
      "Need help with errands, repairs, or deliveries? Post your task and connect with trusted local helpers near you. Fast, affordable, reliable.",
    url: "https://sayzo.in",
    siteName: "SAYZO",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SAYZO - Hire Local Help in Minutes",
    description: "Post tasks and connect with trusted local helpers near you. Fast, affordable, reliable.",
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
      <body>
        <Toaster position="top-right" />
        {/* FULL WIDTH */}
        <HeaderWrapper />
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
      </body>
      </AuthProvider>
      </PolicyProvider>
    </html>
  );
}