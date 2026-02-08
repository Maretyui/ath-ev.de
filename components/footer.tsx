"use client"

import { useAuth } from "@/lib/auth-context"

export function Footer() {
  const { user, setShowLogin } = useAuth()

  return (
    <footer
      className="h-[50px] border-t flex items-center justify-center transition-colors duration-300"
      style={{
        borderColor: "var(--text-tertiary)",
        backgroundColor: "var(--bg-tertiary)",
        color: "var(--text-tertiary)",
      }}
    >
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Aquanautic-Taucher Hamburg e.V. - Alle Rechte vorbehalten
      </p>
      {!user && (
        <button
          onClick={() => setShowLogin(true)}
          className="ml-auto bg-transparent border-none text-xl cursor-pointer px-3 transition-colors duration-300 hover:underline"
          style={{ color: "var(--text-primary)" }}
        >
          Login
        </button>
      )}
    </footer>
  )
}
