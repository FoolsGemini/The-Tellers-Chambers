export type Arcana = "major" | "minor";
export type Suit = "wands" | "cups" | "swords" | "pentacles";
export type Rank =
  | "ace"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "nine"
  | "ten"
  | "page"
  | "knight"
  | "queen"
  | "king";

export type Meaning = {
  keywords: string[];
  text: string;
};

export type TarotCard = {
  id: string;
  name: string;
  arcana: Arcana;
  number?: number;
  roman?: string;
  epithet: string;
  suit?: Suit;
  rank?: Rank;
  pip?: number;
  art?: string;
  upright: Meaning;
  reversed: Meaning;
};

export type SpreadPosition = {
  id: string;
  label: string;
  prompt: string;
};

export type Spread = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  positions: SpreadPosition[];
};

export type DrawnCard = {
  cardId: string;
  reversed: boolean;
  revealed: boolean;
};

export type SavedReading = {
  id: string;
  createdAt: string;
  spreadId: string;
  question: string;
  draws: Array<{ cardId: string; reversed: boolean; positionId: string }>;
  interpretation: string | null;
  daily?: boolean;
};
