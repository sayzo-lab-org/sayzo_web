import Blog from "@/components/Blog/Blog";
import FQR from "@/components/FQR/FQR";
import HelpSection from "@/components/HelpSection";
import HelpSection2 from "@/components/HelpSection2";
import WhySayzoPage from "@/components/WhySayzoPage";

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
