"use client"

import { PageShell } from "@/components/page-shell"
import { MapPin, Waves, Droplets, Fish, Compass } from "lucide-react"

const spots = [
  {
    id: 1,
    title: "Oortkatensee",
    location: "Hamburg-Billbrook",
    description: "Unser Haustauchgewässer für regelmäßiges Freiwassertauchen. Perfekt für Training und entspannte Vereinstauchgänge.",
    features: ["Freiwasser", "Vereinstauchen", "Anfängerfreundlich"],
    icon: Waves,
  },
  {
    id: 2,
    title: "Hohendeicher See",
    location: "Hamburg-Süd",
    description: "Ein beliebtes Tauchgewässer im Süden Hamburgs mit interessanter Unterwasserwelt und guter Infrastruktur.",
    features: ["Biodiversität", "Gute Sicht", "Parkplätze"],
    icon: Fish,
  },
  {
    id: 3,
    title: "Schwimmbad Billstedt",
    location: "Hamburg-Billstedt",
    description: "Unser Trainingspool für regelmäßige Übungen und Ausbildungsstunden im warmen Wasser.",
    features: ["Pooltraining", "Ausbildung", "Regelmäßig"],
    icon: Droplets,
  },
  {
    id: 4,
    title: "Hemmoor",
    location: "Niedersachsen",
    description: "Der Kreidesee Hemmoor ist ein Highlight für Trainingswochenenden mit bis zu 60m Tiefe und versunkenen Objekten.",
    features: ["Tieftauchen", "Wochenendausflüge", "Wracks"],
    icon: Compass,
  },
  {
    id: 5,
    title: "Schweriner See",
    location: "Mecklenburg-Vorpommern",
    description: "Traditionelles Ziel unseres jährlichen Pfingstlagers mit Camping und Gemeinschaft.",
    features: ["Pfingstlager", "Camping", "Tradition"],
    icon: Fish,
  },
  {
    id: 6,
    title: "Ostsee",
    location: "Schleswig-Holstein",
    description: "Regelmäßige Tagesausflüge zur Ostsee für spannendes Salzwassertauchen.",
    features: ["Meerestauchen", "Tagestouren", "Abenteuer"],
    icon: Waves,
  },
]

export default function TauchspotsPage() {
  return (
    <PageShell>
      <main className="flex-1">
        {/* Hero */}
        <div className="relative bg-gradient-to-b from-cyan-50 to-white py-16 md:py-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl" />
          
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-400 mb-6 shadow-lg shadow-teal-500/25">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
              Unsere Tauchspots
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Von Hamburger Seen bis zur Ostsee - entdecke mit uns die 
              schönsten Tauchreviere in und um Hamburg.
            </p>
          </div>
        </div>

        {/* Spots Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spots.map((spot) => (
                <div
                  key={spot.id}
                  className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-100/50 transition-all duration-300"
                >
                  {/* Header with icon */}
                  <div className="h-32 bg-gradient-to-br from-cyan-400 via-teal-400 to-cyan-500 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
                    <spot.icon className="w-16 h-16 text-white/90 group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-cyan-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      {spot.location}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-cyan-700 transition-colors">
                      {spot.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                      {spot.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {spot.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs font-medium rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Ausrüstung vorhanden
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Ihr habt noch keinen Anzug, Atemregler oder Flaschen? Kein Problem! 
              Zahlreiche Ausrüstungen stehen euch in unserem Vereinsraum in Billbrook zur Verfügung.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-400 text-white font-semibold rounded-xl shadow-lg">
              <Droplets className="w-5 h-5" />
              Eigener Bauer-Kompressor
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
