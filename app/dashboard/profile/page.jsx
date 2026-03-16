"use client";

import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  subscribeToUserProfile,
  saveUserProfile,
  storage,
} from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import {
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Download,
  Edit2,
  Clock,
  BookOpen,
  Award,
  AlertCircle,
  User,
  X,
  Save,
  Camera,
  Upload,
  CheckCircle,
  Loader2,
} from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────────────

function normalizeToString(item) {
  if (!item) return null;
  if (typeof item === "string") return item;
  if (typeof item === "object")
    return item.name || item.language || item.title || item.skill || null;
  return String(item);
}

function normalizeLang(lang) {
  if (!lang) return null;
  if (typeof lang === "string") return lang;
  const name = lang.language || lang.name || lang.title || "";
  const level = lang.level || lang.proficiency || "";
  return level ? `${name} (${level})` : name;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 pb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex gap-3">
      <Icon className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-sm text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}

function Badge({ label, color = "gray" }) {
  const map = {
    gray:    "bg-gray-100 text-gray-700 border-gray-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    blue:    "bg-blue-50 text-blue-700 border-blue-200",
    purple:  "bg-purple-50 text-purple-700 border-purple-200",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${map[color]}`}>
      {label}
    </span>
  );
}

// ─── Edit Modal (inline overlay) ─────────────────────────────────────────────

function EditProfileModal({ profile, authUser, onClose, onSaved }) {
  const fileInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  const [form, setForm] = useState({
    name:     profile?.name     || authUser?.displayName || "",
    phone:    profile?.phone    || profile?.mobile       || "",
    bio:      profile?.bio      || "",
    photoURL: profile?.photoURL || authUser?.photoURL    || "",
  });

  const [photoFile,  setPhotoFile]  = useState(null);
  const [photoPreview, setPhotoPreview] = useState(form.photoURL);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState(
    profile?.resumeUrl ? "Existing resume on file" : ""
  );

  const [saving,       setSaving]       = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error,        setError]        = useState(null);

  // Photo preview
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  // Resume selection
  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFile(file);
    setResumeName(file.name);
  };

  // Upload a file to Firebase Storage and return the download URL
  const uploadFile = (file, path) =>
    new Promise((resolve, reject) => {
      const storageRef = ref(storage, path);
      const task = uploadBytesResumable(storageRef, file);
      task.on(
        "state_changed",
        (snap) => setUploadProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
        reject,
        async () => resolve(await getDownloadURL(task.snapshot.ref))
      );
    });

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    setError(null);
    setUploadProgress(0);

    try {
      const uid = authUser.uid;
      const updates = {
        name:  form.name.trim(),
        phone: form.phone.trim(),
        bio:   form.bio.trim(),
      };

      // Upload profile photo if changed
      if (photoFile) {
        const url = await uploadFile(
          photoFile,
          `users/${uid}/profile-photo/${photoFile.name}`
        );
        updates.photoURL = url;
      } else if (form.photoURL.trim()) {
        updates.photoURL = form.photoURL.trim();
      }

      // Upload resume if selected
      if (resumeFile) {
        const url = await uploadFile(
          resumeFile,
          `users/${uid}/resume/${resumeFile.name}`
        );
        updates.resumeUrl = url;
        updates.resumeName = resumeFile.name;
      }

      await saveUserProfile(uid, updates);
      onSaved();
      onClose();
    } catch (err) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            disabled={saving}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-gray-100 overflow-hidden flex items-center justify-center text-emerald-700 font-bold text-2xl uppercase">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  form.name.charAt(0) || "U"
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 p-1.5 bg-emerald-600 text-white rounded-full shadow hover:bg-emerald-700 transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
            <p className="text-xs text-gray-400">Click the camera icon to change photo</p>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-600">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-600">Mobile Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-600">Bio</label>
              <textarea
                rows={3}
                value={form.bio}
                onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                placeholder="Tell task givers about yourself..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 outline-none transition-all resize-none"
              />
            </div>

            {/* Resume Upload */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-600">Resume (PDF)</label>
              <button
                type="button"
                onClick={() => resumeInputRef.current?.click()}
                className="w-full flex items-center gap-3 px-4 py-3 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
              >
                <Upload className="w-4 h-4 shrink-0" />
                <span className="truncate">
                  {resumeName || "Click to upload resume"}
                </span>
              </button>
              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleResumeChange}
              />
            </div>
          </div>

          {/* Upload Progress */}
          {saving && uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Profile Page ────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [profile,  setProfile]  = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [editing,  setEditing]  = useState(false);
  const [saved,    setSaved]    = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      if (!user) setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!authUser) return;
    const unsub = subscribeToUserProfile(authUser.uid, (data) => {
      setProfile(data);
      setLoading(false);
    });
    return () => unsub();
  }, [authUser]);

  const handleSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // ── Derived data ──
  const profileComplete = profile?.profileCompleted === true;
  const displayName     = profile?.name || authUser?.displayName || "Sayzo User";
  const avatarSrc       = profile?.photoURL || authUser?.photoURL;

  const joinedDate = profile?.createdAt?.toDate
    ? profile.createdAt.toDate().toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : null;

  const coreSkills  = (profile?.coreSkills  || []).map(normalizeToString).filter(Boolean);
  const otherSkills = (profile?.otherSkills || []).map(normalizeToString).filter(Boolean);
  const languages   = (profile?.languages   || []).map(normalizeLang).filter(Boolean);

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div className="animate-pulse space-y-5 max-w-2xl">
        <div className="bg-white rounded-xl border p-6 flex gap-5">
          <div className="w-20 h-20 bg-gray-200 rounded-full shrink-0" />
          <div className="flex-1 space-y-3 pt-2">
            <div className="w-1/3 h-5 bg-gray-200 rounded" />
            <div className="w-1/4 h-4 bg-gray-200 rounded" />
            <div className="w-2/3 h-3 bg-gray-100 rounded" />
          </div>
        </div>
        <div className="bg-white rounded-xl border p-6 h-40" />
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center text-gray-500">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <>
      {/* Edit Modal */}
      {editing && (
        <EditProfileModal
          profile={profile}
          authUser={authUser}
          onClose={() => setEditing(false)}
          onSaved={handleSaved}
        />
      )}

      <div className="max-w-2xl space-y-4">
        {/* Incomplete Profile Banner */}
        {!profileComplete && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-amber-800">Profile incomplete</p>
              <p className="text-xs text-amber-600 mt-0.5">
                Complete onboarding so task givers can discover you.
              </p>
            </div>
            <Link
              href="/onboarding"
              className="shrink-0 px-3 py-1.5 bg-amber-600 text-white text-xs font-medium rounded-lg hover:bg-amber-700 transition-colors"
            >
              Complete
            </Link>
          </div>
        )}

        {/* Save success toast */}
        {saved && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700">
            <CheckCircle className="w-4 h-4 shrink-0" />
            Profile saved successfully!
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Cover strip */}
          <div className="h-20 bg-gradient-to-r from-emerald-500/15 to-blue-500/10" />

          <div className="px-6 pb-6">
            {/* Avatar + Edit Button */}
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="w-20 h-20 rounded-full border-4 border-white bg-emerald-100 overflow-hidden flex items-center justify-center text-emerald-700 font-bold text-2xl uppercase shadow-sm">
                {avatarSrc ? (
                  <img src={avatarSrc} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  displayName.charAt(0)
                )}
              </div>
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit Profile
              </button>
            </div>

            {/* Name + profession */}
            <h1 className="text-xl font-bold text-gray-900">{displayName}</h1>
            {profile?.profession && (
              <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                <Briefcase className="w-3.5 h-3.5" />
                {profile.profession}
              </p>
            )}
            {profile?.bio && (
              <p className="text-sm text-gray-600 mt-2.5 leading-relaxed">{profile.bio}</p>
            )}

            {/* Resume download */}
            {profile?.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            )}
          </div>
        </div>

        {/* Personal Info */}
        <Section title="Contact & Info">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoRow icon={Mail}     label="Email"           value={profile?.email || authUser?.email} />
            <InfoRow icon={Phone}    label="Mobile"          value={profile?.phone || profile?.mobile} />
            <InfoRow icon={Clock}    label="Hours / week"    value={profile?.hoursAvailable ? `${profile.hoursAvailable} hrs` : null} />
            <InfoRow icon={Calendar} label="Joined"          value={joinedDate} />
          </div>
        </Section>

        {/* Skills */}
        {(coreSkills.length > 0 || otherSkills.length > 0) && (
          <Section title="Skills">
            {coreSkills.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 font-medium mb-2">Core Skills</p>
                <div className="flex flex-wrap gap-2">
                  {coreSkills.map((s, i) => <Badge key={i} label={s} color="emerald" />)}
                </div>
              </div>
            )}
            {otherSkills.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 font-medium mb-2">Other Skills</p>
                <div className="flex flex-wrap gap-2">
                  {otherSkills.map((s, i) => <Badge key={i} label={s} color="blue" />)}
                </div>
              </div>
            )}
          </Section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <Section title="Languages">
            <div className="flex flex-wrap gap-2">
              {languages.map((l, i) => <Badge key={i} label={l} color="purple" />)}
            </div>
          </Section>
        )}

        {/* Experience */}
        {profile?.experience && (
          <Section title="Experience">
            {Array.isArray(profile.experience) ? (
              <div className="space-y-4">
                {profile.experience.map((exp, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-0.5 p-2 bg-gray-50 border border-gray-100 rounded-lg shrink-0">
                      <Award className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{exp.title || exp.role || exp}</p>
                      {exp.company  && <p className="text-sm text-gray-500">{exp.company}</p>}
                      {exp.duration && <p className="text-xs text-gray-400 mt-0.5">{exp.duration}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-700 whitespace-pre-line">{profile.experience}</p>
            )}
          </Section>
        )}

        {/* Education */}
        {profile?.education && (
          <Section title="Education">
            {Array.isArray(profile.education) ? (
              <div className="space-y-4">
                {profile.education.map((edu, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-0.5 p-2 bg-gray-50 border border-gray-100 rounded-lg shrink-0">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{edu.degree || edu.title || edu}</p>
                      {edu.institution && <p className="text-sm text-gray-500">{edu.institution}</p>}
                      {edu.year       && <p className="text-xs text-gray-400 mt-0.5">{edu.year}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-700 whitespace-pre-line">{profile.education}</p>
            )}
          </Section>
        )}

        {/* Empty state */}
        {!profileComplete && coreSkills.length === 0 && !profile?.bio && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <User className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-600">Your profile is empty</p>
            <p className="text-xs text-gray-400 mt-1">
              Complete onboarding to add your skills, bio, and experience.
            </p>
            <Link
              href="/onboarding"
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              Complete Onboarding
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
