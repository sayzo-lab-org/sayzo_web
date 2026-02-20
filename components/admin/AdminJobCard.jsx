'use client';

import { Pencil, Trash2, Calendar, Users } from 'lucide-react';

const AdminJobCard = ({ job, onEdit, onDelete, onTogglePublish, onViewApplications, applicationCount = 0, isDeleting = false, isTogglingPublish = false }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Engineering: 'bg-blue-100 text-blue-700',
      Product: 'bg-purple-100 text-purple-700',
      Design: 'bg-pink-100 text-pink-700',
      Operation: 'bg-orange-100 text-orange-700',
      Marketing: 'bg-green-100 text-green-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#13a884] transition group">
      {/* Header - Title and Toggle */}
      <div className="flex justify-between items-start gap-4 mb-3">
        <h3 className="text-lg font-semibold text-gray-800 leading-tight">
          {job.title}
        </h3>
        {/* Publish Toggle - Track-tasks style */}
        <button
          onClick={() => onTogglePublish(job.id, job.published)}
          disabled={isTogglingPublish}
          className={`relative w-24 h-8 rounded-full transition-colors duration-200 border disabled:opacity-50 flex-shrink-0 ${
            job.published ? 'bg-[#13a884] border-[#13a884]' : 'bg-gray-200 border-gray-200'
          }`}
          title={job.published ? 'Click to unpublish' : 'Click to publish'}
        >
          <div className={`absolute top-0.5 bottom-0.5 px-3 rounded-full shadow-md transition-all duration-200 flex items-center justify-center text-xs font-semibold bg-white ${
            job.published ? 'right-0.5 text-[#13a884]' : 'left-0.5 text-gray-600'
          }`}>
            {job.published ? 'Publish' : 'Draft'}
          </div>
        </button>
      </div>

      {/* Category Badge */}
      <div className="mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(job.category)}`}>
          {job.category}
        </span>
      </div>

      {/* Tags */}
      {job.tags && job.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full border border-gray-300 text-xs font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
        {job.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          Created {formatDate(job.createdAt)}
        </p>

        <div className="flex items-center gap-2">
          {/* View Applications Button */}
          <button
            onClick={() => onViewApplications?.(job)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition"
            title="View Applications"
          >
            <Users className="w-4 h-4" />
            {applicationCount > 0 && (
              <span className="text-xs font-medium">{applicationCount}</span>
            )}
          </button>
          <button
            onClick={() => onEdit(job)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(job.id)}
            disabled={isDeleting}
            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition disabled:opacity-50"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminJobCard;
