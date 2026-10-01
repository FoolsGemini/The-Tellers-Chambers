import type { TarotCard } from "./types";
import { getDeck, type DeckId } from "./deck-choice";

export type CardFaceArt = {
  mode: "scene" | "pip" | "court";
  src: string | null;
  emblem: string | null;
  back: string;
  ground: "parchment" | "ink";
};

function nn(n: number) {
  return String(n).padStart(2, "0");
}

export function faceFor(deckId: DeckId, card: TarotCard): CardFaceArt {
  const deck = getDeck(deckId);
  if (deck.id === "chamber") {
    return { mode: "scene", src: card.art ?? null, emblem: null, back: deck.back, ground: "parchment" };
  }
  const src =
    card.arcana === "major" && card.number != null
      ? `/decks/${deck.id}/major-${nn(card.number)}.jpg`
      : card.suit && card.rank
        ? `/decks/${deck.id}/${card.suit}-${card.rank}.jpg`
        : (card.art ?? null);
  return {
    mode: "scene",
    src,
    emblem: null,
    back: deck.back,
    ground: deck.id === "gilded" ? "ink" : "parchment",
  };
}
