import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { TarotCard } from "@/components/tarot/TarotCard";
import { getCard } from "@/lib/tarot/deck";

export const Route = createFileRoute("/deck/$cardId")({
  component: CardPage,
});

function CardPage() {
  const { cardId } = Route.useParams();
  const card = getCard(cardId);
  if (!card) return <Navigate to="/deck" />;

  return (
    <main className="pb-16">
      <Link
        to="/deck"
        className="inline-flex h-11 items-center text-sm text-muted hover:text-fg"
      >
        All cards
      </Link>
      <div className="mt-6 flex flex-col items-center gap-8 text-center">
        <TarotCard card={card} faceUp size="lg" />
        <div className="max-w-xl">
          <p className="text-xs tracking-[0.18em] text-muted uppercase">
            {card.arcana === "major" ? `Major ${card.roman}` : card.suit}
          </p>
          <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">
            {card.name}
          </h1>
          <p className="mt-2 text-muted italic">{card.epithet}</p>

          <section className="mt-8">
            <h2 className="text-xs tracking-[0.18em] text-muted uppercase">Upright</h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed">{card.upright.text}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {card.upright.keywords.map((k) => (
                <li
                  key={k}
                  className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
                >
                  {k}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-xs tracking-[0.18em] text-muted uppercase">Reversed</h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed">{card.reversed.text}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {card.reversed.keywords.map((k) => (
                <li
                  key={k}
                  className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
                >
                  {k}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
