import React from 'react';
import { ArrowUpRight } from 'lucide-react';



const ProblemCard=({ number, title, description }) => {
  return (
    <div className="problem-card group h-full">
      <div className="arrow-icon group-hover:bg-accent/20 transition-colors">
        <ArrowUpRight className="w-4 h-4 text-accent" />
      </div>
      
      <div className="problem-number">{number}</div>
      
      <h3 className="text-xs font-medium text-foreground mt-2 leading-tight">
        {title}
      </h3>
      
      <p className="problem-description text-xs">
        {description}
      </p>
    </div>
  );
};

export default ProblemCard;
