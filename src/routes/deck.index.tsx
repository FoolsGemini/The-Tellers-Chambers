import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DeckPicker } from "@/components/tarot/DeckPicker";
import { TarotCard } from "@/components/tarot/TarotCard";
import { CARDS, SUITS, suitLabel } from "@/lib/tarot/deck";
import { getDeck, useDeckChoice } from "@/lib/tarot/deck-choice";
import { cn } from "@/lib/utils";
import type { Suit } from "@/lib/tarot/types";

export const Route = createFileRoute("/deck/")({ component: DeckPage });

type Filter = "all" | "major" | Suit;

function DeckPage() {
  const deck = getDeck(useDeckChoice((s) => s.deckId));
  const [filter, setFilter] = useState<Filter>("all");
  const cards = useMemo(() => {
    if (filter === "all") return CARDS;
    if (filter === "major") return CARDS.filter((c) => c.arcana === "major");
    return CARDS.filter((c) => c.suit === filter);
  }, [filter]);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All 78" },
    { id: "major", label: "Major Arcana" },
    ...SUITS.map((s) => ({ id: s, label: suitLabel(s) })),
  ];

  return (
    <main className="pb-16">
      <DeckPicker />
      <header className="mx-auto mt-10 max-w-xl text-center">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">{deck.name}</p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">Seventy-eight.</h1>
        <p className="mt-3 text-muted">{deck.line}</p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "h-11 rounded-full border px-4 text-sm transition-colors duration-150",
              filter === f.id
                ? "border-accent bg-accent text-accent-fg"
                : "border-border text-muted hover:text-fg",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-subtle tabular-nums">{cards.length} cards</p>

      <ul className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {cards.map((card) => (
          <li key={card.id} className="flex flex-col items-center gap-2">
            <Link to="/deck/$cardId" params={{ cardId: card.id }} className="block">
              <TarotCard card={card} faceUp size="sm" />
            </Link>
            <p className="max-w-[6.5rem] text-center font-display text-xs leading-tight text-fg">
              {card.name}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
