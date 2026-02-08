import { Link } from "react-router-dom";
import { ChevronRight, Sparkles, TrendingUp, Code, Palette, Video, PenTool, Briefcase, Database, Building, Camera, Bot } from "lucide-react";


const iconMap = {
  Sparkles,
  TrendingUp,
  Code,
  Palette,
  Video,
  PenTool,
  Briefcase,
  Database,
  Building,
  Camera,
  Bot,
};



const CategoryCard = ({ category }) => {
  const IconComponent = iconMap[category.icon] || Sparkles;

  return (
    <Link
      to={`/category/${category.slug}`}
      className="group block bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-card transition-all duration-200"
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
        <IconComponent className="h-6 w-6 text-white" />
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
        {category.name}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
        {category.description}
      </p>

      {/* Subcategories Preview */}
      <div className="mt-4 flex flex-wrap gap-2">
        {category.subCategories.slice(0, 3).map((sub) => (
          <span
            key={sub.slug}
            className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
          >
            {sub.name}
          </span>
        ))}
        {category.subCategories.length > 3 && (
          <span className="text-xs text-primary font-medium">
            +{category.subCategories.length - 3} more
          </span>
        )}
      </div>

      {/* Arrow */}
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Explore</span>
        <ChevronRight className="h-4 w-4" />
      </div>
    </Link>
  );
};

export default CategoryCard;
