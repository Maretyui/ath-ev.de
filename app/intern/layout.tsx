import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Interner Bereich",
  description: "Interner Bereich fuer Mitglieder des Aquanautic-Taucher Hamburg e.V.",
  robots: { index: false, follow: false },
}

export default function InternLayout({ children }: { children: React.ReactNode }) {
  return children
}
