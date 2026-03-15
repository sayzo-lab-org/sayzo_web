"use client";

import { useState } from "react";

export default function EducationForm({ addEducation, close }) {
  const [form, setForm] = useState({
    school: "",
    location: "",
    degree: ""
  });

  const submit = () => {
    addEducation(form);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[400px] space-y-4">
        <h2 className="text-xl font-semibold">Add Education</h2>

        <input
          placeholder="School / College"
          className="w-full border p-3 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, school: e.target.value })
          }
        />

        <input
          placeholder="Location"
          className="w-full border p-3 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <input
          placeholder="Degree"
          className="w-full border p-3 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, degree: e.target.value })
          }
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