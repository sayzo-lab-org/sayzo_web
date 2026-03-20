"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  Briefcase,
  Camera,
  ChevronDown,
  Check,
  Edit3,
  FileText,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  Sparkles,
  Trash2,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "@/app/Context/AuthContext";
import {
  subscribeToUserProfile,
  saveUserProfile,
  uploadProfilePhoto,
} from "@/lib/firebase";

// ─── Constants ───────────────────────────────────────────────────────────────

const PROFESSIONS = [
  "Student",
  "Salaried Professional",
  "Homemaker",
  "Independent Professional",
  "Startup Founder / Operator",
  "Others",
];

// Fields counted for profile completion
const COMPLETION_SCALAR = ["name", "phone", "location", "bio", "profession", "photo"];
const COMPLETION_ARRAYS = ["coreSkills", "otherSkills", "experience", "education"];

// ─── Small UI Primitives ──────────────────────────────────────────────────────

function SkillPill({ label, onRemove, secondary = false }) {
  const base = secondary
    ? "bg-zinc-100 text-zinc-700 border border-zinc-200"
    : "bg-emerald-600 text-white shadow-sm shadow-emerald-500/20";
  return (
    <span
      className={`inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full text-xs font-medium ${base}`}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={`p-0.5 rounded-full transition-colors ${
            secondary ? "hover:bg-zinc-200" : "hover:bg-emerald-500"
          }`}
        >
          <X size={10} />
        </button>
      )}
    </span>
  );
}

function InlineTagInput({ onAdd, placeholder = "Type and press Enter…", disabled }) {
  const [val, setVal] = useState("");
  return (
    <input
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && val.trim()) {
          e.preventDefault();
          onAdd(val.trim());
          setVal("");
        }
      }}
      placeholder={disabled ? "Limit reached" : placeholder}
      disabled={disabled}
      className="bg-transparent outline-none flex-1 min-w-[130px] text-sm py-1 px-1 text-zinc-700 placeholder:text-zinc-300 disabled:cursor-not-allowed"
    />
  );
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-1.5 bg-emerald-50 rounded-lg shrink-0">
          <Icon className="h-4 w-4 text-emerald-600" />
        </div>
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({ label, error, className = "", children }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
        {label}
      </span>
      {children}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

function InputBox({ icon: Icon, value, onChange, placeholder, type = "text", readOnly, error }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-3 transition-colors ${
        error
          ? "border-red-300 bg-red-50/40"
          : readOnly
          ? "border-gray-100 bg-gray-50"
          : "border-gray-200 bg-[#F8F9FB] focus-within:border-emerald-400"
      }`}
    >
      {Icon && <Icon className="h-4 w-4 text-gray-400 shrink-0" />}
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`flex-1 bg-transparent py-2.5 text-sm text-gray-900 outline-none ${
          readOnly ? "cursor-default text-gray-500" : ""
        }`}
      />
      {readOnly && (
        <span className="text-[10px] text-gray-400 shrink-0 font-semibold">read-only</span>
      )}
    </div>
  );
}

function TagsArea({ children }) {
  return (
    <div className="min-h-[52px] bg-[#F8F9FB] rounded-xl p-3 flex flex-wrap gap-2 border border-transparent focus-within:border-emerald-400 transition-colors">
      {children}
    </div>
  );
}

// ─── Profession Dropdown ──────────────────────────────────────────────────────

function ProfessionSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between rounded-xl border px-3 py-2.5 bg-[#F8F9FB] text-sm transition-colors ${
          open ? "border-emerald-400" : "border-gray-200"
        }`}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || "Select profession…"}
        </span>
        <ChevronDown
          size={15}
          className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-xl border border-zinc-100 overflow-hidden"
          >
            {PROFESSIONS.map((p) => (
              <div
                key={p}
                onClick={() => {
                  onChange(p);
                  setOpen(false);
                }}
                className="px-4 py-3 hover:bg-[#F8F9FB] cursor-pointer flex items-center justify-between text-sm transition-colors"
              >
                <span className={value === p ? "text-black font-medium" : "text-zinc-600"}>{p}</span>
                {value === p && <Check size={13} className="text-emerald-600" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Entry Cards (Experience / Education) ────────────────────────────────────

function EntryCard({ onEdit, onDelete, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-[#F8F9FB] rounded-2xl p-5 border border-transparent hover:border-zinc-200 transition-all group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">{children}</div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            type="button"
            onClick={onEdit}
            className="p-1.5 bg-white rounded-full border border-zinc-100 text-zinc-400 hover:text-black hover:border-zinc-300 transition-all"
          >
            <Edit3 size={13} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 bg-white rounded-full border border-zinc-100 text-zinc-400 hover:text-red-600 hover:border-red-100 transition-all"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function AddRowButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-4 border-2 border-dashed border-zinc-200 rounded-2xl text-zinc-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:border-emerald-400 hover:text-emerald-600 transition-all"
    >
      <Plus size={14} />
      {label}
    </button>
  );
}

// ─── Modals ───────────────────────────────────────────────────────────────────

function ModalOverlay({ children }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {children}
    </div>
  );
}

function ExperienceModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState({
    role: initial?.role || "",
    company: initial?.company || "",
    duration: initial?.duration || "",
    description: initial?.description || "",
  });
  const valid = form.role.trim() && form.company.trim() && form.duration.trim();

  return (
    <ModalOverlay>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl space-y-4"
      >
        <h2 className="text-lg font-bold text-zinc-900">
          {initial ? "Edit Experience" : "Add Experience"}
        </h2>
        {[
          { key: "role", placeholder: "Role / Job Title" },
          { key: "company", placeholder: "Company / Organisation" },
          { key: "duration", placeholder: "Duration (e.g. Jan 2022 – Present)" },
        ].map(({ key, placeholder }) => (
          <input
            key={key}
            placeholder={placeholder}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full border border-zinc-200 bg-[#F8F9FB] p-3.5 rounded-xl outline-none focus:border-emerald-400 text-sm transition-colors"
          />
        ))}
        <textarea
          placeholder="Brief description (optional)"
          value={form.description}
          rows={3}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border border-zinc-200 bg-[#F8F9FB] p-3.5 rounded-xl outline-none focus:border-emerald-400 text-sm resize-none transition-colors"
        />
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-zinc-500 hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => valid && onSave(form)}
            disabled={!valid}
            className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold disabled:opacity-40 transition-opacity"
          >
            Save
          </button>
        </div>
      </motion.div>
    </ModalOverlay>
  );
}

function EducationModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState({
    school: initial?.school || "",
    location: initial?.location || "",
    degree: initial?.degree || "",
  });
  const valid = form.school.trim() && form.degree.trim();

  return (
    <ModalOverlay>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl space-y-4"
      >
        <h2 className="text-lg font-bold text-zinc-900">
          {initial ? "Edit Education" : "Add Education"}
        </h2>
        {[
          { key: "school", placeholder: "School / College" },
          { key: "location", placeholder: "Location (e.g. Delhi, India)" },
          { key: "degree", placeholder: "Degree / Course" },
        ].map(({ key, placeholder }) => (
          <input
            key={key}
            placeholder={placeholder}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full border border-zinc-200 bg-[#F8F9FB] p-3.5 rounded-xl outline-none focus:border-emerald-400 text-sm transition-colors"
          />
        ))}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-zinc-500 hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => valid && onSave(form)}
            disabled={!valid}
            className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold disabled:opacity-40 transition-opacity"
          >
            Save
          </button>
        </div>
      </motion.div>
    </ModalOverlay>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user, isLoading: authLoading, refreshProfile } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);
  const hasInitialized = useRef(false);

  // Modals: null = closed, "add" = new entry, number = edit index
  const [expModal, setExpModal] = useState(null);
  const [eduModal, setEduModal] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    profession: "",
    hours: 24,
    role: "taskDoer",
    photo: "",
    coreSkills: [],
    otherSkills: [],
    experience: [],
    education: [],
  });

  // Subscribe to real-time profile – populate form only once on first load
  useEffect(() => {
    if (!user?.uid) {
      if (!authLoading) setLoading(false);
      return;
    }

    const unsub = subscribeToUserProfile(
      user.uid,
      (profile) => {
        if (profile && !hasInitialized.current) {
          hasInitialized.current = true;
          setForm({
            name: profile.name || user.displayName || "",
            email: profile.email || user.email || "",
            phone: profile.phone || "",
            location: profile.location || "",
            bio: profile.bio || "",
            profession: profile.profession || "",
            hours: profile.hours ?? 24,
            role: profile.role || "taskDoer",
            photo: profile.photo || profile.photoURL || "",
            coreSkills: Array.isArray(profile.coreSkills) ? profile.coreSkills : [],
            otherSkills: Array.isArray(profile.otherSkills) ? profile.otherSkills : [],
            experience: Array.isArray(profile.experience) ? profile.experience : [],
            education: Array.isArray(profile.education) ? profile.education : [],
          });
        }
        setLoading(false);
      },
      () => {
        toast.error("Failed to load profile data.");
        setLoading(false);
      }
    );

    return () => unsub();
  }, [user?.uid, authLoading, user?.displayName, user?.email]);

  // Generic field updater
  const update = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  }, []);

  // Profile completion percentage
  const completion = useMemo(() => {
    const scalar = COMPLETION_SCALAR.filter((k) => Boolean(form[k])).length;
    const arrays = COMPLETION_ARRAYS.filter((k) => form[k]?.length > 0).length;
    return Math.round(((scalar + arrays) / (COMPLETION_SCALAR.length + COMPLETION_ARRAYS.length)) * 100);
  }, [form]);

  // ── Core skills ──
  const addCoreSkill = (s) => {
    const t = s.trim();
    if (!t || form.coreSkills.includes(t) || form.coreSkills.length >= 3) return;
    update("coreSkills", [...form.coreSkills, t]);
  };

  // ── Other skills ──
  const addOtherSkill = (s) => {
    const t = s.trim();
    if (!t) return;
    const name = (item) => (typeof item === "string" ? item : item.name);
    if (form.otherSkills.some((x) => name(x) === t)) return;
    update("otherSkills", [...form.otherSkills, { name: t, category: "Other" }]);
  };

  // ── Experience CRUD ──
  const saveExp = (exp) => {
    const arr = [...form.experience];
    if (typeof expModal === "number") arr[expModal] = exp;
    else arr.push(exp);
    update("experience", arr);
    setExpModal(null);
  };

  // ── Education CRUD ──
  const saveEdu = (edu) => {
    const arr = [...form.education];
    if (typeof eduModal === "number") arr[eduModal] = edu;
    else arr.push(edu);
    update("education", arr);
    setEduModal(null);
  };

  // ── Avatar upload ──
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user?.uid) return;

    // Immediate preview
    setAvatarPreview(URL.createObjectURL(file));
    setUploadingPhoto(true);

    try {
      const url = await uploadProfilePhoto(user.uid, file);
      update("photo", url);
      toast.success("Photo updated!");
    } catch {
      toast.error("Photo upload failed.");
      setAvatarPreview(null);
    } finally {
      setUploadingPhoto(false);
    }
  };

  // ── Validation ──
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    if (form.phone && !/^\+?\d{7,15}$/.test(form.phone.replace(/[\s\-()]/g, ""))) {
      errs.phone = "Enter a valid phone number.";
    }
    setErrors(errs);
    return !Object.keys(errs).length;
  };

  // ── Save ──
  const handleSave = async (e) => {
    e.preventDefault();
    if (!user?.uid || saving || !validate()) return;

    setSaving(true);
    try {
      await saveUserProfile(user.uid, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        location: form.location.trim(),
        bio: form.bio.trim(),
        profession: form.profession,
        hours: form.hours,
        coreSkills: form.coreSkills,
        otherSkills: form.otherSkills,
        experience: form.experience,
        education: form.education,
        ...(form.photo && { photo: form.photo }),
      });
      await refreshProfile();
      toast.success("Profile saved successfully!");
    } catch (err) {
      toast.error(err?.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  const isDoer = form.role === "taskDoer";
  const photoSrc = avatarPreview || form.photo;

  if (authLoading || loading) {
    return (
      <div className="space-y-4 max-w-3xl animate-pulse">
        <div className="h-36 rounded-2xl border border-gray-200 bg-white" />
        <div className="h-64 rounded-2xl border border-gray-200 bg-white" />
        <div className="h-40 rounded-2xl border border-gray-200 bg-white" />
      </div>
    );
  }

  if (!user) {
    return (
      <p className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
        Please log in.
      </p>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-5 pb-10 max-w-3xl">
      {/* ── Profile Header ── */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              role="button"
              tabIndex={0}
              aria-label="Change profile photo"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
              className="w-20 h-20 rounded-2xl bg-emerald-50 border-2 border-emerald-100 overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
            >
              {uploadingPhoto ? (
                <Loader2 className="h-6 w-6 text-emerald-600 animate-spin" />
              ) : photoSrc ? (
                <img src={photoSrc} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="h-8 w-8 text-emerald-300" />
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload photo"
              className="absolute -bottom-1.5 -right-1.5 p-1.5 bg-emerald-600 text-white rounded-full shadow hover:bg-emerald-700 transition-colors"
            >
              <Camera className="h-3 w-3" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Name + role badge + completion bar */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h1 className="text-xl font-bold text-gray-900 truncate">
                {form.name || "Your Name"}
              </h1>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  isDoer
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-purple-50 text-purple-700 border-purple-200"
                }`}
              >
                {isDoer ? "Task Doer" : "Task Giver"}
              </span>
            </div>
            <p className="text-xs text-gray-500">{form.email}</p>

            {/* Completion */}
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">Profile Completion</span>
                <span
                  className={`text-xs font-bold ${
                    completion >= 100
                      ? "text-emerald-600"
                      : completion >= 60
                      ? "text-yellow-600"
                      : "text-red-500"
                  }`}
                >
                  {completion}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    completion >= 100
                      ? "bg-emerald-500"
                      : completion >= 60
                      ? "bg-yellow-400"
                      : "bg-red-400"
                  }`}
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Personal Information ── */}
      <SectionCard title="Personal Information" icon={User}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name" error={errors.name}>
            <InputBox
              icon={User}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Mayank Saini"
              error={errors.name}
            />
          </Field>

          <Field label="Email">
            <InputBox icon={Mail} value={form.email} readOnly placeholder="your@email.com" />
          </Field>

          <Field label="Phone" error={errors.phone}>
            <InputBox
              icon={Phone}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+91 9876543210"
              type="tel"
              error={errors.phone}
            />
          </Field>

          <Field label="Location">
            <InputBox
              icon={MapPin}
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="City, Country"
            />
          </Field>
        </div>

        <Field label="Bio" className="mt-4">
          <div className="flex rounded-xl border border-gray-200 bg-[#F8F9FB] px-3 focus-within:border-emerald-400 transition-colors mt-1.5">
            <FileText className="mt-3 h-4 w-4 text-gray-400 shrink-0" />
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
              className="w-full resize-none bg-transparent px-2 py-2.5 text-sm text-gray-900 outline-none"
              placeholder="Tell us a bit about yourself…"
            />
          </div>
        </Field>
      </SectionCard>

      {/* ── Professional Info ── */}
      <SectionCard title="Professional Info" icon={Briefcase}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Profession">
            <div className="mt-1.5">
              <ProfessionSelect
                value={form.profession}
                onChange={(v) => update("profession", v)}
              />
            </div>
          </Field>

          {isDoer && (
            <Field label={`Weekly Commitment · ${form.hours} hr/week`}>
              <div className="pt-3">
                <input
                  type="range"
                  min="4"
                  max="40"
                  step="1"
                  value={form.hours}
                  onChange={(e) => update("hours", Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-bold mt-1.5 px-0.5">
                  <span>4 hr/wk</span>
                  <span>40 hr/wk</span>
                </div>
              </div>
            </Field>
          )}
        </div>
      </SectionCard>

      {/* ── Skills (Doer only) ── */}
      {isDoer && (
        <SectionCard title="Skills" icon={Sparkles}>
          <Field label={`Core Skills (${form.coreSkills.length}/3)`}>
            <div className="mt-1.5">
              <TagsArea>
                <AnimatePresence>
                  {form.coreSkills.map((s) => (
                    <motion.span
                      key={s}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    >
                      <SkillPill
                        label={s}
                        onRemove={() =>
                          update("coreSkills", form.coreSkills.filter((x) => x !== s))
                        }
                      />
                    </motion.span>
                  ))}
                </AnimatePresence>
                {form.coreSkills.length < 3 ? (
                  <InlineTagInput onAdd={addCoreSkill} />
                ) : (
                  <span className="text-xs text-zinc-400 font-medium self-center">
                    Max 3 reached
                  </span>
                )}
              </TagsArea>
            </div>
          </Field>

          <Field label={`Other Skills (${form.otherSkills.length})`} className="mt-4">
            <div className="mt-1.5">
              <TagsArea>
                <AnimatePresence>
                  {form.otherSkills.map((s, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    >
                      <SkillPill
                        label={typeof s === "string" ? s : s.name}
                        secondary
                        onRemove={() =>
                          update(
                            "otherSkills",
                            form.otherSkills.filter((_, j) => j !== i)
                          )
                        }
                      />
                    </motion.span>
                  ))}
                </AnimatePresence>
                <InlineTagInput onAdd={addOtherSkill} placeholder="Add a skill and press Enter…" />
              </TagsArea>
            </div>
          </Field>
        </SectionCard>
      )}

      {/* ── Experience (Doer only) ── */}
      {isDoer && (
        <SectionCard title="Experience" icon={Briefcase}>
          <div className="space-y-3">
            <AnimatePresence>
              {form.experience.map((exp, i) => (
                <EntryCard
                  key={i}
                  onEdit={() => setExpModal(i)}
                  onDelete={() =>
                    update("experience", form.experience.filter((_, j) => j !== i))
                  }
                >
                  <p className="text-sm font-bold text-zinc-900">{exp.role}</p>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 mt-0.5">
                    {exp.company} · {exp.duration}
                  </p>
                  {exp.description && (
                    <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </EntryCard>
              ))}
            </AnimatePresence>
          </div>
          {form.experience.length > 0 && <div className="mt-3" />}
          <AddRowButton onClick={() => setExpModal("add")} label="Add Experience" />
        </SectionCard>
      )}

      {/* ── Education (Doer only) ── */}
      {isDoer && (
        <SectionCard title="Education" icon={GraduationCap}>
          <div className="space-y-3">
            <AnimatePresence>
              {form.education.map((edu, i) => (
                <EntryCard
                  key={i}
                  onEdit={() => setEduModal(i)}
                  onDelete={() =>
                    update("education", form.education.filter((_, j) => j !== i))
                  }
                >
                  <p className="text-sm font-bold text-zinc-900">
                    {edu.school}
                    {edu.location ? `, ${edu.location}` : ""}
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 mt-0.5">
                    {edu.degree}
                  </p>
                </EntryCard>
              ))}
            </AnimatePresence>
          </div>
          {form.education.length > 0 && <div className="mt-3" />}
          <AddRowButton onClick={() => setEduModal("add")} label="Add Education" />
        </SectionCard>
      )}

      {/* ── Giver placeholder ── */}
      {!isDoer && (
        <SectionCard title="Business Preferences" icon={Briefcase}>
          <p className="text-sm text-gray-500">
            Business preferences for Task Givers are coming soon.
          </p>
        </SectionCard>
      )}

      {/* ── Save button ── */}
      <div className="flex justify-end pt-1">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : "Save Profile"}
        </button>
      </div>

      {/* ── Modals ── */}
      {expModal !== null && (
        <ExperienceModal
          initial={typeof expModal === "number" ? form.experience[expModal] : null}
          onSave={saveExp}
          onClose={() => setExpModal(null)}
        />
      )}
      {eduModal !== null && (
        <EducationModal
          initial={typeof eduModal === "number" ? form.education[eduModal] : null}
          onSave={saveEdu}
          onClose={() => setEduModal(null)}
        />
      )}
    </form>
  );
}
