import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DeckId = "chamber" | "woodcut" | "gilded";

export type DeckStyle = {
  id: DeckId;
  name: string;
  line: string;
  /** Fully illustrated minors, or majors plus pip suits. */
  illustrated: boolean;
  back: string;
  sample: string;
};

export const DECKS: DeckStyle[] = [
  {
    id: "chamber",
    name: "The Painted Chamber",
    line: "Every card a full scene.",
    illustrated: true,
    back: "/cards/back.jpg",
    sample: "/cards/major-00.jpg",
  },
  {
    id: "woodcut",
    name: "The Woodcut",
    line: "A medieval circus. Every card a scene.",
    illustrated: true,
    back: "/decks/woodcut/back.jpg",
    sample: "/decks/woodcut/major-00.jpg",
  },
  {
    id: "gilded",
    name: "The Gilded Night",
    line: "An occult night. Every card a scene.",
    illustrated: true,
    back: "/decks/gilded/back.jpg",
    sample: "/decks/gilded/major-00.jpg",
  },
];

type DeckChoice = {
  deckId: DeckId;
  setDeck: (deckId: DeckId) => void;
};

export const useDeckChoice = create<DeckChoice>()(
  persist(
    (set) => ({
      deckId: "chamber",
      setDeck: (deckId) => set({ deckId }),
    }),
    { name: "tellers-deck" },
  ),
);

export function getDeck(id: DeckId): DeckStyle {
  return DECKS.find((d) => d.id === id) ?? DECKS[0]!;
}
