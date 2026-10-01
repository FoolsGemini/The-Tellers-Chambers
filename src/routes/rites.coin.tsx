import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FACE_READING,
  loadTosses,
  saveToss,
  triadReading,
  type Face,
  type Toss,
} from "@/lib/rites/coin";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rites/coin")({ component: CoinRite });

type Slot = { face: Face; rx: number; ry: number };

const TOSS_MS = 1050;

function CoinRite() {
  const [question, setQuestion] = useState("");
  const [slots, setSlots] = useState<Slot[]>([{ face: "yang", rx: 0, ry: 0 }]);
  const [shown, setShown] = useState<Face[]>([]);
  const [live, setLive] = useState(false);
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<Toss[]>([]);

  useEffect(() => {
    setLog(loadTosses());
  }, []);

  function toss(count: 1 | 3) {
    if (busy) return;
    const next = Array.from({ length: count }, () =>
      Math.random() < 0.5 ? "yang" : "yin",
    ) as Face[];
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setBusy(true);
    setShown([]);
    setSlots((prev) =>
      next.map((land, i) => {
        const old = prev[i] ?? { face: "yang" as Face, rx: 0, ry: 0 };
        const offset = land === "yin" ? 180 : 0;
        const turns = reduced ? 0 : 4;
        return {
          face: land,
          rx: old.rx + (reduced ? 0 : 1080),
          ry: (Math.floor(old.ry / 360) + turns) * 360 + offset,
        };
      }),
    );
    if (!reduced) setLive(true);
    const wait = reduced ? 0 : TOSS_MS + (count === 3 ? 320 : 0);
    window.setTimeout(() => {
      setLive(false);
      setBusy(false);
      setShown(next);
      const entry: Toss = {
        id: crypto.randomUUID(),
        at: new Date().toISOString(),
        question: question.trim(),
        faces: next,
      };
      saveToss(entry);
      setLog(loadTosses());
    }, wait);
  }

  const many = slots.length > 1;

  return (
    <main className="stagger-in pb-16">
      <Link to="/rites" className="inline-flex h-11 items-center text-sm text-muted hover:text-fg">
        All rites
      </Link>
      <header className="mx-auto mt-4 max-w-xl text-center">
        <p className="text-xs tracking-[0.22em] text-muted uppercase">Coin</p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">Sun or moon.</h1>
        <p className="mt-3 text-muted">
          The bright face is yang: go. The moon is yin: wait. One toss is an answer. Three are a counsel.
        </p>
      </header>

      <div className="mx-auto mt-10 flex max-w-xl flex-col items-center">
        <div
          className={cn(
            "flex w-full items-end justify-center rounded-(--radius-xl) border border-border bg-surface px-4 pt-10 pb-6",
            many ? "gap-4 sm:gap-8" : "",
          )}
        >
          {slots.map((slot, i) => (
            <CoinToss
              key={i}
              slot={slot}
              live={live}
              delay={many ? i * 160 : 0}
              size={many ? "sm" : "lg"}
              label={shown[i] ? FACE_READING[shown[i]].name : undefined}
              onToss={() => toss(1)}
              disabled={busy || many}
            />
          ))}
        </div>
        <p className="mt-3 text-center text-xs tracking-[0.14em] text-subtle uppercase">
          {busy ? "In the air" : many ? "Three faces" : "Tap the coin, or toss three"}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => toss(1)} disabled={busy}>
            Toss once
          </Button>
          <Button variant="outline" onClick={() => toss(3)} disabled={busy}>
            Toss three
          </Button>
        </div>
      </div>

      <label className="mx-auto mt-8 block max-w-xl">
        <span className="text-xs tracking-[0.16em] text-muted uppercase">Question, if you have one</span>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={2}
          className="mt-2 w-full resize-none rounded-(--radius-lg) border border-border bg-surface px-4 py-3 text-base text-fg outline-none focus:border-border-strong"
          placeholder="Should I send it today?"
        />
      </label>

      {shown.length > 0 ? (
        <article className="mx-auto mt-8 max-w-xl rounded-(--radius-xl) border border-border bg-surface p-5 sm:p-6">
          {question.trim() ? <p className="text-sm text-muted">{question.trim()}</p> : null}
          <h2 className="font-display mt-1 text-2xl font-semibold">
            {shown.map((f) => FACE_READING[f].name).join(" · ")}
          </h2>
          <p className="mt-3 leading-relaxed text-fg/90">
            {shown.length === 3 ? triadReading(shown) : FACE_READING[shown[0]!].text}
          </p>
        </article>
      ) : null}

      {log.length > 0 ? (
        <section className="mx-auto mt-12 max-w-xl">
          <h2 className="font-display text-xl font-semibold">Recent tosses</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {log.slice(0, 6).map((toss) => (
              <li key={toss.id} className="flex items-center gap-3 py-3">
                <span className="flex shrink-0 gap-1">
                  {toss.faces.map((face, i) => (
                    <img
                      key={i}
                      src={face === "yin" ? "/coins/yin.jpg" : "/coins/yang.jpg"}
                      alt=""
                      className="size-8 rounded-full object-cover"
                    />
                  ))}
                </span>
                <span className="min-w-0">
                  <p className="text-xs tracking-wide text-muted uppercase">
                    {new Date(toss.at).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="truncate text-sm text-fg">
                    {toss.question || toss.faces.map((f) => FACE_READING[f].name).join(" · ")}
                  </p>
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}

function CoinToss({
  slot,
  live,
  delay,
  size,
  label,
  onToss,
  disabled,
}: {
  slot: Slot;
  live: boolean;
  delay: number;
  size: "lg" | "sm";
  label?: string;
  onToss: () => void;
  disabled: boolean;
}) {
  const disc = (
    <span className="relative grid place-items-center">
      <span
        aria-hidden
        className={cn(
          "coin-shadow pointer-events-none absolute bottom-1 h-3 w-[62%] rounded-full bg-black/50 blur-[2px]",
          live && "is-live",
        )}
        style={{ animationDelay: `${delay}ms` }}
      />
      <span
        className={cn("coin-lift relative block", live && "is-live")}
        style={{ animationDelay: `${delay}ms` }}
      >
        <span
          className="coin-disc relative block"
          style={{
            transform: `rotateX(${slot.rx}deg) rotateY(${slot.ry}deg)`,
            transitionDelay: `${delay}ms`,
            width: size === "lg" ? "13.5rem" : "5.75rem",
            height: size === "lg" ? "13.5rem" : "5.75rem",
          }}
        >
          <span className="coin-side">
            <img src="/coins/yang.jpg" alt="" className="h-full w-full object-cover" draggable={false} />
          </span>
          <span className="coin-side coin-side-yin">
            <img src="/coins/yin.jpg" alt="" className="h-full w-full object-cover" draggable={false} />
          </span>
        </span>
      </span>
    </span>
  );

  return (
    <div className="flex flex-col items-center">
      {disabled ? (
        <div className="cursor-default">{disc}</div>
      ) : (
        <button
          type="button"
          onClick={onToss}
          className="cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-label="Toss the coin"
        >
          {disc}
        </button>
      )}
      <p
        className={cn(
          "mt-4 h-5 font-display text-lg font-semibold",
          label ? "text-fg" : "text-transparent",
        )}
      >
        {label ?? "Yang"}
      </p>
    </div>
  );
}
