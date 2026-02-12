
import Link from "next/link";
import { getCategoryBySlug } from "@/public/data/categories";
import { ArrowLeft, ArrowRight, ChevronRight, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.name} Services | Explore Neighborhood Skills`,
    description: category.description,
    openGraph: {
      title: `${category.name} | SAYZO Neighborhood Economy`,
      description: category.description,
      url: `https://sayzo.in/category/${categorySlug}`,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return <div className="p-20 text-center">Category not found</div>;
  }

  return (
    <div>
      <div className="mt-30">
      {/* <MegaMenu/> */}
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-gray-300  max-w-335 mx-auto mt-40">
        <div className="container py-3 flex items-center gap-2 text-sm">
          <Link className="text-gray-400 cursor-pointer hover:text-gray-500" href="/">Home</Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-400 cursor-pointer hover:text-gray-500">{category.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className=" py-16 max-w-312 mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-8 text-gray-400 hover:text-gray-600 transition-colors "
        >
          <ArrowLeft className="h-4 w-4" />
          All Categories
        </Link>

        <h1 className="text-4xl font-bold">{category.name}</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {category.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" className="h-11.5 px-6 text-base font-semibold bg-primary-btn hover:bg-primary-btn/85 rounded-lg">
              <Plus className="h-4 w-3 mr-2" />
              Post a Task
            </Button>
            <Button variant="outline" size="lg" className="h-11.5 px-6 text-base rounded-l border-2 rounded-lg border-gray-200 hover:bg-gray-300/20 hover:border-primary-btn/20">
              <User className="h-4 w-3 mr-2" />
              Join Sayzo
            </Button>
          </div>
      </section>

      {/* Subcategories */}
      <section className="py-16 md:py-20 ">
        <div className="container  max-w-312 mx-auto">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Explore {category.name}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {category.subCategories.length} specialized areas to find help or offer your skills.
            </p>
          </div>
          

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {category.subCategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/category/${category.slug}/${sub.slug}`}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary-btn/40 hover:shadow-md transition-all duration-200"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary-btn transition-colors">
                  {sub.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {sub.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm text-primary-btn opacity-0 group-hover:opacity-100 transition-opacity">
                  View details
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
