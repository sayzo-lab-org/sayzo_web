import { X } from "lucide-react";

const ExpectationsSection = () => {
  const expectations = [
    { 
      title: "Not a job portal", 
      description: "No lengthy applications or resume uploads" 
    },
    { 
      title: "No resume shortlisting", 
      description: "Your skills matter, not past job titles" 
    },
    { 
      title: "No bidding wars", 
      description: "Matched on skill fit, not lowest price" 
    },
  ];

  return (
    <section className="py-20 md:py-28 max-w-312 mx-auto">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mb-16">
          <p className="text-sm font-medium text-primary-btn uppercase tracking-wider mb-3">
            Clear expectations
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#181F25] leading-tight">
            What NOT to expect
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            SAYZO is different by design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expectations.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <X className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-[#181F25]">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpectationsSection;
