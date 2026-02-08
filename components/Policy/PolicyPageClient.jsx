'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PolicyNavbar from "@/components/Policy/PolicyNavbar";
import PolicySidebar from "@/components/Policy/PolicySidebar";
import PolicyContent from "@/components/Policy/PolicyContent";
import { MOCK_DATA } from "@/public/data/policy";

const PolicyPageClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("usermanual");
  const [activeSidebarItem, setActiveSidebarItem] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const sectionsRef = useRef({});

  /* READ TAB FROM URL */
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && MOCK_DATA[tabFromUrl]) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const currentPageData = MOCK_DATA[activeTab];

  const changeTab = (id) => {
    setActiveTab(id);
    setActiveSidebarItem(null);

    const hasSidebar = MOCK_DATA[id]?.sidebar?.length > 0;
    setOpenDropdown(hasSidebar ? id : null);

    router.push(`?tab=${id}`, { scroll: false });
  };

  const handleSidebarItemClick = (id) => {
    sectionsRef.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setOpenDropdown(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSidebarItem(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <div className="min-h-screen max-w-350 mx-auto bg-background mt-35">
      <PolicyNavbar
        activeTab={activeTab}
        onTabChange={changeTab}
        openDropdown={openDropdown}
        onToggleDropdown={setOpenDropdown}
      />

      <div className="flex">
        <PolicySidebar
          items={currentPageData.sidebar}
          activeItem={activeSidebarItem}
          onItemClick={handleSidebarItemClick}
        />

        {openDropdown && (
          <PolicySidebar
            items={currentPageData.sidebar}
            activeItem={activeSidebarItem}
            onItemClick={handleSidebarItemClick}
            isMobileDropdown
            onClose={() => setOpenDropdown(null)}
          />
        )}

        <main className="flex-1 p-6 md:p-8 lg:p-12 xl:p-16">
          <PolicyContent
            content={currentPageData.content}
            sectionsRef={sectionsRef}
          />
        </main>
      </div>
    </div>
  );
};

export default PolicyPageClient;
