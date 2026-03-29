import { PageShell } from "@/components/page-shell"
import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsClub",
  name: "Aquanautik-Taucher Hamburg e.V.",
  alternateName: "ATH",
  url: "https://ath-ev.de",
  description:
    "Tauchverein in Hamburg – Ausbildung nach VDST/CMAS, Vereinstraining und Gemeinschaft.",
  sport: "Tauchen",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hamburg",
    addressCountry: "DE",
  },
}

export default function HomePage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero - Simple and clean */}
      <section className="relative flex-1 flex items-center justify-center min-h-[90vh] px-6">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[10%] w-72 h-72 rounded-full bg-cyan-100/50 blur-3xl" />
          <div className="absolute bottom-[15%] left-[5%] w-96 h-96 rounded-full bg-cyan-50/60 blur-3xl" />
        </div>

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-[15%] w-4 h-4 rounded-full bg-cyan-400/60 animate-float" />
          <div className="absolute top-[30%] right-[25%] w-2 h-2 rounded-full bg-cyan-300/50 animate-float-delayed" />
          <div className="absolute bottom-[30%] left-[12%] w-3 h-3 rounded-full bg-cyan-400/40 animate-float" />
          <div className="absolute bottom-[40%] left-[20%] w-2 h-2 rounded-full bg-cyan-300/50 animate-float-delayed" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-cyan-600 font-medium mb-4 tracking-wide">
            Tauchverein Hamburg
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6 text-balance">
            Gemeinsam abtauchen
          </h1>

          <p className="text-lg text-slate-500 max-w-lg mx-auto mb-10 leading-relaxed">
            Wir sind ein kleiner, familiärer Tauchverein aus Hamburg. 
            Ob Anfänger oder erfahren – bei uns bist du willkommen.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-colors"
            >
              Mitmachen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/ausbildung"
              className="px-7 py-3.5 text-slate-700 font-semibold rounded-full border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              Mehr erfahren
            </Link>
          </div>
        </div>
      </section>

      {/* Info section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-slate-50">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Ausbildung</p>
              <p className="text-slate-700 font-medium">VDST/CMAS zertifiziert</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Training</p>
              <p className="text-slate-700 font-medium">Wöchentlich in Hamburg</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Ausrüstung</p>
              <p className="text-slate-700 font-medium">Kompressor & Verleih</p>
            </div>
          </div>

          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Klein, familiär, und richtig gut unter Wasser.
            </h2>
            <p className="text-slate-500 leading-relaxed">
              Bei uns kann die ganze Familie mitmachen. Wir trainieren regelmäßig 
              in Hamburger Schwimmbädern und fahren zusammen zum Freiwasser. 
              Eigener Kompressor, Leihausrüstung, und Leute die sich freuen 
              wenn jemand Neues dazukommt.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl bg-slate-900 px-8 py-12 md:px-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Lust bekommen?
            </h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Schreib uns – wir melden uns und beantworten alle Fragen.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Kontakt
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
