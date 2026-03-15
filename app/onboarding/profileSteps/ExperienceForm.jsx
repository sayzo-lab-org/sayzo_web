"use client";

import { useState } from "react";

export default function ExperienceForm({ addExperience, close }) {
  const [form, setForm] = useState({
    role: "",
    company: "",
    duration: "",
    description: ""
  });

  const submit = () => {
    addExperience(form);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[400px] space-y-4">
        <h2 className="text-xl font-semibold">Add Experience</h2>

        <input
          placeholder="Role"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <input
          placeholder="Company"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <input
          placeholder="Duration (Jan 2022 - Present)"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="flex justify-end gap-3">
          <button onClick={close}>Cancel</button>

          <button
            onClick={submit}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}