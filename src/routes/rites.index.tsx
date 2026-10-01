import { createFileRoute, Link } from "@tanstack/react-router";
import { RITE_LIST } from "@/lib/rites/catalog";

export const Route = createFileRoute("/rites/")({ component: Rites });

function Rites() {
  return (
    <main className="stagger-in pb-16">
      <section className="mx-auto max-w-xl text-center">
        <p className="text-xs tracking-[0.22em] text-muted uppercase">The rites</p>
        <h1 className="font-display mt-3 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          Choose what you will consult.
        </h1>
        <p className="mt-4 max-w-prose text-muted">
          The table is for a spread. The others are quieter. The moon, the number, and the house
          are fixed for this date. The coin and the book open when you ask them to.
        </p>
      </section>
      <ul className="mt-10 divide-y divide-border overflow-hidden rounded-(--radius-xl) border border-border bg-surface">
        {RITE_LIST.map((rite) => (
          <li key={rite.to}>
            <Link
              to={rite.to}
              className="flex items-start gap-4 px-3 py-3.5 transition-colors duration-150 hover:bg-surface-2 sm:px-4"
            >
              <img
                src={rite.image}
                alt=""
                className="size-16 shrink-0 rounded-(--radius-md) object-cover sm:size-20"
              />
              <div className="min-w-0">
                <p className="font-display text-lg font-semibold text-fg">{rite.name}</p>
                <p className="text-sm text-muted">{rite.subtitle}</p>
                <p className="mt-1 text-sm text-subtle">{rite.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
