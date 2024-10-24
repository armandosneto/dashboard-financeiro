"use client";
import { handleLogin } from "@/app/server-actions/auth";
import { logout as deleteAuthCookie } from "@/app/server-actions/logout";
import useCollapsed from "@/Hooks/useCollaped";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

const AppContext = createContext<Contexts.AppContext | undefined>(undefined);

export const AppContextProvider: React.FC<{
  token?: string;
  children: ReactNode;
}> = ({ children, token: tokenCookieValue }) => {
  const collapsed = useCollapsed();

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
