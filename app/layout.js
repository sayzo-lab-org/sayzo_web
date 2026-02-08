import { Inter,Instrument_Serif } from "next/font/google";

import "./globals.css";
import Footer from "@/components/Footer";
import HeaderWrapper from "@/components/HeaderWrapper";
import { PolicyProvider } from "@/app/Context/PolicyContext";
import AllLinks from "@/components/AllLinks";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight:"400",
  variable: "--font-instrument-serif",
});

export default function RootLayout({ children }) {
  
  return (
    <html lang="en"  className={`${inter.variable} ${instrumentSerif.variable}`}>
      <PolicyProvider>
      <body>
        {/* FULL WIDTH */}
        <HeaderWrapper />

        {/* CENTERED APP CONTENT */}
        <div >
       
          <main>
            {children}
          </main>
        
        </div>
        <AllLinks/>
        <Footer/>
      </body>
      </PolicyProvider>
    </html>
  );
}
