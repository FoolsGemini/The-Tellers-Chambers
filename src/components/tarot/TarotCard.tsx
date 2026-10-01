import { cn } from "@/lib/utils";
import { suitArt } from "@/lib/tarot/deck";
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
  const clickable = Boolean(onClick) || interactive;

  const body = (
    <div className={cn("card-flip relative h-full w-full", faceUp && "is-up")}>
      <div className="card-face card-face-back absolute inset-0 overflow-hidden rounded-[10px] border border-accent/25 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
        <img
          src="/cards/back.jpg"
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div className="card-face card-face-front absolute inset-0 overflow-hidden rounded-[10px] border border-parchment-ink/20 bg-parchment shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
        <div className={cn("h-full w-full", reversed && "rotate-180")}>
          <CardFace card={card} />
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

function CardFace({ card }: { card: CardData }) {
  if (card.art) {
    return (
      <div className="relative h-full w-full">
        <img
          src={card.art}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-parchment-ink/80 to-transparent px-1.5 pt-8 pb-1.5">
          <p className="font-display text-center text-[0.7rem] leading-tight font-semibold text-parchment sm:text-xs">
            {card.name}
          </p>
        </div>
      </div>
    );
  }

  if (card.arcana === "major") {
    return (
      <div className="flex h-full flex-col items-center justify-between px-2 py-3">
        <CornerFrame />
        <p className="font-display text-3xl leading-none text-parchment-ink sm:text-4xl">
          {card.roman}
        </p>
        <div className="text-center">
          <p className="font-display text-[0.8rem] leading-tight font-semibold text-parchment-ink sm:text-sm">
            {card.name}
          </p>
          <p className="mt-1 font-sans text-[9px] tracking-wide text-parchment-muted uppercase">
            {card.epithet}
          </p>
        </div>
      </div>
    );
  }

  if (card.rank && ["page", "knight", "queen", "king"].includes(card.rank) && card.suit) {
    return (
      <div className="relative flex h-full flex-col">
        <img
          src={suitArt(card.suit)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          draggable={false}
        />
        <div className="absolute inset-0 bg-parchment/25" />
        <div className="relative mt-auto bg-parchment-ink/75 px-1.5 py-2 text-center">
          <p className="font-display text-[0.8rem] leading-tight font-semibold text-parchment">
            {card.name}
          </p>
        </div>
      </div>
    );
  }

  if (card.pip && card.suit) {
    const layout = PIP_LAYOUTS[card.pip] ?? PIP_LAYOUTS[1]!;
    const emblem = suitArt(card.suit);
    const pipSize = card.pip <= 3 ? 38 : card.pip <= 6 ? 28 : 22;
    return (
      <div className="relative h-full w-full">
        <CornerFrame />
        <p className="absolute top-1.5 left-0 w-full text-center font-display text-[0.65rem] tracking-wide text-parchment-ink uppercase">
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
            <img src={emblem} alt="" className="h-full w-full object-cover" draggable={false} />
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center p-3 text-center">
      <p className="font-display text-sm text-parchment-ink">{card.name}</p>
    </div>
  );
}

function CornerFrame() {
  return (
    <>
      <span className="pointer-events-none absolute inset-1.5 rounded-[6px] border border-parchment-ink/20" />
      <span className="pointer-events-none absolute inset-2.5 rounded-[4px] border border-parchment-ink/10" />
    </>
  );
}
