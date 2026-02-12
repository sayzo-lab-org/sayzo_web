import { ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "@/public/data/policy";

import {MOCK_DATA} from "@/public/data/policy"

const PolicyNavbar = ({ activeTab, onTabChange,openDropdown,nonToggleDropdown}) => {
  // const { activeTab, setActiveTab } = usePolicy();
  return (
    <nav
      className="md:border-b md:border-border bg-background sticky top-25 z-40  overflow-x-auto
          no-scrollbar
          scroll-smooth"
    >
      <div className="mx-auto px-4">
        {/* DESKTOP */}
        <div className="hidden md:flex items-center  mt-5 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`px-4 py-4 text-sm font-medium whitespace-nowrap relative ${
                activeTab === item.id
                  ? "text-primary-btn"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary-btn rounded-t-sm" />
              )}
            </button>
          ))}
        </div>

      
        {/* MOBILE */}
<div className="md:hidden flex gap-2 px-2 py-3 mt-5 overflow-x-auto scrollbar-hide">
  {NAV_ITEMS.map((item) => {
    const hasSidebar = MOCK_DATA[item.id]?.sidebar?.length > 0;

    return (
      <button
        key={item.id}
        onClick={() => {
          onTabChange(item.id);
        
          const hasSidebar = MOCK_DATA[item.id]?.sidebar?.length > 0;
          onToggleDropdown(hasSidebar ? item.id : null);
        }}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap ${
          activeTab === item.id
            ? "bg-primary-btn/10 text-primary-btn border-primary-btn/20"
            : "bg-background text-muted-foreground border-border"
        }`}
      >
        {item.label}

        {hasSidebar && (
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${
              openDropdown === item.id ? "rotate-180" : ""
            }`}
          />
        )}
      </button>
    );
  })}
</div>

      </div>
    </nav>
  );
};

export default PolicyNavbar;
