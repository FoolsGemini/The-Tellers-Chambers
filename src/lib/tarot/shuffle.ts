import { CARDS, getCard } from "./deck";
import type { DrawnCard, TarotCard } from "./types";

export function shuffleDeck(cards: TarotCard[] = CARDS): TarotCard[] {
  const a = cards.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const current = a[i];
    const swap = a[j];
    if (current && swap) {
      a[i] = swap;
      a[j] = current;
    }
  }
  return a;
}

export function drawCards(count: number, allowReversed: boolean): DrawnCard[] {
  return shuffleDeck()
    .slice(0, count)
    .map((card) => ({
      cardId: card.id,
      reversed: allowReversed && Math.random() < 0.42,
      revealed: false,
    }));
}

export function meaningFor(card: TarotCard, reversed: boolean) {
  return reversed ? card.reversed : card.upright;
}

export function drawnToCard(draw: DrawnCard): TarotCard {
  return getCard(draw.cardId) ?? CARDS[0]!;
}

export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function cardOfTheDay(date = new Date()) {
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const index = hashString(key) % CARDS.length;
  const reversed = hashString(`${key}:r`) % 5 === 0;
  return {
    key,
    card: CARDS[index]!,
    reversed,
  };
}
