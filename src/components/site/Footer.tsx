import { Link } from "@tanstack/react-router";
import { Facebook, Youtube, Instagram, Music2, MessageCircle, Church, MapPin, Phone, Mail, Globe } from "lucide-react";
import { useCollection, useSettings } from "@/lib/collections";
import {
  FOOTER_KEY, FOOTER_LINKS_KEY, FOOTER_SOCIALS_KEY, FOOTER_PARTNERS_KEY,
  footerSettings, footerLinks, footerSocials, footerPartners,
  type FooterSettings, type FooterLink, type FooterSocial, type FooterPartner,
} from "@/data/footer";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Facebook,
  YouTube: Youtube,
  Instagram,
  WhatsApp: MessageCircle,
  TikTok: Music2,
};

export function Footer() {
  const { value: s } = useSettings<FooterSettings>(FOOTER_KEY, footerSettings);
  const { rows: links } = useCollection<FooterLink>(FOOTER_LINKS_KEY, footerLinks);
  const { rows: socials } = useCollection<FooterSocial>(FOOTER_SOCIALS_KEY, footerSocials);
  const { rows: partners } = useCollection<FooterPartner>(FOOTER_PARTNERS_KEY, footerPartners);

  return (
    <footer className="mt-16 px-3 pb-6 sm:px-6">
      <div className="mx-auto max-w-[1200px] overflow-hidden rounded-3xl glass-dark shadow-soft">
        <div className="grid gap-8 p-8 sm:p-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                <Church className="h-5 w-5" />
              </div>
              <div className="font-display text-lg font-bold">{s.name}</div>
            </div>
            <p className="mt-3 text-sm text-white/70">{s.tagline}</p>
          </div>
          <div>
            <div className="font-display text-sm font-semibold uppercase tracking-widest text-white/80">{s.navTitle}</div>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {links.map((l) => (
                <li key={l.id}>
                  <Link to={l.to} className="hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-display text-sm font-semibold uppercase tracking-widest text-white/80">{s.contactTitle}</div>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {s.address && <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {s.address}</li>}
              {s.phone && <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> {s.phone}</li>}
              {s.email && <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> {s.email}</li>}
            </ul>
          </div>
          <div>
            <div className="font-display text-sm font-semibold uppercase tracking-widest text-white/80">{s.socialTitle}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {socials.map((so) => {
                const Icon = socialIcons[so.network] ?? Globe;
                return (
                  <a
                    key={so.id}
                    href={so.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={so.network}
                    title={so.network}
                    className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 backdrop-blur transition hover:bg-white/20"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            {partners.length > 0 && (
              <>
                <div className="mt-5 text-xs uppercase tracking-widest text-white/50">{s.partnersTitle}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {partners.map((p) => (
                    <div key={p.id} className="rounded-xl bg-white/5 px-3 py-1.5 text-xs text-white/60">{p.name}</div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="border-t border-white/10 px-8 py-4 text-center text-xs text-white/50 sm:px-10">
          © {new Date().getFullYear()} {s.legal}
        </div>
      </div>
    </footer>
  );
}
