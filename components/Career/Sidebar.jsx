
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

      <div className="mt-4 px-6">
        <p className="text-[#6b7280] text-[13px] leading-relaxed mb-6">
          We are always seeking talented people. In case you cannot find your desired position here, please send us your LinkedIn profile and give us your contact information. We will be in touch.
        </p>
        <button className="w-full py-2.5 px-4 rounded-full border border-[#374151] text-[#111827] font-medium hover:bg-gray-100 transition-colors text-[13px] whitespace-nowrap">
          Share your LinkedIn profile
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
