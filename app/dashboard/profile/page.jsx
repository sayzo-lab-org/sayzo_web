"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Mail, Phone, MapPin, User, FileText, Save, Loader2 } from "lucide-react";
import { auth, saveUserProfile, subscribeToUserProfile } from "@/lib/firebase";

export default function ProfilePage() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
    bio: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
      if (!currentUser) setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authUser?.uid) return;

    const unsubscribe = subscribeToUserProfile(
      authUser.uid,
      (profile) => {
        setForm({
          fullName: profile?.name || authUser.displayName || "",
          email: profile?.email || authUser.email || "",
          phoneNumber: profile?.phone || profile?.mobile || "",
          location: profile?.location || profile?.city || "",
          bio: profile?.bio || "",
        });
        setLoading(false);
      },
      () => {
        setError("Failed to load profile data.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [authUser?.uid, authUser?.displayName, authUser?.email]);

  const canSubmit = useMemo(() => {
    return Boolean(form.fullName.trim() && form.email.trim()) && !saving;
  }, [form.fullName, form.email, saving]);

  const updateField = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!authUser?.uid || !canSubmit) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await saveUserProfile(authUser.uid, {
        name: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phoneNumber.trim(),
        location: form.location.trim(),
        bio: form.bio.trim(),
      });

      setSuccess("Profile updated successfully.");
    } catch (saveError) {
      setError(saveError?.message || "Unable to save profile changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="h-80 animate-pulse rounded-xl border border-gray-200 bg-white" />
      </div>
    );
  }

  if (!authUser) {
    return <p className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">Please log in.</p>;
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="mt-2 text-sm text-gray-600">Update your onboarding profile information.</p>
      </div>

      <form onSubmit={handleSave} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-gray-700">Full Name</span>
            <div className="flex items-center rounded-lg border border-gray-200 px-3">
              <User className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={form.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                className="w-full bg-transparent px-2 py-2.5 text-sm text-gray-900 outline-none"
                placeholder="Enter full name"
              />
            </div>
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <div className="flex items-center rounded-lg border border-gray-200 px-3">
              <Mail className="h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="w-full bg-transparent px-2 py-2.5 text-sm text-gray-900 outline-none"
                placeholder="Enter email"
              />
            </div>
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-gray-700">Phone Number</span>
            <div className="flex items-center rounded-lg border border-gray-200 px-3">
              <Phone className="h-4 w-4 text-gray-400" />
              <input
                type="tel"
                value={form.phoneNumber}
                onChange={(event) => updateField("phoneNumber", event.target.value)}
                className="w-full bg-transparent px-2 py-2.5 text-sm text-gray-900 outline-none"
                placeholder="Enter phone number"
              />
            </div>
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-gray-700">Location</span>
            <div className="flex items-center rounded-lg border border-gray-200 px-3">
              <MapPin className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={form.location}
                onChange={(event) => updateField("location", event.target.value)}
                className="w-full bg-transparent px-2 py-2.5 text-sm text-gray-900 outline-none"
                placeholder="Enter location"
              />
            </div>
          </label>
        </div>

        <label className="mt-4 block space-y-1.5">
          <span className="text-sm font-medium text-gray-700">Bio (optional)</span>
          <div className="flex rounded-lg border border-gray-200 px-3">
            <FileText className="mt-3 h-4 w-4 text-gray-400" />
            <textarea
              rows={4}
              value={form.bio}
              onChange={(event) => updateField("bio", event.target.value)}
              className="w-full resize-none bg-transparent px-2 py-2.5 text-sm text-gray-900 outline-none"
              placeholder="Tell us a bit about yourself"
            />
          </div>
        </label>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        {success ? <p className="mt-4 text-sm text-emerald-600">{success}</p> : null}

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </section>
  );
}
