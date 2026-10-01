import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { BAGUA, type Direction } from "@/lib/rites/calendar";
import { fengShuiDay } from "@/lib/rites/fengshui";
import { cn } from "@/lib/utils";

const ELEMENT_ART: Record<string, string> = {
  Wood: "/feng/wood.jpg",
  Fire: "/feng/fire.jpg",
  Earth: "/feng/earth.jpg",
  Metal: "/feng/metal.jpg",
  Water: "/feng/water.jpg",
};

function sectorArt(id: string) {
  return `/feng/${id.toLowerCase()}.jpg`;
}

export const Route = createFileRoute("/rites/fengshui")({ component: FengShuiRite });

function FengShuiRite() {
  const day = useMemo(() => fengShuiDay(), []);
  const stars: { label: string; direction: Direction; note: string }[] = [
    { label: "Joy", direction: day.joy, note: "Face this way for a conversation you want to go well." },
    { label: "Wealth", direction: day.wealth, note: "Work, or place one living thing, in this quarter." },
    {
      label: "Noble",
      direction: day.nobles[0] ?? "North",
      note:
        day.nobles.length > 1
          ? `Also ${day.nobles[1]?.toLowerCase()}. Ask for help from that side of the room.`
          : "Ask for help from this side of the room.",
    },
  ];

  return (
    <main className="stagger-in pb-16">
      <Link to="/rites" className="inline-flex h-11 items-center text-sm text-muted hover:text-fg">
        All rites
      </Link>
      <header className="mx-auto mt-4 max-w-xl text-center">
        <p className="text-xs tracking-[0.22em] text-muted uppercase">Feng shui</p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">
          {day.day.hanzi}
          <span className="ml-3 text-2xl font-normal text-muted">{day.day.label}</span>
        </h1>
        <p className="mt-3 text-muted">
          {day.year.hanzi} year · {day.month.hanzi} month · {day.termHanzi} {day.termName}
        </p>
      </header>

      <figure className="mt-8 overflow-hidden rounded-(--radius-xl) border border-border">
        <img
          src={ELEMENT_ART[day.day.element] ?? "/feng/earth.jpg"}
          alt=""
          className="aspect-[16/9] w-full object-cover"
        />
        <figcaption className="flex items-baseline justify-between gap-3 border-t border-border bg-surface px-4 py-3">
          <p className="font-display text-lg font-semibold">{day.day.element}</p>
          <p className="text-sm text-muted">{day.day.nayin}</p>
        </figcaption>
      </figure>

      <p className="mt-8 max-w-prose leading-relaxed text-fg/90">{day.counsel}</p>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{day.sectorNote}</p>

      <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
        <div>
          <h2 className="font-display text-xl font-semibold">The house</h2>
          <p className="mt-1 text-xs text-subtle">South is at the top, as on a luopan.</p>
          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {BAGUA.map((sector) => {
              const on = day.highlighted.includes(sector.id);
              const avoid = sector.id === day.clashDirection;
              return (
                <div
                  key={sector.id}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-(--radius-sm) border",
                    on ? "border-accent" : "border-border",
                    avoid && "border-border-strong",
                  )}
                >
                  <img
                    src={sectorArt(sector.id)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-bg/90 via-bg/25 to-bg/10" />
                  {avoid ? <div className="absolute inset-0 bg-bg/40" /> : null}
                  <div className="relative flex h-full flex-col justify-between p-2">
                    <p className="text-[10px] tracking-wide text-fg/80 uppercase">{sector.label}</p>
                    <p className="font-display text-sm font-semibold leading-tight">{sector.life}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {stars.map((star) => (
            <li key={star.label} className="flex items-center gap-3 py-4">
              <img
                src={sectorArt(star.direction)}
                alt=""
                className="size-14 shrink-0 rounded-(--radius-sm) object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-semibold">{star.label}</p>
                <p className="text-sm text-muted">{star.note}</p>
              </div>
              <p className="shrink-0 text-sm text-fg">{star.direction}</p>
            </li>
          ))}
          <li className="flex items-center gap-3 py-4">
            <img
              src={sectorArt(day.clashDirection)}
              alt=""
              className="size-14 shrink-0 rounded-(--radius-sm) object-cover opacity-60"
            />
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold">Avoid</p>
              <p className="text-sm text-muted">
                The day clashes with the {day.clashAnimal}. Do not force a matter in this quarter.
              </p>
            </div>
            <p className="shrink-0 text-sm text-muted">{day.clashDirection}</p>
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold">The twelve hours</h2>
        <p className="mt-1 max-w-prose text-sm text-muted">
          Counted on your clock. Auspicious hours are for beginning; harsh hours are for finishing
          what is already in motion, or for leaving it alone.
        </p>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {day.hours.map((hour) => (
            <li
              key={hour.branch}
              className={cn(
                "flex items-center justify-between gap-3 py-3",
                hour.current && "bg-surface-2/80",
              )}
            >
              <div className="min-w-0">
                <p className="text-sm text-fg">
                  {hour.animal}
                  <span className="ml-2 text-muted">{hour.hanzi}</span>
                </p>
                <p className="text-xs text-subtle tabular-nums">{hour.clock}</p>
              </div>
              <p
                className={cn(
                  "shrink-0 text-sm",
                  hour.tone === "auspicious" ? "text-fg" : "text-muted",
                )}
              >
                {hour.god}
                {hour.current ? " · now" : ""}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
