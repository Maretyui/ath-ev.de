import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tauchspots",
  description:
    "Tauchspots und Tauchplaetze des ATH Hamburg - Oortkatensee, Ostsee und weitere Tauchgewaesser in und um Hamburg.",
  alternates: { canonical: "/tauchspots" },
  openGraph: {
    title: "Tauchspots | ATH - Aquanautic-Taucher Hamburg e.V.",
    description: "Unsere Tauchspots in und um Hamburg.",
    url: "https://ath-ev.de/tauchspots",
  },
}

export default function TauchspotsLayout({ children }: { children: React.ReactNode }) {
  return children
}
