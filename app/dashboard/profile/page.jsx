"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserProfile } from "@/lib/firebase";
import { Mail, Star, Calendar, Briefcase, Edit2 } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userProfile = await getUserProfile(user.uid);
          setProfile(userProfile || {
            name: user.displayName || "Sayzo User",
            email: user.email,
            role: "Member",
            rating: 5.0,
          });
        } catch (error) {
          console.error("Failed to load profile", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 max-w-3xl">
        <div className="bg-white rounded-xl border border-gray-100 p-8 flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
          <div className="space-y-3 flex-1">
            <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
            <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-500">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-emerald-600/10"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="w-24 h-24 bg-emerald-100 rounded-full border-4 border-white flex items-center justify-center text-emerald-700 font-bold text-3xl uppercase overflow-hidden">
              {profile.photoURL ? (
                <img src={profile.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                profile.name?.charAt(0) || profile.email?.charAt(0) || "U"
              )}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-not-allowed opacity-80" title="Coming Soon">
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-500 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              {profile.role || "Task Doer & Giver"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Personal Information</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4" /> Email Address
            </p>
            <p className="font-medium text-gray-900">{profile.email}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
              <Star className="w-4 h-4" /> Rating
            </p>
            <p className="font-medium text-gray-900 flex items-center gap-1">
              {profile.rating?.toFixed ? profile.rating.toFixed(1) : "5.0"}
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4" /> Joined Sayzo
            </p>
            <p className="font-medium text-gray-900">
              {profile.createdAt?.toDate ? profile.createdAt.toDate().toLocaleDateString() : "Recently"}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-sm text-gray-500 mb-3">Skills & Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills?.length > 0 ? (
              profile.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 border border-gray-200 text-gray-700 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm italic">No skills added yet.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
