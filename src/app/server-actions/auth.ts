// app/server-actions/auth.ts
"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export async function handleLogin({
  username,
  password,
}: Contexts.AuthContext.LoginValues) {
  // Simulação de validação simples de credenciais
  if (username === "admin" && password === "password") {
    // Gerar o token JWT
    const token = jwt.sign({ username }, SECRET_KEY!, { expiresIn: "1h" });

    // Retornar o token e informações sobre sucesso
    cookies().set("token", token);
    return { success: true, token };
  } else {
    return { success: false, message: "Credenciais inválidas" };
  }
}
