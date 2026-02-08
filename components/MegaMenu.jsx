'use client'
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Flame } from "lucide-react";
import { categories } from "@/public/data/categories";
import Link from "next/link";

const MegaMenu = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navRef = useRef(null);
  const scrollRef = useRef(null);
  const dropdownRef = useRef(null);
  const itemRefs = useRef({});
  const timeoutRef = useRef(null);

  /* ================= DEVICE CHECK ================= */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ================= DESKTOP HOVER ================= */
  const handleMouseEnter = (slug) => {
    if (isMobile) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const item = itemRefs.current[slug];
    const nav = navRef.current;

    if (item && nav) {
      const itemRect = item.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();

      setDropdownStyle({
        left: itemRect.left - navRect.left,
      });
    }

    setActiveCategory(slug);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;

    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 150);
  };

  /* ================= MOBILE CLICK ================= */
  const handleClick = (slug) => {
    if (!isMobile) return;

    if (activeCategory === slug) {
      setActiveCategory(null);
    } else {
      setActiveCategory(slug);
      setDropdownStyle({ left: 0 });
    }
  };

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    if (!activeCategory) return;

    const handler = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setActiveCategory(null);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [activeCategory]);

  /* ================= SCROLL LOGIC ================= */
  const updateChevrons = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    updateChevrons();
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  // Find active category data
  const activeCategoryData = categories.find(c => c.slug === activeCategory);

  /* ==================================================== */
  return (
    <div className="relative border-b border-border">
      <nav ref={navRef} className="max-w-350 mx-auto relative">
        {/* LEFT CHEVRON */}
        {showLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-20 px-2 bg-gradient-to-r from-background to-transparent"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
        )}

        {/* CATEGORY SCROLLER */}
        <div
          ref={scrollRef}
          onScroll={updateChevrons}
          className="flex items-center gap-0.5 px-4 overflow-x-auto scrollbar-hide"
        >
          {categories.map((category) => (
            <div
              key={category.slug}
              ref={(el) => (itemRefs.current[category.slug] = el)}
              className="relative"
              onMouseEnter={() => handleMouseEnter(category.slug)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleClick(category.slug)}
                className={`flex items-center gap-1.5 px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category.slug
                    ? "text-primary-btn"
                    : "text-foreground hover:text-primary-btn"
                }`}
              >
                {category.slug === "trending" && (
                  <Flame className="w-4 h-4 text-accent" />
                )}
                {category.name}
              </button>

              {/* Active indicator */}
              <div
                className={`absolute bottom-0 left-4 right-4 h-0.5 bg-primary-btn transition-transform origin-left ${
                  activeCategory === category.slug ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* RIGHT CHEVRON */}
        {showRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-20 px-2 bg-gradient-to-l from-background to-transparent"
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </nav>

      {/* DROPDOWN */}
      {activeCategory && activeCategoryData && (
        <div
          ref={dropdownRef}
          className={`absolute top-full z-50 ${isMobile ? "left-0 right-0 px-4" : ""}`}
          style={!isMobile ? { left: dropdownStyle.left } : undefined}
          onMouseEnter={() => handleMouseEnter(activeCategory)}
          onMouseLeave={handleMouseLeave}
        >
        <div className={`bg-card rounded-xl shadow-elevated border border-border p-4 max-h-[70vh] overflow-y-auto scrollbar-hide ${
          isMobile ? "min-w-[280px]" : "min-w-[500px] max-w-[700px]"
        }`}>
            {/* MOBILE CLOSE */}
            {isMobile && (
              <button
                onClick={() => setActiveCategory(null)}
                className="absolute top-3 right-7 p-1.5 rounded-md hover:bg-muted"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            )}

            {/* Horizontal grid on desktop, vertical list on mobile */}
            <div className={`${
              isMobile 
                ? "grid grid-cols-1 gap-0.5" 
                : "grid grid-cols-2 lg:grid-cols-3 gap-1"
            }`}>
              {activeCategoryData.subCategories.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/category/${activeCategoryData.slug}/${sub.slug}`}
                  onClick={() => setActiveCategory(null)}
                  className="px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;