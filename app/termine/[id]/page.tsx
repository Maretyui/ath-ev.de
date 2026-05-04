import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { renderMarkdownToHtml } from "@/lib/markdown";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatDetailDate(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function TerminDetailPage({ params }: { params: { id: string } }) {
  const termin = await prisma.termin.findUnique({
    where: { id: params.id },
    include: { createdBy: { select: { email: true } } },
  });

  if (!termin) {
    notFound();
  }

  const bodyHtml = termin.description ? renderMarkdownToHtml(termin.description) : "";
  const relatedTermine = await prisma.termin.findMany({
    where: { id: { not: termin.id }, date: { gte: new Date() } },
    orderBy: { date: "asc" },
    take: 3,
  });

  return (
    <div className="space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
        {termin.image ? (
          <div className="overflow-hidden rounded-3xl border border-border bg-muted">
            <img src={termin.image} alt={termin.title} className="h-[420px] w-full object-cover" />
          </div>
        ) : null}

        <div className="space-y-4">
          <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Termin
          </div>
          <h1 className="text-3xl font-heading font-semibold tracking-tight text-foreground sm:text-4xl">
            {termin.title}
          </h1>
          <div className="grid gap-3 rounded-3xl border border-border bg-background p-5 text-sm text-muted-foreground sm:grid-cols-3">
            <div>
              <p className="font-semibold text-foreground">Datum</p>
              <p>{formatDetailDate(termin.date)}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Zeit</p>
              <p>{termin.time}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Ort</p>
              <p>{termin.location}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          {bodyHtml ? (
            <article className="prose prose-neutral max-w-none text-foreground [&_img]:max-w-full [&_img]:h-auto" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          ) : (
            <p className="text-base leading-8 text-muted-foreground">
              Zu diesem Termin gibt es momentan keine ausführliche Beschreibung.
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-4">
        <Link href="/termine" className="text-sm font-medium text-primary underline transition hover:text-primary/80">
          Zurück zur Termin-Übersicht
        </Link>

        {relatedTermine.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Weitere kommende Termine</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedTermine.map((related) => (
                <Link
                  key={related.id}
                  href={`/termine/${related.id}`}
                  className="rounded-3xl border border-border bg-background p-5 transition hover:border-foreground/20 hover:shadow-sm"
                >
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                    {formatDate(related.date)} · {related.time}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-foreground">{related.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{related.location}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
