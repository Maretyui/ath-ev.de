"use client"

import React from "react"
import { PageShell } from "@/components/page-shell"
import { useAuth } from "@/lib/auth-context"
import { useState, useCallback } from "react"
import useSWR, { mutate } from "swr"

interface Termin {
  id: number
  date: string
  title: string
  content: string
  image: string | null
  alt: string | null
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return dateString
  }
}

function TerminForm({ termin, onClose, isModal }: { termin?: Termin; onClose: () => void; isModal?: boolean }) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const method = termin ? "PUT" : "POST"
    if (termin) {
      formData.append("action", "update_termin")
      formData.append("id", String(termin.id))
    } else {
      formData.append("action", "add_termin")
    }
    try {
      const res = await fetch("/api/termine", { method, body: formData })
      if (!res.ok) throw new Error("Fehler")
      mutate("/api/termine")
      onClose()
    } catch {
      alert("Fehler beim Speichern")
    } finally {
      setLoading(false)
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="block mb-1 font-medium text-[#555] text-sm">Datum</label>
        <input type="date" name="date" required defaultValue={termin?.date || new Date().toISOString().split("T")[0]} className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-base text-[#333] focus:outline-none focus:border-[#4facfe]" />
      </div>
      <div className="mb-5">
        <label className="block mb-1 font-medium text-[#555] text-sm">Titel</label>
        <input type="text" name="title" required defaultValue={termin?.title} placeholder="Titel eingeben" className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-base text-[#333] focus:outline-none focus:border-[#4facfe]" />
      </div>
      <div className="mb-5">
        <label className="block mb-1 font-medium text-[#555] text-sm">Beschreibung</label>
        <textarea name="content" required rows={6} defaultValue={termin?.content} placeholder="Termin-Beschreibung eingeben" className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-base text-[#333] resize-y min-h-[150px] font-[inherit] focus:outline-none focus:border-[#4facfe]" />
      </div>
      <div className="mb-5">
        <label className="block mb-1 font-medium text-[#555] text-sm">{termin ? "Neues Bild hochladen" : "Bild hochladen"}</label>
        <input type="file" name="image" accept="image/*" className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-sm text-[#333]" />
        <small className="text-[#666] text-xs">{termin ? "Nur auswählen, wenn Sie das Bild ändern möchten" : "Unterstützte Formate: JPEG, PNG, GIF, WebP (max. 5MB)"}</small>
      </div>
      <div className="flex gap-3 justify-center mt-5">
        <button type="submit" disabled={loading} className="btn-gradient-green px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer transition-all hover:-translate-y-0.5 disabled:opacity-60">
          {loading ? "Speichern..." : termin ? "Speichern" : "Termin hinzufügen"}
        </button>
        <button type="button" onClick={onClose} className="btn-gradient-gray px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer">
          Abbrechen
        </button>
      </div>
    </form>
  )

  if (isModal) {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 z-[999]" onClick={onClose} />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-2xl z-[1000] max-w-[600px] w-[90%] max-h-[90vh] overflow-y-auto">
          <h3 className="text-[#4facfe] text-xl font-bold mb-6">{termin ? "Termin bearbeiten" : "Neuen Termin hinzufügen"}</h3>
          {formContent}
        </div>
      </>
    )
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-[#4facfe] p-8 mt-8 mb-8" style={{ backgroundColor: "white" }}>
      <h3 className="text-[#4facfe] text-center text-xl font-bold mb-6">Neuen Termin hinzufügen</h3>
      {formContent}
    </div>
  )
}

function TermineContent() {
  const { user } = useAuth()
  const isAdmin = user && (user.role === "admin" || user.role === "manager")
  const { data, error } = useSWR("/api/termine", fetcher)
  const [editTermin, setEditTermin] = useState<Termin | null>(null)

  const termine: Termin[] = data?.termine || []

  const handleDelete = useCallback(async (id: number) => {
    if (!confirm("Sind Sie sicher, dass Sie diesen Termin löschen möchten?")) return
    try {
      await fetch("/api/termine", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      mutate("/api/termine")
    } catch {
      alert("Fehler beim Löschen")
    }
  }, [])

  return (
    <>
      {editTermin && <TerminForm termin={editTermin} onClose={() => setEditTermin(null)} isModal />}

      <main
        className="flex-1 px-8 py-0"
        style={{
          backgroundColor: "var(--bg-secondary)",
          backdropFilter: "blur(20px)",
          borderTop: "2px solid var(--border-color)",
        }}
      >
        <h1
          className="my-8 text-center text-[3rem] max-[800px]:text-[2.2rem] font-bold transition-colors duration-300"
          style={{ color: "var(--text-accent)" }}
        >
          Veranstaltungen
        </h1>

        {error && <p className="text-center text-red-400">Fehler beim Laden der Termine</p>}
        {!data && !error && <p className="text-center" style={{ color: "var(--text-secondary)" }}>Termine werden geladen...</p>}

        <div className="grid grid-cols-2 max-[1000px]:grid-cols-1 gap-8 mt-8 mb-12">
          {termine.map((t) => (
            <div
              key={t.id}
              className="flex items-start gap-4 p-6 max-[1000px]:p-4 max-[420px]:flex-col max-[420px]:items-center max-[420px]:text-center rounded-xl border transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--bg-teaser)",
                borderColor: "var(--border-color)",
              }}
            >
              {t.image && (
                <img
                  src={t.image || "/placeholder.svg"}
                  alt={t.alt || t.title}
                  className="w-28 h-28 max-[420px]:w-full max-[420px]:max-w-[200px] max-[420px]:h-[120px] rounded-xl object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <div className="text-[0.9rem] mb-2" style={{ color: "var(--blue-accent)" }}>
                  {formatDate(t.date)}
                </div>
                <h2 className="text-[1.3rem] font-bold mb-2" style={{ color: "var(--green-accent)" }}>
                  {t.title}
                </h2>
                <p className="leading-relaxed m-0" style={{ color: "var(--text-secondary)" }}>
                  {t.content && t.content.length > 150 ? t.content.substring(0, 150) + "..." : t.content}
                </p>
              </div>
              {isAdmin && (
                <div className="flex gap-2 flex-shrink-0 max-[420px]:mt-2">
                  <button
                    onClick={() => setEditTermin(t)}
                    className="btn-gradient-green px-3 py-2 rounded-lg text-white text-sm font-semibold border-none cursor-pointer"
                  >
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="btn-gradient-red px-3 py-2 rounded-lg text-white text-sm font-semibold border-none cursor-pointer"
                  >
                    Löschen
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {termine.length === 0 && data && (
          <p className="text-center py-12" style={{ color: "var(--text-secondary)" }}>
            Keine Termine vorhanden
          </p>
        )}
      </main>
    </>
  )
}

function AdminAddTerminButton() {
  const { user } = useAuth()
  const isAdmin = user && (user.role === "admin" || user.role === "manager")
  const [showAdd, setShowAdd] = useState(false)

  if (!isAdmin) return null

  return (
    <>
      <button
        onClick={() => setShowAdd(true)}
        className="btn-gradient px-4 py-2 rounded-lg text-sm text-white font-semibold cursor-pointer border-none transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        Neuen Termin hinzufügen
      </button>
      {showAdd && <TerminForm onClose={() => setShowAdd(false)} isModal />}
    </>
  )
}

export default function TerminePage() {
  return (
    <PageShell adminBarChildren={<AdminAddTerminButton />}>
      <TermineContent />
    </PageShell>
  )
}
