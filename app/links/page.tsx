"use client"

import { PageShell } from "@/components/page-shell"
import { ExternalLink, Link2, Wrench, Heart, Building2, Camera, Waves, Store } from "lucide-react"

const linkCategories = [
  {
    title: "Technisches",
    icon: Wrench,
    links: [
      { name: "Wartungspreise Rehn", url: "https://ath-ev.de/wp-content/uploads/2023/01/2021_Rehn_Preisliste.pdf" },
    ],
  },
  {
    title: "Medizinisches",
    icon: Heart,
    links: [
      { name: "Erste Hilfe Online (DRK)", url: "http://www.drk.de/angebote/erste-hilfe-und-rettung/erste-hilfe-online.html" },
      { name: "Druckkammern und Tauchärzte (GTÜM)", url: "http://www.gtuem.org" },
    ],
  },
  {
    title: "Tauchorganisationen",
    icon: Building2,
    links: [
      { name: "HTSB", url: "http://www.htsb-ev.de/" },
      { name: "VDST", url: "http://www.vdst.de/" },
      { name: "VDST Mediathek (Downloads)", url: "http://www.vdst.de/mediathek/downloads/versicherung-medizin.html" },
      { name: "CMAS", url: "http://www.cmas.org/" },
    ],
  },
  {
    title: "Unterwasserfotos",
    icon: Camera,
    links: [
      { name: "Nacktschnecken", url: "http://www.medslugs.de/E/Ind/select.htm" },
      { name: "Jeff's Nudibranch Site", url: "http://divegallery.com/" },
      { name: "Starfish", url: "http://www.starfish.ch/" },
    ],
  },
  {
    title: "Gewässerinformationen",
    icon: Waves,
    links: [
      { name: "Hohendeicher See (Hamburg.de)", url: "https://www.hamburg.de/hohendeicher-see-sued/" },
      { name: "Hohendeicher See Biodiversität", url: "http://www.hohendeichersee.info/" },
    ],
  },
  {
    title: "Tauchläden in Hamburg",
    icon: Store,
    links: [
      { name: "Tauchen Hamburg", url: "http://www.tauchen-hamburg.de/index.php" },
      { name: "Taucher-Zentrum Planet Scuba", url: "http://www.taucher-zentrum.de/" },
      { name: "Bleckys Tauchservice", url: "http://www.bleckys-tauchservice.de/home.html" },
      { name: "Aqua Mare Tauch- und Wassersportzentrum", url: "http://www.aqua-mare.de/" },
    ],
  },
]

export default function LinksPage() {
  return (
    <PageShell>
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-b from-cyan-50 to-white py-12 md:py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-400 mb-4 shadow-lg shadow-cyan-500/25">
            <Link2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            Nützliche Links
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto px-6">
            Eine Sammlung hilfreicher Ressourcen rund ums Tauchen
          </p>
        </div>

        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm text-slate-500 text-center">
            Diese Liste erhebt keinen Anspruch auf Vollständigkeit. Wir übernehmen keine 
            Verantwortung für den Inhalt verlinkter Seiten.
          </div>
        </div>

        {/* Links Grid */}
        <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {linkCategories.map((category) => (
              <div
                key={category.title}
                className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-cyan-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-50 to-teal-50 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-cyan-600" />
                  </div>
                  <h2 className="font-semibold text-slate-800">{category.title}</h2>
                </div>
                <ul className="space-y-2">
                  {category.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-cyan-600 transition-colors group"
                      >
                        <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                        <span className="group-hover:underline">{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  )
}
