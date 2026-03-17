"use client";

import { useState } from "react";
import { ArrowLeft, UploadCloud, FileText, CheckCircle2, X } from "lucide-react";
import { motion } from "framer-motion";
import { auth } from "@/lib/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useOnboardingStorage } from "@/hooks/useOnboardingStorage";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE_MB = 10;

export default function ResumeUpload({ onNext, onBack }) {
  const [resumeUrl, setResumeUrl] = useOnboardingStorage("resumeUrl", "");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setError("Only PDF, DOC, or DOCX files are allowed.");
      return;
    }
    if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File must be under ${MAX_SIZE_MB}MB.`);
      return;
    }

    setError("");
    setFile(selected);
    setResumeUrl(""); // reset previous URL if user picks a new file
  };

  const handleUpload = async () => {
    if (!file) return;
    const user = auth.currentUser;
    if (!user) {
      setError("You must be logged in to upload a resume.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `resumes/${user.uid}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress(pct);
          },
          (err) => reject(err),
          () => resolve()
        );
      });

      const url = await getDownloadURL(uploadTask.snapshot.ref);
      setResumeUrl(url);
      onNext({ resumeUrl: url });
    } catch (err) {
      console.error("Resume upload error:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setResumeUrl("");
    setUploadProgress(0);
    setError("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-6 py-10 space-y-8"
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
          onClick={() => onNext({ resumeUrl: resumeUrl || "" })}
          className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors px-4 py-2 bg-[#F8F9FB] rounded-full"
        >
          Skip
        </button>
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 leading-tight">
          Upload your <span className="text-emerald-700 font-bold">Resume.</span>
        </h1>
        <p className="text-zinc-500 font-normal text-sm md:text-base leading-relaxed">
          Task givers can download your resume to evaluate your fit. PDF preferred.
        </p>
      </div>

      {/* Upload Area */}
      {!resumeUrl ? (
        <label className="relative group block w-full border-2 border-dashed rounded-3xl transition-all cursor-pointer overflow-hidden border-zinc-200 hover:border-emerald-500 aspect-[16/9]">
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            {file ? (
              <div className="space-y-3">
                <FileText className="w-12 h-12 text-emerald-500 mx-auto" />
                <div className="flex items-center gap-2 justify-center">
                  <p className="font-semibold text-zinc-900 text-sm">{file.name}</p>
                  <button
                    onClick={(e) => { e.preventDefault(); clearFile(); }}
                    className="p-1 rounded-full hover:bg-zinc-100 text-zinc-400"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p className="text-xs text-zinc-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 bg-zinc-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
                  <UploadCloud className="w-7 h-7 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                </div>
                <p className="text-sm font-semibold text-zinc-900">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-zinc-400 mt-1">PDF, DOC, DOCX up to {MAX_SIZE_MB}MB</p>
              </>
            )}
          </div>
        </label>
      ) : (
        /* Success state */
        <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-zinc-900 text-sm">Resume uploaded</p>
            <p className="text-xs text-zinc-500 truncate mt-0.5">{file?.name || "Resume"}</p>
          </div>
          <button
            onClick={clearFile}
            className="p-1.5 rounded-full hover:bg-emerald-100 text-emerald-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 font-medium text-center">{error}</p>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="space-y-2">
          <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
          <p className="text-center text-xs text-zinc-500 font-medium">
            Uploading… {uploadProgress}%
          </p>
        </div>
      )}

      {/* CTA */}
      {!resumeUrl && (
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full py-5 bg-black text-white rounded-[22px] font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.97] disabled:opacity-30 shadow-lg shadow-black/5"
        >
          {uploading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Uploading…
            </>
          ) : (
            "Upload & Continue"
          )}
        </button>
      )}
    </motion.div>
  );
}
