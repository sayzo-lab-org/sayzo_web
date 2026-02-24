import { categories } from "./categories.js";

// Generate marquee items from all subcategories
const generateMarqueeItems = () => {
  const allItems = [];

  categories.forEach((category) => {
    category.subCategories?.forEach((subCategory) => {
      if (subCategory.realTaskStatements && subCategory.realTaskStatements.length > 0) {
        allItems.push({
          text: subCategory.realTaskStatements[0],
          category: category.name,
        });
      }
    });
  });

  return allItems;
};

// Seeded random for deterministic shuffle (avoids hydration mismatch)
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Distribute items across 3 rows with deterministic shuffle
const distributeIntoRows = (items) => {
  const shuffled = [...items].map((item, i) => ({ item, sort: seededRandom(i + 1) }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

  const rowCount = 3;
  const rows = [[], [], []];

  shuffled.forEach((item, index) => {
    const rowIndex = index % rowCount;
    rows[rowIndex].push({
      id: `${rowIndex + 1}-${rows[rowIndex].length + 1}`,
      ...item,
    });
  });

  return rows;
};

const allItems = generateMarqueeItems();
export const MARQUEE_DATA = distributeIntoRows(allItems);

export const CATEGORY_STYLES = {
  "Personal Growth": "bg-[#10a37f] text-white",
  "Consulting": "bg-[#10a37f] text-white",
  "Data": "bg-[#10a37f] text-white",
  "Photography": "bg-[#10a37f] text-white",
  "Graphics & Design": "bg-[#10a37f] text-white",
  "Programming & Tech": "bg-[#10a37f] text-white",
  "Digital Marketing": "bg-[#10a37f] text-white",
  "Video & Animation": "bg-[#10a37f] text-white",
  "Writing & Translation": "bg-[#10a37f] text-white",
  "Music & Audio": "bg-[#10a37f] text-white",
  "Business": "bg-[#10a37f] text-white",
  "Finance": "bg-[#10a37f] text-white",
  "AI Services": "bg-[#10a37f] text-white",
  "Ask Doubts": "bg-[#10a37f] text-white",
  "Local Services": "bg-[#10a37f] text-white",
  "Events & Experiences": "bg-[#10a37f] text-white",
  "Execution & Management": "bg-[#10a37f] text-white",
  "Assembly & Setup (Basic)": "bg-[#10a37f] text-white",
  "Tech Help (Non-Professional)": "bg-[#10a37f] text-white",
};
