
import React from 'react';

import { CATEGORY_STYLES } from '@/public/data/MARQUEE_DATA';

const Badge = ({ category }) => {
  const styleClass = CATEGORY_STYLES[category] || 'bg-gray-100 text-gray-400';
  
  return (
    <span className={`px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-tight ${styleClass}`}>
      {category}
    </span>
  );
};

export default Badge;
