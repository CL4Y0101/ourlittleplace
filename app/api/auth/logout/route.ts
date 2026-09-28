import { NextResponse } from "next/server";
import { isSameOrigin } from "@/lib/auth/origin";
import { sessionCookieName } from "@/lib/auth/session";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookieName, "", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
