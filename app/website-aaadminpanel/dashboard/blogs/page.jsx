'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, ChevronDown, X, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/app/Context/AuthContext';
import { subscribeToBlogsAdmin, addBlog, updateBlog, deleteBlog, toggleBlogPublished } from '@/lib/firebase';
import { BLOG_CATEGORIES } from '@/lib/constants';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminBlogCard from '@/components/admin/AdminBlogCard';
import BlogFormModal from '@/components/admin/BlogFormModal';

export default function BlogsManagementPage() {
  const router = useRouter();
  const { user, isAdmin, isLoading: authLoading } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [togglingPublishId, setTogglingPublishId] = useState(null);

  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Subscribe to blogs
  useEffect(() => {
    if (authLoading) return;
    if (!user || !isAdmin) {
      router.push('/website-aaadminpanel');
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToBlogsAdmin(
      (blogsData) => {
        setBlogs(blogsData);
        setLoading(false);
      },
      (err) => {
        console.error('Blogs subscription error:', err);
        setError('Failed to load blogs. Please refresh the page.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, isAdmin, authLoading, router]);

  // Filter blogs by category and status
  const filteredBlogs = blogs.filter((blog) => {
    const categoryMatch = categoryFilter === 'All' || blog.category === categoryFilter;
    const statusMatch = statusFilter === 'All' ||
      (statusFilter === 'Published' && blog.published) ||
      (statusFilter === 'Drafts' && !blog.published);
    return categoryMatch && statusMatch;
  });

  // Handle toggle publish
  const handleTogglePublish = async (blogId, currentStatus) => {
    setTogglingPublishId(blogId);
    try {
      await toggleBlogPublished(blogId, currentStatus);
      toast.success(currentStatus ? 'Blog unpublished' : 'Blog published');
    } catch (err) {
      toast.error(err.message || 'Failed to update status');
    } finally {
      setTogglingPublishId(null);
    }
  };

  // Handle create blog
  const handleCreateBlog = async (formData) => {
    setFormLoading(true);
    try {
      await addBlog(formData);
      toast.success('Blog created successfully!');
      setShowFormModal(false);
    } catch (err) {
      toast.error(err.message || 'Failed to create blog');
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  // Handle edit blog
  const handleEditBlog = async (formData) => {
    if (!editingBlog) return;
    setFormLoading(true);
    try {
      await updateBlog(editingBlog.id, formData);
      toast.success('Blog updated successfully!');
      setShowFormModal(false);
      setEditingBlog(null);
    } catch (err) {
      toast.error(err.message || 'Failed to update blog');
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  // Handle delete blog
  const handleDeleteBlog = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }
    setDeletingId(blogId);
    try {
      await deleteBlog(blogId);
      toast.success('Blog deleted successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to delete blog');
    } finally {
      setDeletingId(null);
    }
  };

  // Open edit modal
  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setShowFormModal(true);
  };

  // Open create modal
  const openCreateModal = () => {
    setEditingBlog(null);
    setShowFormModal(true);
  };

  const filterOptions = [
    { id: 'All', label: 'All Blogs' },
    ...BLOG_CATEGORIES.map((cat) => ({ id: cat, label: cat })),
  ];

  const statusOptions = [
    { id: 'All', label: 'All Status' },
    { id: 'Published', label: 'Published' },
    { id: 'Drafts', label: 'Drafts' },
  ];

  const currentFilterLabel = filterOptions.find((f) => f.id === categoryFilter)?.label || 'Filter';
  const currentStatusLabel = statusOptions.find((s) => s.id === statusFilter)?.label || 'Status';

  return (
    <AdminLayout>
      <div className="min-h-screen bg-white pt-32 lg:pt-0">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Blogs Management</h1>
              <p className="text-sm text-gray-500 mt-1">
                {blogs.length} blog{blogs.length !== 1 ? 's' : ''} posted
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Status Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  {currentStatusLabel}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showStatusDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowStatusDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                      {statusOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setStatusFilter(option.id);
                            setShowStatusDropdown(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition ${
                            statusFilter === option.id
                              ? 'text-[#13a884] font-medium'
                              : 'text-gray-700'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Category Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  {currentFilterLabel}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showFilterDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowFilterDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                      {filterOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setCategoryFilter(option.id);
                            setShowFilterDropdown(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition ${
                            categoryFilter === option.id
                              ? 'text-[#13a884] font-medium'
                              : 'text-gray-700'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Add Blog Button */}
              <button
                onClick={openCreateModal}
                className="flex items-center gap-2 px-4 py-2 bg-[#13a884] hover:bg-[#0f8c6e] text-white rounded-lg text-sm font-medium transition"
              >
                <Plus className="w-4 h-4" />
                Add Blog
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Error Banner */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
                <p className="text-red-700 text-sm">{error}</p>
                <button
                  onClick={() => setError('')}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="w-10 h-10 animate-spin text-[#13a884] mx-auto mb-4" />
                  <p className="text-gray-500">Loading blogs...</p>
                </div>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-20">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  {categoryFilter === 'All'
                    ? 'No blogs posted yet'
                    : `No blogs in ${categoryFilter} category`}
                </p>
                <button
                  onClick={openCreateModal}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#13a884] hover:bg-[#0f8c6e] text-white rounded-lg text-sm font-medium transition"
                >
                  <Plus className="w-4 h-4" />
                  Create your first blog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <AdminBlogCard
                    key={blog.id}
                    blog={blog}
                    onEdit={openEditModal}
                    onDelete={handleDeleteBlog}
                    onTogglePublish={handleTogglePublish}
                    isDeleting={deletingId === blog.id}
                    isTogglingPublish={togglingPublishId === blog.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Blog Form Modal */}
        <BlogFormModal
          isOpen={showFormModal}
          onClose={() => {
            setShowFormModal(false);
            setEditingBlog(null);
          }}
          onSubmit={editingBlog ? handleEditBlog : handleCreateBlog}
          initialData={editingBlog}
          isLoading={formLoading}
        />
      </div>
    </AdminLayout>
  );
}
