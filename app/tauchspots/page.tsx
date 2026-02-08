"use client"

import { PageShell } from "@/components/page-shell"

const spots = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Spot #${i + 1}`,
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque tenetur commodi aliquam corrupti voluptatem illum, accusantium aut sint! Quidem, dolores.",
}))

export default function TauchspotsPage() {
  return (
    <PageShell backgroundImage="/tauchspots.png">
      <div
        className="h-[500px] max-[1000px]:h-[300px] bg-cover bg-center"
        style={{ backgroundImage: "url('/tauchspots.png')" }}
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
          Tauchspots
        </h1>

        <div className="grid grid-cols-2 max-[1000px]:grid-cols-1 gap-8 mt-8 mb-12">
          {spots.map((spot) => (
            <a key={spot.id} href="#" className="no-underline">
              <div
                className="flex items-start gap-4 p-6 max-[1000px]:p-4 max-[420px]:flex-col max-[420px]:items-center max-[420px]:text-center rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                style={{
                  backgroundColor: "var(--bg-teaser)",
                  borderColor: "var(--border-color)",
                }}
              >
                <img
                  src="https://placehold.co/600x400"
                  alt={spot.title}
                  className="w-28 h-28 max-[420px]:w-full max-[420px]:max-w-[200px] max-[420px]:h-[120px] rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h2 className="text-[1.3rem] font-bold mb-2" style={{ color: "var(--green-accent)" }}>
                    {spot.title}
                  </h2>
                  <p className="leading-relaxed m-0" style={{ color: "var(--text-secondary)" }}>
                    {spot.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
    </PageShell>
  )
}
