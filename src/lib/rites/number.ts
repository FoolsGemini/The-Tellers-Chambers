import { hashString } from "@/lib/tarot/shuffle";
import { dateKey, dayPillar } from "./calendar";

const DIGITS: { title: string; text: string }[] = [
  {
    title: "The seed",
    text: "One is a beginning you can actually hold. Choose a single task and refuse the second until the first has a shape.",
  },
  {
    title: "The pair",
    text: "Two asks for a witness. A conversation, a contract, a walk with someone who tells you the truth. Do not decide entirely alone.",
  },
  {
    title: "The braid",
    text: "Three is making. Write, cook, build, arrange. Expression wants a body today, not another plan about expression.",
  },
  {
    title: "The square",
    text: "Four is a room with corners. Stabilize: the budget, the shelf, the promise you keep repeating. Structure is the kindness.",
  },
  {
    title: "The gate",
    text: "Five stands in a doorway. Change is already in the hall. Take one step through, and leave one old habit on the other side.",
  },
  {
    title: "The hearth",
    text: "Six is care that includes you. Home, repair, a meal that is not rushed. Tend the people, then the project.",
  },
  {
    title: "The study",
    text: "Seven wants depth. Read the difficult page. Ask the better question. Do not perform understanding you do not have.",
  },
  {
    title: "The harvest",
    text: "Eight is return. Money, credit, consequence. Finish the ledger. What you owe and what you are owed both want a number.",
  },
  {
    title: "The wide water",
    text: "Nine is completion and release. End a cycle cleanly. Give something away. The next one cannot start in a full cupboard.",
  },
];

export function luckyNumber(date = new Date()) {
  const key = dateKey(date);
  const h = hashString(`veil:number:${key}`);
  const digit = (h % 9) + 1;
  const companion = (hashString(`veil:number:c:${key}`) % 90) + 10;
  const pillar = dayPillar(date);
  const meaning = DIGITS[digit - 1] ?? DIGITS[0]!;
  return {
    key,
    digit,
    companion,
    title: meaning.title,
    text: meaning.text,
    element: pillar.element,
    note: `It shares the day with ${pillar.element.toLowerCase()}. Use ${digit} when a choice is arbitrary — a table, a page, a time — not as a wager.`,
  };
}
