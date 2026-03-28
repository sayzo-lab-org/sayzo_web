'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Loader2, FileText, Calendar, Clock, Linkedin, Link2, Check } from 'lucide-react';
import { blogs as dummyBlogs } from '@/public/data/blogs';
import { getBlogBySlug, getPublishedBlogs } from '@/lib/firebase';
import { useEffect, useRef, useState } from 'react';
import BlogCard from './BlogCard';

// ── Reading progress bar ──────────────────────────────────────────────────────
function ReadingProgressBar({ articleRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef?.current;
      if (!el) return;
      const articleBottom = el.getBoundingClientRect().bottom + window.scrollY;
      const viewportH = window.innerHeight;
      const total = Math.max(1, articleBottom - viewportH);
      setProgress(Math.min(100, (window.scrollY / total) * 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [articleRef]);

  return (
    <div className="fixed top-36 left-0 right-0 z-[200] h-[3px] bg-gray-100 pointer-events-none">
      <div
        className="h-full bg-[#10A37F] transition-[width] duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
// ── Image placeholder / real image ───────────────────────────────────────────
function InlineImage({ src, alt, sizes = "(max-width: 1280px) 100vw, 500px" }) {
  return (
    <div className="relative w-full h-full min-h-55 rounded-xl overflow-hidden bg-gray-100">
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <FileText className="w-8 h-8 text-gray-300" />
          <span className="text-xs font-medium text-gray-400">Image coming soon</span>
          <span className="text-[11px] text-gray-300">add img2 / img3 in Firebase</span>
        </div>
      )}
    </div>
  );
}
// ── Blog content renderer ────────────────────────────────────────────────────
// `from` lets the caller skip leading paragraphs already rendered elsewhere.
//
// When from=0 (default):  [0]=intro  [1|img2 split]  [2]=insight  [img3|3 split]  [4]=quote
// When from=1 (full-width section after sidebar):
//   items = paragraphs.slice(1)
//   [0]=para1  [1|img2 split]  [2]=insight  [img3|3 split]  [4+]=body/quote
//
// Injects img2 (float-right) and img3 (float-left) into HTML at paragraph splits
function injectImagesIntoHtml(html, img2, img3) {
  if (!img2 && !img3) return html;

  const positions = [...html.matchAll(/<\/p>/g)];
  const total = positions.length;
  if (total < 2) return html;

  let result = html;

  if (img2) {
    const at = positions[Math.max(0, Math.floor(total / 3))].index + 4;
    const node = `<div style="float:right;width:42%;margin:0.25rem 0 1.25rem 1.75rem;clear:right">` +
      `<img src="${img2}" alt="Supporting visual" style="width:100%;border-radius:0.75rem;aspect-ratio:4/3;object-fit:cover" /></div>`;
    result = result.slice(0, at) + node + result.slice(at);
  }

  if (img3) {
    // recalculate after img2 was inserted
    const pos3 = [...result.matchAll(/<\/p>/g)];
    const t3 = pos3.length;
    const at3 = pos3[Math.max(0, Math.floor(t3 * 2 / 3))].index + 4;
    const node = `<div style="float:left;width:42%;margin:0.25rem 1.75rem 1.25rem 0;clear:left">` +
      `<img src="${img3}" alt="Insight illustration" style="width:100%;border-radius:0.75rem;aspect-ratio:4/3;object-fit:cover" /></div>`;
    result = result.slice(0, at3) + node + result.slice(at3);
  }

  return result;
}

function BlogContent({ paragraphs, blog, from = 0 }) {
  const items = paragraphs.slice(from);
  if (!items.length) return null;

  return (
    <div className="space-y-8 mt-8">

      {/* 0 — First Paragraph */}
      <p className="text-[17px] text-gray-700 leading-[1.8] font-[450]">
        {items[0]}
      </p>

      {/* 1 — Text (8) | Image (4) square */}
      {items[1] && (
        <div className="grid grid-cols-12 gap-6 items-start">
          <p className="col-span-9 text-[17px] text-gray-600 leading-[1.8]">
            {items[1]}
          </p>
          <div className="col-span-3">
            <div className="aspect-square w-full rounded-xl overflow-hidden">
              <InlineImage src={blog.img2 ?? null} alt="Supporting visual" size="(max-width: 400px)" />
            </div>
          </div>
        </div>
      )}

      {/* 2 — Key Insight */}
      {items[2] && (
        <p className="text-[17px] text-gray-600 leading-[1.8]">
          {items[2]}
        </p>
      )}

      {/* 3 — Image (4) square | Text (8) */}
      {items[3] && (
        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-3">
            <div className="aspect-square w-full rounded-xl overflow-hidden">
              <InlineImage src={blog.img3 ?? null} alt="Insight illustration" />
            </div>
          </div>
          <p className="col-span-9 text-[17px] text-gray-600 leading-[1.8]">
            {items[3]}
          </p>
        </div>
      )}

      {/* 4+ — Remaining Paragraphs */}
      <div className="space-y-8">
        {items.slice(4).map((para, i) => (
          <p key={i} className="text-[17px] text-gray-600 leading-[1.8]">
            {para}
          </p>
        ))}
      </div>

    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function BlogDetails({ slug }) {
  const router = useRouter();
  const articleRef = useRef(null);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allBlogs, setAllBlogs] = useState([...dummyBlogs]);
  const [copied, setCopied] = useState(false);

  // Fetch current blog
  useEffect(() => {
    window.scrollTo(0, 0);

    const findBlog = async () => {
      const dummyBlog = dummyBlogs.find((b) => b.slug === slug);
      if (dummyBlog) {
        setBlog(dummyBlog);
        setLoading(false);
        return;
      }
      try {
        const firebaseBlog = await getBlogBySlug(slug);
        if (firebaseBlog) setBlog(firebaseBlog);
      } catch (error) {
        console.error('Error fetching blog from Firebase:', error);
      }
      setLoading(false);
    };

    findBlog();
  }, [slug]);

  // Fetch all blogs for related posts
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const published = await getPublishedBlogs();
        setAllBlogs([...published, ...dummyBlogs]);
      } catch {
        // silently fall back to dummy blogs
      }
    };
    fetchAll();
  }, []);

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-white mt-30 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#10A37F]" />
      </div>
    );
  }

  // ── 404 ──
  if (!blog) {
    return (
      <div className="min-h-screen bg-white mt-50">
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center">
            <button
              onClick={() => router.push('/blog')}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Blog
            </button>
          </div>
        </nav>
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Blog Not Found</h1>
          <p className="text-gray-600 mt-2">The blog you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // ── Derived data ──
  const hasRichContent = !!blog.content;
  const paragraphs = [blog.desc1, blog.desc2, blog.desc3, blog.desc4, blog.desc5].filter(Boolean);
  const wordCount = hasRichContent
    ? blog.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
    : paragraphs.join(' ').split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  const relatedPosts = allBlogs.filter((b) => b.slug !== slug).slice(0, 3);

  const handleShare = (platform) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(blog.title)}`, '_blank');
    }
    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    }
    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // ── Render ──
  return (
    <div className="min-h-screen bg-white mt-40">
      <ReadingProgressBar articleRef={articleRef} />

      {/* Back navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center">
          <button
            onClick={() => router.push('/blog')}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} className='rounded-full' /> Back to Blog
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">

        {/* ── Hero text ── */}
        <div className="max-w-3xl">
          {blog.category && (
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#10A37F] mb-4">
              {blog.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] text-gray-900">
            {blog.title}
          </h1>

          {/* Mobile-only meta */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center text-[11px] font-bold text-gray-600 shrink-0">
                {blog.author?.[0]?.toUpperCase() ?? 'A'}
              </div>
              <span className="text-sm font-medium text-gray-800">{blog.author}</span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500 flex items-center gap-1.5">
              <Calendar size={13} /> {blog.date}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500 flex items-center gap-1.5">
              <Clock size={13} /> {readTime} min read
            </span>
          </div>
        </div>

        {/* ── Cover image ── */}
        <div className="relative mt-8 aspect-video rounded-2xl overflow-hidden">
          {blog.img ? (
            <Image
              src={blog.img}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1152px"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <FileText className="w-24 h-24 text-gray-300" />
            </div>
          )}
        </div>

        {/* ── Author sidebar + content ── */}
        <div ref={articleRef} className="mt-12 flex flex-col lg:flex-row gap-12 xl:gap-24 items-start">

          {/* Sticky sidebar — desktop only */}
          <aside className="hidden lg:flex flex-col gap-8 w-64 shrink-0 sticky top-40 self-start">
            <div className="group p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-linear-to-tr from-[#10A37F] to-[#0d8a6c] flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-inner">
                  {blog.author?.[0]?.toUpperCase() ?? 'A'}
                </div>
                <div>
                  <div className="text-[15px] font-bold text-gray-900 group-hover:text-[#10A37F] transition-colors">
                    {blog.author}
                  </div>
                  <div className="text-xs font-medium text-gray-400">Content Expert</div>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-gray-50 text-sm text-gray-500">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-gray-50 rounded-md">
                    <Calendar size={14} className="text-[#10A37F]" />
                  </div>
                  <span className="font-medium">{blog.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-gray-50 rounded-md">
                    <Clock size={14} className="text-[#10A37F]" />
                  </div>
                  <span className="font-medium">{readTime} min read</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Content ── */}
          <div className="flex-1 min-w-0">

            {hasRichContent ? (
              /* ── Rich HTML content (new blogs) ── */
              <div
                className="prose prose-lg max-w-none overflow-hidden
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                  prose-p:text-[17px] prose-p:text-gray-700 prose-p:leading-[1.8]
                  prose-a:text-[#10A37F] prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-4 prose-blockquote:border-[#10A37F] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                  prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-gray-800
                  prose-pre:bg-gray-900 prose-pre:text-gray-100
                  prose-img:rounded-xl prose-img:w-full
                  prose-ul:text-gray-700 prose-ol:text-gray-700
                  prose-li:text-[17px] prose-li:leading-[1.8]
                  first-letter:text-6xl first-letter:font-bold first-letter:text-[#10A37F]
                  first-letter:mr-3 first-letter:float-left first-letter:mt-1"
                dangerouslySetInnerHTML={{ __html: injectImagesIntoHtml(blog.content, blog.img2, blog.img3) }}
              />
            ) : (
              /* ── Legacy desc1-5 layout ── */
              <>
                {paragraphs[0] && (
                  <p className="text-[18px] md:text-[21px] text-gray-800 leading-[1.7] font-medium
                    first-letter:text-6xl first-letter:font-serif first-letter:text-[#10A37F]
                    first-letter:mr-3 first-letter:float-left first-letter:mt-1">
                    {paragraphs[0]}
                  </p>
                )}
                {paragraphs.length > 1 && (
                  <BlogContent paragraphs={paragraphs} blog={blog} from={1} />
                )}
              </>
            )}


            {/* ── Article footer: Share ── */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">Share Piece</p>
              <div className="flex gap-2">
                <button onClick={() => handleShare('twitter')} className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-[#1DA1F2] hover:text-white transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.713 5.857zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </button>
                <button onClick={() => handleShare('linkedin')} className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-[#0077b5] hover:text-white transition-all">
                  <Linkedin size={16} />
                </button>
                <button onClick={() => handleShare('copy')} className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-[#10A37F] hover:text-white transition-all">
                  {copied ? <Check size={16} /> : <Link2 size={16} />}
                </button>
              </div>
            </div>

            {/* End-of-article author strip */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 shrink-0">
                {blog.author?.[0]?.toUpperCase() ?? 'A'}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{blog.author}</div>
                <div className="text-xs text-gray-500">{blog.date} · {readTime} min read</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA banner ── */}
        <div className="mt-20 rounded-2xl bg-gray-50 border border-gray-100 px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Ready to get things done?</h3>
            <p className="mt-1 text-gray-500 text-sm">Find trusted local help in your neighborhood.</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="shrink-0 bg-black text-white text-sm font-semibold px-7 py-3 rounded-full hover:bg-[#10A37F] transition-colors duration-300"
          >
            Explore SAYZO →
          </button>
        </div>

        {/* ── Related posts ── */}
        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <div className="border-t border-gray-100 mb-12" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">More Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <BlogCard key={post.id} blog={post} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
