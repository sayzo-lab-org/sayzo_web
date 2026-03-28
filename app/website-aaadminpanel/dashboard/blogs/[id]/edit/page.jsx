'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { getBlogById, updateBlog } from '@/lib/firebase';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogEditor from '@/components/admin/BlogEditor';

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();
  const editorRef = useRef(null);

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await getBlogById(id);
        if (!blog) {
          toast.error('Blog not found');
          router.push('/website-aaadminpanel/dashboard/blogs');
          return;
        }
        // If old blog (desc1-5), convert paragraphs to HTML so editor is pre-filled
        if (!blog.content) {
          const paragraphs = [blog.desc1, blog.desc2, blog.desc3, blog.desc4, blog.desc5].filter(Boolean);
          blog.content = paragraphs.map((p) => `<p>${p}</p>`).join('');
        }

        setInitialData(blog);
        setMeta({
          title: blog.title || '',
          category: blog.category || '',
          author: blog.author || '',
          img: blog.img || '',
          img2: blog.img2 || '',
          img3: blog.img3 || '',
        });
      } catch {
        toast.error('Failed to load blog');
        router.push('/website-aaadminpanel/dashboard/blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, router]);

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
      await updateBlog(id, { ...meta, content, published });
      toast.success(published ? 'Blog published!' : 'Draft saved!');
      router.push('/website-aaadminpanel/dashboard/blogs');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setter(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#13a884]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <BlogEditor
        mode="edit"
        initialData={initialData}
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
