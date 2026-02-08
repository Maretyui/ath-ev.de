"use client"

import React from "react"
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

function BerichtFormModal({
  bericht,
  onClose,
}: {
  bericht?: Bericht
  onClose: () => void
}) {
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

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[999]" onClick={onClose} />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-2xl shadow-2xl z-[1000] max-w-[600px] w-[90%] max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: "var(--bg-tertiary)" }}
      >
        <h3 className="text-xl font-bold mb-6" style={{ color: "var(--blue-accent)" }}>
          {bericht ? "Bericht bearbeiten" : "Neuen Bericht hinzufuegen"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-1 font-medium text-sm" style={{ color: "var(--text-secondary)" }}>
              Datum
            </label>
            <input
              type="date"
              name="date"
              required
              defaultValue={bericht?.date || new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 border-2 rounded-lg text-base transition-colors focus:outline-none"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-teaser)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-1 font-medium text-sm" style={{ color: "var(--text-secondary)" }}>
              Titel
            </label>
            <input
              type="text"
              name="title"
              required
              maxLength={255}
              defaultValue={bericht?.title}
              placeholder="Titel eingeben"
              className="w-full px-4 py-3 border-2 rounded-lg text-base transition-colors focus:outline-none"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-teaser)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-1 font-medium text-sm" style={{ color: "var(--text-secondary)" }}>
              Inhalt
            </label>
            <textarea
              name="content"
              required
              rows={6}
              defaultValue={bericht?.content}
              placeholder="Bericht-Inhalt eingeben"
              className="w-full px-4 py-3 border-2 rounded-lg text-base resize-y min-h-[150px] font-[inherit] transition-colors focus:outline-none"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-teaser)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-1 font-medium text-sm" style={{ color: "var(--text-secondary)" }}>
              {bericht ? "Neues Bild hochladen" : "Bild hochladen"}
            </label>
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              className="w-full px-4 py-3 border-2 rounded-lg text-sm"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-teaser)",
                color: "var(--text-primary)",
              }}
            />
            <small style={{ color: "var(--text-tertiary)" }}>
              {bericht
                ? "Nur auswaehlen, wenn Sie das Bild aendern moechten"
                : "Unterstuetzte Formate: JPEG, PNG, GIF, WebP (max. 5MB)"}
            </small>
          </div>
          <div className="mb-5">
            <label className="block mb-1 font-medium text-sm" style={{ color: "var(--text-secondary)" }}>
              Alternativtext (optional)
            </label>
            <input
              type="text"
              name="alt"
              maxLength={255}
              defaultValue={bericht?.alt || ""}
              placeholder="Beschreibung des Bildes"
              className="w-full px-4 py-3 border-2 rounded-lg text-base transition-colors focus:outline-none"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-teaser)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <div className="flex gap-3 justify-end mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg font-semibold border-none cursor-pointer transition-all"
              style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-gradient px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer transition-all hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? "Speichern..." : bericht ? "Speichern" : "Hinzufuegen"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export function NewsManagement() {
  const { data, error } = useSWR("/api/berichte", fetcher)
  const [showAdd, setShowAdd] = useState(false)
  const [editBericht, setEditBericht] = useState<Bericht | null>(null)

  const berichte: Bericht[] = data?.berichte || []

  const handleDelete = useCallback(async (id: number) => {
    if (!confirm("Sind Sie sicher, dass Sie diesen Bericht loeschen moechten?")) return
    try {
      await fetch("/api/berichte", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      mutate("/api/berichte")
    } catch {
      alert("Fehler beim Loeschen")
    }
  }, [])

  return (
    <div>
      {showAdd && <BerichtFormModal onClose={() => setShowAdd(false)} />}
      {editBericht && <BerichtFormModal bericht={editBericht} onClose={() => setEditBericht(null)} />}

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold" style={{ color: "var(--text-accent)" }}>
          News verwalten
        </h2>
        <button
          onClick={() => setShowAdd(true)}
          className="btn-gradient px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          Neuen Bericht hinzufuegen
        </button>
      </div>

      {error && <p className="text-red-400">Fehler beim Laden der Berichte</p>}
      {!data && !error && <p style={{ color: "var(--text-secondary)" }}>Berichte werden geladen...</p>}

      <div className="flex flex-col gap-4">
        {berichte.map((bericht) => (
          <div
            key={bericht.id}
            className="flex items-start gap-4 p-5 rounded-xl border transition-all"
            style={{
              backgroundColor: "var(--bg-teaser)",
              borderColor: "var(--border-color)",
            }}
          >
            {bericht.image && (
              <img
                src={bericht.image}
                alt={bericht.alt || bericht.title}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm mb-1" style={{ color: "var(--blue-accent)" }}>
                {formatDate(bericht.date)}
              </div>
              <h3 className="text-lg font-bold mb-1 truncate" style={{ color: "var(--text-primary)" }}>
                {bericht.title}
              </h3>
              <p className="text-sm leading-relaxed m-0 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                {bericht.content}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
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
                Loeschen
              </button>
            </div>
          </div>
        ))}
        {berichte.length === 0 && data && (
          <p className="text-center py-12" style={{ color: "var(--text-secondary)" }}>
            Keine Berichte vorhanden
          </p>
        )}
      </div>
    </div>
  )
}
