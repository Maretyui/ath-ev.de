"use client"

import { useState } from "react"
import useSWR from "swr"

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

function calculateAge(birthday: string | null): string {
  if (!birthday) return "-"
  const birth = new Date(birthday)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return String(age)
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "-"
  try {
    return new Date(dateString).toLocaleDateString("de-DE")
  } catch {
    return dateString
  }
}

export function MembersTable() {
  const { data, error } = useSWR("/api/members", fetcher)
  const [search, setSearch] = useState("")

  const members: Member[] = data?.members || []
  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.adresse.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 mb-8">
        <div
          className="p-6 rounded-xl text-center border transition-all hover:-translate-y-0.5 hover:shadow-lg"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-color)",
            boxShadow: "0 4px 15px var(--shadow-color)",
          }}
        >
          <p className="text-4xl font-bold gradient-text">{members.length}</p>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
            Mitglieder gesamt
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
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
      </div>

      {/* Table */}
      {error && <p className="text-red-400">Fehler beim Laden der Mitglieder</p>}
      {!data && !error && <p style={{ color: "var(--text-secondary)" }}>Mitglieder werden geladen...</p>}

      <div
        className="rounded-xl border overflow-hidden"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
          boxShadow: "0 4px 15px var(--shadow-color)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm min-w-[800px]">
            <thead>
              <tr>
                {["Name", "E-Mail", "Adresse", "Geburtstag", "Alter", "Telefon", "Mitglied seit"].map((header) => (
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
                  <td className="px-4 py-4 break-all">
                    <a href={`mailto:${member.email}`} className="text-[var(--blue-accent)] no-underline hover:underline">
                      {member.email}
                    </a>
                  </td>
                  <td className="px-4 py-4 max-w-[200px] break-words" style={{ color: "var(--text-primary)" }}>
                    {member.adresse || "-"}
                  </td>
                  <td className="px-4 py-4" style={{ color: "var(--text-primary)" }}>
                    {formatDate(member.geburtstag)}
                  </td>
                  <td className="px-4 py-4" style={{ color: "var(--text-primary)" }}>
                    {calculateAge(member.geburtstag)}
                  </td>
                  <td className="px-4 py-4" style={{ color: "var(--text-primary)" }}>
                    {member.telefon || "-"}
                  </td>
                  <td className="px-4 py-4" style={{ color: "var(--text-primary)" }}>
                    {formatDate(member.mitglied_seit)}
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
