"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const verifyToken = async () => {
  const token = cookies().get("token");
  if (!token) {
    redirect("/");
  }
  return token;
};
