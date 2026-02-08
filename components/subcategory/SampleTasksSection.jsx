import { Clock, IndianRupee } from "lucide-react";


const SampleTasksSection = ({ tasks, subCategoryName }) => {
  return (
    <section className=" bg-muted/30">
      <div className="container px-4  py-20 md:py-28 max-w-312 mx-auto">
        <div className="max-w-xl mb-16">
          <p className="text-sm font-semibold text-primary-btn uppercase tracking-wider mb-3">
            Examples
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Sample tasks
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Real examples of what people post in {subCategoryName}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks?.map((task, i) => (
            <article 
              key={i} 
              className="group bg-card rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="font-semibold text-foreground text-lg leading-snug group-hover:text-primary-btn transition-colors">
                {task.title}
              </h3>
              
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {task.description}
              </p>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <IndianRupee className="h-3.5 w-3.5 text-primary-btn" />
                  <span>{task.budgetRange.replace('₹', '').split(' - ')[0]}</span>
                  {task.isNegotiable && (
                    <span className="text-xs text-muted-foreground ml-1">(Negotiable)</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {task.duration}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {task.skillTags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 text-xs font-medium rounded bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SampleTasksSection;
