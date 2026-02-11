'use client';

import React from 'react';
import BlogCard from './BlogCard';
import { blogs } from '@/public/data/blogs';

const BlogSlider = () => {
  return (
    <div className="mt-12 px-4 md:px-0">
      {/*
        ❌ REMOVED SLIDER LOGIC
        - No useRef
        - No scroll buttons
        - No overflow-x
        - No snap scrolling

        ✅ Using CSS Grid instead
        - Mobile: 1 column
        - Tablet: 3 columns
        - Desktop: 4 columns
      */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        "
      >
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSlider;
