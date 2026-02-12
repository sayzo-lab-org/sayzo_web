import BlogDetails from '@/components/Blog/BlogDetails'; 
import { blogs } from '@/public/data/blogs';


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | SAYZO`,
    description: blog.desc1.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.desc1.substring(0, 160),
      images: [{ url: blog.img }],
      type: "article",
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <BlogDetails slug={slug} />;
}