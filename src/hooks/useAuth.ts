import { useState } from "react";

const SESSION_KEY = "portfolio_admin";

export function useAuth() {
  const [authed, setAuthed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SESSION_KEY) === "true";
  });

  const login = (password: string): boolean => {
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!adminPass) {
      console.warn("VITE_ADMIN_PASSWORD not set in .env");
      return false;
    }

    if (password === adminPass) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setAuthed(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  return { authed, login, logout };
}