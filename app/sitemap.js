import { getPublishedBlogs } from "@/lib/firebase";
import { categories } from "@/public/data/categories";

export default async function sitemap() {
  const baseUrl = "https://sayzo.net";

  const staticRoutes = [
    { path: "", priority: 1.0, changefreq: "daily" },
    { path: "/contact", priority: 0.5, changefreq: "monthly" },
    { path: "/blog", priority: 0.8, changefreq: "daily" },
    { path: "/careers", priority: 0.5, changefreq: "monthly" },
    { path: "/policies", priority: 0.3, changefreq: "monthly" },
    { path: "/use-cases", priority: 0.7, changefreq: "monthly" },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));

  let blogRoutes = [];
  try {
    const blogs = await getPublishedBlogs();
    blogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    // silently skip blog routes if Firebase is unavailable during build
  }

  const categoryRoutes = categories.flatMap((category) => {
    const mainCategory = {
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
    };

    const subRoutes = category.subCategories.map((sub) => ({
      url: `${baseUrl}/category/${category.slug}/${sub.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    return [mainCategory, ...subRoutes];
  });

  return [...staticRoutes, ...blogRoutes, ...categoryRoutes];
}
