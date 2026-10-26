import { useEffect, useState } from "react";
import { Paywall } from "@/components/pass/Paywall";
import { DECKS, useDeckChoice, type DeckId } from "@/lib/tarot/deck-choice";
import { usePass } from "@/lib/pass/use-pass";
import { cn } from "@/lib/utils";

export function DeckPicker({ className }: { className?: string }) {
  const deckId = useDeckChoice((s) => s.deckId);
  const setDeck = useDeckChoice((s) => s.setDeck);
  const pass = usePass();
  const [ask, setAsk] = useState(false);
  const locked = pass.ready && !pass.open;

  useEffect(() => {
    if (locked && deckId !== "chamber") setDeck("chamber");
  }, [locked, deckId, setDeck]);

  return (
    <section className={className}>
      <p className="text-center text-xs tracking-[0.18em] text-muted uppercase">The book</p>
      <h2 className="font-display mt-1 text-center text-2xl font-semibold">Which deck she keeps.</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {DECKS.map((deck) => {
          const on = deck.id === deckId;
          const held = locked && deck.id !== "chamber";
          return (
            <li key={deck.id}>
              <button
                type="button"
                onClick={() => {
                  if (held) {
                    setAsk(true);
                    return;
                  }
                  setAsk(false);
                  setDeck(deck.id as DeckId);
                }}
                aria-pressed={on}
                className={cn(
                  "flex w-full items-center gap-3 rounded-(--radius-xl) border p-2 text-left transition-colors duration-150 sm:flex-col sm:items-stretch sm:p-3",
                  on
                    ? "border-accent bg-surface-2"
                    : "border-border bg-surface hover:bg-surface-2",
                  held && "opacity-80",
                )}
              >
                <img
                  src={deck.sample}
                  alt=""
                  className="aspect-[2/3] w-16 shrink-0 rounded-(--radius-md) object-cover sm:w-full"
                  draggable={false}
                />
                <span className="min-w-0">
                  <span className="font-display block text-lg leading-tight font-semibold">
                    {deck.name}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {held ? "Locked · $9.99" : deck.line}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {ask ? <Paywall compact /> : null}
    </section>
  );
}