'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/app/Context/AuthContext';
import { addBlog } from '@/lib/firebase';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogEditor from '@/components/admin/BlogEditor';

export default function NewBlogPage() {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const editorRef = useRef(null);

  const [meta, setMeta] = useState({
    title: '',
    category: '',
    author: '',
    img: '',
    img2: '',
    img3: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleMetaChange = (field, value) => {
    setMeta((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!meta.title.trim()) { toast.error('Blog title is required'); return false; }
    if (!meta.category) { toast.error('Category is required'); return false; }
    if (!meta.author.trim()) { toast.error('Author name is required'); return false; }
    if (editorRef.current?.isEmpty()) { toast.error('Blog content cannot be empty'); return false; }
    return true;
  };

  const save = async (published) => {
    if (!validate()) return;

    const setter = published ? setIsPublishing : setIsSaving;
    setter(true);
    try {
      const content = editorRef.current.getHTML();
      await addBlog({ ...meta, content, published });
      toast.success(published ? 'Blog published!' : 'Saved as draft!');
      router.push('/website-aaadminpanel/dashboard/blogs');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setter(false);
    }
  };

  return (
    <AdminLayout>
      <BlogEditor
        mode="create"
        meta={meta}
        onMetaChange={handleMetaChange}
        onSaveDraft={() => save(false)}
        onPublish={() => save(true)}
        isSaving={isSaving}
        isPublishing={isPublishing}
        editorRef={editorRef}
      />
    </AdminLayout>
  );
}
