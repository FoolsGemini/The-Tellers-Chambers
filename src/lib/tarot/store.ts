import { create } from "zustand";
import { persist } from "zustand/middleware";
import { newReadingId, upsertReading } from "./journal";
import { drawCards } from "./shuffle";
import { getSpread } from "./spreads";
import type { DrawnCard } from "./types";

export type Phase = "intent" | "table";

type ReadingStore = {
  spreadId: string | null;
  question: string;
  allowReversed: boolean;
  phase: Phase;
  draws: DrawnCard[];
  interpretation: string | null;
  interpreting: boolean;
  savedId: string | null;
  hydrate: (spreadId: string) => void;
  setQuestion: (question: string) => void;
  setAllowReversed: (allowReversed: boolean) => void;
  shuffleDraw: () => void;
  reveal: (index: number) => void;
  revealAll: () => void;
  setInterpretation: (text: string | null) => void;
  setInterpreting: (interpreting: boolean) => void;
  persistNow: (text?: string | null) => void;
  reset: () => void;
};

const empty = {
  spreadId: null as string | null,
  question: "",
  allowReversed: true,
  phase: "intent" as Phase,
  draws: [] as DrawnCard[],
  interpretation: null as string | null,
  interpreting: false,
  savedId: null as string | null,
};

export const useReadingStore = create<ReadingStore>()(
  persist(
    (set, get) => ({
      ...empty,
      hydrate: (spreadId) => {
        const current = get();
        if (current.spreadId === spreadId && current.draws.length > 0) return;
        set({ ...empty, spreadId, allowReversed: current.allowReversed });
      },
      setQuestion: (question) => set({ question }),
      setAllowReversed: (allowReversed) => set({ allowReversed }),
      shuffleDraw: () => {
        const { spreadId, allowReversed } = get();
        const spread = spreadId ? getSpread(spreadId) : undefined;
        if (!spread) return;
        set({
          phase: "table",
          draws: drawCards(spread.positions.length, allowReversed),
          interpretation: null,
          savedId: null,
        });
      },
      reveal: (index) => {
        set((state) => ({
          draws: state.draws.map((d, i) =>
            i === index ? { ...d, revealed: true } : d,
          ),
        }));
      },
      revealAll: () => {
        set((state) => ({
          draws: state.draws.map((d) => ({ ...d, revealed: true })),
        }));
      },
      setInterpretation: (interpretation) => set({ interpretation }),
      setInterpreting: (interpreting) => set({ interpreting }),
      persistNow: (text?: string | null) => {
        const { spreadId, question, draws, interpretation, savedId } = get();
        if (!spreadId) return;
        const spread = getSpread(spreadId);
        if (!spread || draws.length === 0) return;
        const id = savedId ?? newReadingId();
        upsertReading({
          id,
          createdAt: new Date().toISOString(),
          spreadId,
          question,
          interpretation: text === undefined ? interpretation : text,
          draws: draws.map((d, i) => ({
            cardId: d.cardId,
            reversed: d.reversed,
            positionId: spread.positions[i]?.id ?? `p-${i}`,
          })),
        });
        set({ savedId: id });
      },
      reset: () => {
        const { spreadId, allowReversed } = get();
        set({ ...empty, spreadId, allowReversed });
      },
    }),
    {
      name: "veil.reading.v1",
      skipHydration: true,
      partialize: (state) => ({
        spreadId: state.spreadId,
        question: state.question,
        allowReversed: state.allowReversed,
        phase: state.phase,
        draws: state.draws,
        interpretation: state.interpretation,
        savedId: state.savedId,
      }),
    },
  ),
);
