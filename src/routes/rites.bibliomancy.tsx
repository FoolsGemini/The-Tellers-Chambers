import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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

function BibliomancyRite() {
  const [question, setQuestion] = useState("");
  const [passage, setPassage] = useState<Passage | null>(null);
  const [log, setLog] = useState<Opening[]>([]);

  useEffect(() => {
    const openings = loadOpenings();
    setLog(openings);
    const last = openings[0] ? passageById(openings[0].passageId) : undefined;
    if (last) setPassage(last);
  }, []);

  function open() {
    const next = drawPassage(passage?.id);
    setPassage(next);
    const entry: Opening = {
      id: crypto.randomUUID(),
      at: new Date().toISOString(),
      question: question.trim(),
      passageId: next.id,
    };
    saveOpening(entry);
    setLog(loadOpenings());
  }

  return (
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

      <figure className="mt-8 overflow-hidden rounded-(--radius-xl) border border-border">
        <img src="/rites/book.jpg" alt="" className="aspect-[16/9] w-full object-cover" />
      </figure>

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
        <Button onClick={open}>{passage ? "Open again" : "Open the book"}</Button>
      </div>

      {passage ? (
        <article className="mt-8 max-w-xl rounded-(--radius-xl) border border-border bg-surface p-5 sm:p-7">
          {question.trim() ? <p className="text-sm text-muted">{question.trim()}</p> : null}
          <p className="mt-1 text-xs tracking-[0.16em] text-muted uppercase">
            {SHELF_LABEL[passage.shelf]}
          </p>
          <blockquote className="font-display mt-3 text-xl leading-relaxed font-medium text-fg sm:text-2xl">
            {passage.line}
          </blockquote>
          <p className="mt-5 border-t border-border pt-4 text-sm text-fg">
            {passage.work}
            <span className="mt-1 block text-muted">{passage.by}</span>
          </p>
        </article>
      ) : null}

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
  );
}
