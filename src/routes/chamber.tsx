import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { TarotCard } from "@/components/tarot/TarotCard";
import { Button } from "@/components/ui/button";
import { RITE_LIST } from "@/lib/rites/catalog";
import { loadJournal } from "@/lib/tarot/journal";
import { cardOfTheDay, meaningFor } from "@/lib/tarot/shuffle";
import { SPREADS } from "@/lib/tarot/spreads";
import { cn } from "@/lib/utils";
import type { SavedReading } from "@/lib/tarot/types";

export const Route = createFileRoute("/chamber")({ component: Chamber });

function Chamber() {
  const daily = useMemo(() => cardOfTheDay(), []);
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<SavedReading[]>([]);
  const meaning = meaningFor(daily.card, daily.reversed);

  useEffect(() => {
    setRecent(loadJournal().slice(0, 3));
  }, []);

  return (
    <main className="stagger-in pb-16">
      <section className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          Sit with the cards.
        </h1>
      </section>

      <section className="mt-10 text-center">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">Today</p>
        <h2 className="font-display mt-1 text-3xl font-semibold">The day's card.</h2>
        <div className="mt-6 flex flex-col items-center">
          <TarotCard
            card={daily.card}
            faceUp={open}
            reversed={daily.reversed}
            size="lg"
            onClick={() => setOpen(true)}
            label={open ? daily.card.name : "Reveal today's card"}
          />
          <div className="mt-5 max-w-md text-center">
            <p className={cn("font-display text-2xl font-semibold", !open && "text-muted")}>
              {open ? daily.card.name : "Face down until you turn it."}
              {open && daily.reversed ? (
                <span className="ml-2 text-base font-normal text-muted">Reversed</span>
              ) : null}
            </p>
            {open ? (
              <p className="mt-3 text-sm leading-relaxed text-fg/90">{meaning.text}</p>
            ) : (
              <Button variant="outline" size="sm" className="mt-4" onClick={() => setOpen(true)}>
                Turn the card
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-5 text-center">
          <div>
            <p className="text-xs tracking-[0.18em] text-muted uppercase">When you want more</p>
            <h2 className="font-display mt-1 text-2xl font-semibold">The rites</h2>
          </div>
          <Link to="/rites" className="inline-flex h-11 items-center text-sm text-muted hover:text-fg">
            All rites
          </Link>
        </div>
        <ul className="divide-y divide-border overflow-hidden rounded-(--radius-xl) border border-border bg-surface">
          {RITE_LIST.map((rite) => (
            <li key={rite.to}>
              <Link
                to={rite.to}
                className="flex items-center gap-4 px-3 py-3 transition-colors duration-150 hover:bg-surface-2 sm:px-4"
              >
                <img
                  src={rite.image}
                  alt=""
                  className="size-16 shrink-0 rounded-(--radius-md) object-cover"
                />
                <span className="min-w-0">
                  <span className="font-display block text-lg font-semibold">{rite.name}</span>
                  <span className="text-sm text-muted">{rite.subtitle}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {recent.length > 0 ? (
        <section className="mt-14">
          <div className="mb-4 text-center">
            <h2 className="font-display text-2xl font-semibold">Recent sittings</h2>
            <Link to="/journal" className="inline-flex h-11 items-center text-sm text-muted hover:text-fg">
              Journal
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3">
            {recent.map((entry) => {
              const spread = SPREADS.find((s) => s.id === entry.spreadId);
              return (
                <li key={entry.id} className="rounded-(--radius-lg) border border-border bg-surface p-4">
                  <p className="text-xs tracking-wide text-muted uppercase">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                  <p className="font-display mt-1 text-lg font-semibold">{spread?.name ?? "Reading"}</p>
                  {entry.question ? (
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{entry.question}</p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
