import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/inscription")({
  head: () => ({
    meta: [
      { title: "Inscription — Église Emmanuel" },
      { name: "description", content: "Rejoindre l'Église Emmanuel : inscription et parcours nouveaux disciples." },
      { property: "og:title", content: "Inscription — Église Emmanuel" },
      { property: "og:description", content: "Bienvenue à la maison." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto mt-10 w-[min(900px,92%)]">
        <h1 className="font-display text-4xl font-bold">Inscription</h1>
        <p className="mt-3 text-muted-foreground">Formulaire d'inscription à venir dans l'itération suivante.</p>
        <Link to="/" className="mt-6 inline-block text-brand story-link">Retour à l'accueil</Link>
      </main>
      <Footer />
    </div>
  );
}