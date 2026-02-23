import Blog from "@/components/Blog/Blog";
import FQR from "@/components/FQR/FQR";
import HelpSection from "@/components/HelpSection";
import HelpSection2 from "@/components/HelpSection2";
import WhySayzoPage from "@/components/WhySayzoPage";

export const metadata = {
  title: "Why SAYZO? | The Smarter Way to Get Tasks Done Locally",
  description: "Tired of unreliable help? SAYZO connects you with verified local helpers in minutes. No middlemen, fair pricing, and trusted by thousands across India.",
  openGraph: {
    title: "Why Choose SAYZO? | Smarter Local Task Marketplace",
    description: "Connect with verified local helpers in minutes. No middlemen, fair pricing, trusted by thousands.",
    url: "https://sayzo.in/why-sayzo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why SAYZO?",
    description: "The smarter way to get tasks done locally. Verified helpers, fair pricing.",
  },
};

export default function Home() {
    
  return (
    <section className="relative max-w-380 mx-auto pt-6 z-10 ">
      
     <WhySayzoPage/>
     <HelpSection/>
     <HelpSection2/>
     <FQR/>
     <Blog/>
    </section>
  );
}
