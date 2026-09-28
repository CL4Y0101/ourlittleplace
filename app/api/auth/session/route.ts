import { NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebase/admin";
import { isSameOrigin } from "@/lib/auth/origin";
import { sessionCookieName, sessionDurationMs } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const auth = getAdminAuth();
  const db = getAdminDb();
  if (!auth || !db) return NextResponse.json({ error: "Sign-in is unavailable" }, { status: 503 });
  let idToken: unknown;
  try { idToken = (await request.json()).idToken; } catch { /* Invalid input. */ }
  if (typeof idToken !== "string" || !idToken || idToken.length > 10000) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  try {
    const decoded = await auth.verifyIdToken(idToken, true);
    if (!decoded.auth_time || Date.now() / 1000 - decoded.auth_time > 5 * 60) return NextResponse.json({ error: "Please sign in again" }, { status: 401 });
    const admin = await db.collection("admins").doc(decoded.uid).get();
    if (admin.data()?.active !== true) return NextResponse.json({ error: "Access denied" }, { status: 403 });
    const session = await auth.createSessionCookie(idToken, { expiresIn: sessionDurationMs });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(sessionCookieName, session, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: sessionDurationMs / 1000 });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to sign in" }, { status: 401 });
  }
}
