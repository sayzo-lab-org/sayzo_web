import FAQList from "./FAQList";

const FQR = () => {
  return (
    <section className="my-20.5 px-4">
      <div className="flex flex-col lg:flex-row max-w-350 mx-auto items-start lg:items-center gap-12">

        {/* LEFT */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
            Real Problems <br />
            <span className="text-primary-btn">Real Solutions</span>
          </h2>

          <p className="mt-4 max-w-lg text-xs md:text-base text-gray-600">
          The everyday problems people face - and how Sayzo solves them in real time.
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-1/2">
          <FAQList />
        </div>

      </div>
    </section>
  );
};

export default FQR;
