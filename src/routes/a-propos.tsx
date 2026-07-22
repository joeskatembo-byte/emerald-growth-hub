import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Église Emmanuel" },
      { name: "description", content: "Historique, départements et programmes de l'Église Emmanuel à Kinshasa." },
      { property: "og:title", content: "À propos — Église Emmanuel" },
      { property: "og:description", content: "Notre histoire, nos ministères, nos programmes." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto mt-10 w-[min(900px,92%)]">
        <h1 className="font-display text-4xl font-bold">À propos</h1>
        <p className="mt-3 text-muted-foreground">Cette page sera enrichie dans l'itération suivante (historique, départements, programmes).</p>
        <Link to="/" className="mt-6 inline-block text-brand story-link">Retour à l'accueil</Link>
      </main>
      <Footer />
    </div>
  );
}