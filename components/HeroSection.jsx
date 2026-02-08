import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import Image from "next/image";
import Landing3 from "@/public/assets/Landing3.png";
import { LayoutTextFlip } from "./ui/layout-text-flip";


const HeroSection = () => {
  return (
    <section className="relative flex flex-col">
      {/* IMAGE */}
      {/* <Image
        src={Landing3}
        alt="Landing Image"
        
        className="
          sm:w-full relative z-0
          -bottom-50
          lg:bottom-100
          sm:-bottom-10
          bg-white
        
          
        "
      /> */}
     


      {/* CONTENT */}
      <div
        className="
          relative z-20 max-w-350 mx-auto px-4

          /* MOBILE */
          flex flex-col items-center text-center
          md:my-10 my-20 pt-30

          /* TABLET + DESKTOP DESKTOP */
          lg:flex-row lg:items-start lg:justify-between lg:text-left
          
          
        "
      >
        {/* HEADING */}
        <div className="flex flex-col items-center justify-center mx-auto  ">
        <div className="md:mb-6  lg:mb-8">
        <div className="flex items-center gap-3 border border-gray-300 p-2 rounded-full w-fit mx-auto sm:mt-10 mt-5 justify-center lg:justify-start sm:text-xs text-[10px] font-medium">
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

            <AvatarGroup>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png"  />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://github.com/maxleiter.png" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://github.com/evilrabbit.png" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </AvatarGroup>

            <span>1000+ people in the waitlist</span>
          </div>
          <h1 className="text-[27px] md:text-4xl lg:text-6xl text-center mt-5  text-black md:font-semibold font-bold leading-10 sm:leading-20">
            <LayoutTextFlip/> Any Moment. <br className="hidden md:block"/>
            Any Skills.{" "}
            <span className="">In 5 minutes</span>
          </h1>
        </div>

        {/* SUB TEXT */}
        <div className="text-sm lg:text-left px-9 sm:px-0">
          {/* <p className="text-black font-normal">
            Get instant help from real people for real-life <br className="hidden sm:block" />
            urgent tasks - in minutes.
          </p> */}

          {/* <div className="flex items-center gap-3 sm:mt-3 mt-5 justify-center lg:justify-start sm:text-xs text-[10px] font-medium">
            <AvatarGroup>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png"  />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://github.com/maxleiter.png" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://github.com/evilrabbit.png" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </AvatarGroup>

            <span>1000+ people in the waitlist</span>
          </div> */}
          </div>
        </div>
      </div>
      <div className="mx-auto px-5 md:px-5 lg:px-5 mb-10 sm:mb-0 rounded-2xl overflow-hidden sm:mt-10 lg:max-w-300">
  <video
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover rounded-2xl mb-10"
  >
    <source src="/assets/Abstract.mp4" type="video/mp4" />
  </video>
</div>
    </section>
  );
};

export default HeroSection;
