
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Added ChevronRight to the imports from lucide-react
import { ArrowLeft, Share2, Bookmark, Clock, ChevronRight } from 'lucide-react';
import { blogs } from '../data/blogs';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find(b => b.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Post not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition font-medium"
          >
            <ArrowLeft size={20} />
            <span>Back to Stories</span>
          </button>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600">
              <Share2 size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600">
              <Bookmark size={20} />
            </button>
          </div>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Main Image */}
        <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <img 
            src={blog.img} 
            alt={blog.title} 
            className="w-full h-auto aspect-video object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 flex gap-2">
            <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
              {blog.category}
            </span>
          </div>
        </div>

        {/* Post Info */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-gray-500 text-sm mb-6">
            <Clock size={16} />
            <span>5 min read</span>
            <span>•</span>
            <span className="text-indigo-600 font-bold">{blog.date}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 py-6 border-y border-gray-100">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
              {blog.author.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-gray-900">{blog.author}</p>
              <p className="text-sm text-gray-500">Industry Contributor</p>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="prose prose-lg max-w-none text-gray-800">
  {Object.keys(blog)
    .filter((key) => key.startsWith("desc"))
    .map((key, index) => (
      <p
        key={key}
        className="text-xl leading-relaxed font-medium text-gray-600 mb-8"
      >
        {blog[key]}
      </p>
    ))}
</div>

        {/* Footer Navigation */}
        <footer className="mt-20 pt-10 border-t border-gray-100">
          <h4 className="font-bold text-lg mb-6">Next up</h4>
          <div 
            onClick={() => navigate('/')}
            className="group cursor-pointer bg-gray-50 rounded-3xl p-8 flex items-center justify-between hover:bg-indigo-50 transition"
          >
            <div>
              <p className="text-sm text-indigo-600 font-bold uppercase tracking-wider mb-2">Continue reading</p>
              <p className="text-2xl font-bold">Discover more stories like this one</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition">
              <ChevronRight size={24} />
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogDetails;
