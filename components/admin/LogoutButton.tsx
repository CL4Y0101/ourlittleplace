"use client";

import { useState } from "react";

export function LogoutButton() {
  const [busy, setBusy] = useState(false);
  async function logout() {
    setBusy(true);
    try {
      const response = await fetch("/api/auth/logout", { method: "POST", cache: "no-store" });
      if (!response.ok) throw new Error("Logout failed");
      // Discard any client router state containing protected content.
      window.location.replace(new URL("/admin/login", window.location.origin).href);
    } catch {
      setBusy(false);
    }
  }
  return <button className="admin-button" type="button" disabled={busy} onClick={logout}>{busy ? "Signing out…" : "Sign out"}</button>;
}
