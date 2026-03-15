"use client";

import { X, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function SkillModal({
  category,
  skills,
  selectedSkills,
  setSelectedSkills,
  close
}) {

  const toggleSkill = (skill) => {

    const exists = selectedSkills.some(
      (s) => s.name === skill
    );

    if (exists) {

      setSelectedSkills(
        selectedSkills.filter((s) => s.name !== skill)
      );

    } else if (selectedSkills.length < 20) {

      setSelectedSkills([
        ...selectedSkills,
        {
          name: skill,
          category: category.name
        }
      ]);

    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[32px] p-8 w-full max-w-lg shadow-2xl"
      >

        {/* Header */}
        <div className="flex justify-between items-start mb-8">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
              {category?.name}
            </p>

            <h2 className="text-xl font-bold text-zinc-900">
              Selected {selectedSkills.length}/20
            </h2>
          </div>

          <button
            onClick={close}
            className="p-2 bg-[#F8F9FB] rounded-full hover:bg-zinc-100"
          >
            <X size={20} className="text-zinc-600" />
          </button>

        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-3">

          {skills.map((skill) => {

            const isSelected = selectedSkills.some(
              (s) => s.name === skill
            );

            return (
              <div
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between
                ${
                  isSelected
                    ? "border-emerald-600 bg-white"
                    : "border-transparent bg-[#F8F9FB] hover:border-zinc-200"
                }`}
              >

                <span
                  className={`text-sm font-medium ${
                    isSelected
                      ? "text-emerald-700"
                      : "text-zinc-600"
                  }`}
                >
                  {skill}
                </span>

                {isSelected && (
                  <Check size={14} className="text-emerald-600" />
                )}

              </div>
            );
          })}

        </div>

        {/* Footer */}
        <button
          onClick={close}
          className="w-full mt-8 py-4 bg-black text-white rounded-[20px] font-bold"
        >
          Save Selection
        </button>

      </motion.div>

    </div>
  );
}