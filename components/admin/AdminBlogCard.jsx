'use client';

import { Pencil, Trash2, Calendar, User } from 'lucide-react';

const AdminBlogCard = ({ blog, onEdit, onDelete, onTogglePublish, isDeleting = false, isTogglingPublish = false }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    // Handle both Firestore timestamp and string date
    if (typeof timestamp === 'string') return timestamp;
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Design: 'bg-pink-100 text-pink-700',
      Tech: 'bg-blue-100 text-blue-700',
      Business: 'bg-green-100 text-green-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#13a884] transition group">
      {/* Header - Title and Toggle */}
      <div className="flex justify-between items-start gap-4 mb-3">
        <h3 className="text-lg font-semibold text-gray-800 leading-tight">
          {blog.title}
        </h3>
        {/* Publish Toggle */}
        <button
          onClick={() => onTogglePublish(blog.id, blog.published)}
          disabled={isTogglingPublish}
          className={`relative w-24 h-8 rounded-full transition-colors duration-200 border disabled:opacity-50 flex-shrink-0 ${
            blog.published ? 'bg-[#13a884] border-[#13a884]' : 'bg-gray-200 border-gray-200'
          }`}
          title={blog.published ? 'Click to unpublish' : 'Click to publish'}
        >
          <div className={`absolute top-0.5 bottom-0.5 px-3 rounded-full shadow-md transition-all duration-200 flex items-center justify-center text-xs font-semibold bg-white ${
            blog.published ? 'right-0.5 text-[#13a884]' : 'left-0.5 text-gray-600'
          }`}>
            {blog.published ? 'Publish' : 'Draft'}
          </div>
        </button>
      </div>

      {/* Category Badge */}
      <div className="mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(blog.category)}`}>
          {blog.category}
        </span>
      </div>

      {/* Blog Image Preview */}
      {blog.img && (
        <div className="mb-4 aspect-video rounded-lg overflow-hidden bg-gray-100">
          <img
            src={blog.img}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Description Preview (desc1) */}
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
        {blog.desc1}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            {blog.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {blog.date || formatDate(blog.createdAt)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(blog)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(blog.id)}
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

export default AdminBlogCard;
