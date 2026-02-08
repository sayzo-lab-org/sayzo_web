
import CommunityFirst from "@/components/CommunityFirst";
import AnyTask from "@/components/LadingPage/AnyTask";
import BuildForWork from "@/components/LadingPage/BuildForWork";
import HeroSection1 from "@/components/LadingPage/HeroSection1";
import HowItWorks from "@/components/LadingPage/HowItWorks";



export default function Home () {
  

  return (
    <div>
    <HeroSection1/>
    <BuildForWork/>
    <AnyTask/>
    <div className='max-w-350 mx-auto pb-20 md:pb-30 px-4 '>
    <CommunityFirst/>
   
    </div>
     <HowItWorks/>
    
  </div>
  );
};

