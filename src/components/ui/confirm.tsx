import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AlertOctagon, Check } from "lucide-react";

type ConfirmOptions = {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Message de la modale de succès affichée après confirmation. */
  successTitle?: string;
  successDescription?: string;
};

type Ctx = {
  confirmDelete: (options?: ConfirmOptions) => Promise<boolean>;
  notifySuccess: (title: string, description?: string) => void;
};

const ConfirmCtx = createContext<Ctx | null>(null);

/** Confirmation de suppression + message de réussite, disponibles partout. */
export function useConfirm(): Ctx {
  const ctx = useContext(ConfirmCtx);
  if (!ctx) throw new Error("useConfirm doit être utilisé dans <ConfirmProvider>");
  return ctx;
}

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [ask, setAsk] = useState<ConfirmOptions | null>(null);
  const [success, setSuccess] = useState<{ title: string; description?: string } | null>(null);
  const resolver = useRef<((v: boolean) => void) | null>(null);

  const confirmDelete = useCallback(
    (options?: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        resolver.current = resolve;
        setAsk(options ?? {});
      }),
    [],
  );

  const notifySuccess = useCallback((title: string, description?: string) => {
    setSuccess({ title, description });
  }, []);

  const close = useCallback((value: boolean) => {
    const opts = ask ?? {};
    setAsk(null);
    resolver.current?.(value);
    resolver.current = null;
    if (value) {
      setSuccess({
        title: opts.successTitle ?? "Suppression réussie",
        description: opts.successDescription ?? "L'élément a bien été supprimé. Cette action est définitive.",
      });
    }
  }, [ask]);

  useEffect(() => {
    if (!ask && !success) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (ask) close(false);
      else setSuccess(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ask, success, close]);

  const overlay = "fixed inset-0 z-[10000] grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm";
  const card = "animate-fade-in w-[min(420px,100%)] rounded-3xl bg-card p-7 text-center shadow-soft";

  return (
    <ConfirmCtx.Provider value={{ confirmDelete, notifySuccess }}>
      {children}
      {typeof document !== "undefined" && ask &&
        createPortal(
          <div className={overlay} onClick={() => close(false)}>
            <div role="alertdialog" aria-modal="true" className={card} onClick={(e) => e.stopPropagation()}>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-destructive/10">
                <AlertOctagon className="h-7 w-7 text-destructive" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{ask.title ?? "Supprimer cet élément ?"}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {ask.description ?? "Voulez-vous vraiment supprimer cet élément ? Cette action est définitive."}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => close(false)}
                  className="hover-lift rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold"
                >
                  {ask.cancelLabel ?? "Annuler"}
                </button>
                <button
                  onClick={() => close(true)}
                  className="hover-lift rounded-2xl bg-destructive px-4 py-3 text-sm font-semibold text-white shadow-soft"
                >
                  {ask.confirmLabel ?? "Supprimer"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
      {typeof document !== "undefined" && success &&
        createPortal(
          <div className={overlay} onClick={() => setSuccess(null)}>
            <div role="dialog" aria-modal="true" className={card} onClick={(e) => e.stopPropagation()}>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand shadow-soft">
                <Check className="h-8 w-8 text-white" strokeWidth={3} />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{success.title}</h3>
              {success.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{success.description}</p>
              )}
              <button
                onClick={() => setSuccess(null)}
                className="hover-lift mt-6 w-full rounded-2xl bg-brand-soft px-4 py-3 text-sm font-semibold text-brand"
              >
                Fermer
              </button>
            </div>
          </div>,
          document.body,
        )}
    </ConfirmCtx.Provider>
  );
}
