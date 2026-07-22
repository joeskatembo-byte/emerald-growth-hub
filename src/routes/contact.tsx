import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Église Emmanuel" },
      { name: "description", content: "Intercession, rendez-vous avec le pasteur, ou contact général." },
      { property: "og:title", content: "Contact — Église Emmanuel" },
      { property: "og:description", content: "Nous sommes à votre écoute." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto mt-10 w-[min(900px,92%)]">
        <h1 className="font-display text-4xl font-bold">Contact</h1>
        <p className="mt-3 text-muted-foreground">Les trois formulaires (intercession, RDV pasteur, contact général) arrivent dans l'itération suivante.</p>
        <Link to="/" className="mt-6 inline-block text-brand story-link">Retour à l'accueil</Link>
      </main>
      <Footer />
    </div>
  );
}