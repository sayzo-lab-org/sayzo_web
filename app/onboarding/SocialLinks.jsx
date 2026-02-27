"use client";
import { useState } from "react";
import { Link2, Globe, Github, Linkedin } from "lucide-react";

const SocialLinks = ({ onNext, initialData }) => {
  const [links, setLinks] = useState({
    linkedin: initialData?.linkedin || "",
    portfolio: initialData?.portfolio || "",
    github: initialData?.github || "",
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-900">Professional Links</h1>
        <p className="text-zinc-500 mt-2">Where can people see your work?</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-4">
          {/* LinkedIn */}
          <div className="relative">
            <label className="text-sm font-medium text-zinc-700">LinkedIn URL</label>
            <div className="relative mt-1">
              <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="url" 
                placeholder="linkedin.com/in/username"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 focus:border-[#0ca37f] focus:ring-1 focus:ring-[#0ca37f] outline-none transition-all"
                onChange={(e) => setLinks({...links, linkedin: e.target.value})}
              />
            </div>
          </div>

          {/* Portfolio */}
          <div className="relative">
            <label className="text-sm font-medium text-zinc-700">Portfolio/Website</label>
            <div className="relative mt-1">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="url" 
                placeholder="https://yourwork.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 focus:border-[#0ca37f] focus:ring-1 focus:ring-[#0ca37f] outline-none transition-all"
                onChange={(e) => setLinks({...links, portfolio: e.target.value})}
              />
            </div>
          </div>

          {/* GitHub */}
          <div className="relative">
            <label className="text-sm font-medium text-zinc-700">GitHub Profile</label>
            <div className="relative mt-1">
              <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="url" 
                placeholder="github.com/username"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 focus:border-[#0ca37f] focus:ring-1 focus:ring-[#0ca37f] outline-none transition-all"
                onChange={(e) => setLinks({...links, github: e.target.value})}
              />
            </div>
          </div>
        </div>

        <button 
          onClick={() => onNext(links)}
          className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-[#0ca37f] transition-all active:scale-[0.98]"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SocialLinks;