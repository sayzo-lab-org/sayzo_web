"use client";

import { useState } from "react";
import FAQItem from "./FAQItem";
import { faqData } from "@/public/data/faqData";

const FAQList = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {faqData.map((item, index) => (
        <FAQItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        />
      ))}
    </div>
  );
};

export default FAQList;
