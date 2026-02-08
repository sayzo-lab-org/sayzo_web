'use client';

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import SmallHeader from "@/components/SmallHeader";
import Header2 from "./Header2";
import HeaderSearch from "./AllHeader/Header3";

const HeaderWrapper = () => {
  const pathname = usePathname();

  if (pathname === "/why-sayzo") return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[999]">
      <SmallHeader />
      <Header/>
      {/* <Header2 /> */}
      {/* <HeaderSearch/> */}
    </div>
  );
};

export default HeaderWrapper;