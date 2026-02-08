"use client"

import { PageShell } from "@/components/page-shell"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsClub",
  name: "Aquanautic-Taucher Hamburg e.V.",
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
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Banner - transparent, lets the background-image of main-content show through */}
      <div className="relative h-[500px] max-[1000px]:h-[300px]">
        <div className="absolute right-12 top-[45%] -translate-y-1/2 text-right z-[5] max-[1000px]:right-8 max-[1000px]:top-[25%] max-[1000px]:scale-90">
          <div
            className="text-[3.5rem] max-[1000px]:text-[2.5rem] font-light tracking-[2px] leading-[1.2]"
            style={{ color: "white", textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            Aquanautic<br />Taucher<br />Hamburg e.V.
          </div>
        </div>
      </div>

      {/* Main content area */}
      <main
        className="flex-1 px-8 py-0"
        style={{
          backgroundColor: "var(--bg-secondary)",
          backdropFilter: "blur(20px)",
          borderTop: "2px solid var(--border-color)",
        }}
      >
        <h1
          className="my-8 text-center text-[3rem] max-[800px]:text-[2.2rem] font-bold transition-colors duration-300"
          style={{ color: "var(--text-accent)" }}
        >
          Willkommen beim ATH
        </h1>
        <p
          className="text-center mx-[30%] max-[1000px]:mx-[20vw] max-[800px]:mx-[10%] max-[420px]:mx-8 text-[1.1rem] leading-relaxed mb-8 transition-colors duration-300"
          style={{ color: "var(--text-link)" }}
        >
          <br /><br />
          Die Aquanautic Taucher Hamburg sind einer der ältesten Tauchvereine Hamburgs. Seit mehr als 40
          Jahren pflegen wir unsere Tradition als Familienverein. Wollt ihr euch sportlich engagieren, ohne die
          Familie zu vernachlässigen? Oder sucht euer Nachwuchs nach einer neuen Herausforderung? Unser Training und
          Ausfahrten berücksichtigen die Interessen von Eltern und Kindern – unabhängig, ob alle tauchen oder nur
          einer.
          <br /><br />
          Allerdings stellt der gesellschaftliche Wandel auch einen Vereinsbetrieb wie den unseren auf eine Probe.
          Über Jahrzehnte haben wir uns etwa auf die Ausbildung spezialisiert. Diese Kurse können wir zum
          gegenwärtigen Zeitpunkt nur eingeschränkt anbieten. Wir verfügen aber über ein sehr gutes Netzwerk, so dass
          wir trotzdem jeden gewünschten Kurs ermöglichen können.
          <br /><br />
          Selbstverständlich ist jeder herzlich eingeladen, mit uns in zwei Hamburger Schwimmbädern zu trainieren.
          Oder kommt doch einmal zu unserem regelmäßigen Freiwasser-Tauchen im Oortkatensee.
          <br /><br />
          Ihr habt noch keinen Anzug, Atemregler oder Flaschen? Zahlreiche Ausrüstungen stehen euch – ebenso wie ein
          eigener Bauer-Kompressor – in unserem Vereinsraum in Billbrook zur Verfügung.
          <br /><br />
          Wir hoffen sehr, dass wir unseren Verein bald wieder so präsentieren können, wie er uns über all die Jahre
          ans Herz gewachsen ist. Mit intensiven, fundierten Ausbildungen, Tagesausflügen an die Ostsee,
          Trainingswochenenden in Hemmoor und dem Pfingstlager am Schweriner See.
          <br /><br />
          {'Wir freuen uns über jedes neue (und alte) Gesicht \u2026'}
        </p>
      </main>
    </PageShell>
  )
}
