'use client';

import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { BLOG_CATEGORIES } from '@/lib/constants';

const BlogFormModal = ({ isOpen, onClose, onSubmit, initialData = null, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    img: '',
    author: '',
    desc1: '',
    desc2: '',
    desc3: '',
    desc4: '',
    desc5: '',
  });
  const [error, setError] = useState('');

  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category: initialData.category || '',
        img: initialData.img || '',
        author: initialData.author || '',
        desc1: initialData.desc1 || '',
        desc2: initialData.desc2 || '',
        desc3: initialData.desc3 || '',
        desc4: initialData.desc4 || '',
        desc5: initialData.desc5 || '',
      });
    } else {
      setFormData({
        title: '',
        category: '',
        img: '',
        author: '',
        desc1: '',
        desc2: '',
        desc3: '',
        desc4: '',
        desc5: '',
      });
    }
    setError('');
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      setError('Blog title is required');
      return;
    }
    if (!formData.category) {
      setError('Category is required');
      return;
    }
    if (!formData.author.trim()) {
      setError('Author name is required');
      return;
    }
    if (!formData.desc1.trim()) {
      setError('At least the first description paragraph is required');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[999]">
      <div className="w-full max-w-2xl bg-black border border-zinc-800 rounded-2xl">
        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">
          <h2 className="text-xl text-white font-semibold">
            {isEditing ? 'Edit Blog' : 'Create Blog'}
          </h2>
          <button onClick={onClose} disabled={isLoading}>
            <X className="text-zinc-400 hover:text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto px-6 py-4 scrollbar-hide">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm text-zinc-400 mb-1">Blog Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., The Neighborhood Economy"
              className="w-full bg-[#18181B] text-white placeholder:text-zinc-500 px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600"
            />
            <p className="text-xs text-zinc-500 mt-1">Slug will be auto-generated from title</p>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm text-zinc-400 mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[#18181B] text-white px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600"
            >
              <option value="">Select a category</option>
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-sm text-zinc-400 mb-1">Image URL (optional)</label>
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-[#18181B] text-white placeholder:text-zinc-500 px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600"
            />
          </div>

          {/* Author */}
          <div className="mb-4">
            <label className="block text-sm text-zinc-400 mb-1">Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className="w-full bg-[#18181B] text-white placeholder:text-zinc-500 px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600"
            />
          </div>

          {/* Description Paragraphs */}
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="mb-4">
              <label className="block text-sm text-zinc-400 mb-1">
                Paragraph {num} {num === 1 ? '*' : '(optional)'}
              </label>
              <textarea
                name={`desc${num}`}
                value={formData[`desc${num}`]}
                onChange={handleChange}
                placeholder={`Enter paragraph ${num}...`}
                rows={3}
                className="w-full bg-[#18181B] text-white placeholder:text-zinc-500 px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600 resize-none"
              />
            </div>
          ))}

          {/* Error Message */}
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-full font-semibold transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#13a884] hover:bg-[#0f8c6e] text-white py-4 rounded-full font-semibold disabled:opacity-50 flex items-center justify-center gap-2 transition"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isEditing ? 'Saving...' : 'Creating...'}
                </>
              ) : isEditing ? (
                'Save Changes'
              ) : (
                'Create Blog'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogFormModal;
