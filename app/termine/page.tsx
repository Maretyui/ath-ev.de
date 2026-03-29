"use client"

import { PageShell } from "@/components/page-shell"
import useSWR from "swr"
import { Calendar, MapPin, Clock } from "lucide-react"

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

function TermineContent() {
  const { data, error } = useSWR("/api/termine", fetcher)
  const termine: Termin[] = data?.termine || []

  return (
    <main className="flex-1">
      {/* Header */}
      <div className="bg-gradient-to-b from-cyan-50 to-white py-12 md:py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 mb-4 shadow-lg shadow-amber-500/25">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
          Termine & Veranstaltungen
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto px-6">
          Kommende Events, Trainings und Ausfahrten
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">Fehler beim Laden der Termine</p>
          </div>
        )}
        
        {!data && !error && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin" />
            <p className="text-slate-500 mt-4">Termine werden geladen...</p>
          </div>
        )}

        <div className="space-y-4">
          {termine.map((t) => (
            <div
              key={t.id}
              className="group flex flex-col md:flex-row gap-6 bg-white rounded-2xl border border-slate-100 p-6 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-100/50 transition-all duration-300"
            >
              {/* Date Badge */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-100 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-cyan-700">
                    {new Date(t.date).getDate()}
                  </span>
                  <span className="text-xs font-medium text-cyan-600 uppercase">
                    {new Date(t.date).toLocaleDateString("de-DE", { month: "short" })}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDate(t.date)}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-cyan-700 transition-colors">
                  {t.title}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {t.content && t.content.length > 200 ? t.content.substring(0, 200) + "..." : t.content}
                </p>
              </div>

              {/* Image */}
              {t.image && (
                <div className="flex-shrink-0">
                  <img
                    src={t.image}
                    alt={t.alt || t.title}
                    className="w-32 h-32 rounded-xl object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {termine.length === 0 && data && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500">Aktuell keine Termine geplant</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default function TerminePage() {
  return (
    <PageShell>
      <TermineContent />
    </PageShell>
  )
}
