"use client";

import { createContext, useContext, useState } from "react";

const RoleContext = createContext({ role: "giver", setRole: () => {} });

export function RoleProvider({ children }) {
  const [role, setRole] = useState("giver");
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
