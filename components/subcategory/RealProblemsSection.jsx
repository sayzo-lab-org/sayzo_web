import { ArrowRight } from "lucide-react";



const RealProblemsSection = ({ statements }) => {
  return (
    <section className="py-20 md:py-28  max-w-312 mx-auto">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mb-16">
          <p className="text-sm font-semibold text-primary-btn uppercase tracking-wider mb-3">
            Real needs
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
            What people come here for
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 ">
          {statements?.map((statement, i) => (
            <button
              key={i}
              className="group text-left py-6 border-b border-border hover:border-primary-btn transition-colors"
            >
              <p className="text-lg text-foreground leading-relaxed group-hover:text-primary-btn transition-colors">
                "{statement}"
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary-btn transition-colors">
                Get help in 10 minutes
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealProblemsSection;
