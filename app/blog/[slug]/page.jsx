import BlogDetails from '@/components/Blog/BlogDetails';
import { getBlogBySlug } from '@/lib/firebase';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const blog = await getBlogBySlug(slug);
    if (!blog) return { title: 'Blog Not Found' };

    const description = blog.content
      ? blog.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 160)
      : (blog.desc1 || '').substring(0, 160);

    return {
      title: `${blog.title} | SAYZO`,
      description,
      openGraph: {
        title: blog.title,
        description,
        images: blog.img ? [{ url: blog.img }] : [],
        type: 'article',
      },
    };
  } catch {
    return { title: 'Blog Not Found' };
  }
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <BlogDetails slug={slug} />;
}
