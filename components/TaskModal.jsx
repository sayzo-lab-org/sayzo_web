"use client";

import { useState, useEffect, useRef } from "react";
import { X, CheckCircle, Loader2, Plus, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  sendMagicLink,
  addTask,
  auth,
  getUserProfile,
  isProfileComplete,
} from "@/lib/firebase";
import ProfileCompletionModal from "./ProfileCompletionModal";
import { useAuth } from "@/app/Context/AuthContext";

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  { value: "ai",                  label: "AI" },
  { value: "graphicsDesign",      label: "Graphics & Design" },
  { value: "programmingTech",     label: "Programming & Tech" },
  { value: "digitalMarketing",    label: "Digital Marketing" },
  { value: "videoAnimation",      label: "Video & Animation" },
  { value: "writingTranslation",  label: "Writing & Translation" },
  { value: "operations",          label: "Execution & Management Skills" },
  { value: "localService",        label: "Local Service" },
];

const DESCRIPTION_MIN = 30;

// ─── Reusable UI primitives ───────────────────────────────────────────────────

/** Consistent base class for all text inputs / textareas */
const baseInput = (hasError) =>
  `w-full bg-white border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400
   focus:outline-none focus:ring-2 transition
   ${hasError ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-emerald-500"}`;

/** Native <select> with aligned custom arrow — fixes the browser misalignment */
function SelectField({ name, value, onChange, hasError, children }) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`${baseInput(hasError)} appearance-none pr-10 cursor-pointer`}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
    </div>
  );
}

/** Searchable / fuzzy-search combobox for the category field */
function CategoryCombobox({ value, onChange, hasError }) {
  const [query, setQuery]   = useState("");
  const [open, setOpen]     = useState(false);
  const containerRef        = useRef(null);
  const inputRef            = useRef(null);

  const filtered = query.trim()
    ? CATEGORIES.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      )
    : CATEGORIES;

  const selected = CATEGORIES.find((c) => c.value === value);

  // Close on outside click
  useEffect(() => {
    function onMouseDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const handleToggle = () => {
    setOpen((o) => {
      if (!o) setTimeout(() => inputRef.current?.focus(), 0);
      return !o;
    });
    if (open) setQuery("");
  };

  const handleSelect = (cat) => {
    onChange({ target: { name: "category", value: cat.value } });
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <div
        onClick={handleToggle}
        className={`flex items-center justify-between w-full bg-white border rounded-lg px-4 py-3 text-sm cursor-pointer transition
          ${hasError ? "border-red-400" : open ? "border-emerald-500 ring-2 ring-emerald-500" : "border-gray-300 hover:border-gray-400"}`}
      >
        {open ? (
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Search category…"
            className="flex-1 outline-none text-gray-800 bg-transparent placeholder-gray-400 text-sm"
          />
        ) : (
          <span className={selected ? "text-gray-800" : "text-gray-400"}>
            {selected ? selected.label : "Select category"}
          </span>
        )}
        <ChevronDown
          className={`ml-2 w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto"
          >
            {filtered.length > 0 ? (
              filtered.map((cat) => (
                <li
                  key={cat.value}
                  onMouseDown={() => handleSelect(cat)}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors
                    ${value === cat.value
                      ? "bg-emerald-50 text-emerald-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {cat.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-gray-400">No categories found</li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const TaskModal = ({ isOpen, onClose }) => {
  const [loading, setLoading]               = useState(false);
  const [success, setSuccess]               = useState(false);
  const [taskType, setTaskType]             = useState("online");
  const [error, setError]                   = useState("");
  const [formPhase, setFormPhase]           = useState("edit");

  const [fieldErrors, setFieldErrors]       = useState({});
  const [hasSubmitted, setHasSubmitted]     = useState(false);

  // Scope of Work step
  const [agreedToScope, setAgreedToScope]   = useState(false);
  const [scopeError, setScopeError]         = useState("");

  // Auth states
  const [emailSent, setEmailSent]           = useState(false);
  const [isVerified, setIsVerified]         = useState(false);
  const [authLoading, setAuthLoading]       = useState(false);
  const [email, setEmail]                   = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userProfile, setUserProfile]       = useState(null);
  const [skillInput, setSkillInput]         = useState("");

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    taskName: "",
    description: "",
    category: "",
    projectType: "",
    projectLength: "",
    budgetType: "fixed",
    amount: "",
    skills: [],
    experience: "",
    location: "",
    scopeOfWork: "",
  });

  // Helper: field class (text inputs)
  const fc = (field) => baseInput(hasSubmitted && !!fieldErrors[field]);

  // ── Draft restore ──────────────────────────────────────────────────────────
  const restoreFormDraft = () => {
    const draftStr = localStorage.getItem("sayzo_task_draft");
    if (!draftStr) return false;
    try {
      const draft = JSON.parse(draftStr);
      if (Date.now() - draft.timestamp > 24 * 60 * 60 * 1000) {
        localStorage.removeItem("sayzo_task_draft");
        return false;
      }
      const restoredForm = { ...draft.form };
      if (typeof restoredForm.skills === "string") {
        restoredForm.skills = restoredForm.skills
          ? restoredForm.skills.split(",").map((s) => s.trim()).filter(Boolean)
          : [];
      }
      setForm(restoredForm);
      setTaskType(draft.taskType);
      setEmail(draft.email);
      return true;
    } catch {
      localStorage.removeItem("sayzo_task_draft");
      return false;
    }
  };

  // ── Profile setup ──────────────────────────────────────────────────────────
  const checkUserProfileAndSetup = async (user) => {
    if (!user) return;
    try {
      const profile = contextProfile || await getUserProfile(user.uid);
      const complete = profile?.profileCompleted === true;
      if (complete) {
        setUserProfile(profile);
        setIsVerified(true);
        setEmail(user.email || "");
        setForm((prev) => ({
          ...prev,
          phone: profile?.phone || "",
          customerName:
            profile?.fullName ||
            localStorage.getItem("sayzo_user_name") ||
            "",
        }));
      } else {
        setEmail(user.email || "");
        setShowProfileModal(true);
      }
    } catch (err) {
      console.error("Error checking profile:", err);
    }
  };

  const { user: contextUser, userProfile: contextProfile, isLoading: authContextLoading, refreshProfile } = useAuth();

  useEffect(() => {
    if (!isOpen || authContextLoading) return;
    if (contextUser) {
      checkUserProfileAndSetup(contextUser);
      restoreFormDraft();
    }
  }, [isOpen, contextUser, authContextLoading]);

  // ── Form handlers ──────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "budgetType") {
      setForm((p) => ({ ...p, budgetType: value, amount: "" }));
      return;
    }
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  // ── Skill handlers ─────────────────────────────────────────────────────────
  const handleAddSkill = () => {
    const skill = skillInput.trim().toLowerCase();
    if (skill && !form.skills.includes(skill)) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
      setSkillInput("");
    }
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") { e.preventDefault(); handleAddSkill(); }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // ── Magic link ─────────────────────────────────────────────────────────────
  const handleSendMagicLink = async () => {
    if (!validateEmail(email)) { setError("Please enter a valid email address"); return; }
    setError("");
    setAuthLoading(true);
    try {
      localStorage.setItem("sayzo_auth_return", window.location.pathname);
      localStorage.setItem("sayzo_task_draft", JSON.stringify({ form, taskType, email, timestamp: Date.now() }));
      localStorage.setItem("sayzo_pending_task", "true");
      await sendMagicLink(email);
      setEmailSent(true);
    } catch (err) {
      console.error("Magic Link Error:", err);
      setError(
        err.code === "auth/too-many-requests"
          ? "Too many requests. Please try again later."
          : err.message || "Failed to send email. Please try again."
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const handleProfileComplete = async (profileData) => {
    setShowProfileModal(false);
    setUserProfile(profileData);
    setIsVerified(true);
    setForm((prev) => ({
      ...prev,
      phone: profileData.phone || "",
      customerName: profileData.fullName || "",
    }));
    refreshProfile().catch(() => {});
  };

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = () => {
    const errors = {};

    if (!isVerified)                      errors.auth         = "Please sign in to continue";
    if (!form.customerName.trim())        errors.customerName = "Your name is required";
    if (!form.taskName.trim())            errors.taskName     = "Task name is required";
    if (!form.category)                   errors.category     = "Please select a category";
    if (!form.projectType)                errors.projectType  = "Select project type";
    if (taskType === "offline" && !form.location.trim())
                                          errors.location     = "Location is required";
    if (form.description.trim().length < DESCRIPTION_MIN)
                                          errors.description  = `Description must be at least ${DESCRIPTION_MIN} characters`;
    if (!form.amount.trim())              errors.amount       = "Amount is required";
    else if (isNaN(form.amount))          errors.amount       = "Amount must be a number";
    if (!form.projectLength.trim())       errors.projectLength = "Project length is required";
    if (form.skills.length === 0)         errors.skills       = "At least one skill is required";
    if (!form.experience)                 errors.experience   = "Select experience level";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextToScope = () => {
    setHasSubmitted(true);
    if (validate()) {
      setScopeError("");
      setFormPhase("scope");
    }
  };

  const handleScopeNext = () => {
    if (!form.scopeOfWork.trim()) {
      setScopeError("Please describe the scope of work.");
      return;
    }
    if (!agreedToScope) {
      setScopeError("You must agree to the Scope of Work to proceed.");
      return;
    }
    setScopeError("");
    setFormPhase("preview");
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const submitTask = async () => {
    setHasSubmitted(true);
    if (!validate()) return;
    setError("");
    setLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Authentication lost. Please sign in again.");

      const taskData = {
        taskType,
        taskName:      form.taskName,
        customerName:  form.customerName,
        phone:         form.phone,
        email:         currentUser.email,
        giverId:       currentUser.uid,
        userId:        currentUser.uid,
        location:      taskType === "offline" ? form.location : "Online",
        description:   form.description,
        scopeOfWork:   form.scopeOfWork,
        category:      form.category,
        projectType:   form.projectType,
        projectLength: form.projectLength,
        budgetType:    form.budgetType,
        amount:        Number(form.amount),
        skills:        form.skills,
        experience:    form.experience,
      };

      localStorage.setItem("sayzo_user_name", form.customerName);
      await addTask(taskData);
      localStorage.removeItem("sayzo_task_draft");
      localStorage.removeItem("sayzo_pending_task");
      setSuccess(true);
    } catch (err) {
      console.error("Submit Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Reset / close ──────────────────────────────────────────────────────────
  const resetAndClose = () => {
    setSuccess(false);
    setError("");
    setEmailSent(false);
    setFormPhase("edit");
    setAgreedToScope(false);
    setScopeError("");
    const currentUser = auth.currentUser;
    if (currentUser && userProfile) {
      setForm({
        customerName: userProfile.fullName || "",
        phone:        userProfile.phone || "",
        taskName: "", location: "", description: "", scopeOfWork: "",
        budgetType: "fixed", amount: "", duration: "",
        skills: [], experience: "",
      });
    } else {
      setIsVerified(false);
      setUserProfile(null);
      setEmail("");
      setForm({
        customerName: "", phone: "", taskName: "", description: "",
        category: "", projectType: "", projectLength: "", scopeOfWork: "",
        budgetType: "fixed", amount: "", skills: [], experience: "", location: "",
      });
    }
    setSkillInput("");
    onClose();
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full sm:max-w-lg bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[95dvh] sm:max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 shrink-0">
                <h2 className="text-base font-semibold text-gray-900">
                  {formPhase === "edit"    && "Create a Task"}
                  {formPhase === "scope"   && "Scope of Work"}
                  {formPhase === "preview" && "Preview Task"}
                  {formPhase === "confirm" && "Confirm Task"}
                </h2>
                <button
                  onClick={resetAndClose}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Step indicator */}
              {!success && (
                <div className="flex items-center gap-1.5 px-5 py-3 border-b border-gray-100 shrink-0">
                  {[
                    { key: "edit",    label: "Details" },
                    { key: "scope",   label: "Scope" },
                    { key: "preview", label: "Preview" },
                    { key: "confirm", label: "Confirm" },
                  ].map((step, i, arr) => {
                    const order   = ["edit", "scope", "preview", "confirm"];
                    const current = order.indexOf(formPhase);
                    const idx     = order.indexOf(step.key);
                    const isActive = idx === current;
                    const isDone   = idx < current;
                    return (
                      <div key={step.key} className="flex items-center gap-1.5 flex-1 min-w-0">
                        <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold transition-all
                          ${isActive ? "bg-emerald-600 text-white" : isDone ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400"}`}
                        >
                          {isDone ? "✓" : i + 1}
                        </div>
                        <span className={`text-xs font-medium hidden sm:block truncate transition-colors
                          ${isActive ? "text-gray-800" : isDone ? "text-emerald-600" : "text-gray-400"}`}
                        >
                          {step.label}
                        </span>
                        {i < arr.length - 1 && (
                          <div className={`flex-1 h-px transition-colors ${idx < current ? "bg-emerald-200" : "bg-gray-100"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Scrollable body */}
              <div className="overflow-y-auto flex-1 px-5 py-5 scrollbar-hide">

                {/* ── Success ── */}
                {success ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                    <CheckCircle className="w-14 h-14 text-emerald-500" />
                    <h3 className="text-gray-900 text-xl font-semibold">Task Submitted!</h3>
                    <p className="text-gray-500 text-sm">Your task will be reviewed and approved shortly.</p>
                    <button
                      onClick={resetAndClose}
                      className="mt-4 bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>

                /* ── Edit phase ── */
                ) : formPhase === "edit" ? (
                  <div className="space-y-5">

                    {/* Task type toggle */}
                    <div className="grid grid-cols-2 gap-2">
                      {["online", "offline"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setTaskType(type)}
                          className={`py-2.5 rounded-lg text-sm font-medium transition border
                            ${taskType === type
                              ? "bg-emerald-700 text-white border-emerald-700"
                              : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                            }`}
                        >
                          {type === "online" ? "Online Task" : "Offline Task"}
                        </button>
                      ))}
                    </div>

                    {/* Task name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Task Name</label>
                      <input
                        className={fc("taskName")}
                        placeholder="e.g., Website Development"
                        name="taskName"
                        value={form.taskName}
                        onChange={handleChange}
                      />
                      {hasSubmitted && fieldErrors.taskName && (
                        <p className="text-xs text-red-500">{fieldErrors.taskName}</p>
                      )}
                    </div>

                    {/* Location (offline only) */}
                    {taskType === "offline" && (
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Location</label>
                        <input
                          className={fc("location")}
                          placeholder="City or area"
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                        />
                        {hasSubmitted && fieldErrors.location && (
                          <p className="text-xs text-red-500">{fieldErrors.location}</p>
                        )}
                      </div>
                    )}

                    {/* Category — searchable combobox */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Category</label>
                      <CategoryCombobox
                        value={form.category}
                        onChange={handleChange}
                        hasError={hasSubmitted && !!fieldErrors.category}
                      />
                      {hasSubmitted && fieldErrors.category && (
                        <p className="text-xs text-red-500">{fieldErrors.category}</p>
                      )}
                    </div>

                    {/* Description + char count */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Description</label>
                        <span className={`text-xs tabular-nums ${form.description.trim().length < DESCRIPTION_MIN ? "text-gray-400" : "text-emerald-600"}`}>
                          {form.description.trim().length} / {DESCRIPTION_MIN} min
                        </span>
                      </div>
                      <textarea
                        className={`${fc("description")} resize-none overflow-hidden`}
                        placeholder="Describe what you need done…"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        onInput={(e) => {
                          e.target.style.height = "auto";
                          e.target.style.height = e.target.scrollHeight + "px";
                        }}
                        rows={3}
                      />
                      {hasSubmitted && fieldErrors.description && (
                        <p className="text-xs text-red-500">{fieldErrors.description}</p>
                      )}
                    </div>

                    {/* Budget */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Budget Type</label>
                        <SelectField name="budgetType" value={form.budgetType} onChange={handleChange}>
                          <option value="fixed">Fixed</option>
                          <option value="negotiable">Negotiable</option>
                        </SelectField>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Amount (₹)</label>
                        <input
                          type="number"
                          className={fc("amount")}
                          placeholder="500"
                          name="amount"
                          value={form.amount}
                          onChange={handleChange}
                        />
                        {hasSubmitted && fieldErrors.amount && (
                          <p className="text-xs text-red-500">{fieldErrors.amount}</p>
                        )}
                      </div>
                    </div>

                    {/* Project details */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Project Type</label>
                        <SelectField
                          name="projectType"
                          value={form.projectType}
                          onChange={handleChange}
                          hasError={hasSubmitted && !!fieldErrors.projectType}
                        >
                          <option value="">Select type</option>
                          <option value="one-time">One Time</option>
                          <option value="ongoing">Ongoing</option>
                        </SelectField>
                        {hasSubmitted && fieldErrors.projectType && (
                          <p className="text-xs text-red-500">{fieldErrors.projectType}</p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Duration</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="projectLength"
                            list="project-length-options"
                            className={`${fc("projectLength")} pr-10`}
                            value={form.projectLength || ""}
                            onChange={handleChange}
                            placeholder="Select or type"
                          />
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <datalist id="project-length-options">
                            <option value="Less than 1 day" />
                            <option value="Less than 1 week" />
                            <option value="Less than 1 month" />
                            <option value="1–3 months" />
                          </datalist>
                        </div>
                        {hasSubmitted && fieldErrors.projectLength && (
                          <p className="text-xs text-red-500">{fieldErrors.projectLength}</p>
                        )}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Skills Required</label>
                      <div className="flex gap-2">
                        <input
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={handleSkillKeyDown}
                          placeholder="React, Node.js…"
                          className={`flex-1 ${baseInput(hasSubmitted && !!fieldErrors.skills)}`}
                        />
                        <button
                          type="button"
                          onClick={handleAddSkill}
                          className="px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {form.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {form.skills.map((skill) => (
                            <span
                              key={skill}
                              className="flex items-center gap-1 px-3 py-1 text-xs bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100"
                            >
                              {skill}
                              <button type="button" onClick={() => handleRemoveSkill(skill)}>
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                      {hasSubmitted && fieldErrors.skills && (
                        <p className="text-xs text-red-500">{fieldErrors.skills}</p>
                      )}
                    </div>

                    {/* Experience */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Experience Level</label>
                      <SelectField
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        hasError={hasSubmitted && !!fieldErrors.experience}
                      >
                        <option value="">Select level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                      </SelectField>
                      {hasSubmitted && fieldErrors.experience && (
                        <p className="text-xs text-red-500">{fieldErrors.experience}</p>
                      )}
                    </div>

                    {/* Next button */}
                    <button
                      disabled={!isVerified}
                      onClick={handleNextToScope}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 py-3 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      Next: Scope of Work →
                    </button>

                    {!isVerified && (
                      <p className="text-center text-xs text-gray-400">Sign in to post your task</p>
                    )}
                  </div>

                /* ── Scope of Work phase ── */
                ) : formPhase === "scope" ? (
                  <div className="space-y-5">

                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Task</p>
                      <p className="text-sm font-semibold text-gray-900">{form.taskName}</p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                          Detailed Scope of Work
                        </label>
                        <span className={`text-xs tabular-nums ${form.scopeOfWork.trim().length === 0 ? "text-gray-400" : "text-emerald-600"}`}>
                          {form.scopeOfWork.trim().length} chars
                        </span>
                      </div>
                      <textarea
                        name="scopeOfWork"
                        value={form.scopeOfWork}
                        onChange={handleChange}
                        placeholder={`Describe in detail what the doer should deliver:\n\n• Specific deliverables and outcomes\n• Tools, platforms, or formats required\n• Any milestones or deadlines\n• What success looks like`}
                        className={`${baseInput(!!scopeError && !form.scopeOfWork.trim())} resize-none min-h-[200px]`}
                        rows={8}
                      />
                      <p className="text-xs text-gray-400">
                        Be specific — a clear scope helps you get better applicants.
                      </p>
                    </div>

                    {/* Agreement checkbox */}
                    <label className={`flex items-start gap-3 cursor-pointer rounded-xl border p-4 transition-colors
                      ${agreedToScope ? "border-emerald-200 bg-emerald-50" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <input
                        type="checkbox"
                        checked={agreedToScope}
                        onChange={(e) => {
                          setAgreedToScope(e.target.checked);
                          if (e.target.checked) setScopeError("");
                        }}
                        className="mt-0.5 w-4 h-4 rounded accent-emerald-600 shrink-0 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 leading-snug">
                        I agree to the{" "}
                        <span className="font-medium text-gray-900">Scope of Work</span>{" "}
                        described above and confirm the details are accurate.
                      </span>
                    </label>

                    {scopeError && (
                      <p className="text-xs text-red-500 -mt-2">{scopeError}</p>
                    )}

                    <div className="flex gap-3 pt-1">
                      <button
                        onClick={() => { setScopeError(""); setFormPhase("edit"); }}
                        className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-lg text-sm font-medium transition-colors"
                      >
                        Make Changes
                      </button>
                      <button
                        onClick={handleScopeNext}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg text-sm font-semibold transition-colors disabled:opacity-40"
                      >
                        Next: Preview →
                      </button>
                    </div>
                  </div>

                /* ── Preview phase ── */
                ) : formPhase === "preview" ? (
                  <div className="space-y-5">

                    <div className="bg-gray-50 rounded-xl p-4 space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Task</p>
                      <p className="text-base font-semibold text-gray-900">{form.taskName}</p>
                      <p className="text-sm text-gray-500">{taskType === "online" ? "Online Task" : "Offline Task"}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      <div>
                        <p className="text-xs text-gray-400">Your Name</p>
                        <p className="text-sm font-medium text-gray-900">{form.customerName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-sm text-gray-900 truncate">{email}</p>
                      </div>
                      {form.phone && (
                        <div>
                          <p className="text-xs text-gray-400">Phone</p>
                          <p className="text-sm text-gray-900">{form.phone}</p>
                        </div>
                      )}
                      {taskType === "offline" && (
                        <div>
                          <p className="text-xs text-gray-400">Location</p>
                          <p className="text-sm text-gray-900">{form.location}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 mb-1">Description</p>
                      <p className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">{form.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      <div>
                        <p className="text-xs text-gray-400">Category</p>
                        <p className="text-sm text-gray-900">{CATEGORIES.find(c => c.value === form.category)?.label ?? form.category}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Project Type</p>
                        <p className="text-sm text-gray-900 capitalize">{form.projectType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Duration</p>
                        <p className="text-sm text-gray-900">{form.projectLength}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Experience</p>
                        <p className="text-sm text-gray-900 capitalize">{form.experience}</p>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-xl p-4 flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-400">Budget</p>
                        <p className="text-sm text-gray-600 capitalize">{form.budgetType}</p>
                      </div>
                      <p className="text-xl font-bold text-emerald-700">₹{form.amount}</p>
                    </div>

                    {form.skills.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-2">Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                          {form.skills.map((skill) => (
                            <span key={skill} className="px-3 py-1 text-xs bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {form.scopeOfWork && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Scope of Work</p>
                        <p className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed bg-gray-50 rounded-xl p-3">{form.scopeOfWork}</p>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setFormPhase("scope")}
                        className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-lg text-sm font-medium transition-colors"
                      >
                        Make Changes
                      </button>
                      <button
                        onClick={() => setFormPhase("confirm")}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Confirm Task
                      </button>
                    </div>
                  </div>

                /* ── Confirm phase ── */
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                    <h3 className="text-gray-900 text-xl font-semibold">Ready to post?</h3>
                    <p className="text-gray-500 text-sm max-w-xs">Your task will be submitted for review and published shortly.</p>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                      onClick={submitTask}
                      disabled={loading}
                      className="mt-2 w-full bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Posting…</> : "Post Task"}
                    </button>

                    <button
                      onClick={() => setFormPhase("preview")}
                      disabled={loading}
                      className="text-gray-400 hover:text-gray-600 text-sm underline disabled:opacity-50 transition-colors"
                    >
                      Go back
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProfileCompletionModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onSuccess={handleProfileComplete}
        userEmail={email}
      />
    </>
  );
};

export default TaskModal;
