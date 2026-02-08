"use client"

import { PageShell } from "@/components/page-shell"

export default function AusbildungPage() {
  return (
    <PageShell backgroundImage="/ausbildung.png">
      <div
        className="h-[500px] max-[1000px]:h-[300px] bg-cover bg-center"
        style={{ backgroundImage: "url('/ausbildung.png')" }}
      />

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
          Ausbildung
        </h1>
        <p
          className="text-center mx-[30%] max-[1000px]:mx-[20vw] max-[800px]:mx-[10%] max-[420px]:mx-8 text-[1.1rem] leading-relaxed mb-8 transition-colors duration-300"
          style={{ color: "var(--text-link)" }}
        >
          Ausbildung nach Corona: Die Pandemie hat auch unseren Verein geschwächt. Derzeit bauen wir unser
          Ausbildungsangebot gegenwärtig neu auf und weisen daher darauf hin, dass wir nicht alle Kurse wie gewohnt
          anbieten können.
          <br /><br />
          Wir bilden nach den Statuten des VDST (CMAS) aus. Unsere Tauchlehrer und Übungsleiter bieten
          dabei eine Bandbreite von den Kindertauchsportabzeichen über den Grundtauchschein bis zum DTSA***.
          <br /><br />
          Die Ausbildung unserer Mitglieder ist ein wichtiger Bestandteil des Vereinslebens. Anfänger wie
          Fortgeschrittene haben bei uns das gleiche Ziel, den Tauchsport sicher und mit Umsicht durchzuführen.
          Normalerweise beginnt die Anfängerausbildung bei uns im Herbst. Nachdem die ABC-Ausbildung beendet ist,
          beginnen unsere Tauchlehrer mit der Geräteausbildung. Diese Ausbildung geht über mehrere Monate, bis sie
          {'dann im Frühjahr mit der Freiwasser-"Taufe" durch Neptun beendet wird.'}
          <br /><br />
          Anders als bei einigen kommerziellen Verbänden gibt es bei uns weder knapp bemessene, maßlos überfüllte
          Pool-Termine noch Husch-Husch-Ausbildungen von zu großen Gruppen. Wir wollen vor allem eines: euch das
          Tauchen beibringen. Dazu bekommt ihr von uns ein solides Fundament aus Theorie und Praxis. Und wenn eine
          Übung nicht auf Anhieb sitzt, drehen wir eben noch ein paar Runden.
          <br /><br />
          Durch die teilweise Spezialisierung unserer Tauchlehrer und weiteren Abnahmeberechtigten können wir zudem
          ein interessantes Spektrum weiterer Disziplinen und Spezialkurse anbieten. So bieten wir für unsere
          fortgeschrittenen Taucher verschiedene Spezialbrevets wie Orientierungstauchen, Nachttauchen,
          Strömungstauchen, Tauchsicherheit und Rettung, Nitrox, wissenschaftliches Tauchen und Umweltseminare an.
        </p>
      </main>
    </PageShell>
  )
}
