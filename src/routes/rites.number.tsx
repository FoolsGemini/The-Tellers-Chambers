import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { luckyNumber } from "@/lib/rites/number";

export const Route = createFileRoute("/rites/number")({ component: NumberRite });

function NumberRite() {
  const draw = useMemo(() => luckyNumber(), []);
  const written = useMemo(
    () =>
      new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    [],
  );

  return (
    <main className="stagger-in pb-16">
      <Link to="/rites" className="inline-flex h-11 items-center text-sm text-muted hover:text-fg">
        All rites
      </Link>
      <header className="mx-auto mt-4 max-w-xl text-center">
        <p className="text-xs tracking-[0.22em] text-muted uppercase">Number · {written}</p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">{draw.title}.</h1>
      </header>
      <section className="mt-10 flex flex-col items-start gap-8 sm:flex-row sm:items-end">
        <p className="font-display text-[7rem] leading-none font-semibold tabular-nums text-fg">
          {draw.digit}
        </p>
        <div className="max-w-md pb-2">
          <p className="text-xs tracking-[0.16em] text-muted uppercase">
            Companion {draw.companion}
          </p>
          <p className="mt-3 leading-relaxed text-fg/90">{draw.text}</p>
          <p className="mt-3 text-sm text-muted">{draw.note}</p>
        </div>
      </section>
    </main>
  );
}
