"use client";

import { useState } from "react";

export default function ExperienceForm({ addExperience, close, initialData }) {
  const [form, setForm] = useState({
    role: initialData?.role || "",
    company: initialData?.company || "",
    duration: initialData?.duration || "",
    description: initialData?.description || "",
  });

  const isValid = form.role.trim() && form.company.trim() && form.duration.trim();

  const submit = () => {
    if (!isValid) return;
    addExperience(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[32px] p-8 w-full max-w-md space-y-4 shadow-2xl">
        <h2 className="text-xl font-bold text-zinc-900">
          {initialData ? "Edit Experience" : "Add Experience"}
        </h2>

        <input
          placeholder="Role / Job Title"
          value={form.role}
          className="w-full border border-zinc-200 bg-[#F8F9FB] p-3.5 rounded-xl outline-none focus:border-emerald-400 transition-colors text-sm"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <input
          placeholder="Company / Organisation"
          value={form.company}
          className="w-full border border-zinc-200 bg-[#F8F9FB] p-3.5 rounded-xl outline-none focus:border-emerald-400 transition-colors text-sm"
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
        <input
          placeholder="Duration (e.g. Jan 2022 – Present)"
          value={form.duration}
          className="w-full border border-zinc-200 bg-[#F8F9FB] p-3.5 rounded-xl outline-none focus:border-emerald-400 transition-colors text-sm"
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />
        <textarea
          placeholder="Brief description (optional)"
          value={form.description}
          rows={3}
          className="w-full border border-zinc-200 bg-[#F8F9FB] p-3.5 rounded-xl outline-none focus:border-emerald-400 transition-colors text-sm resize-none"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={close}
            className="px-5 py-2.5 text-sm font-semibold text-zinc-500 hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={!isValid}
            className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold disabled:opacity-40 transition-opacity"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}