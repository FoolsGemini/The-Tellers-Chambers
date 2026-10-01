import { meaningFor } from "@/lib/tarot/shuffle";
import type { DrawnCard } from "@/lib/tarot/types";
import type { Spread } from "@/lib/tarot/types";
import { drawnToCard } from "@/lib/tarot/shuffle";
import { Link } from "@tanstack/react-router";

type Props = {
  spread: Spread;
  draw: DrawnCard;
  index: number;
};

export function MeaningPanel({ spread, draw, index }: Props) {
  const card = drawnToCard(draw);
  const position = spread.positions[index];
  const meaning = meaningFor(card, draw.reversed);

  return (
    <article className="rounded-(--radius-xl) border border-border bg-surface p-5 sm:p-6">
      <p className="text-xs tracking-wide text-muted uppercase">
        {position?.label}
        {position?.prompt ? ` · ${position.prompt}` : ""}
      </p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="font-display text-2xl font-semibold text-fg">
          {card.name}
        </h2>
        {draw.reversed ? (
          <span className="text-xs tracking-wide text-wax uppercase">Reversed</span>
        ) : (
          <span className="text-xs tracking-wide text-muted uppercase">Upright</span>
        )}
      </div>
      <p className="mt-1 text-sm text-muted italic">{card.epithet}</p>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-fg/90">
        {meaning.text}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {meaning.keywords.map((k) => (
          <li
            key={k}
            className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
          >
            {k}
          </li>
        ))}
      </ul>
      <Link
        to="/deck/$cardId"
        params={{ cardId: card.id }}
        className="mt-5 inline-flex h-11 items-center text-sm text-accent hover:underline"
      >
        Open in the deck
      </Link>
    </article>
  );
}
