"use client"

import { PageShell } from "@/components/page-shell"
import useSWR from "swr"

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
      {!data && !error && (
        <p className="text-center" style={{ color: "var(--text-secondary)" }}>
          Berichte werden geladen...
        </p>
      )}

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
                src={bericht.image}
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
          </article>
        ))}
      </div>

      {berichte.length === 0 && data && (
        <p className="text-center py-12" style={{ color: "var(--text-secondary)" }}>
          Keine Berichte vorhanden
        </p>
      )}
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
