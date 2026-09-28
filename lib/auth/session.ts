import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAuth, getAdminDb } from "@/lib/firebase/admin";

export const sessionCookieName = "our_little_place_session";
export const sessionDurationMs = 5 * 24 * 60 * 60 * 1000;

export async function getSessionUser() {
  const token = (await cookies()).get(sessionCookieName)?.value;
  const auth = getAdminAuth();
  const db = getAdminDb();
  if (!token || !auth || !db) return null;
  try {
    const decoded = await auth.verifySessionCookie(token, true);
    const admin = await db.collection("admins").doc(decoded.uid).get();
    if (admin.data()?.active !== true) return null;
    return { uid: decoded.uid, email: decoded.email ?? "Administrator" };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return user;
}
