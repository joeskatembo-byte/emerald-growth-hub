import { useEffect, useState } from "react";

type Verse = { text: string; ref?: string };

type Props = {
  items: Verse[];
  className?: string;
  refClassName?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
  onIndexChange?: (i: number) => void;
};

/**
 * Effet machine à écrire (Typed.js) appliqué à la phrase entre guillemets
 * puis à la référence du livre/verset, avec curseur clignotant.
 */
export function TypedVerse({
  items,
  className,
  refClassName,
  typeSpeed = 55,
  deleteSpeed = 22,
  pause = 2600,
  onIndexChange,
}: Props) {
  const [idx, setIdx] = useState(0);
  const [len, setLen] = useState(0);
  const [refLen, setRefLen] = useState(0);
  const [phase, setPhase] = useState<"text" | "ref" | "hold" | "deleting">("text");

  const current = items[idx % items.length] ?? { text: "", ref: "" };
  const text = current.text ?? "";
  const reference = current.ref ?? "";

  useEffect(() => {
    onIndexChange?.(idx % items.length);
  }, [idx, items.length, onIndexChange]);

  useEffect(() => {
    if (phase === "text") {
      if (len < text.length) {
        const t = setTimeout(() => setLen((l) => l + 1), typeSpeed);
        return () => clearTimeout(t);
      }
      setPhase(reference ? "ref" : "hold");
      return;
    }
    if (phase === "ref") {
      if (refLen < reference.length) {
        const t = setTimeout(() => setRefLen((l) => l + 1), Math.max(24, typeSpeed - 20));
        return () => clearTimeout(t);
      }
      setPhase("hold");
      return;
    }
    if (phase === "hold") {
      const t = setTimeout(() => setPhase("deleting"), pause);
      return () => clearTimeout(t);
    }
    // deleting
    if (refLen > 0) {
      const t = setTimeout(() => setRefLen((l) => l - 1), deleteSpeed);
      return () => clearTimeout(t);
    }
    if (len > 0) {
      const t = setTimeout(() => setLen((l) => l - 1), deleteSpeed);
      return () => clearTimeout(t);
    }
    setPhase("text");
    setIdx((i) => (i + 1) % items.length);
  }, [phase, len, refLen, text, reference, items.length, typeSpeed, deleteSpeed, pause]);

  const typingText = phase === "text" || (phase === "deleting" && refLen === 0);

  return (
    <>
      <p className={className}>
        «&nbsp;{text.slice(0, len)}
        {typingText && <span className="typed-cursor typed-cursor--blink" aria-hidden="true" />}
        &nbsp;»
      </p>
      <p className={refClassName} style={{ minHeight: "1.2em" }}>
        {reference.slice(0, refLen)}
        {!typingText && <span className="typed-cursor typed-cursor--blink" aria-hidden="true" />}
      </p>
      <span className="sr-only">{items.map((v) => [v.text, v.ref].filter(Boolean).join(" ")).join(". ")}</span>
    </>
  );
}
