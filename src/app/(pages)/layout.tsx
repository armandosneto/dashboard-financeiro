"use client";
import React from "react";
import { StyleProvider } from "@ant-design/cssinjs";

interface LayoutProps {
  children: React.ReactNode;
}

export default function StyledLayout({ children }: LayoutProps) {
  return <StyleProvider layer>{children}</StyleProvider>;
}
