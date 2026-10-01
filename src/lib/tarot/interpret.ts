import { createServerFn } from "@tanstack/react-start";
import { getCard } from "./deck";
import { meaningFor } from "./shuffle";
import { getSpread } from "./spreads";

export type InterpretPayload = {
  spreadId: string;
  question: string;
  draws: Array<{ cardId: string; reversed: boolean; positionId: string }>;
};

export function composeTraditional(payload: InterpretPayload): string {
  const spread = getSpread(payload.spreadId);
  const lines: string[] = [];
  if (payload.question.trim()) {
    lines.push(`You asked: ${payload.question.trim()}`);
    lines.push("");
  }
  lines.push(
    spread
      ? `A ${spread.name.toLowerCase()} spread, read in the old way.`
      : "A spread, read in the old way.",
  );
  lines.push("");
  for (const draw of payload.draws) {
    const card = getCard(draw.cardId);
    const position = spread?.positions.find((p) => p.id === draw.positionId);
    if (!card) continue;
    const meaning = meaningFor(card, draw.reversed);
    const title = `${position?.label ?? "Card"} — ${card.name}${draw.reversed ? ", reversed" : ""}`;
    lines.push(title);
    lines.push(meaning.text);
    lines.push("");
  }
  lines.push(
    "Sit with the pattern before you act. The cards describe weather, not a verdict.",
  );
  return lines.join("\n").trim();
}

export const interpretReading = createServerFn({ method: "POST" })
  .validator((data: InterpretPayload) => data)
  .handler(async ({ data }): Promise<{ ok: true; text: string } | { ok: false; error: string; fallback: string }> => {
    const fallback = composeTraditional(data);
    const apiKey = process.env["XAI_API_KEY"]?.trim();
    if (!apiKey) {
      return { ok: false, error: "AI is not available", fallback };
    }

    const spread = getSpread(data.spreadId);
    const cardLines = data.draws
      .map((draw) => {
        const card = getCard(draw.cardId);
        const position = spread?.positions.find((p) => p.id === draw.positionId);
        if (!card) return "";
        const meaning = meaningFor(card, draw.reversed);
        return `- ${position?.label ?? "Card"}: ${card.name}${draw.reversed ? " (reversed)" : ""} — ${meaning.keywords.join(", ")}. ${meaning.text}`;
      })
      .filter(Boolean)
      .join("\n");

    const user = [
      spread ? `Spread: ${spread.name}. ${spread.description}` : "A tarot spread.",
      data.question.trim() ? `Question: ${data.question.trim()}` : "No question was asked; read the general weather.",
      "Cards:",
      cardLines,
    ].join("\n");

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 700,
          temperature: 0.7,
          messages: [
            {
              role: "system",
              content:
                "You are a seasoned tarot reader in The Tellers Chambers. Write calm, specific, literary prose. No carnival fortune-teller voice, no 'the universe wants', no emoji, no bullet-point dump. If a question is present, answer it. Interpret the spread as one connected story, then give each position two or three precise sentences. Close with one practical, non-preachy next step. 350–520 words.",
            },
            { role: "user", content: user },
          ],
        }),
      });
      if (!res.ok) {
        return { ok: false, error: `xAI API error ${res.status}`, fallback };
      }
      const body = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = body.choices?.[0]?.message?.content?.trim();
      if (!text) return { ok: false, error: "Empty reading", fallback };
      return { ok: true, text };
    } catch {
      return { ok: false, error: "The chamber could not be reached", fallback };
    }
  });
