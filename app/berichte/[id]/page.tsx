import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { renderMarkdownToHtml } from "@/lib/markdown";

export const dynamic = "force-dynamic";

function formatPublishedAt(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function BerichtDetailPage({ params }: { params: { id: string } }) {
  const bericht = await prisma.bericht.findUnique({
    where: { id: params.id },
    include: { publisher: { select: { email: true } } },
  });

  if (!bericht) {
    notFound();
  }

  const bodyHtml = renderMarkdownToHtml(bericht.content);
  const relatedBerichte = await prisma.bericht.findMany({
    where: { id: { not: bericht.id } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <div className="space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
        <div className="space-y-4">
          <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Bericht
          </div>
          <h1 className="text-3xl font-heading font-semibold tracking-tight text-foreground sm:text-4xl">
            {bericht.title}
          </h1>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
            <span>Veröffentlicht am {formatPublishedAt(bericht.publishedAt)}</span>
            <span>|</span>
            <span>Autor: {bericht.publisher.email}</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-muted">
          <img
            src={bericht.image}
            alt={bericht.title}
            className="h-80 w-full object-cover"
          />
        </div>

        <article className="space-y-6 text-base leading-8 text-foreground">
          <div className="prose max-w-none [&_*]:text-foreground [&_*]:max-w-none" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        </article>

        <div className="rounded-3xl bg-muted p-6 text-sm text-muted-foreground">
          <p>
            Dieser Bericht wurde von einem unserer Vereinsverantwortlichen veröffentlicht. Wenn du Fragen zur Veranstaltung oder zum Inhalt hast, melde dich gern bei uns.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-6">
        <Link href="/berichte" className="text-sm font-medium text-primary underline transition hover:text-primary/80">
          Zurück zur Berichte-Übersicht
        </Link>

        {relatedBerichte.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Weitere Berichte</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedBerichte.map((related) => (
                <Link
                  key={related.id}
                  href={`/berichte/${related.id}`}
                  className="rounded-3xl border border-border bg-background p-5 transition hover:border-foreground/20 hover:shadow-sm"
                >
                  <div className="text-sm uppercase tracking-[0.24em] text-muted-foreground">{formatPublishedAt(related.publishedAt)}</div>
                  <div className="mt-3 text-lg font-semibold text-foreground">{related.title}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
