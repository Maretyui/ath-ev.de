import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card";

type BerichtCardProps = {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  image: string;
};

export function BerichtCard({ id, title, excerpt, publishedAt, image }: BerichtCardProps) {
  return (
    <Card className="group overflow-hidden border border-border transition-all duration-200 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg">
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.12), rgba(15, 23, 42, 0.5)), url(${image})` }}
        role="img"
        aria-label={title}
      />
      <CardContent>
        <CardHeader className="gap-2">
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{new Date(publishedAt).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}</div>
        </CardHeader>
        <CardDescription className="mt-2 text-sm leading-6 text-muted-foreground">{excerpt}</CardDescription>
      </CardContent>
      <CardAction className="px-4 pb-4 pt-2">
        <Link
          href={`/berichte/${id}`}
          aria-label={`Mehr lesen: ${title}`}
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Mehr lesen
        </Link>
      </CardAction>
    </Card>
  );
}
