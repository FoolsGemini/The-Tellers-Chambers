import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MeaningPanel } from "@/components/tarot/MeaningPanel";
import { SpreadBoard } from "@/components/tarot/SpreadBoard";
import { TarotCard } from "@/components/tarot/TarotCard";
import { Button } from "@/components/ui/button";
import { CARDS } from "@/lib/tarot/deck";
import { composeTraditional, interpretReading } from "@/lib/tarot/interpret";
import { getSpread } from "@/lib/tarot/spreads";
import { useReadingStore } from "@/lib/tarot/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/read/$spreadId")({
  component: ReadingPage,
});

function ReadingPage() {
  const { spreadId } = Route.useParams();
  const spread = getSpread(spreadId);
  const hydrate = useReadingStore((s) => s.hydrate);
  const question = useReadingStore((s) => s.question);
  const setQuestion = useReadingStore((s) => s.setQuestion);
  const allowReversed = useReadingStore((s) => s.allowReversed);
  const setAllowReversed = useReadingStore((s) => s.setAllowReversed);
  const phase = useReadingStore((s) => s.phase);
  const draws = useReadingStore((s) => s.draws);
  const shuffleDraw = useReadingStore((s) => s.shuffleDraw);
  const reveal = useReadingStore((s) => s.reveal);
  const revealAll = useReadingStore((s) => s.revealAll);
  const interpretation = useReadingStore((s) => s.interpretation);
  const setInterpretation = useReadingStore((s) => s.setInterpretation);
  const interpreting = useReadingStore((s) => s.interpreting);
  const setInterpreting = useReadingStore((s) => s.setInterpreting);
  const persistNow = useReadingStore((s) => s.persistNow);
  const reset = useReadingStore((s) => s.reset);
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void Promise.resolve(useReadingStore.persist.rehydrate()).then(() => {
      hydrate(spreadId);
    });
  }, [hydrate, spreadId]);

  const revealedCount = draws.filter((d) => d.revealed).length;
  const allRevealed = draws.length > 0 && revealedCount === draws.length;
  const selectedDraw = selected != null ? draws[selected] : undefined;

  const stackCards = useMemo(() => CARDS.slice(0, 5), []);

  if (!spread) return <Navigate to="/chamber" />;

  async function onInterpret() {
    if (!spread) return;
    setError(null);
    setInterpreting(true);
    const payload = {
      spreadId: spread.id,
      question,
      draws: draws.map((d, i) => ({
        cardId: d.cardId,
        reversed: d.reversed,
        positionId: spread.positions[i]?.id ?? `p-${i}`,
      })),
    };
    try {
      const result = await interpretReading({ data: payload });
      if (result.ok) {
        setInterpretation(result.text);
        persistNow(result.text);
      } else {
        setInterpretation(result.fallback);
        persistNow(result.fallback);
        if (result.error !== "AI is not available") setError(result.error);
      }
    } catch {
      setInterpretation(composeTraditional(payload));
      setError("The written reading could not be fetched. Traditional meanings are below.");
      persistNow(composeTraditional(payload));
    } finally {
      setInterpreting(false);
    }
  }

  return (
    <main className="pb-20">
      <Link
        to="/chamber"
        className="inline-flex h-11 items-center text-sm text-muted hover:text-fg"
      >
        Back to the chamber
      </Link>

      <header className="mx-auto mt-4 max-w-xl text-center">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">{spread.subtitle}</p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">
          {spread.name}
        </h1>
        <p className="mt-3 text-muted">{spread.description}</p>
      </header>

      {phase === "intent" ? (
        <section className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start">
          <form
            className="rounded-(--radius-xl) border border-border bg-surface p-5 sm:p-6"
            onSubmit={(e) => {
              e.preventDefault();
              shuffleDraw();
              setSelected(null);
            }}
          >
            <label htmlFor="question" className="text-sm font-medium text-fg">
              A question, if you have one
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value.slice(0, 400))}
              rows={4}
              placeholder="What is the weather of this decision?"
              className="mt-2 w-full resize-y rounded-(--radius-md) border border-border bg-bg px-3 py-3 text-sm text-fg placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:outline-none"
            />
            <p className="mt-1 text-xs text-subtle tabular-nums">{question.length}/400</p>

            <button
              type="button"
              onClick={() => setAllowReversed(!allowReversed)}
              className="mt-5 flex h-11 w-full items-center justify-between rounded-(--radius-md) border border-border px-3 text-left text-sm"
            >
              <span>
                <span className="font-medium">Allow reversals</span>
                <span className="mt-0.5 block text-xs text-muted">
                  Cards may arrive inverted, with a shadowed meaning.
                </span>
              </span>
              <span
                className={cn(
                  "grid h-6 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-150",
                  allowReversed
                    ? "border-accent bg-accent"
                    : "border-border bg-surface-2",
                )}
              >
                <span
                  className={cn(
                    "block size-4 rounded-full bg-accent-fg transition-transform duration-150",
                    allowReversed ? "translate-x-1.5" : "-translate-x-1.5 bg-muted",
                  )}
                />
              </span>
            </button>

            <Button type="submit" size="lg" className="mt-6 w-full">
              Shuffle and draw
            </Button>
          </form>

          <div className="relative mx-auto hidden h-56 w-40 lg:block" aria-hidden>
            {stackCards.map((card, i) => (
              <div
                key={card.id}
                className="absolute top-8 left-4"
                style={{
                  transform: `rotate(${(i - 2) * 7}deg) translateY(${i * 2}px)`,
                  zIndex: i,
                }}
              >
                <TarotCard card={card} faceUp={false} size="md" />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-10">
          {question.trim() ? (
            <p className="mb-8 max-w-2xl font-display text-xl text-fg/90 italic">
              “{question.trim()}”
            </p>
          ) : null}

          <SpreadBoard
            spread={spread}
            draws={draws}
            onReveal={(i) => {
              reveal(i);
              setSelected(i);
            }}
            selected={selected}
            onSelect={setSelected}
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => {
                revealAll();
                setSelected((s) => s ?? 0);
              }}
              disabled={allRevealed}
            >
              Reveal all
            </Button>
            <Button
              onClick={onInterpret}
              disabled={!allRevealed || interpreting}
            >
              {interpreting ? "Writing the reading…" : "Write the reading"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                reset();
                setSelected(null);
                setError(null);
              }}
            >
              Draw again
            </Button>
          </div>

          <p className="mt-3 text-xs text-subtle">
            {revealedCount} of {draws.length} turned
            {allRevealed ? " · traditional meanings are ready; a written reading is optional." : " · tap a card to turn it."}
          </p>

          {selectedDraw?.revealed && selected != null ? (
            <div className="mt-8">
              <MeaningPanel spread={spread} draw={selectedDraw} index={selected} />
            </div>
          ) : null}

          {error ? (
            <p className="mt-6 text-sm text-wax">{error}</p>
          ) : null}

          {interpretation ? (
            <article className="mt-8 rounded-(--radius-xl) border border-border bg-surface p-5 sm:p-7">
              <p className="text-xs tracking-[0.18em] text-muted uppercase">The reading</p>
              <div className="mt-4 space-y-4 text-sm leading-relaxed whitespace-pre-wrap text-fg/90">
                {interpretation}
              </div>
              <p className="mt-6 text-xs text-subtle">Saved to the journal on this device.</p>
            </article>
          ) : null}
        </section>
      )}
    </main>
  );
}
