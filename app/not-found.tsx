import Link from "next/link";
import { Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Seite nicht gefunden",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <Anchor className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
      <h1 className="text-3xl font-bold">Seite nicht gefunden</h1>
      <p className="text-muted-foreground">
        Die aufgerufene Seite existiert nicht oder wurde verschoben.
      </p>
      <Link href="/">
        <Button>Zurück zur Startseite</Button>
      </Link>
    </div>
  );
}
