import { PassGate } from "@/components/pass/Paywall";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  SHELF_LABEL,
  drawPassage,
  loadOpenings,
  passageById,
  saveOpening,
  type Opening,
  type Passage,
} from "@/lib/rites/bibliomancy";

export const Route = createFileRoute("/rites/bibliomancy")({ component: BibliomancyRite });

const REVEAL_MS = 4200;

function SmokePassage({ passage, question }: { passage: Passage; question: string }) {
  const words = passage.line.split(/(\s+)/);
  const spoken = words.filter((part) => part.trim().length > 0);
  const last = Math.max(spoken.length - 1, 1);
  let spokenIndex = 0;

  return (
    <article className="smoke-stage mt-8 max-w-xl rounded-(--radius-xl) border border-border p-5 sm:p-8">
      <span className="smoke-wisp" aria-hidden />
      <span className="smoke-wisp" aria-hidden />
      <span className="smoke-wisp" aria-hidden />
      <span className="smoke-wisp" aria-hidden />
      <div className="relative">
        {question ? <p className="text-sm text-muted">{question}</p> : null}
        <p className="smoke-after mt-1 text-xs tracking-[0.16em] text-muted uppercase" style={{ animationDelay: "400ms" }}>
          {SHELF_LABEL[passage.shelf]}
        </p>
        <blockquote className="font-display mt-4 text-xl leading-relaxed font-medium text-fg sm:text-2xl">
          {words.map((part, i) => {
            if (!part.trim()) return <span key={i}>{part}</span>;
            const delay = 500 + (spokenIndex / last) * REVEAL_MS;
            spokenIndex += 1;
            return (
              <span key={i} className="smoke-word" style={{ animationDelay: `${delay}ms` }}>
                {part}
              </span>
            );
          })}
        </blockquote>
        <p
          className="smoke-after mt-6 border-t border-border pt-4 text-sm text-fg"
          style={{ animationDelay: `${900 + REVEAL_MS}ms` }}
        >
          {passage.work}
          <span className="mt-1 block text-muted">{passage.by}</span>
        </p>
      </div>
    </article>
  );
}

function BibliomancyRite() {
  const [question, setQuestion] = useState("");
  const [passage, setPassage] = useState<Passage | null>(null);
  const [log, setLog] = useState<Opening[]>([]);
  const [opened, setOpened] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLog(loadOpenings());
  }, []);

  function open() {
    const next = drawPassage(passage?.id);
    setPassage(next);
    setOpened(true);
    const entry: Opening = {
      id: crypto.randomUUID(),
      at: new Date().toISOString(),
      question: question.trim(),
      passageId: next.id,
    };
    saveOpening(entry);
    setLog(loadOpenings());
    window.setTimeout(() => {
      stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  return (
    <PassGate>
    <main className="stagger-in pb-16">
      <Link to="/rites" className="inline-flex h-11 items-center text-sm text-muted hover:text-fg">
        All rites
      </Link>
      <header className="mx-auto mt-4 max-w-xl text-center">
        <p className="text-xs tracking-[0.22em] text-muted uppercase">Bibliomancy</p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">Open the book.</h1>
        <p className="mt-3 text-muted">
          Hold a question if you have one. The page does not argue with it. A book, a play, a poem, or an old film. It will name the picture and who spoke.
        </p>
      </header>

      <div ref={stageRef} className="scroll-mt-4">
        {opened && passage ? (
          <SmokePassage key={passage.id} passage={passage} question={question.trim()} />
        ) : (
          <figure className="mt-8 overflow-hidden rounded-(--radius-xl) border border-border">
            <img src="/rites/book.jpg" alt="" className="aspect-[16/9] w-full object-cover" />
          </figure>
        )}
      </div>

      <label className="mt-8 block max-w-xl">
        <span className="text-xs tracking-[0.16em] text-muted uppercase">Question, if you have one</span>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={2}
          className="mt-2 w-full resize-none rounded-(--radius-lg) border border-border bg-surface px-4 py-3 text-base text-fg outline-none focus:border-border-strong"
          placeholder="What am I not seeing?"
        />
      </label>

      <div className="mt-6">
        <Button onClick={open}>{opened ? "Open again" : "Open the book"}</Button>
      </div>

      {log.length > 0 ? (
        <section className="mt-12 max-w-xl">
          <h2 className="font-display text-xl font-semibold">Pages already opened</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {log.map((opening) => {
              const found = passageById(opening.passageId);
              if (!found) return null;
              return (
                <li key={opening.id} className="py-3">
                  <p className="text-xs tracking-wide text-muted uppercase">
                    {SHELF_LABEL[found.shelf]}
                    <span className="normal-case tracking-normal">
                      {" "}
                      ·{" "}
                      {new Date(opening.at).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-fg">{found.line}</p>
                  <p className="mt-1 text-xs text-muted">
                    {found.work} · {found.by}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </main>
    </PassGate>
  );
}
