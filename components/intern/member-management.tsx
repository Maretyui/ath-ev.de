"use client"

import React from "react"

import { useState } from "react"
import useSWR, { mutate } from "swr"

interface Member {
  id: number
  name: string
  email: string
  adresse: string
  geburtstag: string | null
  telefon: string
  mitglied_seit: string | null
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function MemberForm({
  member,
  onSave,
  onCancel,
  title,
}: {
  member?: Member
  onSave: (data: Partial<Member>) => Promise<void>
  onCancel: () => void
  title: string
}) {
  const [form, setForm] = useState({
    name: member?.name || "",
    email: member?.email || "",
    adresse: member?.adresse || "",
    geburtstag: member?.geburtstag || "",
    telefon: member?.telefon || "",
    mitglied_seit: member?.mitglied_seit || "",
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave({ ...form, id: member?.id })
      onCancel()
    } catch {
      alert("Fehler beim Speichern")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60" onClick={(e) => { if (e.target === e.currentTarget) onCancel() }}>
      <div className="bg-white rounded-2xl p-8 max-w-[600px] w-[90%] max-h-[90vh] overflow-y-auto">
        <h3 className="text-[#4facfe] text-xl font-bold mb-6">{title}</h3>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Name", key: "name", type: "text", required: true },
            { label: "E-Mail", key: "email", type: "email", required: true },
            { label: "Adresse", key: "adresse", type: "text", required: false },
            { label: "Geburtstag", key: "geburtstag", type: "date", required: false },
            { label: "Telefon", key: "telefon", type: "tel", required: false },
            { label: "Mitglied seit", key: "mitglied_seit", type: "date", required: false },
          ].map((field) => (
            <div key={field.key} className="mb-4">
              <label className="block mb-1 font-medium text-[#555] text-sm">{field.label}</label>
              <input
                type={field.type}
                required={field.required}
                value={form[field.key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-base text-[#333] focus:outline-none focus:border-[#4facfe]"
              />
            </div>
          ))}
          <div className="flex gap-3 justify-center mt-5">
            <button
              type="submit"
              disabled={loading}
              className="btn-gradient-green px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer disabled:opacity-60"
            >
              {loading ? "Speichern..." : "Speichern"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-gradient-gray px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer"
            >
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function MemberManagement() {
  const { data } = useSWR("/api/members", fetcher)
  const [showAdd, setShowAdd] = useState(false)
  const [editMember, setEditMember] = useState<Member | null>(null)
  const [search, setSearch] = useState("")

  const members: Member[] = data?.members || []
  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  )

  async function handleAdd(memberData: Partial<Member>) {
    const res = await fetch("/api/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memberData),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error)
    }
    mutate("/api/members")
  }

  async function handleEdit(memberData: Partial<Member>) {
    const res = await fetch("/api/members", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memberData),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error)
    }
    mutate("/api/members")
  }

  async function handleDelete(id: number) {
    if (!confirm("Sind Sie sicher, dass Sie dieses Mitglied löschen möchten?")) return
    try {
      await fetch("/api/members", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      mutate("/api/members")
    } catch {
      alert("Fehler beim Löschen")
    }
  }

  return (
    <div>
      {showAdd && <MemberForm title="Neues Mitglied hinzufügen" onSave={handleAdd} onCancel={() => setShowAdd(false)} />}
      {editMember && (
        <MemberForm title="Mitglied bearbeiten" member={editMember} onSave={handleEdit} onCancel={() => setEditMember(null)} />
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Mitglieder suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-[300px] px-5 py-3 rounded-lg text-base border-2 transition-colors focus:outline-none focus:border-[var(--blue-accent)]"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
        />
        <button
          onClick={() => setShowAdd(true)}
          className="btn-gradient px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          Neues Mitglied hinzufügen
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
          <table className="w-full border-collapse text-sm min-w-[900px]">
            <thead>
              <tr>
                {["Name", "E-Mail", "Adresse", "Geburtstag", "Telefon", "Mitglied seit", "Aktionen"].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-4 text-left font-semibold text-white sticky top-0 z-10"
                    style={{ background: "linear-gradient(135deg, #374151 0%, #1f2937 100%)" }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((member, i) => (
                <tr
                  key={member.id}
                  className="transition-colors hover:bg-[var(--bg-teaser-hover)]"
                  style={{
                    backgroundColor: i % 2 === 0 ? "var(--bg-teaser)" : "transparent",
                  }}
                >
                  <td className="px-4 py-4 font-semibold" style={{ color: "var(--green-accent)" }}>
                    {member.name}
                  </td>
                  <td className="px-4 py-4 break-all" style={{ color: "var(--text-primary)" }}>
                    {member.email}
                  </td>
                  <td className="px-4 py-4" style={{ color: "var(--text-primary)" }}>
                    {member.adresse || "-"}
                  </td>
                  <td className="px-4 py-4" style={{ color: "var(--text-primary)" }}>
                    {member.geburtstag ? new Date(member.geburtstag).toLocaleDateString("de-DE") : "-"}
                  </td>
                  <td className="px-4 py-4" style={{ color: "var(--text-primary)" }}>
                    {member.telefon || "-"}
                  </td>
                  <td className="px-4 py-4" style={{ color: "var(--text-primary)" }}>
                    {member.mitglied_seit ? new Date(member.mitglied_seit).toLocaleDateString("de-DE") : "-"}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditMember(member)}
                        className="btn-gradient-green px-3 py-1.5 rounded-lg text-white text-xs font-semibold border-none cursor-pointer"
                      >
                        Bearbeiten
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="btn-gradient-red px-3 py-1.5 rounded-lg text-white text-xs font-semibold border-none cursor-pointer"
                      >
                        Löschen
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && data && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center" style={{ color: "var(--text-secondary)" }}>
                    Keine Mitglieder gefunden
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
