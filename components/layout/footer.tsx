import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getUpcomingTermine() {
  try {
    return await prisma.termin.findMany({
      where: { date: { gte: new Date() } },
      orderBy: { date: "asc" },
      take: 4,
      select: { id: true, title: true, date: true },
    });
  } catch {
    return [];
  }
}

export async function Footer() {
  const termine = await getUpcomingTermine();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-300 mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-muted-foreground">
          {/* Legal links */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-foreground mb-1">Rechtliches</p>
            <Link
              href="/impressum"
              className="hover:text-primary transition-colors"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="hover:text-primary transition-colors"
            >
              Datenschutzerklärung
            </Link>
            <Link
              href="/kontakt"
              className="hover:text-primary transition-colors"
            >
              Kontakt
            </Link>
          </div>

          {/* Upcoming events */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-foreground mb-1">
              Nächste Termine
            </p>
            {termine.length === 0 ? (
              <p>Keine Termine geplant</p>
            ) : (
              termine.map((t) => (
                <Link
                  key={t.id}
                  href={`/termine/${t.id}`}
                  className="hover:text-primary transition-colors"
                >
                  <span className="block leading-tight">{t.title}</span>
                  <span className="text-xs">
                    {t.date.toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </Link>
              ))
            )}
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:items-end">
            <p className="font-semibold text-foreground mb-1">
              Aquanautic Taucher Hamburg e.V.
            </p>
            <p>© {year} Maik Reinhardt</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
