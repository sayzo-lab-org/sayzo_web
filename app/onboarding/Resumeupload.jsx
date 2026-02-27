"use client";
import { useState } from "react";
import { Upload, FileText, CheckCircle2 } from "lucide-react";

const ResumeUpload = ({ onComplete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-900">Upload your Resume</h1>
        <p className="text-zinc-500 mt-2">Attach your CV to unlock better opportunities.</p>
      </div>

      <div className="space-y-6">
        <label className="relative group block w-full aspect-[16/10] border-2 border-dashed border-zinc-200 rounded-3xl hover:border-[#0ca37f] transition-all cursor-pointer overflow-hidden">
          <input 
            type="file" 
            className="hidden" 
            onChange={(e) => setFile(e.target.files[0])}
            accept=".pdf,.doc,.docx"
          />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            {file ? (
              <div className="space-y-3 animate-in fade-in zoom-in duration-300">
                <FileText className="w-12 h-12 text-[#0ca37f] mx-auto" />
                <p className="font-medium text-zinc-900">{file.name}</p>
                <p className="text-xs text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0ca37f]/10 transition-colors">
                  <Upload className="w-6 h-6 text-zinc-400 group-hover:text-[#0ca37f]" />
                </div>
                <p className="text-sm font-medium text-zinc-900">Click to upload or drag and drop</p>
                <p className="text-xs text-zinc-400 mt-1">PDF, DOC up to 10MB</p>
              </>
            )}
          </div>
        </label>

        <button 
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-[#0ca37f] disabled:bg-zinc-200 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {uploading ? "Uploading..." : "Finish Onboarding"}
          {!uploading && file && <CheckCircle2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default ResumeUpload;