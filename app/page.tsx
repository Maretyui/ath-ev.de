"use client"

import dynamic from "next/dynamic"
import { PageShell } from "@/components/page-shell"
import Link from "next/link"
import { ChevronRight, Calendar, ArrowRight } from "lucide-react"

const DivingScene = dynamic(
  () => import("@/components/diving-scene").then((mod) => mod.DivingScene),
  { ssr: false }
)

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsClub",
  name: "Aquanautik-Taucher Hamburg e.V.",
  alternateName: "ATH",
  url: "https://ath-ev.de",
  description:
    "Einer der aeltesten Tauchvereine Hamburgs. Tauchausbildung nach VDST/CMAS, Vereinstraining und Gemeinschaft seit ueber 40 Jahren.",
  sport: "Tauchen",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hamburg",
    addressCountry: "DE",
  },
  memberOf: [
    { "@type": "Organization", name: "VDST" },
    { "@type": "Organization", name: "CMAS" },
  ],
}

export default function HomePage() {
  return (
    <PageShell showHero>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center px-6">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-amber-50/30" />
        
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Text content */}
            <div className="text-center lg:text-left">
              <p className="text-sm uppercase tracking-widest text-cyan-600 font-medium mb-4">
                Tauchverein Hamburg
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 leading-[1.1] mb-6 tracking-tight">
                Aquanautik
                <br />
                <span className="text-cyan-600">
                  Taucher
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto lg:mx-0">
                Entdecke die Unterwasserwelt mit uns. 
                Ob Anfänger oder Profi - bei uns bist du willkommen.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/termine"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-all"
                >
                  Schnuppertauchen
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/ausbildung"
                  className="inline-flex items-center gap-2 px-8 py-4 text-slate-700 font-semibold rounded-full border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  Mehr erfahren
                </Link>
              </div>
            </div>

            {/* 3D Scene */}
            <div className="hidden lg:block">
              <DivingScene />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-slate-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Simple Info Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                Mehr als nur ein Tauchverein
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Wir sind ein Familienverein. Bei uns sind Ausfahrten 
                  und Training so gestaltet, dass die ganze Familie mitkommen kann - 
                  egal ob alle tauchen oder nur einer.
                </p>
                <p>
                  Training in zwei Hamburger Schwimmbädern, regelmäßiges Freiwasser 
                  im Oortkatensee, und Ausbildung nach VDST/CMAS Standards.
                </p>
              </div>
              <Link
                href="/tauchspots"
                className="inline-flex items-center gap-2 mt-8 text-cyan-600 font-semibold hover:text-cyan-700 transition-colors"
              >
                Unsere Tauchspots
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-2">Training</h3>
                <p className="text-sm text-slate-600">
                  Wöchentliches Training in Hamburger Hallenbädern und Freiwasser 
                  im Sommer.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-2">Ausrüstung</h3>
                <p className="text-sm text-slate-600">
                  Komplette Leihausrüstung und eigener Kompressor im Vereinsraum 
                  verfügbar.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-2">Gemeinschaft</h3>
                <p className="text-sm text-slate-600">
                  Regelmäßige Vereinsaktivitäten, Ausfahrten und gemeinsame 
                  Tauchurlaube.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center p-12 md:p-16 rounded-3xl bg-slate-900">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Lust bekommen?
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Komm einfach zu einem Schnuppertauchen vorbei. 
              Wir freuen uns auf dich!
            </p>
            <Link
              href="/termine"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition-all"
            >
              <Calendar className="w-5 h-5" />
              Termine ansehen
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
