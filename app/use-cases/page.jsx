
import UserPage from "@/components/UserPage";
import { Suspense } from "react";

export const metadata = {
  title: "What Can You Post on SAYZO? | Real Task Examples & Use Cases",
  description: "Wondering what tasks you can post? See real examples—from grocery runs to furniture assembly—and learn how SAYZO users save time every day.",
  openGraph: {
    title: "What Can You Post on SAYZO? | Real Task Examples",
    description: "From grocery runs to furniture assembly—see how real users get tasks done daily on SAYZO.",
    url: "https://sayzo.in/use-cases",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Can You Post on SAYZO?",
    description: "See real task examples and learn how SAYZO users save time every day.",
  },
};

export default function Home() {
  return (
   <main > 
    {/* <HeroSection/>
    <TheProblem/> */}
    {/* <TheProblem2/> */}
    {/* <TextRotateChange/>
    <CommunityFirst/>
    <BillBoart/>
    <FQR/>
    <Blog/> */}
    {/* <FeaturesSectionDemo/> */}
   <Suspense fallback={<div className="flex items-center justify-center min-h-screen" />}>
    <UserPage mode="showcase" />
   </Suspense>
     
      
   
   </main>
  );
}
