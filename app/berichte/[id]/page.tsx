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

export default async function BerichtDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bericht = await prisma.bericht.findUnique({
    where: { id },
    include: { publisher: { select: { email: true, username: true } } },
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
            <span>-</span>
            <span>Autor: {bericht.publisher.username ?? bericht.publisher.email}</span>
          </div>
        </div>

        {bericht.image && (
          <div className="overflow-hidden rounded-3xl border border-border bg-muted">
            <img
              src={bericht.image}
              alt={bericht.title}
              className="h-80 w-full object-cover"
            />
          </div>
        )}

        <article
          className="text-base leading-8 text-foreground [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h4]:mb-1 [&_h4]:mt-4 [&_h4]:text-lg [&_h4]:font-medium [&_p]:mb-4 [&_p]:leading-relaxed [&_strong]:font-bold [&_em]:italic [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1.5 [&_a]:text-primary [&_a]:underline [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-sm [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-4 [&_img]:my-4 [&_img]:max-w-full [&_img]:rounded-lg"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
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
