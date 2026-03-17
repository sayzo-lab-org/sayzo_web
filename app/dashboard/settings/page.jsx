"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  getUserProfile,
  saveUserProfile,
  logoutUser,
} from "@/lib/firebase";
import {
  LogOut,
  Bell,
  Shield,
  User,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

function FormField({ label, id, type = "text", value, onChange, placeholder, hint }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={3}
          placeholder={placeholder}
          className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 outline-none transition-all resize-none"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 outline-none transition-all"
        />
      )}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    bio: "",
    coreSkills: "",
    photoURL: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error'

  // Load user profile on auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);
      try {
        const profile = await getUserProfile(currentUser.uid);
        setForm({
          name: profile?.name || currentUser.displayName || "",
          phone: profile?.phone || profile?.mobile || "",
          bio: profile?.bio || "",
          coreSkills: Array.isArray(profile?.coreSkills)
            ? profile.coreSkills.join(", ")
            : profile?.coreSkills || "",
          photoURL: profile?.photoURL || currentUser.photoURL || "",
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user || saving) return;

    setSaving(true);
    setSaveStatus(null);

    try {
      const coreSkillsArray = form.coreSkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      await saveUserProfile(user.uid, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        bio: form.bio.trim(),
        coreSkills: coreSkillsArray,
        photoURL: form.photoURL.trim() || null,
      });
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error("Save failed:", err);
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((prev) => ({ ...prev, [key]: e.target.value })),
  });

  if (loading) {
    return (
      <div className="max-w-2xl space-y-6 animate-pulse">
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-64" />
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-32" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Edit Profile Section */}
      <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <User className="text-emerald-600 w-5 h-5" />
          <h2 className="text-lg font-semibold text-gray-900">Edit Profile</h2>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              label="Full Name"
              id="name"
              placeholder="Your full name"
              {...field("name")}
            />
            <FormField
              label="Mobile Number"
              id="phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              {...field("phone")}
            />
          </div>
          <FormField
            label="Bio"
            id="bio"
            type="textarea"
            placeholder="Tell task givers about yourself..."
            {...field("bio")}
          />
          <FormField
            label="Core Skills"
            id="coreSkills"
            placeholder="e.g. React, Node.js, UI Design"
            hint="Separate multiple skills with commas"
            {...field("coreSkills")}
          />
          <FormField
            label="Profile Photo URL"
            id="photoURL"
            type="url"
            placeholder="https://example.com/photo.jpg"
            hint="Paste a direct image URL for your profile photo"
            {...field("photoURL")}
          />

          {/* Save Status */}
          {saveStatus === "success" && (
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm">
              <CheckCircle className="w-4 h-4 shrink-0" />
              Profile updated successfully!
            </div>
          )}
          {saveStatus === "error" && (
            <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Failed to save profile. Please try again.
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <Bell className="text-emerald-600 w-5 h-5" />
          <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
        </div>
        <div className="p-6 space-y-4">
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <p className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">
                Email Notifications
              </p>
              <p className="text-sm text-gray-500">Receive updates about your tasks and applicants.</p>
            </div>
            <input
              type="checkbox"
              className="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
              defaultChecked
            />
          </label>
          <hr className="border-gray-100" />
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <p className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">
                SMS Alerts
              </p>
              <p className="text-sm text-gray-500">Get text messages for urgent task updates.</p>
            </div>
            <input
              type="checkbox"
              className="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
            />
          </label>
        </div>
      </div>

      {/* Security & Logout */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <Shield className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">Security &amp; Access</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-500 mb-4 text-sm">
            Sign out of your account on this device. You will need to log back in to access your dashboard.
          </p>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors border border-red-100"
          >
            <LogOut className="w-4 h-4" />
            Log Out Securely
          </button>
        </div>
      </div>
    </div>
  );
}
