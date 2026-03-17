"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Edit3, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboardingStorage } from "@/hooks/useOnboardingStorage";
import ExperienceForm from "./ExperienceForm";

export default function AddExperience({ onNext, onBack, initialData }) {
  const [experiences, setExperiences] = useOnboardingStorage(
    "experience",
    initialData?.experience || []
  );
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const addExperience = (exp) => {
    if (editingIndex !== null) {
      // Edit mode: replace existing entry
      const updated = [...experiences];
      updated[editingIndex] = exp;
      setExperiences(updated);
      setEditingIndex(null);
    } else {
      setExperiences([...experiences, exp]);
    }
    setShowForm(false);
  };

  const deleteExp = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const openEdit = (index) => {
    setEditingIndex(index);
    setShowForm(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto px-6 py-10 space-y-8"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full bg-[#F8F9FB] flex items-center justify-center hover:bg-zinc-100 transition-all active:scale-90"
        >
          <ArrowLeft size={18} className="text-zinc-600" />
        </button>
        <button
          onClick={() => onNext({ experience: experiences })}
          className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors px-4 py-2 bg-[#F8F9FB] rounded-full"
        >
          Skip
        </button>
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 leading-tight">
          Add your <span className="text-emerald-700 font-bold">Experience.</span>
        </h1>
        <p className="text-zinc-500 font-normal text-sm md:text-base leading-relaxed">
          Sharing your past work helps build immediate trust and improves your task matching accuracy.
        </p>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        <AnimatePresence>
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#F8F9FB] rounded-[24px] p-6 border border-transparent hover:border-zinc-200 transition-all group"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-zinc-900 tracking-tight">{exp.role}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                    {exp.company} • {exp.duration}
                  </p>
                  {exp.description && (
                    <p className="text-sm text-zinc-500 mt-3 leading-relaxed max-w-lg">
                      {exp.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(i)}
                    className="p-2 bg-white rounded-full border border-zinc-100 text-zinc-400 hover:text-black hover:border-zinc-300 transition-all"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => deleteExp(i)}
                    className="p-2 bg-white rounded-full border border-zinc-100 text-zinc-400 hover:text-red-600 hover:border-red-100 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Trigger */}
      <button
        onClick={() => { setEditingIndex(null); setShowForm(true); }}
        className="w-full py-5 border-2 border-dashed border-zinc-200 rounded-[24px] text-zinc-400 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:border-emerald-500 hover:text-emerald-600 transition-all group"
      >
        <div className="p-1 bg-zinc-100 rounded-full group-hover:bg-emerald-100 transition-colors">
          <Plus size={18} />
        </div>
        Add New Experience
      </button>

      {/* Footer */}
      <div className="flex justify-end pt-10 border-t border-zinc-50">
        <button
          onClick={() => onNext({ experience: experiences })}
          className="px-8 py-4 bg-black text-white rounded-[20px] font-bold text-base md:text-lg flex items-center gap-3 transition-all active:scale-[0.97] shadow-lg shadow-black/5"
        >
          Next Step <ArrowRight size={20} />
        </button>
      </div>

      {showForm && (
        <ExperienceForm
          addExperience={addExperience}
          close={() => { setShowForm(false); setEditingIndex(null); }}
          initialData={editingIndex !== null ? experiences[editingIndex] : null}
        />
      )}
    </motion.div>
  );
}