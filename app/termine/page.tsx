import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { TerminCard } from "@/components/termine/termin-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Termine",
  description:
    "Anstehende Termine und Veranstaltungen von Aquanautic Taucher Hamburg e.V.",
};

function formatListDate(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

export default async function TerminePage() {
  const termine = await prisma.termin.findMany({
    orderBy: { date: "asc" },
    take: 24,
  });

  const now = new Date();

  return (
    <div className="space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl space-y-6 text-center">
        <div className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Termine
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-heading font-semibold tracking-tight text-foreground sm:text-4xl">
            Unsere nächsten Vereins-Termine
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            Hier findest du unsere bevorstehenden und vergangenen Veranstaltungen. Klicke auf einen Termin, um alle Details zu sehen.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6">
        {termine.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-muted-foreground/40 bg-muted/10 p-10 text-center text-muted-foreground">
            Es sind aktuell keine Termine geplant. Schau später wieder vorbei.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {termine.map((termin) => (
              <TerminCard
                key={termin.id}
                id={termin.id}
                title={termin.title}
                date={formatListDate(termin.date)}
                time={termin.time}
                location={termin.location}
                image={termin.image}
                isPast={termin.date < now}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl rounded-3xl border border-border bg-background p-6 text-sm text-muted-foreground">
        <p>
          Du möchtest einen Termin mit uns planen oder Fragen zu einem Event stellen? Dann kontaktiere uns einfach direkt.
        </p>
      </section>
    </div>
  );
}
