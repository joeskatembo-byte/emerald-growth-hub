import { Link } from "@tanstack/react-router";
import { Facebook, Youtube, Instagram, Music2, MessageCircle, Church, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 px-3 pb-6 sm:px-6">
      <div className="mx-auto max-w-[1200px] overflow-hidden rounded-3xl glass-dark shadow-soft">
        <div className="grid gap-8 p-8 sm:p-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                <Church className="h-5 w-5" />
              </div>
              <div className="font-display text-lg font-bold">Église Emmanuel</div>
            </div>
            <p className="mt-3 text-sm text-white/70">
              Une famille de foi au cœur de Kinshasa — accueillir, restaurer, envoyer.
            </p>
          </div>
          <div>
            <div className="font-display text-sm font-semibold uppercase tracking-widest text-white/80">Navigation</div>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li><Link to="/" className="hover:text-white">Accueil</Link></li>
              <li><Link to="/a-propos" className="hover:text-white">À propos</Link></li>
              <li><Link to="/don" className="hover:text-white">Don</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/inscription" className="hover:text-white">Inscription</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-display text-sm font-semibold uppercase tracking-widest text-white/80">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> Av. de la Paix 45, Kinshasa, RDC</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> +243 000 000 000</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> contact@emmanuel-rdc.org</li>
            </ul>
          </div>
          <div>
            <div className="font-display text-sm font-semibold uppercase tracking-widest text-white/80">Suivez-nous</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[Facebook, Youtube, Instagram, MessageCircle, Music2].map((Icon, i) => (
                <a key={i} href="#" aria-label="Réseau social" className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 backdrop-blur transition hover:bg-white/20">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-5 text-xs uppercase tracking-widest text-white/50">Partenaires</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Compassion", "Alliance", "Vision"].map((p) => (
                <div key={p} className="rounded-xl bg-white/5 px-3 py-1.5 text-xs text-white/60">{p}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-8 py-4 text-center text-xs text-white/50 sm:px-10">
          © {new Date().getFullYear()} Église Emmanuel — Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}