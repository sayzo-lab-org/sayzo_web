"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "sayzo_onboarding";
const STEP_KEY = "sayzo_onboarding_step";

/** Read the full onboarding data object from localStorage */
export function getOnboardingData() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

/** Write a partial update to localStorage */
export function setOnboardingData(partial) {
  if (typeof window === "undefined") return;
  const current = getOnboardingData();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...partial }));
}

/** Clear all onboarding data after completion */
export function clearOnboardingData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STEP_KEY);
}

/** Persist the current step index so page refresh can resume */
export function saveOnboardingStep(stepIndex) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STEP_KEY, String(stepIndex));
}

/** Retrieve the last saved step index (or 0 if none) */
export function getOnboardingStep() {
  if (typeof window === "undefined") return 0;
  const saved = localStorage.getItem(STEP_KEY);
  return saved ? parseInt(saved, 10) : 0;
}

/**
 * useOnboardingStorage(key, defaultValue)
 *
 * Drop-in replacement for the copy-pasted localStorage pattern.
 * Reads from `sayzo_onboarding[key]` on mount and writes back on change.
 *
 * @param {string} key - Field name inside the onboarding data object
 * @param {*} defaultValue - Fallback value if no saved data exists
 * @returns [value, setValue]
 */
export function useOnboardingStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return defaultValue;
    const saved = getOnboardingData();
    return saved[key] !== undefined ? saved[key] : defaultValue;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setOnboardingData({ [key]: value });
  }, [key, value]);

  return [value, setValue];
}
