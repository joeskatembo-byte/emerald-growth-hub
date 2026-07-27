import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { HistoryTimeline } from "@/components/about/HistoryTimeline";
import { VisionMission } from "@/components/about/VisionMission";
import { Leadership } from "@/components/about/Leadership";
import { Departments } from "@/components/about/Departments";
import { Programs } from "@/components/about/Programs";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Église Emmanuel · Histoire, leadership & programmes" },
      { name: "description", content: "Découvrez l'histoire, la vision, le leadership, les départements et l'agenda de l'Église Emmanuel à Kinshasa." },
      { property: "og:title", content: "À propos — Église Emmanuel" },
      { property: "og:description", content: "Notre histoire, notre vision, nos serviteurs, nos ministères et notre agenda hebdomadaire." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pb-10">
        <AboutHero />
        <HistoryTimeline />
        <VisionMission />
        <Leadership />
        <Departments />
        <Programs />
      </main>
      <Footer />
    </div>
  );
}