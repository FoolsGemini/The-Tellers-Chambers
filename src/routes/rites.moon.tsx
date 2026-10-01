import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MoonDisc } from "@/components/rites/MoonDisc";
import { lunarDate, lunarMansion, moonNow } from "@/lib/rites/calendar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rites/moon")({ component: MoonRite });

function MoonRite() {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));
  const today = useMemo(() => new Date(), []);
  const sky = useMemo(() => moonNow(today), [today]);
  const lunar = useMemo(() => lunarDate(today), [today]);
  const mansion = useMemo(() => lunarMansion(today), [today]);
  const cells = useMemo(() => monthCells(cursor), [cursor]);

  const label = cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  return (
    <main className="stagger-in pb-16">
      <Link to="/rites" className="inline-flex h-11 items-center text-sm text-muted hover:text-fg">
        All rites
      </Link>
      <header className="mx-auto mt-4 max-w-xl text-center">
        <p className="text-xs tracking-[0.22em] text-muted uppercase">Moon</p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">{sky.phase}.</h1>
        <p className="mt-3 text-muted">
          Lunar {lunar.monthLabel}, {lunar.dayLabel}. The mansion is {mansion.name}, the{" "}
          {mansion.animal.toLowerCase()}.
        </p>
      </header>

      <section className="mt-10 grid items-center gap-8 md:grid-cols-[12rem_minmax(0,1fr)]">
        <MoonDisc
          illumination={sky.illumination}
          waxing={sky.waxing}
          className="mx-auto size-40 sm:size-44"
        />
        <div>
          <p className="font-display text-3xl font-semibold tabular-nums">
            {Math.round(sky.illumination * 100)}%
            <span className="ml-2 font-sans text-base font-normal text-muted">lit</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            {sky.age.toFixed(1)} days since the new moon · {sky.waxing ? "waxing" : "waning"}
          </p>
          <p className="mt-4 max-w-prose leading-relaxed text-fg/90">{sky.reading}</p>
          <p className="mt-3 max-w-prose text-sm text-muted">{mansion.reading}</p>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold">{label}</h2>
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex h-11 items-center rounded-(--radius-sm) border border-border px-3 text-sm text-muted hover:text-fg"
              onClick={() => setCursor((d) => addMonths(d, -1))}
            >
              Previous
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center rounded-(--radius-sm) border border-border px-3 text-sm text-muted hover:text-fg"
              onClick={() => setCursor((d) => addMonths(d, 1))}
            >
              Next
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] tracking-wide text-subtle uppercase">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((cell, i) =>
            cell ? (
              <div
                key={cell.key}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-between rounded-(--radius-sm) border border-border bg-surface px-1 py-1.5",
                  cell.isToday && "border-border-strong",
                )}
              >
                <span className="text-xs text-muted tabular-nums">{cell.day}</span>
                <MoonDisc
                  illumination={cell.illumination}
                  waxing={cell.waxing}
                  className="size-5"
                />
                <span className="text-[9px] text-subtle tabular-nums">{cell.lunarDay}</span>
              </div>
            ) : (
              <div key={`e-${i}`} />
            ),
          )}
        </div>
        <p className="mt-3 text-xs text-subtle">
          The small numeral is the day of the Chinese lunar month. Phases are reckoned from the
          synodic moon; the lunar date follows the new moon in China Standard Time.
        </p>
      </section>
    </main>
  );
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, n: number) {
  return new Date(date.getFullYear(), date.getMonth() + n, 1);
}

function monthCells(cursor: Date) {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1).getDay();
  const count = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const cells: ({
    key: string;
    day: number;
    illumination: number;
    waxing: boolean;
    lunarDay: number;
    isToday: boolean;
  } | null)[] = [];
  for (let i = 0; i < first; i += 1) cells.push(null);
  for (let day = 1; day <= count; day += 1) {
    const date = new Date(year, month, day, 12);
    const sky = moonNow(date);
    const lunar = lunarDate(date);
    cells.push({
      key: `${year}-${month}-${day}`,
      day,
      illumination: sky.illumination,
      waxing: sky.waxing,
      lunarDay: lunar.day,
      isToday:
        today.getFullYear() === year && today.getMonth() === month && today.getDate() === day,
    });
  }
  return cells;
}
