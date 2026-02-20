'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FileText } from 'lucide-react';

const BlogCard = ({ blog }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/blog/${blog.slug}`)}
      className="px-2 sm:px-0 cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-2xl  aspect-[4/3] ">
        {blog.img ? (
          <Image
            src={blog.img}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <FileText className="w-16 h-16 text-gray-300" />
          </div>
        )}

        {/* ARROW CORNER */}
        <div className="absolute bottom-0 right-0 flex items-end">
          <div className="absolute -top-[25px] right-0 w-[25px] h-[25px] overflow-hidden">
            <div className="w-full h-full rounded-br-xl shadow-[10px_10px_0_0_#f9fafb]" />
          </div>

          <div className="absolute bottom-0 -left-[40px] w-[40px] h-[25px] overflow-hidden">
            <div className="w-full h-full rounded-br-xl shadow-[10px_10px_0_0_#f9fafb]" />
          </div>

          <div className="bg-white pt-2.5 pl-2.5 rounded-tl-[40px] relative z-10">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black flex items-center justify-center transition-all hover:bg-primary-btn hover:rotate-[-45deg] shadow-lg">
              <svg width="18" height="18" viewBox="0 0 15 15">
                <path
                  fill="white"
                  d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* TEXT */}
      <div className="mt-4">
        <h3 className="font-bold text-lg sm:text-xl leading-snug line-clamp-2 hover:text-primary-btn transition-colors">
          {blog.title}
        </h3>

        <p className="mt-2 text-sm sm:text-base text-gray-500 line-clamp-3">
          {blog.desc1}
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400 font-medium">
          <span>{blog.author}</span>
          <span>•</span>
          <span>{blog.date}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
