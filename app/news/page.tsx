"use client"

import { PageShell } from "@/components/page-shell"
import useSWR from "swr"
import { Newspaper, Calendar } from "lucide-react"

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

function NewsContent() {
  const { data, error } = useSWR("/api/berichte", fetcher)
  const berichte: Bericht[] = data?.berichte || []

  return (
    <main className="flex-1">
      {/* Header */}
      <div className="bg-gradient-to-b from-cyan-50 to-white py-12 md:py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-400 mb-4 shadow-lg shadow-cyan-500/25">
          <Newspaper className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
          News & Berichte
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto px-6">
          Aktuelle Nachrichten und Berichte aus unserem Vereinsleben
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">Fehler beim Laden der Berichte</p>
          </div>
        )}
        
        {!data && !error && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin" />
            <p className="text-slate-500 mt-4">Berichte werden geladen...</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {berichte.map((bericht) => (
            <article
              key={bericht.id}
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-100/50 transition-all duration-300"
            >
              {bericht.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={bericht.image}
                    alt={bericht.alt || bericht.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-cyan-600 mb-3">
                  <Calendar className="w-4 h-4" />
                  {formatDate(bericht.date)}
                </div>
                <h2 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-cyan-700 transition-colors">
                  {bericht.title}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {bericht.content && bericht.content.length > 150
                    ? bericht.content.substring(0, 150) + "..."
                    : bericht.content}
                </p>
              </div>
            </article>
          ))}
        </div>

        {berichte.length === 0 && data && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Newspaper className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500">Noch keine Berichte vorhanden</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default function NewsPage() {
  return (
    <PageShell>
      <NewsContent />
    </PageShell>
  )
}
