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

      {/* Hero */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[92vh] px-6">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #0891b2 0%, transparent 70%)",
              animation: "pulse 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
              animation: "pulse 10s ease-in-out infinite reverse",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
            style={{
              background: "radial-gradient(circle, #0e7490 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Floating rings decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-[15%] right-[8%] w-40 h-40 rounded-full border border-cyan-200/60"
            style={{ animation: "spin 20s linear infinite" }}
          />
          <div
            className="absolute top-[18%] right-[8.75%] w-28 h-28 rounded-full border border-cyan-300/40"
            style={{ animation: "spin 15s linear infinite reverse" }}
          />
          <div
            className="absolute bottom-[20%] left-[6%] w-24 h-24 rounded-full border border-cyan-200/50"
            style={{ animation: "spin 18s linear infinite" }}
          />
          <div
            className="absolute bottom-[25%] left-[8%] w-14 h-14 rounded-full border-2 border-cyan-400/30"
            style={{ animation: "spin 12s linear infinite reverse" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            Tauchverein Hamburg
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 leading-[1.05] tracking-tight mb-6 text-balance">
            Gemeinsam
            <br />
            <span className="text-cyan-600">unter Wasser</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Wir sind ein kleiner, familiärer Tauchverein aus Hamburg.
            Ob du gerade erst anfängst oder schon lange tauchst –
            hier bist du richtig.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-slate-900 text-white font-semibold rounded-full text-base hover:bg-slate-700 transition-all duration-200 shadow-lg shadow-slate-900/20"
            >
              Mitmachen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/ausbildung"
              className="inline-flex items-center gap-2 px-8 py-4 text-slate-700 font-semibold rounded-full text-base border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
            >
              Ausbildung
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-1 text-slate-400">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-slate-300" />
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5 leading-tight text-balance">
                Klein, familiär, und wirklich schön unter Wasser.
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5">
                Bei uns kann die ganze Familie mitmachen – egal ob alle tauchen oder nur einer.
                Wir trainieren in Hamburger Schwimmbädern und fahren regelmäßig
                zum Freiwasser.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Ausbildung nach VDST/CMAS, eigener Kompressor, Leihausrüstung – und Leute,
                die sich wirklich freuen wenn jemand Neues dazukommt.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Ausbildung</p>
                <p className="text-sm text-slate-600">VDST/CMAS zertifiziert</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Training</p>
                <p className="text-sm text-slate-600">Wöchentlich in HH</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Ausrüstung</p>
                <p className="text-sm text-slate-600">Kompressor & Verleih</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 md:px-14 text-center">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
              />
              <div
                className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #0891b2, transparent)" }}
              />
            </div>
            <h2 className="relative text-2xl md:text-3xl font-bold text-white mb-3 text-balance">
              Lust auf&apos;s Tauchen?
            </h2>
            <p className="relative text-slate-400 mb-8 max-w-md mx-auto">
              Schreib uns einfach – wir melden uns und erklären alles.
            </p>
            <Link
              href="/kontakt"
              className="relative inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition-all"
            >
              <Mail className="w-5 h-5" />
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.05); opacity: 0.25; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </PageShell>
  )
}
