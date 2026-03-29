"use client"

import { PageShell } from "@/components/page-shell"
import Link from "next/link"
import { 
  Waves, 
  Users, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  ChevronRight,
  Heart,
  Shield,
  Sparkles
} from "lucide-react"

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

const features = [
  {
    icon: Users,
    title: "Familienverein",
    description: "Training und Ausfahrten für die ganze Familie - egal ob alle tauchen oder nur einer.",
  },
  {
    icon: GraduationCap,
    title: "Ausbildung",
    description: "Qualifizierte Tauchausbildung nach VDST/CMAS durch unser erfahrenes Netzwerk.",
  },
  {
    icon: MapPin,
    title: "Tauchspots",
    description: "Regelmäßiges Training in Hamburger Schwimmbädern und Freiwasser im Oortkatensee.",
  },
  {
    icon: Shield,
    title: "Ausrüstung",
    description: "Komplette Leihausrüstung und eigener Bauer-Kompressor in unserem Vereinsraum.",
  },
]

const highlights = [
  { label: "Jahre Erfahrung", value: "40+" },
  { label: "Aktive Mitglieder", value: "50+" },
  { label: "Tauchkurse", value: "VDST" },
]

export default function HomePage() {
  return (
    <PageShell showHero>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-200/40 to-teal-200/40 rounded-full blur-3xl" />
          <div className="absolute top-20 -left-20 w-60 h-60 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gradient-to-br from-cyan-300/20 to-blue-300/20 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 border border-cyan-100 rounded-full text-sm text-cyan-700 font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Seit über 40 Jahren in Hamburg</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6 text-balance">
              Willkommen bei den{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
                Aquanautik Tauchern
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 text-pretty">
              Einer der ältesten Tauchvereine Hamburgs. Tauche ein in eine 
              Gemeinschaft voller Leidenschaft, Abenteuer und Familiensinn.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/termine"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-400 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5"
              >
                Jetzt mitmachen
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/ausbildung"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-cyan-200 hover:bg-cyan-50/50 transition-all"
              >
                Mehr erfahren
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {highlights.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Was uns ausmacht
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Bei uns steht Gemeinschaft an erster Stelle. Ob Anfänger oder erfahrener Taucher - 
              bei uns findet jeder seinen Platz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 bg-gradient-to-b from-white to-cyan-50/30 rounded-2xl border border-cyan-100/50 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-100/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-cyan-50/50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-full text-sm text-amber-700 font-medium mb-4">
                <Heart className="w-4 h-4" />
                Unsere Geschichte
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Mehr als nur ein Tauchverein
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Die Aquanautik Taucher Hamburg sind einer der ältesten Tauchvereine 
                  Hamburgs. Seit mehr als 40 Jahren pflegen wir unsere Tradition als 
                  Familienverein.
                </p>
                <p>
                  Wollt ihr euch sportlich engagieren, ohne die Familie zu vernachlässigen? 
                  Oder sucht euer Nachwuchs nach einer neuen Herausforderung? Unser Training 
                  und Ausfahrten berücksichtigen die Interessen von Eltern und Kindern.
                </p>
                <p>
                  Selbstverständlich ist jeder herzlich eingeladen, mit uns in zwei 
                  Hamburger Schwimmbädern zu trainieren. Oder kommt doch einmal zu 
                  unserem regelmäßigen Freiwasser-Tauchen im Oortkatensee.
                </p>
              </div>
              <Link
                href="/tauchspots"
                className="inline-flex items-center gap-2 mt-6 text-cyan-600 font-semibold hover:text-cyan-700 transition-colors"
              >
                Unsere Tauchspots entdecken
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-cyan-100 via-teal-50 to-amber-50 p-8 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Decorative circles */}
                  <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-cyan-200 animate-[spin_30s_linear_infinite]" />
                  <div className="absolute w-64 h-64 rounded-full border-2 border-dashed border-teal-200/50 animate-[spin_40s_linear_infinite_reverse]" />
                  
                  {/* Center icon */}
                  <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                    <Waves className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-800 to-slate-900 p-8 md:p-12 text-center">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-balance">
                Bereit für dein nächstes Abenteuer?
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Wir freuen uns über jedes neue Gesicht. Komm vorbei und lerne uns 
                bei einem Schnuppertauchen kennen!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/termine"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5" />
                  Termine ansehen
                </Link>
                <Link
                  href="/ausbildung"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                >
                  Ausbildung starten
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
