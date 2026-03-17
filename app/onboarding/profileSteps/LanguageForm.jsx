"use client";

import { useState } from "react";

export default function LanguageForm({ addLanguage, close }) {
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("Conversational");

  const submit = () => {
    addLanguage({
      name: language,
      level: level
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[200]">
      <div className="bg-white p-6 rounded-2xl w-[380px] space-y-4">
        <h2 className="text-xl font-semibold">Add Language</h2>

        <input
          placeholder="Language"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => setLanguage(e.target.value)}
        />

        <select
          className="w-full border p-3 rounded-lg"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option>Basic</option>
          <option>Conversational</option>
          <option>Fluent</option>
          <option>Native</option>
        </select>

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