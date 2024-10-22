"use client";
import { handleLogin } from "@/app/server-actions/auth";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
} from "react";

const AuthContext = createContext<Contexts.AuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const signIn = useCallback(async (data: Contexts.AuthContext.LoginValues) => {
    const result = await handleLogin(data);
    return result;
  }, []);

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
