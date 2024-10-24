"use client";
import useCollapsed from "@/Hooks/useCollaped";
import useWindowSize from "@/Hooks/useGetWindowSize";
import React, { createContext, ReactNode, useContext, useMemo } from "react";

const AppContext = createContext<Contexts.AppContext | undefined>(undefined);

export const AppContextProvider: React.FC<{
  token?: string;
  children: ReactNode;
}> = ({ children, token: tokenCookieValue }) => {
  const [width] = useWindowSize();
  const collapsed = useMemo(() => width < 1260, [width]);

  return (
    <AppContext.Provider value={{ collapsed }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
};
