import { useEffect, useState } from "react";
import { createFileRoute, useRouterState, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactChoices } from "@/components/contact/ContactChoices";
import { ContactModal, type ContactKind } from "@/components/contact/ContactModal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Église Emmanuel" },
      { name: "description", content: "Confier un sujet de prière, réserver un rendez-vous pastoral ou contacter l'église. Un accueil humain et confidentiel." },
      { property: "og:title", content: "Contact — Église Emmanuel" },
      { property: "og:description", content: "Une porte toujours ouverte : intercession, rendez-vous, message." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const VALID: ContactKind[] = ["intercession", "rendez-vous", "message"];

function Page() {
  const hash = useRouterState({ select: (s) => s.location.hash });
  const navigate = useNavigate();
  const [modal, setModal] = useState<ContactKind | null>(null);

  useEffect(() => {
    const clean = (hash || "").replace(/^#/, "") as ContactKind;
    if (VALID.includes(clean)) setModal(clean);
  }, [hash]);

  const close = () => {
    setModal(null);
    if (hash) navigate({ to: "/contact", hash: "", replace: true });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pb-8">
        <ContactHero />
        <ContactChoices onOpen={(k) => setModal(k)} />
      </main>
      <Footer />
      {modal && <ContactModal kind={modal} onClose={close} />}
    </div>
  );
}
