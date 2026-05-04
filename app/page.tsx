import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const heroImage =
  "/quallen.png";

const welcomeText = `Die Aquanautic Taucher Hamburg sind einer der ältesten Tauchvereine Hamburgs. Seit mehr als 40 Jahren pflegen wir unsere Tradition als Familienverein. Wollt ihr euch sportlich engagieren, ohne die Familie zu vernachlässigen? Oder sucht euer Nachwuchs nach einer neuen Herausforderung? Unser Training und Ausfahrten berücksichtigen die Interessen von Eltern und Kindern – unabhängig, ob alle tauchen oder nur einer.

Selbstverständlich ist jeder herzlich eingeladen, mit uns in zwei Hamburger Schwimmbädern zu trainieren. Oder kommt doch einmal zu unserem regelmäßigen Freiwasser-Tauchen im Oortkatensee.

Ihr habt noch keinen Anzug, Atemregler oder Flaschen? Zahlreiche Ausrüstungen stehen euch – ebenso wie ein eigener Bauer-Kompressor – in unserem Vereinsraum in Billbrook zur Verfügung.

Wir hoffen sehr, dass wir unseren Verein bald persönlich präsentieren können, wie er uns über all die Jahre ans Herz gewachsen ist. Mit intensiven, fundierten Ausbildungen, Tagesausflügen an die Ostsee, Trainingswochenenden in Hemmoor und dem Pfingstlager am Schweriner See.

Wir freuen uns über jedes neue (und alte) Gesicht …`;

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <section
        className="relative flex min-h-[60vh] items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-6 py-16 sm:px-8 lg:px-10">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-white/70">
              Aquanautic Taucher Hamburg e.V.
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Willkommen bei ATH
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-100 sm:text-lg">
              Erleben Sie den Einstieg in den Tauchsport mit erfahrenen Ausbildern, moderner Ausrüstung und einer Gemeinschaft, die Sie sicher ins Wasser begleitet.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#about"
              className={`${buttonVariants({ variant: "default", size: "lg" })} inline-flex`}
            >
              Mehr erfahren
            </Link>
            <Link
              href="/intern"
              className={`${buttonVariants({ variant: "outline", size: "lg" })} inline-flex dark:text-white text-black`}
            >
              Jetzt Propetraining vereinbaren
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="bg-background py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">
              Über uns
            </h2>
            <p className="mt-6 text-base leading-8 text-foreground sm:text-lg">
              {welcomeText}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
                Grundausbildung
              </p>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                Sicher starten und wachsen
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Unsere Kurse bieten eine praxisnahe Tauchausbildung für Kinder und Jugendliche. Wir legen Wert auf Sicherheit, Teamgeist und nachhaltigen Umgang mit der Unterwasserwelt.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
                Gemeinschaft
              </p>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                Gemeinsam tauchen, gemeinsam erleben
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                ATH ist ein Treffpunkt für Familien, Freunde und neue Mitglieder. Bei Veranstaltungen und Ausfahrten entdecken wir die Faszination des Tauchens zusammen.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
                Termine
              </p>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                Nächste Aktivitäten im Blick
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Entdecken Sie unsere kommenden Trainings, Clubabende und Events. Bleiben Sie informiert und planen Sie Ihr nächstes Tauchabenteuer mit ATH.
              </p>
              <Link
                href="/termine"
                className={`${buttonVariants({ variant: "link", size: "sm" })} mt-6 inline-flex text-primary`}
              >
                Zu den Terminen
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
            Noch Fragen?
          </p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Möchten Sie an einem Propetraining teilnehmen oder haben Sie Fragen zu unserem Verein?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Kontaktieren Sie uns und wir besprechen gemeinsam Ihre Möglichkeiten im Tauchsportverein ATH.
          </p>
          <Link
            href="/kontakt"
            className={`${buttonVariants({ variant: "default", size: "lg" })} mt-8 inline-flex`}
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </div>
  );
}
