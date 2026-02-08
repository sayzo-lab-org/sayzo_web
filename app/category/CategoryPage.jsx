import { useParams, Link } from "react-router-dom";
import { ChevronRight, ArrowLeft, Plus, User, ArrowRight } from "lucide-react";
import { getCategoryBySlug } from "@/public/data/categories";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const CategoryPage = () => {
  const { categorySlug } = useSearchParams();
  const category = getCategoryBySlug(categorySlug || "");

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        {/* <Header /> */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Category not found</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{category.name}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All Categories
          </Link>

          <div className="max-w-3xl">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              {category.name}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {category.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="gap-2 shadow-md">
                <Plus className="h-4 w-4" />
                Post a Task
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <User className="h-4 w-4" />
                Apply with My Skills
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Explore {category.name}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {category.subCategories.length} specialized areas to find help or offer your skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.subCategories.map((sub) => (
              <Link
                key={sub.slug}
                to={`/category/${category.slug}/${sub.slug}`}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {sub.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {sub.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
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
};

export default CategoryPage;
