'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Loader2, FileText } from 'lucide-react';
import { blogs as dummyBlogs } from '@/public/data/blogs';
import { getBlogBySlug } from '@/lib/firebase';
import { useEffect, useState } from 'react';

export default function BlogDetails({ slug }) {
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const findBlog = async () => {
      // First check dummy blogs
      const dummyBlog = dummyBlogs.find((b) => b.slug === slug);
      if (dummyBlog) {
        setBlog(dummyBlog);
        setLoading(false);
        return;
      }

      // If not found in dummy, check Firebase
      try {
        const firebaseBlog = await getBlogBySlug(slug);
        if (firebaseBlog) {
          setBlog(firebaseBlog);
        }
      } catch (error) {
        console.error('Error fetching blog from Firebase:', error);
      }
      setLoading(false);
    };

    findBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white mt-30 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#13a884]" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white mt-30">
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 pt-4">
          <button onClick={() => router.push('/blog')} className="flex items-center gap-2 text-gray-600">
            <ArrowLeft size={20} /> Back to Stories
          </button>
        </nav>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Blog Not Found</h1>
          <p className="text-gray-600 mt-2">The blog you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white mt-30">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 pt-4">
        <button onClick={() => router.push('/blog')} className="flex items-center gap-2 text-gray-600">
          <ArrowLeft size={20} /> Back to Stories
        </button>
      </nav>
      <article className="max-w-4xl mx-auto px-4 py-10">
        <div className="relative aspect-video rounded-3xl overflow-hidden mb-12">
          {blog.img ? (
            <Image src={blog.img} alt={blog.title} fill className="object-cover" priority />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <FileText className="w-24 h-24 text-gray-300" />
            </div>
          )}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{blog.title}</h1>
        {blog.desc1 && <p className="text-xl text-gray-600 mb-10">{blog.desc1}</p>}
        {blog.desc2 && <p className="text-xl text-gray-600 mb-10">{blog.desc2}</p>}
        {blog.desc3 && <p className="text-xl text-gray-600 mb-10">{blog.desc3}</p>}
        {blog.desc4 && <p className="text-xl text-gray-600 mb-10">{blog.desc4}</p>}
        {blog.desc5 && <p className="text-xl text-gray-600 mb-10">{blog.desc5}</p>}
      </article>
    </div>
  );
}