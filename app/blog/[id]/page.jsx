'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Share2, Bookmark, Clock, ChevronRight } from 'lucide-react';
import { blogs } from '@/public/data/blogs';
import { useEffect } from 'react';

export default function BlogDetails() {
  const router = useRouter();
  const { id } = useParams(); // ✅ FIX
  const blog = blogs.find((b) => b.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) return null; // prevent flash before render

  return (
    <div className="min-h-screen bg-white mt-30">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md b px-4 pt-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <ArrowLeft size={20} />
            Back to Stories
          </button>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-10">
        {/* IMAGE */}
        <div className="relative aspect-video rounded-3xl overflow-hidden mb-12">
          <Image
            src={blog.img}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* HEADER */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
         {blog.title}
        </h1>

        <p className="text-xl text-gray-600 mb-10"> {blog.desc1}</p>
        <p className="text-xl text-gray-600 mb-10"> {blog.desc2}</p>
        <p className="text-xl text-gray-600 mb-10"> {blog.desc3}</p>
        <p className="text-xl text-gray-600 mb-10"> {blog.desc4}</p>
        <p className="text-xl text-gray-600 mb-10"> {blog.desc5}</p>
        

        <div className="whitespace-pre-line text-lg">
          {/* {blog.content} */}
        </div>
      </article>
    </div>
  );
}
