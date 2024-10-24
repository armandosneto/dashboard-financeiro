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

const AuthContext = createContext<Contexts.AuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC<{
  token?: string;
  children: ReactNode;
}> = ({ children, token: tokenCookieValue }) => {
  const [token, setToken] = useState<string | undefined>(tokenCookieValue);

  const signIn = useCallback(async (data: Contexts.AuthContext.LoginValues) => {
    const result = await handleLogin(data);
    if (result.success) {
      setToken(result.token);
    }
    return result;
  }, []);

  const logout = useCallback(async () => {
    await deleteAuthCookie();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
