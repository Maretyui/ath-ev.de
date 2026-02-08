"use client"

import React from "react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

export function LoginModal() {
  const { showLogin, setShowLogin, login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (!showLogin) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password)
      setEmail("")
      setPassword("")
      setShowLogin(false)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Anmeldung fehlgeschlagen")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      style={{ background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowLogin(false)
      }}
    >
      <div
        className="rounded-2xl p-10 max-w-[420px] w-[90%] border"
        style={{
          backgroundColor: "var(--bg-tertiary)",
          borderColor: "var(--border-color)",
          boxShadow: "var(--shadow-l)",
        }}
      >
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: "var(--blue-accent)" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Anmelden
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Interner Bereich - Verwaltung
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border-l-4 border-red-500 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              className="block mb-1.5 font-medium text-sm"
              htmlFor="login-email"
              style={{ color: "var(--text-secondary)" }}
            >
              E-Mail
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 rounded-lg text-base transition-colors focus:outline-none"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-teaser)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-1.5 font-medium text-sm"
              htmlFor="login-password"
              style={{ color: "var(--text-secondary)" }}
            >
              Passwort
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 rounded-lg text-base transition-colors focus:outline-none"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-teaser)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-base text-white font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 border-none"
            style={{ backgroundColor: "var(--blue-accent)", boxShadow: "var(--shadow-m)" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-l)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-m)")}
          >
            {loading ? "Anmelden..." : "Anmelden"}
          </button>
        </form>
      </div>
    </div>
  )
}
