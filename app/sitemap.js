import { blogs } from "@/public/data/blogs";
import { categories } from "@/public/data/categories";

export default function sitemap() {
  const baseUrl = "https://sayzo.in";

  // 1️⃣ Static Routes
  const staticRoutes = [
    "",
    "/contact",
    "/blog",
    "/careers",
    "/policies",
    "/use-cases",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  // 2️⃣ Blog Routes → /blog/[slug]
  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.date),
  }));

  // 3️⃣ Category + SubCategory Routes
  const categoryRoutes = categories.flatMap((category) => {
    const mainCategory = {
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date(),
    };

    const subRoutes = category.subCategories.map((sub) => ({
      url: `${baseUrl}/category/${category.slug}/${sub.slug}`,
      lastModified: new Date(),
    }));

    return [mainCategory, ...subRoutes];
  });

  return [...staticRoutes, ...blogRoutes, ...categoryRoutes];
}
