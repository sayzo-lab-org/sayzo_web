"use client";

import { useState ,useEffect } from "react";
import { ArrowLeft, Plus, Trash2, ArrowRight, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageForm from "./LanguageForm";

export default function AddLanguages({ onNext, onBack, initialData }) {
  const [languages, setLanguages] = useState(() => {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem("sayzo_onboarding");

  let parsed = {};
  try {
    parsed = saved ? JSON.parse(saved) : {};
  } catch {
    parsed = {};
  }

  return parsed.languages || initialData?.languages || [];
});
  const [showForm, setShowForm] = useState(false);

  const addLanguage = (lang) => {
    setLanguages(prev => [...prev, lang]);
    setShowForm(false);
  };

  const deleteLang = (index) => {
    const updated = [...languages];
    updated.splice(index, 1);
    setLanguages(updated);
  };

  useEffect(() => {
  if (typeof window === "undefined") return;

  const saved = localStorage.getItem("sayzo_onboarding");

  let parsed = {};
  try {
    parsed = saved ? JSON.parse(saved) : {};
  } catch {
    parsed = {};
  }

  const updated = {
    ...parsed,
    languages: languages
  };

  localStorage.setItem(
    "sayzo_onboarding",
    JSON.stringify(updated)
  );

}, [languages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto px-6 py-10 space-y-8"
    >
      {/* Top Bar - Minimalist Industrial */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full bg-[#F8F9FB] flex items-center justify-center hover:bg-zinc-100 transition-all active:scale-90"
        >
          <ArrowLeft size={18} className="text-zinc-600" />
        </button>

        <button
          onClick={() => onNext({ languages })}
          className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors px-4 py-2 bg-[#F8F9FB] rounded-full"
        >
          Skip
        </button>
      </div>

      {/* Heading - Bold Primary */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 leading-tight">
          Add your <span className="text-emerald-700 font-bold">Languages.</span>
        </h1>
        <p className="text-zinc-500 font-normal text-sm md:text-base leading-relaxed">
          Communication is the foundation of every successful task. List the languages you speak and your proficiency level.
        </p>
      </div>

      {/* Language List - Industrial Cards */}
      <div className="space-y-3">
        <AnimatePresence>
          {languages.map((lang, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex justify-between items-center bg-[#F8F9FB] p-5 rounded-[24px] group border border-transparent hover:border-zinc-200 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                   <Globe size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-base font-bold text-zinc-900 tracking-tight">{lang.name}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{lang.level}</p>
                </div>
              </div>

              <button
                onClick={() => deleteLang(i)}
                className="p-2.5 bg-white rounded-full border border-zinc-100 text-zinc-400 hover:text-red-600 hover:border-red-100 transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Language Trigger - Dashed Industrial */}
      <button
        onClick={() => setShowForm(true)}
        className="w-full py-5 border-2 border-dashed border-zinc-200 rounded-[24px] text-zinc-400 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:border-emerald-500 hover:text-emerald-600 transition-all group"
      >
        <div className="p-1 bg-zinc-100 rounded-full group-hover:bg-emerald-100 transition-colors">
          <Plus size={18} />
        </div>
        Add Language Capability
      </button>

      {/* Navigation Footer - Step 06 / 07 */}
      <div className="flex items-center justify-between pt-10 border-t border-zinc-50 mt-12">
        <div className="flex gap-1">
          {[...Array(7)].map((_, i) => (
            <div 
              key={i} 
              className={`h-1 w-4 rounded-full transition-colors ${i === 6 ? 'bg-emerald-600' : 'bg-zinc-100'}`} 
            />
          ))}
        </div>

        <button
          onClick={() => onNext({ languages })}
          className="px-8 py-4 bg-black text-white rounded-[20px] font-bold text-base md:text-lg flex items-center gap-3 transition-all active:scale-[0.97] shadow-lg shadow-black/5"
        >
          Review Profile <ArrowRight size={20} />
        </button>
      </div>

      {showForm && (
        <LanguageForm
          addLanguage={addLanguage}
          close={() => setShowForm(false)}
        />
      )}
    </motion.div>
  );
}