import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termine",
  description:
    "Aktuelle Veranstaltungen und Termine des Aquanautic-Taucher Hamburg e.V. - Trainingszeiten, Tauchausfluege und Vereinsevents.",
  alternates: { canonical: "/termine" },
  openGraph: {
    title: "Termine | ATH - Aquanautic-Taucher Hamburg e.V.",
    description: "Veranstaltungen und Termine des Tauchvereins ATH Hamburg.",
    url: "https://ath-ev.de/termine",
  },
}

export default function TermineLayout({ children }: { children: React.ReactNode }) {
  return children
}
