import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/don")({
  head: () => ({
    meta: [
      { title: "Faire un don — Église Emmanuel" },
      { name: "description", content: "Soutenir l'œuvre : dîme, offrande, don ponctuel ou engagement mensuel." },
      { property: "og:title", content: "Faire un don — Église Emmanuel" },
      { property: "og:description", content: "Chaque contribution soutient la mission." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto mt-10 w-[min(900px,92%)]">
        <h1 className="font-display text-4xl font-bold">Faire un don</h1>
        <p className="mt-3 text-muted-foreground">Page à venir : modes de don, engagement mensuel, transparence.</p>
        <Link to="/" className="mt-6 inline-block text-brand story-link">Retour à l'accueil</Link>
      </main>
      <Footer />
    </div>
  );
}