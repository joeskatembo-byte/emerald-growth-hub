import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DonHero } from "@/components/don/DonHero";
import { ProjectsStack } from "@/components/don/ProjectsStack";
import { DonFaq } from "@/components/don/DonFaq";

export const Route = createFileRoute("/don")({
  head: () => ({
    meta: [
      { title: "Faire un don — Église Emmanuel" },
      { name: "description", content: "Soutenir l'œuvre : dîme, offrande, don ponctuel ou engagement mensuel. Projets en cours, réalisations et transparence financière." },
      { property: "og:title", content: "Faire un don — Église Emmanuel" },
      { property: "og:description", content: "Chaque contribution soutient la mission. Projets, transparence et impact." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pb-8">
        <DonHero />
        <ProjectsStack />
        <DonFaq />
      </main>
      <Footer />
    </div>
  );
}
