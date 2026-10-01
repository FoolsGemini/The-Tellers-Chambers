import type { Spread } from "./types";

export const SPREADS: Spread[] = [
  {
    id: "single",
    name: "The Thread",
    subtitle: "One card",
    description: "A single note for this hour. Ask one question, or none.",
    positions: [
      {
        id: "card",
        label: "The card",
        prompt: "What wants to be seen",
      },
    ],
  },
  {
    id: "three",
    name: "Three Paths",
    subtitle: "Past · Present · Future",
    description: "Where you have been, where you stand, and what is leaning toward you.",
    positions: [
      { id: "past", label: "Past", prompt: "What still shapes this" },
      { id: "present", label: "Present", prompt: "The weather of now" },
      { id: "future", label: "Future", prompt: "What is approaching" },
    ],
  },
  {
    id: "knot",
    name: "The Knot",
    subtitle: "Situation · Obstacle · Advice",
    description: "Name the tangle, the snag, and the way through.",
    positions: [
      { id: "situation", label: "Situation", prompt: "The matter as it is" },
      { id: "obstacle", label: "Obstacle", prompt: "What resists" },
      { id: "advice", label: "Advice", prompt: "How to move" },
    ],
  },
  {
    id: "triad",
    name: "The Triad",
    subtitle: "Mind · Body · Spirit",
    description: "A quiet inventory of the three rooms you live in.",
    positions: [
      { id: "mind", label: "Mind", prompt: "The story you are telling" },
      { id: "body", label: "Body", prompt: "What the body knows" },
      { id: "spirit", label: "Spirit", prompt: "The deeper current" },
    ],
  },
  {
    id: "bond",
    name: "The Bond",
    subtitle: "Five cards",
    description: "You, the other, the weather between you, the strain, and what may grow.",
    positions: [
      { id: "you", label: "You", prompt: "Your position in the bond" },
      { id: "other", label: "The other", prompt: "How they meet you" },
      { id: "bond", label: "The bond", prompt: "The living middle" },
      { id: "strain", label: "The strain", prompt: "What pulls" },
      { id: "potential", label: "What may grow", prompt: "The possible fruit" },
    ],
  },
  {
    id: "celtic",
    name: "Celtic Cross",
    subtitle: "Ten cards",
    description: "The full map: the cross of the matter, and the staff of what follows.",
    positions: [
      { id: "present", label: "Present", prompt: "The heart of the matter" },
      { id: "cross", label: "Crossing", prompt: "What covers or challenges it" },
      { id: "foundation", label: "Foundation", prompt: "The root beneath" },
      { id: "past", label: "Recent past", prompt: "What is leaving" },
      { id: "crown", label: "Crown", prompt: "What could come into being" },
      { id: "future", label: "Near future", prompt: "What is arriving" },
      { id: "self", label: "You", prompt: "How you stand in this" },
      { id: "around", label: "Around you", prompt: "The field of others" },
      { id: "hopes", label: "Hopes & fears", prompt: "The inner weather" },
      { id: "outcome", label: "Outcome", prompt: "Where this is tending" },
    ],
  },
];

export function getSpread(id: string): Spread | undefined {
  return SPREADS.find((s) => s.id === id);
}
