"use client"

import React from "react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { LogIn, X, Waves } from "lucide-react"

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
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowLogin(false)
      }}
    >
      <div className="relative bg-white rounded-2xl p-8 max-w-[400px] w-[90%] shadow-2xl border border-slate-100">
        {/* Close button */}
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-400 mx-auto mb-4 flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Waves className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">
            Willkommen zurück
          </h2>
          <p className="text-sm text-slate-500">
            Melde dich im internen Bereich an
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-100 text-sm text-red-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-1.5 font-medium text-sm text-slate-700"
              htmlFor="login-email"
            >
              E-Mail
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base text-slate-800 bg-slate-50 transition-all focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              placeholder="deine@email.de"
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-1.5 font-medium text-sm text-slate-700"
              htmlFor="login-password"
            >
              Passwort
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base text-slate-800 bg-slate-50 transition-all focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              placeholder="Dein Passwort"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-base text-white font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-60 disabled:hover:translate-y-0 border-none bg-gradient-to-r from-cyan-500 to-teal-400 shadow-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Anmelden...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Anmelden
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
