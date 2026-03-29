"use client"

import { PageShell } from "@/components/page-shell"
import { GraduationCap, Award, Users, Clock, CheckCircle2, Sparkles } from "lucide-react"

const courses = [
  {
    level: "Anfänger",
    title: "Grundtauchschein",
    description: "Der perfekte Einstieg in die Unterwasserwelt mit fundierter Theorie und Praxis.",
    features: ["ABC-Ausbildung", "Geräteausbildung", "Freiwasser-Abschluss"],
  },
  {
    level: "Fortgeschritten",
    title: "DTSA* bis DTSA***",
    description: "Erweitere deine Fähigkeiten mit unseren aufbauenden Tauchkursen.",
    features: ["Theoretische Vertiefung", "Praktische Übungen", "Spezialisierungen"],
  },
  {
    level: "Spezial",
    title: "Spezialbrevets",
    description: "Spezialisiere dich in verschiedenen Tauch-Disziplinen.",
    features: ["Nachttauchen", "Nitrox", "Tauchsicherheit & Rettung"],
  },
]

const specialCourses = [
  "Orientierungstauchen",
  "Nachttauchen", 
  "Strömungstauchen",
  "Tauchsicherheit & Rettung",
  "Nitrox",
  "Wissenschaftliches Tauchen",
  "Umweltseminare",
]

export default function AusbildungPage() {
  return (
    <PageShell>
      <main className="flex-1">
        {/* Hero */}
        <div className="relative bg-gradient-to-b from-cyan-50 to-white py-16 md:py-24 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full blur-3xl" />
          
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-400 mb-6 shadow-lg shadow-cyan-500/25">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
              Tauchausbildung
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Wir bilden nach den Statuten des VDST (CMAS) aus. Unsere erfahrenen 
              Tauchlehrer begleiten dich vom Anfänger bis zum fortgeschrittenen Taucher.
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-amber-50 border-y border-amber-100">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-800 mb-1">Aktueller Hinweis</h3>
                <p className="text-amber-700 text-sm leading-relaxed">
                  Nach der Pandemie bauen wir unser Ausbildungsangebot wieder auf. 
                  Nicht alle Kurse sind sofort verfügbar, aber über unser Netzwerk 
                  ermöglichen wir jeden gewünschten Kurs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                Unsere Kurse
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                Von der ersten Tauchstunde bis zum Profi - wir begleiten dich auf deinem Weg.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.title}
                  className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-100/50 transition-all duration-300"
                >
                  <div className="text-sm font-medium text-cyan-600 mb-2">{course.level}</div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">{course.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{course.description}</p>
                  <ul className="space-y-2">
                    {course.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-teal-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
                  Unsere Philosophie
                </h2>
                <div className="space-y-4 text-slate-600">
                  <p>
                    Anders als bei einigen kommerziellen Verbänden gibt es bei uns weder 
                    knapp bemessene, maßlos überfüllte Pool-Termine noch Husch-Husch-Ausbildungen.
                  </p>
                  <p>
                    Wir wollen vor allem eines: euch das Tauchen beibringen. Dazu bekommt 
                    ihr von uns ein solides Fundament aus Theorie und Praxis.
                  </p>
                  <p className="font-medium text-cyan-700">
                    Und wenn eine Übung nicht auf Anhieb sitzt, drehen wir eben noch ein paar Runden.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 border border-slate-100 text-center">
                  <Users className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-800">Klein</div>
                  <div className="text-sm text-slate-500">Gruppengrößen</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-100 text-center">
                  <Clock className="w-8 h-8 text-teal-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-800">Zeit</div>
                  <div className="text-sm text-slate-500">Zum Lernen</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-100 text-center">
                  <Award className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-800">VDST</div>
                  <div className="text-sm text-slate-500">Zertifiziert</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-100 text-center">
                  <GraduationCap className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-800">CMAS</div>
                  <div className="text-sm text-slate-500">International</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Courses */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                Spezialkurse & Brevets
              </h2>
              <p className="text-slate-600">
                Für fortgeschrittene Taucher bieten wir ein breites Spektrum an Spezialisierungen.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {specialCourses.map((course) => (
                <div
                  key={course}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-100 rounded-full text-sm font-medium text-cyan-700"
                >
                  {course}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-cyan-50/50 to-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                Der Ausbildungsweg
              </h2>
            </div>

            <div className="space-y-6">
              {[
                { time: "Herbst", title: "Start der Anfängerausbildung", desc: "Beginn mit ABC-Ausbildung im Pool" },
                { time: "Winter", title: "Geräteausbildung", desc: "Umgang mit Tauchgerät und Theorie" },
                { time: "Frühjahr", title: "Freiwasser-Taufe", desc: "Abschluss mit Neptun im Freiwasser" },
              ].map((step, i) => (
                <div key={step.time} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm font-semibold text-cyan-600">{step.time}</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-500 to-teal-400 mt-1" />
                  <div className="flex-1 pb-6 border-l-2 border-cyan-100 pl-6 -ml-2">
                    <h3 className="font-semibold text-slate-800 mb-1">{step.title}</h3>
                    <p className="text-slate-600 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
