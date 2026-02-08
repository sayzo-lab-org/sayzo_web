import RotatingText from './RotatingText';

const TextRotateChange = () => {
  return (
    <div
      className="
        md:my-20 my-20 max-w-350 mx-auto
        font-medium
        text-xl sm:text-2xl md:text-4xl lg:text-5xl
        flex flex-wrap lg:items-start lg:justify-start
        justify-center items-center
        md:text-left lg:text-left
        gap-x-2 gap-y-2
        leading-tight
      "
    >
      <span className="block md:inline">
        We Find The Right
      </span>

      <RotatingText
        texts={['Skill', 'Help', 'Neighbour', 'Professional', 'Trusted Person']}
        mainClassName="
          px-2 md:px-3
          font-bold text-primary-btn
          overflow-hidden
          
          justify-center
          rounded-lg
        "
        staggerFrom="last"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '-120%' }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden"
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
        rotationInterval={2000}
      />

      <span className="block md:inline">
        in 5 Minutes
      </span>
    </div>
  );
};

export default TextRotateChange;
