import { cn } from "@/lib/utils";
import { drawnToCard } from "@/lib/tarot/shuffle";
import type { DrawnCard } from "@/lib/tarot/types";
import type { Spread } from "@/lib/tarot/types";
import { TarotCard } from "./TarotCard";

type Props = {
  spread: Spread;
  draws: DrawnCard[];
  onReveal: (index: number) => void;
  selected: number | null;
  onSelect: (index: number) => void;
};

export function SpreadBoard({
  spread,
  draws,
  onReveal,
  selected,
  onSelect,
}: Props) {
  const count = spread.positions.length;
  const size = count >= 8 ? "sm" : count >= 5 ? "md" : count === 1 ? "lg" : "md";

  return (
    <div
      className={cn(
        "grid justify-items-center gap-x-4 gap-y-6",
        count === 1 && "grid-cols-1",
        count === 3 && "grid-cols-3",
        count === 5 && "grid-cols-2 sm:grid-cols-5",
        count === 10 && "grid-cols-2 sm:grid-cols-5",
      )}
    >
      {draws.map((draw, index) => {
        const position = spread.positions[index];
        const card = drawnToCard(draw);
        const isSelected = selected === index;
        const order = count === 5 && index === 4 ? "col-span-2 sm:col-span-1" : undefined;
        return (
          <div
            key={`${draw.cardId}-${index}`}
            className={cn("flex flex-col items-center gap-2", order)}
          >
            <p className="max-w-[7rem] text-center text-[11px] tracking-wide text-muted uppercase">
              {position?.label}
            </p>
            <TarotCard
              card={card}
              faceUp={draw.revealed}
              reversed={draw.reversed}
              size={size}
              onClick={() => {
                if (!draw.revealed) onReveal(index);
                onSelect(index);
              }}
              className={cn(
                "transition-transform duration-200",
                isSelected && "scale-[1.04]",
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
