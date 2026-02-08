import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "News",
  description:
    "Aktuelle Nachrichten und Berichte vom Aquanautic-Taucher Hamburg e.V. - Tauchberichte, Vereinsaktivitaeten und Neuigkeiten.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News | ATH - Aquanautic-Taucher Hamburg e.V.",
    description: "Aktuelle Nachrichten und Berichte vom Tauchverein ATH Hamburg.",
    url: "https://ath-ev.de/news",
  },
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children
}
