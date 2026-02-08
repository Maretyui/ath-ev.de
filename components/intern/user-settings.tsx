"use client"

import React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

export function UserSettings() {
  const { user, logout } = useAuth()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwörter stimmen nicht überein" })
      return
    }

    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "Passwort muss mindestens 6 Zeichen lang sein" })
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error)
      }
      setMessage({ type: "success", text: "Passwort erfolgreich geändert" })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: unknown) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Fehler beim Ändern des Passworts" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-accent)" }}>
        Einstellungen
      </h2>

      {/* Account Info */}
      <div
        className="rounded-xl border p-6 mb-8"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Kontoinformationen
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium w-20" style={{ color: "var(--text-secondary)" }}>
              E-Mail:
            </span>
            <span style={{ color: "var(--text-primary)" }}>{user?.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium w-20" style={{ color: "var(--text-secondary)" }}>
              Rolle:
            </span>
            <span
              className={`
                px-3 py-1 rounded-full text-xs font-bold
                ${user?.role === "manager" ? "bg-purple-600 text-white" : ""}
                ${user?.role === "admin" ? "bg-blue-600 text-white" : ""}
                ${user?.role === "user" ? "bg-gray-600 text-white" : ""}
              `}
            >
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div
        className="rounded-xl border p-6 mb-8"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Passwort ändern
        </h3>

        {message && (
          <div
            className={`mb-4 p-3 rounded-md border-l-4 text-sm ${
              message.type === "success"
                ? "text-green-600 bg-green-50 border-green-600"
                : "text-[#e74c3c] bg-[#ffeaea] border-[#e74c3c]"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-sm" style={{ color: "var(--text-secondary)" }}>
              Aktuelles Passwort
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-base border-2 transition-colors focus:outline-none focus:border-[var(--blue-accent)]"
              style={{
                backgroundColor: "var(--bg-teaser)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm" style={{ color: "var(--text-secondary)" }}>
              Neues Passwort
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-base border-2 transition-colors focus:outline-none focus:border-[var(--blue-accent)]"
              style={{
                backgroundColor: "var(--bg-teaser)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm" style={{ color: "var(--text-secondary)" }}>
              Neues Passwort bestätigen
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-base border-2 transition-colors focus:outline-none focus:border-[var(--blue-accent)]"
              style={{
                backgroundColor: "var(--bg-teaser)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-gradient px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
          >
            {loading ? "Speichern..." : "Passwort ändern"}
          </button>
        </form>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="btn-gradient-red px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        Abmelden
      </button>
    </div>
  )
}
