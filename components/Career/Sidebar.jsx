
const Sidebar = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <aside className="w-full lg:w-64 flex flex-col gap-8 shrink-0">
      <nav className="flex flex-col">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => onCategoryChange(cat.name)}
              className={`w-full text-left px-6 py-4 transition-all border-l-4 text-lg ${
                isActive 
                  ? 'bg-white border-[#13a884] text-[#111827] font-medium ' 
                  : 'border-transparent text-[#4b5563] hover:text-[#111827] font-normal'
              }`}
            >
              {cat.name === 'All' ? `All positions (${cat.count})` : `${cat.name} (${cat.count})`}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
