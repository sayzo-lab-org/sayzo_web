"use client";

import { useState ,useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import SkillModal from "./SkillModal";
/*
Skills database
*/
const skillsByCategory = {
  "Coaching, Teaching & Advisory Skills": [
    "Career Coaching",
    "Life Coaching",
    "Fitness Coaching",
    "Nutrition Coaching",
    "Wellness & Mindfulness Coaching",
    "Language Teaching",
    "Academic / Skill Tutoring",
    "Game Coaching",
    "Fashion & Styling Advisory",
    "Mentorship & Guidance"
  ],

  "Strategy & Consulting Skills": [
    "Business Consulting",
    "HR Consulting",
    "Marketing Strategy",
    "Content Strategy",
    "Social Media Strategy",
    "Growth & YouTube Strategy",
    "AI Consulting",
    "Tech Consulting",
    "Data Consulting"
  ],

  "Data & Analytics Skills": [
    "Data Analytics",
    "Data Science",
    "Machine Learning",
    "Data Engineering",
    "Data Visualization",
    "Data Processing",
    "Data Annotation & Tagging",
    "Data Scraping"
  ],

  "Design & Creative Skills": [
    "Brand & Graphic Design",
    "UI/UX Design",
    "Illustration & Visual Art",
    "Image Editing & Retouching",
    "Presentation Design",
    "3D Design"
  ],

  "Development & Engineering Skills": [
    "Website Development",
    "App Development",
    "Software Development",
    "AI Development",
    "Automation & Chatbots",
    "Cloud & DevOps",
    "Cybersecurity"
  ],

  "Marketing Execution Skills": [
    "SEO & GEO",
    "Paid Advertising",
    "Content Marketing",
    "Email Marketing",
    "Influencer Marketing",
    "CRO & Funnel Optimization"
  ],

  "Video, Audio & Media Skills": [
    "Video Editing",
    "Motion Graphics & Animation",
    "Video Production",
    "AI Video Creation",
    "Audio Production & Editing",
    "Voice Over & Podcasting"
  ],

  "Writing & Documentation Skills": [
    "Content & Copywriting",
    "SEO Writing",
    "Script Writing",
    "Editing & Proofreading",
    "Translation & Transcription"
  ],

  "Photography Skills": [
    "Professional Photography",
    "Drone Photography",
    "Photo Education & Presets"
  ],

  "Operations, Execution & Management Skills": [
    "Personal Assistance",
    "On-Ground Task Execution",
    "Relocation & Property Scouting",
    "Vendor Coordination",
    "Travel & Logistics Planning",
    "Errand & Task Management"
  ],

  "Legal, Finance & Compliance Skills": [
    "Legal Advisory",
    "Contract Drafting",
    "Startup & Business Compliance",
    "Accounting & Bookkeeping",
    "Tax & Financial Planning"
  ],

  "Events, Architecture & Industry Skills": [
    "Event Planning & Management",
    "Architecture & Interior Design",
    "Civil & Structural Consulting",
    "Landscape & Vastu Consulting",
    "Supply Chain Consulting",
    "Corporate Training & Education"
  ]
};

/*
Convert skills object → categories list
*/
const categories = Object.keys(skillsByCategory).map((name) => ({
  name
}));

export default function AddOtherSkills({ onNext, onBack }) {

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState(()=>{
    if (typeof window === "undefined") return [];

  const saved = localStorage.getItem("sayzo_onboarding");

  let parsed = {};
  try {
    parsed = saved ? JSON.parse(saved) : {};
  } catch {
    parsed = {};
  }

  return parsed.otherSkills || [];
  })

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
    otherSkills: selectedSkills
  };

  localStorage.setItem("sayzo_onboarding", JSON.stringify(updated));

}, [selectedSkills]);

  const placeholderImg =
    "https://images.unsplash.com/vector-1748272331255-d143f4c294fc?w=900&auto=format&fit=crop&q=60";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-6 py-10 space-y-8"
    >

      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full bg-[#F8F9FB] flex items-center justify-center hover:bg-zinc-100 transition-all active:scale-90"
        >
          <ArrowLeft size={18} className="text-zinc-600" />
        </button>
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900">
          Add your <span className="text-emerald-700">Other Skills.</span>
        </h1>

        <p className="text-zinc-500 text-sm md:text-base max-w-2xl">
          Select secondary skills to improve your local search visibility.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">

        {categories.map((cat) => {

          const isSelectedCategory = selectedSkills.some(
            (skill) => skill.category === cat.name
          );

          return (
            <div
              key={cat.name}
              onClick={() => setSelectedCategory(cat)}
              className="cursor-pointer group space-y-3"
            >

              <div
                className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-sm border transition-all
                ${
                  isSelectedCategory
                    ? "border-emerald-600 ring-2 ring-emerald-200"
                    : "border-zinc-100 group-hover:shadow-md"
                }`}
              >
                <Image
                  src={placeholderImg}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-xs md:text-sm font-semibold text-zinc-800 leading-snug px-1">
                {cat.name}
              </p>

            </div>
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
      <div className="flex items-center justify-between pt-10 border-t border-zinc-50">

        <div className="flex gap-1">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`h-1 w-4 rounded-full ${
                i === 2 ? "bg-emerald-600" : "bg-zinc-100"
              }`}
            />
          ))}
        </div>

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