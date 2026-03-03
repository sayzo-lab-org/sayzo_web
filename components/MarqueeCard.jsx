import Badge from "./Badge";

const MarqueeCard = ({ item }) => {
  return (
    
    <div className="flex items-center gap-6 sm:gap-12 bg-black sm:px-10 sm:py-6 rounded-full whitespace-nowrap mx-3 sm:mx-4 px-6 py-4  transition-all duration-300 shadow-sm">
      <span className="italic text-base sm:text-lg md:text-2xl font-medium tracking-tight text-white">
        "{item.text}"
      </span>
      <Badge category={item.category} />
    </div>
  );
};

export default MarqueeCard;
