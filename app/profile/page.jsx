"use client";

import { useEffect, useState } from "react";
import { auth, getUserProfile } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Globe, Briefcase, BookOpen } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const user = auth.currentUser;

      if (!user) return;

      const data = await getUserProfile(user.uid);
      setProfile(data);
      setLoading(false);
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-emerald-600 rounded-full"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-zinc-50 py-10 px-6">

      <div className="max-w-5xl mx-auto space-y-10">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm flex items-center gap-6">

          <div className="w-20 h-20 rounded-full overflow-hidden border flex items-center justify-center text-xl font-bold">
            {profile.photoURL ? (
              <Image
                src={profile.photoURL}
                alt="avatar"
                width={80}
                height={80}
                className="object-cover"
              />
            ) : (
              profile?.name?.charAt(0)
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-zinc-500">{profile.email}</p>
            <p className="text-sm text-emerald-600 font-semibold mt-1">
              {profile.profession}
            </p>
          </div>

        </div>

        {/* Bio */}
        {profile.bio && (
          <Section title="Bio">
            <p className="text-zinc-600 leading-relaxed">{profile.bio}</p>
          </Section>
        )}

        {/* Core Skills */}
        {profile.coreSkills?.length > 0 && (
          <Section title="Core Skills">
            <div className="flex flex-wrap gap-2">
              {profile.coreSkills.map((skill, i) => (
                <Tag key={i}>{skill}</Tag>
              ))}
            </div>
          </Section>
        )}

        {/* Other Skills */}
        {profile.otherSkills?.length > 0 && (
          <Section title="Other Skills">
            <div className="flex flex-wrap gap-2">
              {profile.otherSkills.map((skill, i) => (
                <Tag key={i}>{skill.name || skill}</Tag>
              ))}
            </div>
          </Section>
        )}

        {/* Experience */}
        {profile.experience?.length > 0 && (
          <Section title="Experience" icon={<Briefcase size={16} />}>
            {profile.experience.map((exp, i) => (
              <div key={i} className="border-l-2 pl-4 py-2">
                <p className="font-bold">{exp.role}</p>
                <p className="text-sm text-zinc-500">
                  {exp.company} • {exp.duration}
                </p>
              </div>
            ))}
          </Section>
        )}

        {/* Education */}
        {profile.education?.length > 0 && (
          <Section title="Education" icon={<BookOpen size={16} />}>
            {profile.education.map((edu, i) => (
              <div key={i} className="border-l-2 pl-4 py-2">
                <p className="font-bold">{edu.school}</p>
                <p className="text-sm text-zinc-500">{edu.degree}</p>
              </div>
            ))}
          </Section>
        )}

        {/* Languages */}
        {profile.languages?.length > 0 && (
          <Section title="Languages" icon={<Globe size={16} />}>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang, i) => (
                <Tag key={i}>
                  {lang.name} • {lang.level}
                </Tag>
              ))}
            </div>
          </Section>
        )}

      </div>
    </div>
  );
}

/* ---------- Small reusable components ---------- */

function Section({ title, icon, children }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm space-y-4">
      <div className="flex items-center gap-2 font-bold text-lg">
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="px-4 py-2 bg-zinc-100 rounded-full text-sm font-semibold">
      {children}
    </span>
  );
}