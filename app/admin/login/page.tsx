import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Admin sign in | Our Little Place", robots: { index: false, follow: false } };

export default function LoginPage() {
  return <main id="main" className="page-shell admin-page"><div className="admin-panel"><span className="eyebrow">OUR LITTLE PLACE</span><h1>admin sign in.</h1><LoginForm /></div></main>;
}
