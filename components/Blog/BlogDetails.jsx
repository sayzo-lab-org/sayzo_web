'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Clock } from 'lucide-react';
import { blogs } from '@/public/data/blogs';
import { useEffect } from 'react';

export default function BlogDetails({ slug }) {
  const router = useRouter();
  const blog = blogs.find((b) => b.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-white mt-30">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 pt-4">
        <button onClick={() => router.push('/blog')} className="flex items-center gap-2 text-gray-600">
          <ArrowLeft size={20} /> Back to Stories
        </button>
      </nav>
      <article className="max-w-4xl mx-auto px-4 py-10">
        <div className="relative aspect-video rounded-3xl overflow-hidden mb-12">
          <Image src={blog.img} alt={blog.title} fill className="object-cover" priority />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{blog.title}</h1>
        <p className="text-xl text-gray-600 mb-10"> {blog.desc1}</p>
        <p className="text-xl text-gray-600 mb-10"> {blog.desc2}</p>
        <p className="text-xl text-gray-600 mb-10"> {blog.desc3}</p>
        <p className="text-xl text-gray-600 mb-10"> {blog.desc4}</p>
        <p className="text-xl text-gray-600 mb-10"> {blog.desc5}</p>
   
      </article>
    </div>
  );
}