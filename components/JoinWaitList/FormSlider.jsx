

const FormSlider = ({ label, value, onChange, min, max, step = 1, formatValue }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-zinc-500 text-sm">{label}</label>
        <span className="text-white font-medium">{formatValue(value)}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1 bg-zinc-700 rounded-full appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, #71717A ${percentage}%, #3f3f46 ${percentage}%)`
          }}
        />
      </div>
      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        .slider-thumb::-webkit-slider-thumb:active {
          cursor: grabbing;
        }
        .slider-thumb::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          cursor: grab;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default FormSlider;
