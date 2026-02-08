import { Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-background leading-tight">
          Ready to get started?
        </h2>
        <p className="mt-4 text-background/70 text-lg max-w-lg mx-auto">
          Whether you need help or have skills to offer, SAYZO connects you with the right people.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary" className="h-12 px-6 text-base">
            <Plus className="h-4 w-4 mr-2" />
            Post a Task
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="h-12 px-6 text-base bg-transparent border-background/30 text-background hover:bg-background/10"
          >
            <User className="h-4 w-4 mr-2" />
            Apply with Skills
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
