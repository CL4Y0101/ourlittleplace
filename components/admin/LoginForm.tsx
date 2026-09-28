"use client";

import { useState } from "react";
import { inMemoryPersistence, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client";

export function LoginForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const data = new FormData(event.currentTarget);
    let auth: ReturnType<typeof getClientAuth> | undefined;
    try {
      auth = getClientAuth();
      await setPersistence(auth, inMemoryPersistence);
      const result = await signInWithEmailAndPassword(auth, String(data.get("email")), String(data.get("password")));
      const response = await fetch("/api/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken: await result.user.getIdToken() }), cache: "no-store" });
      if (!response.ok) throw new Error("Session rejected");
      await signOut(auth).catch(() => {});
      // A document navigation makes the server recheck the new cookie.
      window.location.replace(new URL("/admin", window.location.origin).href);
    } catch {
      setError("Unable to sign in. Check your credentials and try again.");
      if (auth) await signOut(auth).catch(() => {});
    } finally {
      setBusy(false);
    }
  }

  return <form className="admin-form" onSubmit={submit}><label>Email<input name="email" type="email" autoComplete="username" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label>{error && <p role="alert">{error}</p>}<button type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button></form>;
}
