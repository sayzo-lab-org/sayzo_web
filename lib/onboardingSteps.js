/**
 * Canonical onboarding step definitions.
 * The flow controller (app/onboarding/page.jsx) renders steps by index.
 * To reorder steps, change the array order here — no component changes needed.
 */
export const STEPS = [
  { id: "personal",    label: "Personal Info",    skippable: false },
  { id: "profession",  label: "Profession",        skippable: false },
  { id: "create",      label: "Create Profile",    skippable: false },
  { id: "bio",         label: "Bio",               skippable: false },
  { id: "coreSkills",  label: "Core Skills",       skippable: false },
  { id: "otherSkills", label: "Other Skills",      skippable: false },
  { id: "experience",  label: "Experience",        skippable: true  },
  { id: "education",   label: "Education",         skippable: true  },
  { id: "resume",      label: "Resume",            skippable: true  },
  { id: "languages",   label: "Languages",         skippable: true  },
  { id: "preview",     label: "Preview",           skippable: false },
];

// Total number of user-facing steps (excludes success screen which is its own route)
export const TOTAL_STEPS = STEPS.length;
