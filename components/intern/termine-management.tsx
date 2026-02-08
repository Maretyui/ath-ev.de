"use client"

import React from "react"
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

function TerminFormModal({
  termin,
  onClose,
}: {
  termin?: Termin
  onClose: () => void
}) {
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

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[999]" onClick={onClose} />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-2xl shadow-2xl z-[1000] max-w-[600px] w-[90%] max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: "var(--bg-tertiary)" }}
      >
        <h3 className="text-xl font-bold mb-6" style={{ color: "var(--blue-accent)" }}>
          {termin ? "Termin bearbeiten" : "Neuen Termin hinzufuegen"}
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
              defaultValue={termin?.date || new Date().toISOString().split("T")[0]}
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
              defaultValue={termin?.title}
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
              Beschreibung
            </label>
            <textarea
              name="content"
              required
              rows={6}
              defaultValue={termin?.content}
              placeholder="Termin-Beschreibung eingeben"
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
              {termin ? "Neues Bild hochladen" : "Bild hochladen"}
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full px-4 py-3 border-2 rounded-lg text-sm"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-teaser)",
                color: "var(--text-primary)",
              }}
            />
            <small style={{ color: "var(--text-tertiary)" }}>
              {termin
                ? "Nur auswaehlen, wenn Sie das Bild aendern moechten"
                : "Unterstuetzte Formate: JPEG, PNG, GIF, WebP (max. 5MB)"}
            </small>
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
              {loading ? "Speichern..." : termin ? "Speichern" : "Hinzufuegen"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export function TermineManagement() {
  const { data, error } = useSWR("/api/termine", fetcher)
  const [showAdd, setShowAdd] = useState(false)
  const [editTermin, setEditTermin] = useState<Termin | null>(null)

  const termine: Termin[] = data?.termine || []

  const handleDelete = useCallback(async (id: number) => {
    if (!confirm("Sind Sie sicher, dass Sie diesen Termin loeschen moechten?")) return
    try {
      await fetch("/api/termine", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      mutate("/api/termine")
    } catch {
      alert("Fehler beim Loeschen")
    }
  }, [])

  return (
    <div>
      {showAdd && <TerminFormModal onClose={() => setShowAdd(false)} />}
      {editTermin && <TerminFormModal termin={editTermin} onClose={() => setEditTermin(null)} />}

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold" style={{ color: "var(--text-accent)" }}>
          Termine verwalten
        </h2>
        <button
          onClick={() => setShowAdd(true)}
          className="btn-gradient px-6 py-3 rounded-lg text-white font-semibold border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          Neuen Termin hinzufuegen
        </button>
      </div>

      {error && <p className="text-red-400">Fehler beim Laden der Termine</p>}
      {!data && !error && <p style={{ color: "var(--text-secondary)" }}>Termine werden geladen...</p>}

      <div className="flex flex-col gap-4">
        {termine.map((t) => (
          <div
            key={t.id}
            className="flex items-start gap-4 p-5 rounded-xl border transition-all"
            style={{
              backgroundColor: "var(--bg-teaser)",
              borderColor: "var(--border-color)",
            }}
          >
            {t.image && (
              <img
                src={t.image}
                alt={t.alt || t.title}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm mb-1" style={{ color: "var(--blue-accent)" }}>
                {formatDate(t.date)}
              </div>
              <h3 className="text-lg font-bold mb-1 truncate" style={{ color: "var(--text-primary)" }}>
                {t.title}
              </h3>
              <p className="text-sm leading-relaxed m-0 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                {t.content}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
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
                Loeschen
              </button>
            </div>
          </div>
        ))}
        {termine.length === 0 && data && (
          <p className="text-center py-12" style={{ color: "var(--text-secondary)" }}>
            Keine Termine vorhanden
          </p>
        )}
      </div>
    </div>
  )
}
