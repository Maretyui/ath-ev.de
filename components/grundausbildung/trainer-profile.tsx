
type TrainerProfileProps = {
  name: string;
  role: string;
  image: string;
  qualifications: string[];
  description: string[];
};

export function TrainerProfile({
  name,
  role,
  image,
  qualifications,
  description,
}: TrainerProfileProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-8">
          <div className="overflow-hidden rounded-[1.25rem] bg-muted shadow-sm lg:rounded-[1.5rem]">
            <img
              src={image}
              alt={name}
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-[1.5rem] border border-border bg-card p-8 shadow-sm">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
                Trainer / Ausbilder
              </p>
              <h1 className="text-4xl font-heading font-semibold tracking-tight text-foreground">
                {name}
              </h1>
              <p className="text-lg leading-8 text-primary">{role}</p>
            </div>
          </div>

          <section className="space-y-6 rounded-[1.5rem] border border-border bg-card p-8 shadow-sm">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">Qualifikationen</h2>
              <ul className="space-y-2 text-base leading-7 text-foreground">
                {qualifications.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-6 rounded-[1.5rem] border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Über {name.split(" ")[0]}</h2>
            <div className="space-y-5 text-base leading-8 text-foreground">
              {description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
