"use client"

import React from "react"
import { PageShell } from "@/components/page-shell"
import { useAuth } from "@/lib/auth-context"
import { useState, useCallback } from "react"
import useSWR, { mutate } from "swr"

interface Bericht {
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

function BerichtForm({ bericht, onClose, isModal }: { bericht?: Bericht; onClose: () => void; isModal?: boolean }) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const method = bericht ? "PUT" : "POST"
    if (bericht) {
      formData.append("action", "update_bericht")
      formData.append("id", String(bericht.id))
    } else {
      formData.append("action", "add_bericht")
    }
    try {
      const res = await fetch("/api/berichte", { method, body: formData })
      if (!res.ok) throw new Error("Fehler")
      mutate("/api/berichte")
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
        <input type="date" name="date" required defaultValue={bericht?.date || new Date().toISOString().split("T")[0]} className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-base text-[#333] focus:outline-none focus:border-[#4facfe]" />
      </div>
      <div className="mb-5">
        <label className="block mb-1 font-medium text-[#555] text-sm">Titel</label>
        <input type="text" name="title" required maxLength={255} defaultValue={bericht?.title} placeholder="Titel eingeben" className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-base text-[#333] focus:outline-none focus:border-[#4facfe]" />
      </div>
      <div className="mb-5">
        <label className="block mb-1 font-medium text-[#555] text-sm">Inhalt</label>
        <textarea name="content" required rows={6} defaultValue={bericht?.content} placeholder="Bericht-Inhalt eingeben" className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-base text-[#333] resize-y min-h-[150px] font-[inherit] focus:outline-none focus:border-[#4facfe]" />
      </div>
      <div className="mb-5">
        <label className="block mb-1 font-medium text-[#555] text-sm">{bericht ? "Neues Bild hochladen" : "Bild hochladen"}</label>
        <input type="file" name="image" accept="image/jpeg,image/jpg,image/png,image/gif,image/webp" className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-sm text-[#333]" />
        <small className="text-[#666] text-xs">{bericht ? "Nur auswählen, wenn Sie das Bild ändern möchten" : "Unterstützte Formate: JPEG, PNG, GIF, WebP (max. 5MB)"}</small>
      </div>
      <div className="mb-5">
        <label className="block mb-1 font-medium text-[#555] text-sm">Alternativtext (optional)</label>
        <input type="text" name="alt" maxLength={255} defaultValue={bericht?.alt || ""} placeholder="Beschreibung des Bildes" className="w-full px-4 py-3 border-2 border-[#e1e5e9] rounded-lg text-base text-[#333] focus:outline-none focus:border-[#4facfe]" />
      </div>
      <div className="flex gap-3 justify-center mt-5">
        <button type="submit" disabled={loading} className="btn-gradient-green px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer transition-all hover:-translate-y-0.5 disabled:opacity-60">
          {loading ? "Speichern..." : bericht ? "Speichern" : "Bericht hinzufügen"}
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
          <h3 className="text-[#4facfe] text-xl font-bold mb-6">{bericht ? "Bericht bearbeiten" : "Neuen Bericht hinzufügen"}</h3>
          {formContent}
        </div>
      </>
    )
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-[#4facfe] p-8 mt-8 mb-8" style={{ backgroundColor: "white" }}>
      <h3 className="text-[#4facfe] text-center text-xl font-bold mb-6">Neuen Bericht hinzufügen</h3>
      {formContent}
    </div>
  )
}

function NewsContent() {
  const { user } = useAuth()
  const isAdmin = user && (user.role === "admin" || user.role === "manager")
  const { data, error } = useSWR("/api/berichte", fetcher)
  const [showAdd, setShowAdd] = useState(false)
  const [editBericht, setEditBericht] = useState<Bericht | null>(null)

  const berichte: Bericht[] = data?.berichte || []

  const handleDelete = useCallback(async (id: number) => {
    if (!confirm("Sind Sie sicher, dass Sie diesen Bericht löschen möchten?")) return
    try {
      await fetch("/api/berichte", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      mutate("/api/berichte")
    } catch {
      alert("Fehler beim Löschen")
    }
  }, [])

  return (
    <>
      {editBericht && <BerichtForm bericht={editBericht} onClose={() => setEditBericht(null)} isModal />}

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
          News
        </h1>

        {error && <p className="text-center text-red-400">Fehler beim Laden der Berichte</p>}
        {!data && !error && <p className="text-center" style={{ color: "var(--text-secondary)" }}>Berichte werden geladen...</p>}

        <div className="grid grid-cols-2 max-[1000px]:grid-cols-1 gap-8 mt-8 mb-12">
          {berichte.map((bericht) => (
            <article
              key={bericht.id}
              className="flex items-start gap-4 p-6 max-[1000px]:p-4 max-[420px]:flex-col max-[420px]:items-center max-[420px]:text-center rounded-xl border transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--bg-teaser)",
                borderColor: "var(--border-color)",
              }}
            >
              {bericht.image && (
                <img
                  src={bericht.image || "/placeholder.svg"}
                  alt={bericht.alt || bericht.title}
                  className="w-28 h-28 max-[420px]:w-full max-[420px]:max-w-[200px] max-[420px]:h-[120px] rounded-xl object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <div className="text-[0.9rem] mb-2" style={{ color: "var(--blue-accent)" }}>
                  {formatDate(bericht.date)}
                </div>
                <h2 className="text-[1.3rem] font-bold mb-2" style={{ color: "var(--green-accent)" }}>
                  {bericht.title}
                </h2>
                <p className="leading-relaxed m-0" style={{ color: "var(--text-secondary)" }}>
                  {bericht.content && bericht.content.length > 150
                    ? bericht.content.substring(0, 150) + "..."
                    : bericht.content}
                </p>
              </div>
              {isAdmin && (
                <div className="flex gap-2 flex-shrink-0 max-[420px]:mt-2">
                  <button
                    onClick={() => setEditBericht(bericht)}
                    className="btn-gradient-green px-3 py-2 rounded-lg text-white text-sm font-semibold border-none cursor-pointer"
                  >
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => handleDelete(bericht.id)}
                    className="btn-gradient-red px-3 py-2 rounded-lg text-white text-sm font-semibold border-none cursor-pointer"
                  >
                    Löschen
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>

        {berichte.length === 0 && data && (
          <p className="text-center py-12" style={{ color: "var(--text-secondary)" }}>
            Keine Berichte vorhanden
          </p>
        )}

        {isAdmin && showAdd && <BerichtForm onClose={() => setShowAdd(false)} />}
      </main>
    </>
  )
}

function AdminAddButton() {
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
        Neuen Bericht hinzufügen
      </button>
      {showAdd && <BerichtForm onClose={() => setShowAdd(false)} isModal />}
    </>
  )
}

export default function NewsPage() {
  return (
    <PageShell adminBarChildren={<AdminAddButton />}>
      <NewsContent />
    </PageShell>
  )
}
