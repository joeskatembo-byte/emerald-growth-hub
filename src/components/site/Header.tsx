import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Info,
  HandHeart,
  MessageCircle,
  UserPlus,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  History,
  Users,
  CalendarDays,
  Sparkles,
  HeartHandshake,
  CalendarClock,
  Church,
} from "lucide-react";

type NavKey = "accueil" | "apropos" | "don" | "contact" | "inscription";

const items: {
  key: NavKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  to?: string;
  submenu?: { label: string; desc: string; to: string; hash?: string; icon: React.ComponentType<{ className?: string }> }[];
}[] = [
  { key: "accueil", label: "Accueil", icon: Home, to: "/" },
  {
    key: "apropos",
    label: "À propos",
    icon: Info,
    submenu: [
      { label: "Histoire", desc: "Frise, vision & mission", to: "/a-propos", hash: "histoire", icon: History },
      { label: "Leadership", desc: "Fondateurs & conseil", to: "/a-propos", hash: "leadership", icon: Sparkles },
      { label: "Départements", desc: "Ministères et équipes", to: "/a-propos", hash: "departements", icon: Users },
      { label: "Programmes", desc: "Cultes, séminaires, retraites", to: "/a-propos", hash: "programmes", icon: CalendarDays },
    ],
  },
  { key: "don", label: "Don", icon: HandHeart, to: "/don" },
  {
    key: "contact",
    label: "Contact",
    icon: MessageCircle,
    submenu: [
      { label: "Intercession", desc: "Confier un sujet de prière", to: "/contact", hash: "intercession", icon: HeartHandshake },
      { label: "Rendez-vous pasteur", desc: "Rencontre confidentielle", to: "/contact", hash: "rendez-vous", icon: CalendarClock },
      { label: "Contacter l'église", desc: "Toute autre demande", to: "/contact", hash: "message", icon: Church },
    ],
  },
  { key: "inscription", label: "Inscription", icon: UserPlus, to: "/inscription" },
];

export function Header() {
  const [openMenu, setOpenMenu] = useState<NavKey | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [drawerStep, setDrawerStep] = useState<NavKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const routeToKey: Record<string, NavKey> = {
    "/": "accueil",
    "/a-propos": "apropos",
    "/don": "don",
    "/contact": "contact",
    "/inscription": "inscription",
  };
  const activeKey = routeToKey[pathname];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-40 w-full">
        <div className="glass-card mx-auto mt-3 flex w-[min(1200px,95%)] items-center justify-between rounded-3xl px-4 py-2.5 sm:px-5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-gradient text-white shadow-soft">
              <Church className="h-5 w-5" />
            </div>
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-sm font-bold text-foreground">Église Emmanuel</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Kinshasa · RDC</span>
            </div>
          </Link>

          {/* Desktop icon nav */}
          <nav
            className="hidden items-center gap-1 md:flex"
            onMouseLeave={() => setOpenMenu(null)}
          >
            {items.map((it) => {
              const Icon = it.icon;
              const active = openMenu === it.key;
              const btnCls =
                "group relative flex items-center gap-2 rounded-2xl px-3 py-2 text-sm text-foreground/80 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-soft hover:text-brand";
              if (it.submenu) {
                const isCurrent = activeKey === it.key;
                return (
                  <button
                    key={it.key}
                    onClick={() => setOpenMenu(active ? null : it.key)}
                    onMouseEnter={() => setOpenMenu(it.key)}
                    onFocus={() => setOpenMenu(it.key)}
                    aria-expanded={active}
                    className={btnCls + ((active || isCurrent) ? " bg-brand-soft text-brand" : "")}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{it.label}</span>
                    {isCurrent && <span className="ml-1 h-1.5 w-1.5 rounded-full bg-brand" />}
                  </button>
                );
              }
              return (
                <Link
                  key={it.key}
                  to={it.to!}
                  onClick={() => setOpenMenu(null)}
                  onMouseEnter={() => setOpenMenu(null)}
                  className={btnCls}
                  activeProps={{ className: "bg-brand-soft text-brand" }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{it.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => { setDrawer(true); setDrawerStep(null); }}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-soft text-brand md:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Desktop mega-menu panel */}
        {openMenu && (
          <div
            className="animate-fade-in mx-auto hidden w-[min(1000px,95%)] pt-2 md:block"
            onMouseEnter={() => setOpenMenu(openMenu)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <div className="glass-card grid gap-3 rounded-3xl p-4 shadow-soft sm:grid-cols-3">
              {items.find((i) => i.key === openMenu)?.submenu?.map((s) => {
                const SIcon = s.icon;
                return (
                  <Link
                    key={s.label}
                    to={s.to}
                    hash={s.hash}
                    onClick={() => setOpenMenu(null)}
                    className="hover-lift group flex items-start gap-3 rounded-2xl p-3 hover:bg-brand-soft"
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white transition-transform duration-300 group-hover:scale-110">
                      <SIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-display text-sm font-semibold text-foreground group-hover:text-brand">{s.label}</div>
                      <div className="text-xs text-muted-foreground">{s.desc}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Floating pill (fallback, after scroll) */}
      <div
        className={
          "pointer-events-none fixed bottom-5 left-1/2 z-40 -translate-x-1/2 transition-all duration-300 md:hidden " +
          (scrolled ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")
        }
      >
        <div className="pointer-events-auto glass-card flex items-center gap-1 rounded-full px-2 py-1.5 shadow-soft">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <button
                key={it.key}
                onClick={() => { setDrawer(true); setDrawerStep(it.submenu ? it.key : null); if (!it.submenu && it.to) window.location.assign(it.to); }}
                className="grid h-10 w-10 place-items-center rounded-full text-foreground/80 hover:bg-brand-soft hover:text-brand"
                aria-label={it.label}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile drawer with stepped menu */}
      {drawer && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setDrawer(false)} />
          <div className="absolute inset-x-0 bottom-0 top-16 animate-fade-in overflow-hidden rounded-t-3xl bg-background p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              {drawerStep ? (
                <button onClick={() => setDrawerStep(null)} className="flex items-center gap-1 rounded-full bg-brand-soft px-3 py-1.5 text-sm text-brand">
                  <ChevronLeft className="h-4 w-4" /> Retour
                </button>
              ) : (
                <span className="font-display text-lg font-bold">Menu</span>
              )}
              <button onClick={() => setDrawer(false)} className="grid h-9 w-9 place-items-center rounded-full bg-secondary" aria-label="Fermer">
                <X className="h-5 w-5" />
              </button>
            </div>

            {!drawerStep ? (
              <div className="grid grid-cols-2 gap-3">
                {items.map((it) => {
                  const Icon = it.icon;
                  const content = (
                    <div className="glass-card flex h-32 flex-col justify-between rounded-3xl p-4">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gradient text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm font-semibold">{it.label}</span>
                        {it.submenu && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </div>
                  );
                  if (it.submenu) {
                    return (
                      <button key={it.key} onClick={() => setDrawerStep(it.key)} className="text-left">
                        {content}
                      </button>
                    );
                  }
                  return (
                    <Link key={it.key} to={it.to!} onClick={() => setDrawer(false)}>
                      {content}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                {items.find((i) => i.key === drawerStep)?.submenu?.map((s) => {
                  const SIcon = s.icon;
                  return (
                    <Link key={s.label} to={s.to} hash={s.hash} onClick={() => setDrawer(false)} className="glass-card flex items-center gap-3 rounded-2xl p-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white">
                        <SIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-display text-sm font-semibold">{s.label}</div>
                        <div className="text-xs text-muted-foreground">{s.desc}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}