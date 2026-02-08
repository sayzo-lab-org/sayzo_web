'use client'
import { useState } from "react";
import { Plus } from "lucide-react";



const faqData = [
  {
    question: "How long does a typical carbon footprint assessment take?",
    answer: "A typical carbon footprint assessment takes between 4-8 weeks depending on the size and complexity of your organization. This includes data collection, analysis, and report generation with actionable recommendations.",
  },
  {
    question: "What industries do you work with?",
    answer: "We work across all major industries including manufacturing, technology, retail, healthcare, finance, and logistics. Our methodology is adaptable to any sector's specific needs and regulatory requirements.",
  },
  {
    question: "What if we already have some data or reports?",
    answer: "Existing data and reports are incredibly valuable! We'll review your current documentation to build upon your previous work, ensuring continuity and avoiding duplication of effort. This can often accelerate the assessment process.",
  },
  {
    question: "Do we even have the internal capability to pull this off?",
    answer: "You don't need extensive internal resources. Our team provides comprehensive support throughout the process. We work alongside your team, providing training and guidance while handling the heavy lifting of the assessment.",
  },
  {
    question: "What if the rules change or targets become impossible to meet?",
    answer: "We design flexible sustainability roadmaps that can adapt to evolving regulations. Our approach includes scenario planning and contingency strategies, ensuring your organization remains resilient regardless of policy changes.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-3xl mx-auto">
        {/* Badge */}
        {/* <div className="flex justify-center mb-8">
          <span className="faq-badge">FAQ</span>
        </div> */}

        {/* Heading */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-center text-foreground mb-6">
          Frequently asked questions
        </h2>

        {/* Subheading */}
        <p className="text-center text-muted-foreground text-lg mb-16 max-w-xl mx-auto font-body">
          Here are the top questions our clients ask before getting started.
        </p>

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full py-6 flex items-center justify-between text-left group transition-colors duration-200 "
              >
                <span className="font-body text-base sm:text-lg font-medium text-foreground pr-4 group-hover:text-primary transition-colors duration-200">
                  {item.question}
                </span>
                <div
                  className={`faq-icon-button bg-gray-100 border border-gray-200 p-2 rounded-full transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                >
                  <Plus className="w-5 h-5 text-foreground/70" />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-6 pr-16">
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
