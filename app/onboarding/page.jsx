'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
// import { db, auth, storage } from "@/lib/firebase"; // Ensure storage is exported from your config
// import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import PersonalInfo from "./PersonalInfo";
import SocialLinks from "./SocialLinks";
import IdentityVerification from "./IdentityVerifcation";
import ResumeUpload from "./Resumeupload";

const OnboardingFlow = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  // THE FINAL SUBMISSION LOGIC
  const finishOnboarding = async (resumeFile) => {
    setIsSubmitting(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user found");

      let resumeUrl = "";

      // 1. Upload Resume to Firebase Storage (if provided)
      if (resumeFile) {
        const storageRef = ref(storage, `resumes/${user.uid}/${resumeFile.name}`);
        const snapshot = await uploadBytes(storageRef, resumeFile);
        resumeUrl = await getDownloadURL(snapshot.ref);
      }

      // 2. Save everything to Firestore
      const userRef = doc(db, "users", user.uid);
      const finalProfileData = {
        ...formData,
        resumeUrl, // The link to the file in Storage
        onboardingCompleted: true,
        updatedAt: serverTimestamp(),
        email: user.email,
        uid: user.uid
      };

      await setDoc(userRef, finalProfileData, { merge: true });

      // 3. Success! Send them home
      router.push("/");
    } catch (error) {
      console.error("Onboarding error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-zinc-100">
        <motion.div 
          className="h-full bg-[#0ca37f]"
          initial={{ width: "0%" }}
          animate={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="max-w-xl mx-auto py-20 px-6">
        {isSubmitting ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0ca37f]"></div>
             <p className="text-zinc-500 font-medium">Finalizing your Sayzo profile...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {step === 1 && <PersonalInfo onNext={nextStep} />}
              {step === 2 && <SocialLinks onNext={nextStep} initialData={formData} />}
              {step === 3 && <IdentityVerification onNext={nextStep} />}
              {step === 4 && <ResumeUpload onComplete={finishOnboarding} />}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;