'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FileText, ArrowRight } from 'lucide-react';

const FeaturedPost = ({ blog }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/blog/${blog.slug}`)}
      className="cursor-pointer group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
        {blog.img ? (
          <Image
            src={blog.img}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <FileText className="w-20 h-20 text-gray-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#10A37F]">
            Featured
          </span>
          {blog.category && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                {blog.category}
              </span>
            </>
          )}
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] group-hover:text-[#10A37F] transition-colors duration-300">
          {blog.title}
        </h2>

        <p className="mt-5 text-gray-500 text-base sm:text-lg leading-relaxed line-clamp-3">
          {blog.desc1}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
            {blog.author?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <span className="text-sm font-medium text-gray-800">{blog.author}</span>
          <span className="text-gray-300">•</span>
          <span className="text-sm text-gray-500">{blog.date}</span>
        </div>

        <div className="mt-8">
          <span className="inline-flex items-center gap-2 text-sm font-semibold pb-0.5 border-b-2 border-gray-900 group-hover:border-[#10A37F] group-hover:text-[#10A37F] transition-colors duration-300">
            Read Article <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
