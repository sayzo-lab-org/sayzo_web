"use client";

import { ArrowLeft, User, Briefcase, BookOpen, Globe, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ProfilePreview({ data, onBack, onSubmit }) {

    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        if (typeof window === "undefined") return;
        const saved = localStorage.getItem("sayzo_onboarding");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setProfileData(parsed);
            } catch {
                setProfileData({});
            }
        }
    }, []);
    // Destructuring with default values to prevent mapping errors
    const mergedData = { ...profileData, ...data };
    const {
        name = "User",
        email = "",
        mobile = "",
        profession = "",
        hours = "0",
        bio = "",
        languages = [],
        coreSkills = [],
        otherSkills = [],
        experience = [],
        education = []
    } = mergedData;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-10 md:space-y-16"
        >
            {/* Header - Balanced Spacing */}
            <div className="flex items-center justify-center relative">
                <button
                    onClick={onBack}
                    className="absolute left-0 w-12 h-12 rounded-full bg-[#F8F9FB] flex items-center justify-center hover:bg-zinc-100 transition-all active:scale-90 shadow-sm"
                >
                    <ArrowLeft size={20} className="text-zinc-600" />
                </button>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900">
                    Preview <span className="text-emerald-700 font-bold">Profile.</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-start">
                {/* Left Sidebar - Identity & Meta */}
                <div className="lg:col-span-4 space-y-12">
                    <Section title="Identity" icon={<User size={14} />}>
                        <div className="bg-[#F8F9FB] rounded-3xl p-6 md:p-8 space-y-6 md:space-y-8 shadow-sm">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">Full Name</p>
                                <p className="text-2xl font-bold text-zinc-800 tracking-tight">{name}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">Contact Details</p>
                                <p className="text-base font-semibold text-zinc-800 break-all">{email}</p>
                                <p className="text-base font-semibold text-zinc-800 mt-1">{mobile}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">Work Availability</p>
                                <p className="text-base font-semibold text-zinc-800">{profession}</p>
                                <p className="text-lg font-bold text-emerald-600 italic tracking-tighter mt-1">
                                    {hours} hrs/week
                                </p>
                            </div>
                        </div>
                    </Section>

                    <Section title="Languages" icon={<Globe size={14} />}>
                        <div className="bg-[#F8F9FB] rounded-3xl p-6 md:p-8 space-y-6 md:space-y-8 shadow-sm">
                            <div className="flex flex-wrap gap-3">
                                {languages.length > 0 ? (
                                    languages.map((lang, i) => (
                                        <SkillTag key={i} skill={`${lang.name} • ${lang.level}`} />
                                    ))
                                ) : (
                                    <p className="text-sm text-zinc-400 italic">No languages added</p>
                                )}
                            </div>
                        </div>
                    </Section>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-8 space-y-12">
                    <Section title="Professional Bio">
                        <div className="bg-[#F8F9FB] rounded-3xl p-6 md:p-8 min-h-[120px]">
                            <p className="text-zinc-500 text-lg leading-relaxed italic">
                                "{bio || "No bio provided yet."}"
                            </p>
                        </div>
                    </Section>

                    <Section title="Skills Architecture">
                        <div className="bg-[#F8F9FB] border border-zinc-100 rounded-3xl p-6 md:p-8 space-y-8 md:space-y-10">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-5">Core Expertise</p>
                                <div className="flex flex-wrap gap-3">
                                    {coreSkills.map((skill, i) => (
                                        <SkillTag key={i} skill={skill} primary />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-5">Additional Capabilities</p>
                                <div className="flex flex-wrap gap-3">
                                    {otherSkills.map((skill, i) => (
                                        <SkillTag key={i} skill={skill.name || skill} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <Section title="Experience" icon={<Briefcase size={14} />}>
                            <div className="bg-[#F8F9FB] rounded-[32px] p-8 h-auto min-h-[12rem] border border-zinc-100/50 flex flex-col justify-center shadow-sm">
                                {experience?.length > 0 ? (
                                    experience.map((exp, i) => (
                                        <div key={i} className="mb-4 last:mb-0 border-l-2 border-emerald-500 pl-4">
                                            <p className="font-bold text-zinc-800">{exp.role}</p>
                                            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mt-1">
                                                {exp.company} • {exp.duration}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-zinc-400 italic text-center">No experience added</p>
                                )}
                            </div>
                        </Section>

                        <Section title="Education" icon={<BookOpen size={14} />}>
                            <div className="bg-[#F8F9FB] rounded-[32px] p-8 h-auto min-h-[12rem] border border-zinc-100/50 flex flex-col justify-center shadow-sm">
                                {education?.length > 0 ? (
                                    education.map((edu, i) => (
                                        <div key={i} className="mb-4 last:mb-0 border-l-2 border-zinc-200 pl-4">
                                            <p className="font-bold text-zinc-800">{edu.school}</p>
                                            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mt-1">
                                                {edu.degree}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-zinc-400 italic text-center">No education added</p>
                                )}
                            </div>
                        </Section>
                    </div>
                </div>
            </div>

            {/* REFINED INDUSTRIAL FOOTER */}
            {/* REFINED COMPACT FOOTER */}
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between pt-8 md:pt-10 mt-12 md:mt-16 border-t border-zinc-100 gap-6 md:gap-8">
                {/* Status Info */}
                <div className="flex flex-col items-center md:items-start space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                            Step 07 / 07
                        </p>
                    </div>
                    <p className="text-lg font-bold text-zinc-900 tracking-tight">
                        Profile Completion.
                    </p>
                </div>

                {/* Slimmer Action Button */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <motion.button
                        whileHover={{ scale: 1.01, backgroundColor: "#18181b" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onSubmit}
                        className="w-full md:w-auto px-8 md:px-12 py-4 md:py-5 bg-black text-white rounded-[22px] font-bold text-lg transition-all shadow-xl shadow-black/10 flex items-center justify-center group"
                    >
                        Confirm & Submit
                        <ArrowRight size={20} className="ml-3 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                </div>
            </div>

        </motion.div>
    );
}

function Section({ title, icon, children }) {
    return (
        <div className="space-y-5">
            <div className="flex items-center gap-3 px-2 opacity-70">
                {icon && <span className="text-zinc-900">{icon}</span>}
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-900">{title}</h2>
            </div>
            {children}
        </div>
    );
}

function SkillTag({ skill, primary }) {
    return (
        <span className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all ${primary
            ? "bg-emerald-600 text-white shadow-xl shadow-emerald-500/20"
            : "bg-white text-zinc-600 border border-zinc-100 shadow-sm"
            }`}>
            {skill}
        </span>
    );
}