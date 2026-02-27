"use client";
import { ShieldCheck, Info } from "lucide-react";

const IdentityVerification = ({ onNext }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-900">Work & Location</h1>
        <p className="text-zinc-500 mt-2">Help us verify your eligibility.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-zinc-700">Location of Residence</label>
            <select className="w-full mt-1 px-4 py-3 rounded-xl border border-zinc-200 focus:border-[#0ca37f] outline-none bg-white">
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </select>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 flex gap-3">
            <Info className="w-5 h-5 text-[#0ca37f] shrink-0" />
            <p className="text-xs text-zinc-600 leading-relaxed">
              Sayzo requires a valid government ID for certain high-priority tasks. You will be prompted to verify this once you accept your first task.
            </p>
          </div>

          <div className="flex items-start gap-3 px-1">
            <input type="checkbox" id="legal" className="mt-1 accent-[#0ca37f]" />
            <label htmlFor="legal" className="text-sm text-zinc-600">
              I confirm that I am legally authorized to work in my selected region.
            </label>
          </div>
        </div>

        <button 
          onClick={() => onNext({ verified: true })}
          className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-[#0ca37f] transition-all active:scale-[0.98]"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
};

export default IdentityVerification;