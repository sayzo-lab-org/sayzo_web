import ProblemSection from "./ProblemSection";

const HelpSection = () => {
    return (
      <section className="w-full bg-white max-w-350 mx-auto sm:px-4  mb-30 sm:mt-5 ">

        <div className=" flex flex-col md:flex-row md:items-center md:justify-between items-start pl-3 sm:pl-0  sm:justify-center sm:items-center gap-6">
          
          {/* LEFT CONTENT */}
          <h2 className="text-[28px] sm:text-[32px] lg:text-5xl font-semibold leading-tight ">
            Sayzo Helps For Every <br />
            Situation In{" "}
            <span className="text-emerald-500">
              5 Minutes.
            </span>
          </h2>
  
          {/* RIGHT CONTENT */}
          <div className="sm:text-sm text-xs md:text-end text-gray-600 max-w-xs space-y-2">
            <p>
              Get instant help from real people for real-life urgent tasks - in minutes.
            </p>
            {/* <p>
              Get instant help from real people for real-life urgent tasks - in minutes.
            </p> */}
          </div>
  
        </div>
        <div className="sm:mt-16 mt-24">
        <ProblemSection />
      </div>
      </section>
    );
  };
  
  export default HelpSection;
  