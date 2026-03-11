"use client";

import { UserCircle, Mail, Phone, ExternalLink, Users } from "lucide-react";
import Link from "next/link";

const formatTimeAgo = (date) => {
  if (!date) return 'Unknown date';
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

export default function ApplicantList({ applications }) {
  if (!applications || applications.length === 0) {
    return (
      <div className="py-12 bg-gray-50 border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center">
        <Users className="w-12 h-12 text-gray-300 mb-4" />
        <h3 className="text-gray-900 font-medium text-lg">No Applications Yet</h3>
        <p className="text-gray-500 text-sm mt-1 max-w-sm">When users apply for this task, their profiles and application timestamps will appear here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#F8F9FB] text-gray-600 text-xs uppercase tracking-wider font-semibold border-b border-gray-200">
          <tr>
            <th className="px-6 py-4">Applicant</th>
            <th className="px-6 py-4">Contact</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Applied</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50/80 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
                    <UserCircle className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                        {app.applicantName || "Unknown Applicant"}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 font-mono">
                        {app.applicantId?.slice(0, 8)}...
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1.5">
                    {app.applicantEmail && (
                        <div className="flex items-center gap-2 text-gray-600 text-xs hover:text-gray-900">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            <a href={`mailto:${app.applicantEmail}`}>{app.applicantEmail}</a>
                        </div>
                    )}
                    {app.applicantPhone && (
                        <div className="flex items-center gap-2 text-gray-600 text-xs hover:text-gray-900">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            <a href={`tel:${app.applicantPhone}`}>{app.applicantPhone}</a>
                        </div>
                    )}
                    {!app.applicantEmail && !app.applicantPhone && (
                        <span className="text-gray-400 italic text-xs">No contact info</span>
                    )}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                    app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                }`}>
                  {app.status || 'pending'}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-xs">
                {app.createdAt ? formatTimeAgo(app.createdAt.toDate()) : 'Unknown date'}
              </td>
              <td className="px-6 py-4 text-right">
                 {/* In a real implementation this might route to their public profile */}
                 <button className="text-gray-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition" title="View Application Details">
                    <ExternalLink className="w-4 h-4" />
                 </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
