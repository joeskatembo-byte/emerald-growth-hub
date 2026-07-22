import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HeroBento } from "@/components/home/HeroBento";
import { NewsStories } from "@/components/home/NewsStories";
import { CallCards } from "@/components/home/CallCards";
import { TestimonialsStack } from "@/components/home/TestimonialsStack";
import { MediaLibrary } from "@/components/home/MediaLibrary";
import { HorizontalAccordion } from "@/components/home/HorizontalAccordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Église Emmanuel — Une famille de foi à Kinshasa" },
      { name: "description", content: "Accueillir, restaurer, envoyer. Cultes, séminaires, intercession et actualités de l'Église Emmanuel en RDC." },
      { property: "og:title", content: "Église Emmanuel — Une famille de foi à Kinshasa" },
      { property: "og:description", content: "Rejoignez une communauté vivante : cultes, prières, action de grâce, médiathèque." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroBento />
        <NewsStories />
        <CallCards />
        <TestimonialsStack />
        <MediaLibrary />
        <HorizontalAccordion />
      </main>
      <Footer />
    </div>
  );
}
