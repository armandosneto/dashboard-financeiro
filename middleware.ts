import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

export function middleware(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("JWT ", "");

  if (token) {
    const decoded = jwt.verify(token, secretKey as string);
    if (decoded) {
      return NextResponse.next();
    } else if (!token || token !== secretKey) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid or missing token" },
        { status: 401 }
      );
    }
  }
}

export const config = {
  matcher: "/api/:path*", // Define que o middleware será aplicado a todas as rotas da API
};
