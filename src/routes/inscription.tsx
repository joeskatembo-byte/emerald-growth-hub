import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LogIn, UserPlus } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { InscriptionHero } from "@/components/inscription/InscriptionHero";
import { LoginWizard } from "@/components/inscription/LoginWizard";
import { SignupWizard } from "@/components/inscription/SignupWizard";

export const Route = createFileRoute("/inscription")({
  head: () => ({
    meta: [
      { title: "Inscription — Église Emmanuel" },
      { name: "description", content: "Créez votre compte membre de l'Église Emmanuel en 4 étapes, ou connectez-vous à votre espace personnel." },
      { property: "og:title", content: "Inscription — Église Emmanuel" },
      { property: "og:description", content: "Bienvenue à la maison : devenez membre et rejoignez un département." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [tab, setTab] = useState<"connexion" | "inscription">("inscription");
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pb-8">
        <InscriptionHero />
        <section className="mx-auto mt-8 w-[min(1200px,95%)]">
          <div className="mx-auto flex w-full max-w-md gap-1 rounded-3xl bg-secondary p-1.5">
            {([
              { k: "inscription", label: "Je m'inscris", Icon: UserPlus },
              { k: "connexion", label: "Je me connecte", Icon: LogIn },
            ] as const).map(({ k, label, Icon }) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={
                  "flex flex-1 items-center justify-center gap-2 rounded-3xl px-4 py-2.5 text-sm font-medium transition " +
                  (tab === k ? "bg-card text-brand shadow-soft" : "text-muted-foreground hover:text-foreground")
                }
              >
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-6 max-w-3xl">
            <div key={tab} className="animate-fade-in">
              {tab === "inscription" ? <SignupWizard /> : <LoginWizard />}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}