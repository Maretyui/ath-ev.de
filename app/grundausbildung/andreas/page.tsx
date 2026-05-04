import { TrainerProfile } from "@/components/grundausbildung/trainer-profile";

export default function AndreasPage() {
  return (
    <div className="bg-background text-foreground">
      <TrainerProfile
        name="Andreas Jacob"
        role="Trainer, Ausbilder, Vereinsvorsitz"
        image="https://picsum.photos/900/1200?random=12"
        qualifications={[
          "CMAS/DTSA**",
          "Trainer C Gerätetauchen",
          "Ausbilder für Kinder und Jugendliche",
        ]}
        description={[
          "Andreas bringt über 20 Jahre Erfahrung im Tauchsport mit und ist leidenschaftlicher Ausbilder für Einsteiger und Fortgeschrittene.",
          "Seine Ausbildungsschwerpunkte liegen auf sicherer Technik, behutsamer Wassergewöhnung und einem respektvollen Umgang mit der Natur.",
          "In seinen Kursen verbindet er fundiertes Wissen mit einer freundlichen, motivierenden Atmosphäre. Sein Motto: ‚lass dir mal was einfallen …‘",
        ]}
      />
    </div>
  );
}
