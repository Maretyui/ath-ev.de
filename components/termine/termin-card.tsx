import Link from "next/link";
import { cn } from "@/lib/utils";

type TerminCardProps = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image?: string | null;
  isPast?: boolean;
};

export function TerminCard({ id, title, date, time, location, image, isPast }: TerminCardProps) {
  return (
    <Link
      href={`/termine/${id}`}
      className={cn(
        "group block overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
      )}
    >
      {image ? (
        <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
      ) : (
        <div className="flex h-56 items-center justify-center bg-muted text-sm text-muted-foreground">
          Kein Bild vorhanden
        </div>
      )}
      <div className="space-y-3 p-6">
        <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          <span>{date}</span>
          <span>{time}</span>
        </div>
        <h3 className="min-h-[3rem] text-lg font-semibold leading-snug text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{location}</p>
        {isPast && (
          <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            Vergangen
          </span>
        )}
      </div>
    </Link>
  );
}
