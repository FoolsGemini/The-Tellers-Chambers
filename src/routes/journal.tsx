import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { TarotCard } from "@/components/tarot/TarotCard";
import { Button } from "@/components/ui/button";
import { getCard } from "@/lib/tarot/deck";
import { loadJournal, removeReading } from "@/lib/tarot/journal";
import { getSpread } from "@/lib/tarot/spreads";
import type { SavedReading } from "@/lib/tarot/types";

export const Route = createFileRoute("/journal")({ component: JournalPage });

function JournalPage() {
  const [entries, setEntries] = useState<SavedReading[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const open = useMemo(
    () => entries.find((e) => e.id === openId) ?? null,
    [entries, openId],
  );

  useEffect(() => {
    const loaded = loadJournal();
    setEntries(loaded);
    setOpenId((current) => current ?? loaded[0]?.id ?? null);
  }, []);

  return (
    <main className="pb-16">
      <header className="mx-auto max-w-xl text-center">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">Kept on this device</p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">Journal</h1>
        <p className="mt-3 text-muted">
          Readings stay in the browser. Clearing site data will let them go.
        </p>
      </header>

      {entries.length === 0 ? (
        <div className="mt-12 max-w-md rounded-(--radius-xl) border border-border bg-surface p-6">
          <p className="font-display text-xl font-semibold">No sittings yet.</p>
          <p className="mt-2 text-sm text-muted">
            Draw a spread from the chamber. When you write a reading, it will appear here.
          </p>
          <Button asChild className="mt-5">
            <Link to="/chamber">Go to the chamber</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <ul className="space-y-2">
            {entries.map((entry) => {
              const spread = getSpread(entry.spreadId);
              const active = entry.id === openId;
              return (
                <li key={entry.id}>
                  <button
                    type="button"
                    onClick={() => setOpenId(entry.id)}
                    className={`w-full rounded-(--radius-md) border px-3 py-3 text-left transition-colors duration-150 ${
                      active
                        ? "border-border-strong bg-surface-2"
                        : "border-border bg-surface hover:bg-surface-2"
                    }`}
                  >
                    <p className="text-xs text-muted">
                      {new Date(entry.createdAt).toLocaleString()}
                    </p>
                    <p className="font-display mt-0.5 text-lg font-semibold">
                      {spread?.name ?? "Reading"}
                    </p>
                    {entry.question ? (
                      <p className="mt-1 line-clamp-2 text-sm text-muted">{entry.question}</p>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>

          {open ? (
            <article className="rounded-(--radius-xl) border border-border bg-surface p-5 sm:p-6">
              <p className="text-xs tracking-wide text-muted uppercase">
                {getSpread(open.spreadId)?.name} ·{" "}
                {new Date(open.createdAt).toLocaleString()}
              </p>
              {open.question ? (
                <p className="font-display mt-3 text-2xl text-fg italic">
                  “{open.question}”
                </p>
              ) : null}
              <ul className="mt-6 flex flex-wrap gap-3">
                {open.draws.map((d) => {
                  const card = getCard(d.cardId);
                  if (!card) return null;
                  return (
                    <li key={d.cardId + d.positionId} className="flex flex-col items-center gap-1">
                      <TarotCard card={card} faceUp reversed={d.reversed} size="sm" />
                      <p className="max-w-[4.5rem] text-center text-[10px] text-muted">
                        {getSpread(open.spreadId)?.positions.find((p) => p.id === d.positionId)?.label}
                      </p>
                    </li>
                  );
                })}
              </ul>
              {open.interpretation ? (
                <div className="mt-6 text-sm leading-relaxed whitespace-pre-wrap text-fg/90">
                  {open.interpretation}
                </div>
              ) : (
                <p className="mt-6 text-sm text-muted">No written reading was kept for this sitting.</p>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="mt-6"
                onClick={() => {
                  const next = removeReading(open.id);
                  setEntries(next);
                  setOpenId(next[0]?.id ?? null);
                }}
              >
                Remove from journal
              </Button>
            </article>
          ) : null}
        </div>
      )}
    </main>
  );
}
