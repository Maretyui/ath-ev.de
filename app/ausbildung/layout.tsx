import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ausbildung",
  description:
    "Tauchausbildung beim ATH Hamburg - VDST/CMAS Kurse vom Grundtauchschein bis DTSA***. Anfaenger- und Fortgeschrittenenausbildung in Hamburg.",
  alternates: { canonical: "/ausbildung" },
  openGraph: {
    title: "Ausbildung | ATH - Aquanautic-Taucher Hamburg e.V.",
    description: "Tauchausbildung nach VDST/CMAS Standards beim ATH Hamburg.",
    url: "https://ath-ev.de/ausbildung",
  },
}

export default function AusbildungLayout({ children }: { children: React.ReactNode }) {
  return children
}
