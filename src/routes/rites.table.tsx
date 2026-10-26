import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Paywall } from "@/components/pass/Paywall";
import { spreadIsFree } from "@/lib/pass/offer";
import { usePass } from "@/lib/pass/use-pass";
import { SPREADS } from "@/lib/tarot/spreads";

export const Route = createFileRoute("/rites/table")({ component: TableRite });

function TableRite() {
  const pass = usePass();
  const [ask, setAsk] = useState(false);
  const locked = pass.ready && !pass.open;

  return (
    <main className="stagger-in pb-16">
      <Link to="/rites" className="inline-flex h-11 items-center text-sm text-muted hover:text-fg">
        All rites
      </Link>
      <header className="mx-auto mt-4 max-w-xl text-center">
        <p className="text-xs tracking-[0.22em] text-muted uppercase">The table</p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">Choose the shape.</h1>
        <p className="mt-3 text-muted">
          The spread comes before the question. One card if the hour is small. The long cross if
          the matter has a history.
        </p>
      </header>
      <ul className="mt-10 divide-y divide-border overflow-hidden rounded-(--radius-xl) border border-border bg-surface">
        {SPREADS.map((spread) => {
          const held = locked && !spreadIsFree(spread.id);
          const body = (
            <>
              <div>
                <p className="font-display text-lg font-semibold text-fg">{spread.name}</p>
                <p className="text-sm text-muted">{held ? "Locked · $9.99" : spread.subtitle}</p>
                <p className="mt-1 max-w-md text-sm text-subtle">{spread.description}</p>
              </div>
              <span className="mt-1 shrink-0 text-xs tracking-wide text-subtle tabular-nums uppercase">
                {spread.positions.length} {spread.positions.length === 1 ? "card" : "cards"}
              </span>
            </>
          );
          return (
            <li key={spread.id}>
              {held ? (
                <button
                  type="button"
                  onClick={() => setAsk(true)}
                  className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left opacity-80 transition-colors duration-150 hover:bg-surface-2 sm:px-5"
                >
                  {body}
                </button>
              ) : (
                <Link
                  to="/read/$spreadId"
                  params={{ spreadId: spread.id }}
                  className="flex items-start justify-between gap-4 px-4 py-4 transition-colors duration-150 hover:bg-surface-2 sm:px-5"
                >
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      {ask ? <Paywall /> : null}
    </main>
  );
}
