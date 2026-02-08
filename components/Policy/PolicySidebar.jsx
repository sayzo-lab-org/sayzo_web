import React from 'react';

const PolicySidebar = ({
  items,
  activeItem,
  onItemClick,
  isMobileDropdown,
  onClose,
}) => {
  const handleItemClick = (id) => {
    if (!id) return;
    onItemClick(id);
    if (onClose) onClose();
  };

  const content = (
    <div className="flex flex-col py-4">
      {items.map((item, idx) => {
        /* =======================
           GRAY DIVIDER
        ======================= */
        if (item.type === 'divider') {
          return (
            <div
              key={`divider-${idx}`}
              className="my-4 mx-6 border-t border-gray-300"
            />
          );
        }

        /* =======================
           SECTION HEADER
        ======================= */
        if (item.isHeader) {
          return (
            <h3
              key={`header-${idx}`}
              className="px-6 py-2 mt-4 text-sm font-medium text-primary-btn first:mt-0"
            >
              {item.label}
              <div className="mt-2 w-8 h-0.5 bg-primary-btn rounded-full" />
            </h3>
          );
        }

        /* =======================
           NORMAL ITEM
        ======================= */
        return (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`px-6 py-2.5 text-sm text-left transition-colors border-l-2 ${
              activeItem === item.id
                ? 'text-foreground font-medium border-primary-btn bg-primary-btn/5'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border-transparent'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );

  /* =======================
     MOBILE DROPDOWN
  ======================= */
  if (isMobileDropdown) {
    return (
      <div className="md:hidden fixed inset-0 z-40">
        <div
          className="fixed inset-0"
          onClick={onClose}
        />
        <div className="fixed top-50 left-4 right-4 max-h-[70vh] bg-background rounded-2xl shadow-2xl z-50 overflow-hidden border border-border animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="overflow-y-auto max-h-[70vh]">
            {content}
          </div>
        </div>
      </div>
    );
  }

  /* =======================
     DESKTOP / TABLET
  ======================= */
  return (
    <aside className="hidden md:block w-56 lg:w-64 xl:w-72 h-[calc(100vh-57px)] sticky top-40 border-r border-border overflow-y-auto bg-background shrink-0">
      {content}
    </aside>
  );
};

export default PolicySidebar;
