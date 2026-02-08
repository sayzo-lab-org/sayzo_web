'use client';
import { useState } from "react";

const PillSelector = ({
  label,
  options,
  selected,
  onChange,
  onAddCustom,
  required
}) => {
  const [customValue, setCustomValue] = useState("");

  const isSkills = label.toLowerCase().includes("skills");
  const isOccupation = label.toLowerCase().includes("occupation");

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const handleAdd = () => {
    const value = customValue.trim();
    if (!value) return;

    if (!options.includes(value)) {
      onAddCustom(value); // 🔥 THIS pushes pill AFTER Customer Success
    }

    setCustomValue("");
  };

  return (
    <div className="space-y-3">
      <label className="text-zinc-500 text-sm tracking-wide uppercase  ">
        {label}{required && " *"}
      </label>

      {(isSkills || isOccupation) && (
        <div className="flex gap-2 items-center mt-2">
          <input
            type="text"
            placeholder={isSkills ? "Write your skill" : "Write your occupation"}
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            className="flex-1 bg-[#18181B] text-white px-4 py-3  items-center rounded-xl border border-zinc-800"
          />

          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700"
          >
            Add
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => toggleOption(option)}
            className={`px-4 py-2 rounded-full border text-sm transition-all
              ${
                selected.includes(option)
                  ? "bg-zinc-800 text-white border-zinc-600"
                  : "bg-transparent text-zinc-500 border-zinc-700 hover:border-zinc-500"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PillSelector;
