import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Links",
  description:
    "Nuetzliche Links fuer Taucher - Tauchorganisationen, Tauchlaeden in Hamburg, Gewaesserinformationen und medizinische Ressourcen.",
  alternates: { canonical: "/links" },
  openGraph: {
    title: "Links | ATH - Aquanautic-Taucher Hamburg e.V.",
    description: "Nuetzliche Links rund ums Tauchen.",
    url: "https://ath-ev.de/links",
  },
}

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return children
}
