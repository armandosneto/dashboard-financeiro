"use client";
import React from "react";
import { StyleProvider } from "@ant-design/cssinjs";
import { AuthContextProvider } from "@/Contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function StyledLayout({ children }: LayoutProps) {
  return (
    <StyleProvider layer>
      <AuthContextProvider>{children}</AuthContextProvider>
    </StyleProvider>
  );
}
