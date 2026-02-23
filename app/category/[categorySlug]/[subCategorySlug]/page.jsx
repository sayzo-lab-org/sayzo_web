import { getCategoryBySlug } from "@/public/data/categories";
import HeroSection from "@/components/subcategory/HeroSection";
import ExpectationsSection from "@/components/subcategory/ExpectationsSection";
import RealProblemsSection from "@/components/subcategory/RealProblemsSection";
import SampleTasksSection from "@/components/subcategory/SampleTasksSection";
import SkillsSection from "@/components/subcategory/SkillsSection";

import Link from "next/link";
import { ChevronRight } from "lucide-react";


export async function generateMetadata({ params }) {
  const { categorySlug, subCategorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const subCategory = category?.subCategories.find((s) => s.slug === subCategorySlug);

  if (!category || !subCategory) {
    return { title: "Page Not Found | SAYZO" };
  }

  const title = `Need ${subCategory.name} Help? | ${category.name} Experts Near You`;
  const description = `Looking for ${subCategory.name.toLowerCase()} help? Connect with skilled locals, get quotes fast, and hire trusted experts in your neighborhood today.`;

  return {
    title,
    description,
    openGraph: {
      title: `${subCategory.name} Services | Find Local ${category.name} Experts`,
      description,
      url: `https://sayzo.in/category/${categorySlug}/${subCategorySlug}`,
      type: 'website',
    },
    twitter: {
      card: "summary_large_image",
      title: `${subCategory.name} Help Near You`,
      description: `Find trusted ${subCategory.name.toLowerCase()} experts in your area on SAYZO.`,
    },
  };
}

export default async function SubCategoryPage({ params }) {
  const { categorySlug, subCategorySlug } =await  params;

  const category = getCategoryBySlug(categorySlug);
  const subCategory = category?.subCategories.find(
    (s) => s.slug === subCategorySlug
  );

  if (!category || !subCategory) {
    return <div className="p-20 text-center">Page not found</div>;
  }

  return (
    <div className="mt-26" >
      {/* <Header2/> */}
      {/* <div className="">
      <MegaMenu/>
      </div> */}
         {/* Breadcrumb */}
        {/* Breadcrumb */}
<div className="border-b border-border max-w-340 mx-auto mt-40">
  <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
    
    {/* Home */}
    <Link href="/" className="hover:text-foreground transition-colors">
      Home
    </Link>

    <ChevronRight className="h-4 w-4" />

    {/* Category */}
    <Link
      href={`/category/${category.slug}`}
      className="hover:text-foreground transition-colors"
    >
      {category.name}
    </Link>

    <ChevronRight className="h-4 w-4" />

    {/* Subcategory (current page) */}
    <span className="text-foreground font-medium">
      {subCategory.name}
    </span>
  </div>
</div>


      <HeroSection category={category} subCategory={subCategory} />
     
      <RealProblemsSection statements={subCategory.realTaskStatements} />
      
      <SkillsSection
        coreSkills={subCategory.coreSkills}
        supportingSkills={subCategory.supportingSkills}
      />
      <SampleTasksSection
        tasks={subCategory.taskExamples}
        subCategoryName={subCategory.name}
      />
      {/* <CTASection /> */}
      <ExpectationsSection />
    </div>
  );
}
