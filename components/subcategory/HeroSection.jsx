'use client'
import { ArrowLeft, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import TaskModal from "../TaskModal";



const HeroSection = ({ category, subCategory }) => {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  
  return (
    <section className="border-b border-border ">
      <div className="container mx-auto max-w-310 mx-auto px-4 py-16 md:py-24 ">
        <Link
          href={`/category/${category.slug}`} 
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 font-light hover:text-gray-500 transition-colors mb-12"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {category.name}
        </Link>
        
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
            {subCategory.name}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            {subCategory.description}
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <Button   onClick={() => setIsTaskOpen(true)} size="lg" className="h-11.5 px-6 text-base font-semibold bg-primary-btn hover:bg-primary-btn/85 rounded-lg">
              <Plus className="h-4 w-3 mr-2" />
              Post a Task
            </Button>
            <Link href="https://chat.whatsapp.com/HEAgmwsxdJC02GqtW7T63j" target="black"> <Button variant="outline" size="lg" className="h-11.5 px-6 text-base rounded-l border-2 rounded-lg border-gray-200 hover:bg-gray-300/20 hover:border-primary-btn/20">
              <User className="h-4 w-3 mr-2" />
              Join Sayzo
            </Button></Link>
           
          </div>
        </div>
      </div>
      <TaskModal
        isOpen={isTaskOpen}
        onClose={() => setIsTaskOpen(false)}
      />
    </section>
  );
};

export default HeroSection;
