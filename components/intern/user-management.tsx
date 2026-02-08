"use client"

import React from "react"

import { useState } from "react"
import useSWR, { mutate } from "swr"

interface User {
  id: number
  email: string
  role: string
  created_at: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function CreateUserModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("user")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }
      mutate("/api/users")
      onClose()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Fehler beim Erstellen")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-2xl p-8 max-w-[500px] w-[90%]">
        <h3 className="text-[#4facfe] text-xl font-bold mb-6">Neuen Benutzer erstellen</h3>
        {error && (
          <div className="text-[#e74c3c] mb-4 p-3 bg-[#ffeaea] rounded-md border-l-4 border-[#e74c3c] text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#555] text-sm">E-Mail (wird auch als Benutzername verwendet)</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-base text-[#333] focus:outline-none focus:border-[#4facfe]"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#555] text-sm">Passwort</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-base text-[#333] focus:outline-none focus:border-[#4facfe]"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#555] text-sm">Rolle</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-base text-[#333] focus:outline-none focus:border-[#4facfe]"
            >
              <option value="user">Benutzer (nur Ansicht)</option>
              <option value="admin">Admin (Bearbeitung)</option>
              <option value="manager">Manager (Vollzugriff)</option>
            </select>
          </div>
          <div className="flex gap-3 justify-center mt-5">
            <button
              type="submit"
              disabled={loading}
              className="btn-gradient-green px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer disabled:opacity-60"
            >
              {loading ? "Erstellen..." : "Benutzer erstellen"}
            </button>
            <button type="button" onClick={onClose} className="btn-gradient-gray px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer">
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function EditRoleModal({ user, onClose }: { user: User; onClose: () => void }) {
  const [role, setRole] = useState(user.role)
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const body: Record<string, unknown> = { id: user.id, role }
      if (newPassword) body.password = newPassword
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error("Fehler")
      mutate("/api/users")
      onClose()
    } catch {
      alert("Fehler beim Aktualisieren")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-2xl p-8 max-w-[500px] w-[90%]">
        <h3 className="text-[#4facfe] text-xl font-bold mb-6">Benutzer bearbeiten: {user.email}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#555] text-sm">Rolle</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-base text-[#333] focus:outline-none focus:border-[#4facfe]"
            >
              <option value="user">Benutzer (nur Ansicht)</option>
              <option value="admin">Admin (Bearbeitung)</option>
              <option value="manager">Manager (Vollzugriff)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#555] text-sm">Neues Passwort (optional)</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leer lassen, um das Passwort nicht zu ändern"
              className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-base text-[#333] focus:outline-none focus:border-[#4facfe]"
            />
          </div>
          <div className="flex gap-3 justify-center mt-5">
            <button
              type="submit"
              disabled={loading}
              className="btn-gradient-green px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer disabled:opacity-60"
            >
              {loading ? "Speichern..." : "Speichern"}
            </button>
            <button type="button" onClick={onClose} className="btn-gradient-gray px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer">
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function UserManagement() {
  const { data } = useSWR("/api/users", fetcher)
  const [showCreate, setShowCreate] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)

  const users: User[] = data?.users || []

  async function handleDelete(id: number) {
    if (!confirm("Sind Sie sicher, dass Sie diesen Benutzer löschen möchten?")) return
    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) {
        const data = await res.json()
        alert(data.error || "Fehler beim Löschen")
        return
      }
      mutate("/api/users")
    } catch {
      alert("Fehler beim Löschen")
    }
  }

  return (
    <div>
      {showCreate && <CreateUserModal onClose={() => setShowCreate(false)} />}
      {editUser && <EditRoleModal user={editUser} onClose={() => setEditUser(null)} />}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" style={{ color: "var(--text-accent)" }}>
          Benutzerverwaltung
        </h2>
        <button
          onClick={() => setShowCreate(true)}
          className="btn-gradient px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          Neuen Benutzer erstellen
        </button>
      </div>

      <div
        className="rounded-xl border overflow-hidden"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
          boxShadow: "0 4px 15px var(--shadow-color)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {["E-Mail", "Rolle", "Erstellt am", "Aktionen"].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-4 text-left font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #374151 0%, #1f2937 100%)" }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-[var(--bg-teaser-hover)]"
                  style={{
                    backgroundColor: i % 2 === 0 ? "var(--bg-teaser)" : "transparent",
                  }}
                >
                  <td className="px-4 py-4 font-semibold" style={{ color: "var(--green-accent)" }}>
                    {user.email}
                  </td>
                  <td className="px-4 py-4" style={{ color: "var(--text-primary)" }}>
                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-bold
                        ${user.role === "manager" ? "bg-purple-600 text-white" : ""}
                        ${user.role === "admin" ? "bg-blue-600 text-white" : ""}
                        ${user.role === "user" ? "bg-gray-600 text-white" : ""}
                      `}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4" style={{ color: "var(--text-primary)" }}>
                    {user.created_at ? new Date(user.created_at).toLocaleDateString("de-DE") : "-"}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditUser(user)}
                        className="btn-gradient-green px-3 py-1.5 rounded-lg text-white text-xs font-semibold border-none cursor-pointer"
                      >
                        Bearbeiten
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn-gradient-red px-3 py-1.5 rounded-lg text-white text-xs font-semibold border-none cursor-pointer"
                      >
                        Löschen
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && data && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center" style={{ color: "var(--text-secondary)" }}>
                    Keine Benutzer gefunden
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
