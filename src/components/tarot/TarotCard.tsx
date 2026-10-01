import { useState } from "react";
import { cn } from "@/lib/utils";
import { faceFor } from "@/lib/tarot/deck-art";
import { useDeckChoice } from "@/lib/tarot/deck-choice";
import { PIP_LAYOUTS } from "@/lib/tarot/pips";
import type { TarotCard as CardData } from "@/lib/tarot/types";

const SIZE = {
  sm: "w-[4.6rem] sm:w-20",
  md: "w-[6.4rem] sm:w-28",
  lg: "w-40 sm:w-48",
} as const;

type Size = keyof typeof SIZE;

type Props = {
  card: CardData;
  faceUp?: boolean;
  reversed?: boolean;
  size?: Size;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
  label?: string;
};

export function TarotCard({
  card,
  faceUp = true,
  reversed = false,
  size = "md",
  className,
  interactive,
  onClick,
  label,
}: Props) {
  const deckId = useDeckChoice((s) => s.deckId);
  const face = faceFor(deckId, card);
  const clickable = Boolean(onClick) || interactive;

  const body = (
    <div className={cn("card-flip relative h-full w-full", faceUp && "is-up")}>
      <div className="card-face card-face-back absolute inset-0 overflow-hidden rounded-[10px] border border-accent/25 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
        <img src={face.back} alt="" className="h-full w-full object-cover" draggable={false} />
      </div>
      <div className="card-face card-face-front absolute inset-0 overflow-hidden rounded-[10px] border border-parchment-ink/20 bg-parchment shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
        <div className={cn("h-full w-full", reversed && "rotate-180")}>
          <CardFace card={card} face={face} />
        </div>
        {reversed && faceUp ? (
          <span className="absolute top-1.5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-parchment-ink/80 px-1.5 py-0.5 font-sans text-[9px] tracking-wide text-parchment uppercase">
            Reversed
          </span>
        ) : null}
      </div>
    </div>
  );

  const frame = cn(
    "card-3d block aspect-[2/3] text-left",
    SIZE[size],
    clickable ? "cursor-pointer" : "cursor-default",
    className,
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={
          label ??
          (faceUp
            ? `${card.name}${reversed ? ", reversed" : ""}`
            : "Facedown tarot card")
        }
        className={frame}
      >
        {body}
      </button>
    );
  }

  return (
    <div
      aria-label={
        label ??
        (faceUp
          ? `${card.name}${reversed ? ", reversed" : ""}`
          : "Facedown tarot card")
      }
      className={frame}
    >
      {body}
    </div>
  );
}

function CardFace({
  card,
  face,
}: {
  card: CardData;
  face: ReturnType<typeof faceFor>;
}) {
  const [broken, setBroken] = useState(false);
  const src = broken ? (card.art ?? null) : face.src;

  if (face.mode !== "pip" && src) {
    return (
      <div className="relative h-full w-full">
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
          onError={() => setBroken(true)}
        />
        {face.mode === "court" && face.emblem ? (
          <img
            src={face.emblem}
            alt=""
            className="absolute top-1.5 right-1.5 size-7 rounded-full border border-parchment/40 object-cover shadow"
            draggable={false}
          />
        ) : null}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-parchment-ink/80 to-transparent px-1.5 pt-8 pb-1.5">
          <p className="font-display text-center text-[0.7rem] leading-tight font-semibold text-parchment sm:text-xs">
            {card.name}
          </p>
        </div>
      </div>
    );
  }

  if (face.mode === "pip" && face.emblem && card.pip) {
    const layout = PIP_LAYOUTS[card.pip] ?? PIP_LAYOUTS[1]!;
    const pipSize = card.pip <= 3 ? 38 : card.pip <= 6 ? 28 : 22;
    const ink = face.ground === "ink";
    return (
      <div className={cn("relative h-full w-full", ink ? "bg-[#100e0c]" : "bg-[#f3ead7]")}>
        <span
          className={cn(
            "pointer-events-none absolute inset-1.5 rounded-[6px] border",
            ink ? "border-amber-200/30" : "border-parchment-ink/25",
          )}
        />
        <p
          className={cn(
            "absolute top-1.5 left-0 w-full text-center font-display text-[0.65rem] tracking-wide uppercase",
            ink ? "text-amber-100" : "text-parchment-ink",
          )}
        >
          {card.name}
        </p>
        {layout.map((p, i) => (
          <span
            key={i}
            className="absolute overflow-hidden rounded-full border border-parchment-ink/15 shadow-sm"
            style={{
              width: `${pipSize}%`,
              aspectRatio: "1",
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: `translate(-50%, -50%)${p.flip ? " rotate(180deg)" : ""}`,
            }}
          >
            <img src={face.emblem!} alt="" className="h-full w-full object-cover" draggable={false} />
          </span>
        ))}
      </div>
    );
  }

  if (card.art) {
    return (
      <img src={card.art} alt="" className="h-full w-full object-cover" draggable={false} />
    );
  }

  return (
    <div className="flex h-full items-center justify-center p-3 text-center">
      <p className="font-display text-sm text-parchment-ink">{card.name}</p>
    </div>
  );
}
