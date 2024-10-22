"use server";
import { verifyToken } from "@/app/server-actions/verifyToken";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function StyledLayout({ children }: LayoutProps) {
  await verifyToken();

  return <>{children}</>;
}
