import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function StyledLayout({ children }: LayoutProps) {
  const verifyToken = () => {
    const token = cookies().get("token");
    if (!token) {
      redirect("/");
    }
  };

  verifyToken();

  return <>{children}</>;
}
