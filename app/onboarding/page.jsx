"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { STEPS, TOTAL_STEPS } from "@/lib/onboardingSteps";
import {
  getOnboardingData,
  getOnboardingStep,
  saveOnboardingStep,
  clearOnboardingData,
} from "@/hooks/useOnboardingStorage";

// Step components — all live in profileSteps/
import PersonalInfo    from "./profileSteps/PersonalInfo";
import ProfessionSetup from "./profileSteps/ProfessionSetup";
import CreateProfile   from "./profileSteps/CreateProfile";
import AddBio          from "./profileSteps/AddBio";
import AddCoreSkills   from "./profileSteps/AddCoreSkills";
import AddOtherSkills  from "./profileSteps/AddOtherSkills";
import AddExperience   from "./profileSteps/AddExperience";
import AddEducation    from "./profileSteps/AddEducation";
import ResumeUpload    from "./profileSteps/ResumeUpload";
import AddLanguages    from "./profileSteps/AddLanguages";
import ProfilePreview  from "./profileSteps/ProfilePreview";

// Ordered component map — index must match STEPS array in lib/onboardingSteps.js
const STEP_COMPONENTS = [
  PersonalInfo,    // 0
  ProfessionSetup, // 1
  CreateProfile,   // 2
  AddBio,          // 3
  AddCoreSkills,   // 4
  AddOtherSkills,  // 5
  AddExperience,   // 6
  AddEducation,    // 7
  ResumeUpload,    // 8
  AddLanguages,    // 9
  ProfilePreview,  // 10
];

export default function OnboardingFlow() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore last saved step + data on client mount (page-refresh resume)
  useEffect(() => {
    const savedStep = getOnboardingStep();
    const savedData = getOnboardingData();
    setStep(savedStep);
    setFormData(savedData);
    setHydrated(true);
  }, []);

  // Progress percentage across all steps
  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const nextStep = (data = {}) => {
    const updated = { ...formData, ...data };
    setFormData(updated);
    const next = step + 1;
    if (next < TOTAL_STEPS) {
      saveOnboardingStep(next);
      setStep(next);
    }
  };

  const prevStep = () => {
    const prev = Math.max(0, step - 1);
    saveOnboardingStep(prev);
    setStep(prev);
  };

  const finishOnboarding = async () => {
    setIsSubmitting(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user found");

      // Merge any late localStorage writes that happened inside step components
      const allData = { ...formData, ...getOnboardingData() };

      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          ...allData,
          uid: user.uid,
          email: user.email,
          profileCompleted: true,
          onboardingCompletedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // Set cookie so middleware can gate /dashboard
      document.cookie =
        "profileCompleted=true; path=/; max-age=31536000; SameSite=Lax";

      clearOnboardingData();
      router.push("/onboarding/success");
    } catch (error) {
      console.error("Onboarding submit error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent SSR/localStorage mismatch flash
  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600" />
      </div>
    );
  }

  const StepComponent = STEP_COMPONENTS[step];
  const currentStepMeta = STEPS[step];

  return (
    <div className="min-h-screen bg-white">

      {/* ── Progress Header ─────────────────────────────────────────────────
          Single fixed bar: thin green progress line + step label strip.
          z-50 keeps it above page content.
          Modals (LanguageForm, ExperienceForm, SkillModal) all use z-[200]
          so they correctly sit above this header — no white-box issue.
      ────────────────────────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 w-full z-50">

        {/* Green progress tape */}
        <div className="h-[3px] bg-zinc-100 w-full">
          <motion.div
            className="h-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        {/* Step label bar */}
        <div className="bg-white border-b border-zinc-100 px-6 py-2.5 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            {step + 1} / {TOTAL_STEPS}
          </span>

          {/* Step dots — compact, no extra white box */}
          <div className="flex gap-1.5 items-center">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i < step
                    ? "w-4 bg-emerald-400"   // completed
                    : i === step
                    ? "w-7 bg-emerald-600"   // active
                    : "w-4 bg-zinc-100"      // upcoming
                }`}
              />
            ))}
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
            {currentStepMeta.label}
          </span>
        </div>
      </div>

      {/* ── Step Content ────────────────────────────────────────────────── */}
      {/* pt-[52px] accounts for the fixed header height (~52px) */}
      <div className="pt-[52px] pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -24, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            {step === TOTAL_STEPS - 1 ? (
              // Last step: ProfilePreview takes onSubmit instead of onNext
              <ProfilePreview
                data={formData}
                onBack={prevStep}
                onSubmit={finishOnboarding}
                isSubmitting={isSubmitting}
              />
            ) : (
              <StepComponent
                onNext={nextStep}
                onBack={prevStep}
                initialData={formData}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}