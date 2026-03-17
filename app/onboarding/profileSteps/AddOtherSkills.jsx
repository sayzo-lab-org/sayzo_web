"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useOnboardingStorage } from "@/hooks/useOnboardingStorage";
import SkillModal from "./SkillModal";

const skillsByCategory = {
  "Coaching, Teaching & Advisory": [
    "Career Coaching", "Life Coaching", "Fitness Coaching", "Nutrition Coaching",
    "Wellness & Mindfulness", "Language Teaching", "Academic Tutoring", "Game Coaching",
    "Fashion & Styling Advisory", "Mentorship & Guidance",
  ],
  "Strategy & Consulting": [
    "Business Consulting", "HR Consulting", "Marketing Strategy", "Content Strategy",
    "Social Media Strategy", "Growth Strategy", "AI Consulting", "Tech Consulting", "Data Consulting",
  ],
  "Data & Analytics": [
    "Data Analytics", "Data Science", "Machine Learning", "Data Engineering",
    "Data Visualization", "Data Processing", "Data Annotation", "Data Scraping",
  ],
  "Design & Creative": [
    "Brand & Graphic Design", "UI/UX Design", "Illustration & Visual Art",
    "Image Editing", "Presentation Design", "3D Design",
  ],
  "Development & Engineering": [
    "Website Development", "App Development", "Software Development",
    "AI Development", "Automation & Chatbots", "Cloud & DevOps", "Cybersecurity",
  ],
  "Marketing Execution": [
    "SEO & GEO", "Paid Advertising", "Content Marketing",
    "Email Marketing", "Influencer Marketing", "CRO & Funnel Optimization",
  ],
  "Video, Audio & Media": [
    "Video Editing", "Motion Graphics", "Video Production",
    "AI Video Creation", "Audio Production", "Voice Over & Podcasting",
  ],
  "Writing & Documentation": [
    "Content & Copywriting", "SEO Writing", "Script Writing",
    "Editing & Proofreading", "Translation & Transcription",
  ],
  "Photography": [
    "Professional Photography", "Drone Photography", "Photo Presets",
  ],
  "Operations & Management": [
    "Personal Assistance", "On-Ground Task Execution", "Relocation & Property Scouting",
    "Vendor Coordination", "Travel & Logistics", "Errand & Task Management",
  ],
  "Legal, Finance & Compliance": [
    "Legal Advisory", "Contract Drafting", "Startup Compliance",
    "Accounting & Bookkeeping", "Tax & Financial Planning",
  ],
  "Events & Architecture": [
    "Event Planning", "Architecture & Interior Design", "Civil Consulting",
    "Landscape Consulting", "Supply Chain", "Corporate Training",
  ],
};

const categories = Object.keys(skillsByCategory);

export default function AddOtherSkills({ onNext, onBack }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSkills, setSelectedSkills] = useOnboardingStorage("otherSkills", []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-6 py-10 space-y-8"
    >
      {/* Top Bar */}
      <button
        onClick={onBack}
        className="w-11 h-11 rounded-full bg-[#F8F9FB] flex items-center justify-center hover:bg-zinc-100 transition-all active:scale-90"
      >
        <ArrowLeft size={18} className="text-zinc-600" />
      </button>

      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900">
          Add your <span className="text-emerald-700">Other Skills.</span>
        </h1>
        <p className="text-zinc-500 text-sm md:text-base max-w-2xl">
          Select secondary skills to improve your local search visibility.{" "}
          <span className="text-emerald-600 font-semibold">
            {selectedSkills.length} selected
          </span>
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
        {categories.map((cat) => {
          const isActive = selectedSkills.some((s) => s.category === cat);
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory({ name: cat })}
              className={`relative p-5 rounded-2xl border-2 text-left transition-all hover:shadow-sm active:scale-[0.98] ${
                isActive
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-400"
              }`}
            >
              <p className="text-xs font-bold leading-snug">{cat}</p>
              {isActive && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Modal */}
      {selectedCategory && (
        <SkillModal
          category={selectedCategory}
          skills={skillsByCategory[selectedCategory.name] || []}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          close={() => setSelectedCategory(null)}
        />
      )}

      {/* Footer */}
      <div className="flex justify-end pt-10 border-t border-zinc-50">
        <button
          onClick={() => onNext({ otherSkills: selectedSkills })}
          disabled={selectedSkills.length === 0}
          className="px-10 py-4 bg-black text-white rounded-[22px] font-bold text-lg flex items-center gap-3 transition-all active:scale-[0.97] disabled:opacity-30"
        >
          Next Step
          <ArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}