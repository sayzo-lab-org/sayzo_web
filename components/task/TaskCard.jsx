import { Clock, IndianRupee } from "lucide-react";


const TaskCard = ({ task }) => {
  return (
    <div className="group bg-card rounded-xl border border-border p-5 hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-pointer h-full flex flex-col">
      {/* Title */}
      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
        {task.title}
      </h3>
      
      {/* Description */}
      <p className="mt-3 text-sm text-muted-foreground line-clamp-3 flex-1">
        {task.description}
      </p>

      {/* Meta Info */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-sm">
          <IndianRupee className="h-3.5 w-3.5 text-success" />
          <span className="font-medium text-foreground">{task.budgetRange.replace('₹', '').split(' - ')[0]}</span>
          {task.isNegotiable && (
            <span className="text-xs text-muted-foreground ml-1">(Negotiable)</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{task.duration}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {task.skillTags.slice(0, 3).map((tag) => (
          <span 
            key={tag} 
            className="px-2 py-0.5 text-xs font-medium rounded-md bg-muted text-muted-foreground"
          >
            {tag}
          </span>
        ))}
        {task.skillTags.length > 3 && (
          <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-muted text-muted-foreground">
            +{task.skillTags.length - 3}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
