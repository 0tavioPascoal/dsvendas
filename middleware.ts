import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; 

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  if (path === "/login") {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
