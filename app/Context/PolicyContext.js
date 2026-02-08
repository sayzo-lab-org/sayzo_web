'use client'
import { createContext, useContext, useState } from "react";

const PolicyContext = createContext();

export const PolicyProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("usermanual");

  return (
    <PolicyContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </PolicyContext.Provider>
  );
};

export const usePolicy = () => useContext(PolicyContext);
