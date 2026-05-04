import { TrainerProfile } from "@/components/grundausbildung/trainer-profile";

export default function MaikPage() {
  return (
    <div className="bg-background text-foreground">
      <TrainerProfile
        name="Maik Reinhardt"
        role="Ausbilder, Trainer, Jugendwart"
        image="https://picsum.photos/900/1200?random=34"
        qualifications={[
          "CMAS/DTSA**",
          "Trainer-C Gerätetauchen",
          "DLRG Jugendausbildungsassistent",
          "Ausbilder für Kinder und Jugendliche",
        ]}
        description={[
          "Maik ist seit vielen Jahren im Verein aktiv und begleitet neue Mitglieder von den ersten Tauchversuchen bis zu selbstständigen Tauchgängen.",
          "Als erfahrener Trainer legt er besonderen Wert auf partnerschaftliche Teamarbeit, präzise Ausbildung und ein gutes Miteinander im Verein.",
          "Seine Vision ist ein Verein, in dem sich jede Taucherin und jeder Taucher geborgen fühlt und die Faszination der Unterwasserwelt sicher entdeckt.",
        ]}
      />
    </div>
  );
}
