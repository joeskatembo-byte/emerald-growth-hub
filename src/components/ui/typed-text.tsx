import { useEffect, useState } from "react";

type Props = {
  items: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
};

/** Effet machine à écrire (équivalent de Typed.js) avec curseur clignotant. */
export function TypedText({ items, className, typeSpeed = 65, deleteSpeed = 32, pause = 1800 }: Props) {
  const [idx, setIdx] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const word = items[idx % items.length] ?? "";

  useEffect(() => {
    if (!deleting && len === word.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && len === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % items.length);
      return;
    }
    const t = setTimeout(() => setLen((l) => l + (deleting ? -1 : 1)), deleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(t);
  }, [len, deleting, word, items.length, pause, typeSpeed, deleteSpeed]);

  return (
    <span className={className}>
      <span>{word.slice(0, len)}</span>
      <span className="typed-cursor" aria-hidden="true" style={{ height: "0.9em" }} />
      <span className="sr-only">{items.join(", ")}</span>
    </span>
  );
}
