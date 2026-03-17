"use client";

import { useState } from "react";

export default function EducationForm({ addEducation, close, initialData }) {
  const [form, setForm] = useState({
    school: initialData?.school || "",
    location: initialData?.location || "",
    degree: initialData?.degree || "",
  });

  const isValid = form.school.trim() && form.degree.trim();

  const submit = () => {
    if (!isValid) return;
    addEducation(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[32px] p-8 w-full max-w-md space-y-4 shadow-2xl">
        <h2 className="text-xl font-bold text-zinc-900">
          {initialData ? "Edit Education" : "Add Education"}
        </h2>

        <input
          placeholder="School / College"
          value={form.school}
          className="w-full border border-zinc-200 bg-[#F8F9FB] p-3.5 rounded-xl outline-none focus:border-emerald-400 transition-colors text-sm"
          onChange={(e) => setForm({ ...form, school: e.target.value })}
        />
        <input
          placeholder="Location (e.g. Delhi, India)"
          value={form.location}
          className="w-full border border-zinc-200 bg-[#F8F9FB] p-3.5 rounded-xl outline-none focus:border-emerald-400 transition-colors text-sm"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          placeholder="Degree / Course"
          value={form.degree}
          className="w-full border border-zinc-200 bg-[#F8F9FB] p-3.5 rounded-xl outline-none focus:border-emerald-400 transition-colors text-sm"
          onChange={(e) => setForm({ ...form, degree: e.target.value })}
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