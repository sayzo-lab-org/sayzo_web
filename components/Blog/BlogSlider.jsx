'use client';

import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { blogs as dummyBlogs } from '@/public/data/blogs';
import { getPublishedBlogs } from '@/lib/firebase';

const BlogSlider = () => {
  const [firebaseBlogs, setFirebaseBlogs] = useState([]);

  useEffect(() => {
    const fetchFirebaseBlogs = async () => {
      try {
        const published = await getPublishedBlogs();
        setFirebaseBlogs(published);
      } catch (error) {
        console.error('Failed to fetch Firebase blogs:', error);
        // Silently fail - dummy blogs will still show
      }
    };

    fetchFirebaseBlogs();
  }, []);

  // Combine Firebase blogs (newer, first) with dummy blogs
  const allBlogs = [...firebaseBlogs, ...dummyBlogs];

  return (
    <div className="mt-12 px-4 md:px-0">
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
        {allBlogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSlider;
