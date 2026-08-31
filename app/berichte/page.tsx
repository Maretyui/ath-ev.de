import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BerichtCard } from "@/components/berichte/bericht-card";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Berichte",
  description:
    "Aktuelle Berichte, Trainingseindrücke und Veranstaltungen aus dem Vereinsleben von Aquanautic Taucher Hamburg e.V.",
};

function excerptFromContent(content: string) {
  const plain = content
    .replace(/!\[.*?\]\(.*?\)/g, "")        // images
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")     // links → label only
    .replace(/^#{1,6}\s+/gm, "")            // headings
    .replace(/\*\*(.+?)\*\*/g, "$1")        // bold
    .replace(/\*(.+?)\*/g, "$1")            // italic
    .replace(/`{1,3}[^`]*`{1,3}/g, "")     // code
    .replace(/^[-*+]\s+/gm, "")             // unordered lists
    .replace(/^\d+\.\s+/gm, "")             // ordered lists
    .replace(/\s+/g, " ")
    .trim();

  const truncated = plain.slice(0, 140).replace(/\s+$/, "");
  return plain.length > 140 ? `${truncated}...` : truncated;
}

export default async function BerichtePage() {
  const berichte = await prisma.bericht.findMany({
    orderBy: { publishedAt: "desc" },
    include: { publisher: { select: { email: true } } },
    take: 12,
  });

  return (
    <div className="space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl space-y-6 text-center">
        <div className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Neuigkeiten & Berichte
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-heading font-semibold tracking-tight text-foreground sm:text-4xl">
            Aktuelle Berichte aus unserer Tauchgemeinschaft
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            Wir teilen Eindrücke, Trainingsberichte und Veranstaltungen aus dem Vereinsleben.
            Schau dir unsere neuesten „Berichte“ an oder melde dich direkt bei uns für mehr Informationen.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6">
        {berichte.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-muted-foreground/40 bg-muted/10 p-10 text-center text-muted-foreground">
            Es wurden noch keine Berichte veröffentlicht. Schau bitte später wieder vorbei.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {berichte.map((bericht) => (
              <BerichtCard
                key={bericht.id}
                id={bericht.id}
                title={bericht.title}
                excerpt={excerptFromContent(bericht.content)}
                publishedAt={bericht.publishedAt.toISOString()}
                image={bericht.image}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl rounded-3xl border border-border bg-background p-6 text-sm text-muted-foreground">
        <p>
          Du möchtest selbst einen Bericht veröffentlichen oder hast Fragen zu unseren Aktivitäten? Wir freuen uns immer über neue Beiträge und den Austausch mit unseren Mitgliedern. Egal ob du ein spannendes Taucherlebnis teilen möchtest oder einfach mehr über unsere Gemeinschaft erfahren willst – zögere nicht, dich bei uns zu melden!
        </p>
        <div className="mt-4 inline-flex items-center gap-3">
          <Link href="/kontakt" className="font-medium text-primary underline transition hover:text-primary/80">
            Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </div>
  );
}
