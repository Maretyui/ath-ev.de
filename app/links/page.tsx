"use client"

import { PageShell } from "@/components/page-shell"

export default function LinksPage() {
  return (
    <PageShell backgroundImage="/links.png">
      <div
        className="h-[500px] max-[1000px]:h-[300px] bg-cover bg-top"
        style={{ backgroundImage: "url('/links.png')" }}
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
          Links
        </h1>

        <div
          className="text-left mx-[30%] max-[1000px]:mx-[20vw] max-[800px]:mx-[10%] max-[420px]:mx-8 text-[1.1rem] leading-relaxed mb-8 transition-colors duration-300"
          style={{ color: "var(--text-link)" }}
        >
          <p className="mb-6">
            Diese Liste erhebt keinen Anspruch auf Vollständigkeit. Wir übernehmen keine Verantwortung für
            den Inhalt dieser Seiten oder folgender Links.
          </p>

          <h5 className="text-[1.4rem] uppercase font-bold mb-3 mt-6" style={{ color: "var(--text-primary)" }}>
            Technisches
          </h5>
          <ul className="list-disc ml-12 mb-6">
            <li>
              <a href="https://ath-ev.de/wp-content/uploads/2023/01/2021_Rehn_Preisliste.pdf" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                Wartungspreise Rehn
              </a>
            </li>
          </ul>

          <h5 className="text-[1.4rem] uppercase font-bold mb-3 mt-6" style={{ color: "var(--text-primary)" }}>
            Medizinisches
          </h5>
          <ul className="list-disc ml-12 mb-6">
            <li>
              <a href="http://www.drk.de/angebote/erste-hilfe-und-rettung/erste-hilfe-online.html" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                Erste Hilfe Online (Angebot des DRK)
              </a>
            </li>
            <li>
              <a href="http://www.gtuem.org" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                Verzeichnis Druckkammern und Tauchärzte (GTÜM e.V.)
              </a>
            </li>
          </ul>

          <h5 className="text-[1.4rem] uppercase font-bold mb-3 mt-6" style={{ color: "var(--text-primary)" }}>
            Tauchorganisationen
          </h5>
          <ul className="list-disc ml-12 mb-6">
            <li>
              <a href="http://www.htsb-ev.de/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                HTSB
              </a>
            </li>
            <li>
              <a href="http://www.vdst.de/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                VDST
              </a>
              <ul className="list-disc ml-6">
                <li>
                  <a href="http://www.vdst.de/mediathek/downloads/versicherung-medizin.html" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                    VDST Mediathek (Downloads)
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="http://www.cmas.org/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                CMAS
              </a>
            </li>
          </ul>

          <h5 className="text-[1.4rem] uppercase font-bold mb-3 mt-6" style={{ color: "var(--text-primary)" }}>
            Unterwasserfotos
          </h5>
          <ul className="list-disc ml-12 mb-6">
            <li>
              <a href="http://www.medslugs.de/E/Ind/select.htm" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                Nacktschnecken
              </a>
            </li>
            <li>
              <a href="http://divegallery.com/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                {"Jeff's Nudibranch Site and Coral Reef Gallery (englisch)"}
              </a>
            </li>
            <li>
              <a href="http://www.starfish.ch/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                Starfish (englisch)
              </a>
            </li>
          </ul>

          <h5 className="text-[1.4rem] uppercase font-bold mb-3 mt-6" style={{ color: "var(--text-primary)" }}>
            GEWÄSSERINFORMATIONEN
          </h5>
          <ul className="list-disc ml-12 mb-6">
            <li>
              <strong>Hohendeicher See</strong>
              <ul className="list-disc ml-6">
                <li>
                  <a href="https://www.hamburg.de/hohendeicher-see-sued/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                    Gewässerinfo (Hamburg.de)
                  </a>
                </li>
                <li>
                  <a href="http://www.hohendeichersee.info/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                    Biodiversität (u.a. Artenlexikon)
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <h5 className="text-[1.4rem] uppercase font-bold mb-3 mt-6" style={{ color: "var(--text-primary)" }}>
            Ein paar der vielen Tauchläden in Hamburg
          </h5>
          <ul className="list-disc ml-12 mb-6">
            <li>
              <a href="http://www.tauchen-hamburg.de/index.php" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                Tauchen Hamburg
              </a>
            </li>
            <li>
              <a href="http://www.taucher-zentrum.de/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                Taucher-Zentrum Planet Scuba
              </a>
            </li>
            <li>
              <a href="http://www.bleckys-tauchservice.de/home.html" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                Bleckys Tauchservice
              </a>
            </li>
            <li>
              <a href="http://www.aqua-mare.de/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "inherit" }}>
                Aqua Mare Tauch- und Wassersportzentrum
              </a>
            </li>
          </ul>
        </div>
      </main>
    </PageShell>
  )
}
