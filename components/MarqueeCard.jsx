import Badge from "./Badge";

const MarqueeCard = ({ item }) => {
  return (
    <div className="flex items-center gap-6 sm:gap-12 bg-[#f8f9fb] px-6 sm:px-10 py-4 sm:py-6 rounded-full  whitespace-nowrap mx-3 sm:mx-4">
      <span className="text-base sm:text-lg md:text-2xl font-medium tracking-tight">
        “{item.text}”
      </span>
      <Badge category={item.category} />
    </div>
  );
};

export default MarqueeCard;
