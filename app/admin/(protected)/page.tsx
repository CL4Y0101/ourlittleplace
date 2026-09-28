import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminDb } from "@/lib/firebase/admin";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const metadata: Metadata = { title: "Admin | Our Little Place", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const user = await requireAdmin();
  const db = getAdminDb();
  return <main id="main" className="page-shell admin-page"><div className="admin-panel"><span className="eyebrow">OUR LITTLE PLACE</span><h1>admin.</h1><p>Signed in as {user.email}</p><p>Firebase: Connected<br />Firestore: {db ? "Connected" : "Unavailable"}<br />Authorization: Admin</p><LogoutButton /></div></main>;
}
