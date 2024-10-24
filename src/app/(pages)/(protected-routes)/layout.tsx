"use server";
import { verifyToken } from "@/app/server-actions/verifyToken";
import PageContainer from "@/Components/PageContainer";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({ children }: LayoutProps) {
  await verifyToken();

  return <PageContainer>{children}</PageContainer>;
}
