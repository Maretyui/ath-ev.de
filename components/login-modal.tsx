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
      style={{ background: "rgba(0, 0, 0, 0.8)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowLogin(false)
      }}
    >
      <div className="bg-white rounded-2xl p-10 shadow-2xl max-w-[400px] w-[90%]">
        <div className="text-center mb-8">
          <h2 className="text-[#4facfe] mb-2 text-2xl font-bold">Login</h2>
          <p className="text-[#555]">Verwaltung</p>
        </div>

        {error && (
          <div className="text-[#e74c3c] mb-4 p-3 bg-[#ffeaea] rounded-md border-l-4 border-[#e74c3c] text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-1 font-medium text-[#555] text-sm" htmlFor="login-email">
              E-Mail
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-base text-[#333] transition-colors focus:outline-none focus:border-[#4facfe]"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-1 font-medium text-[#555] text-sm" htmlFor="login-password">
              Passwort
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-base text-[#333] transition-colors focus:outline-none focus:border-[#4facfe]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-base text-white font-semibold cursor-pointer transition-all duration-300 btn-gradient hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 border-none"
          >
            {loading ? "Anmelden..." : "Anmelden"}
          </button>
        </form>
      </div>
    </div>
  )
}
