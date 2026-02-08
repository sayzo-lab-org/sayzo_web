
const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentStep - 1 
                ? "w-8 bg-white" 
                : index < currentStep - 1 
                  ? "w-3 bg-zinc-500" 
                  : "w-3 bg-zinc-700"
            }`}
          />
        ))}
      </div>
      <span className="text-zinc-500 text-sm tracking-wide">
        STEP {currentStep} OF {totalSteps}
      </span>
    </div>
  );
};

export default StepIndicator;
