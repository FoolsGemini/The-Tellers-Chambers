export type Face = "yang" | "yin";

export const FACE_READING: Record<Face, { name: string; text: string }> = {
  yang: {
    name: "Yang",
    text: "The bright face. Advance. Speak the sentence, send the note, take the step that has already been decided in your chest.",
  },
  yin: {
    name: "Yin",
    text: "The quiet face. Wait. Listen one more time. The move is real, but it is not this hour.",
  },
};

const TRIADS: Record<string, string> = {
  yangyangyang: "Three bright faces. The way is open. Do the thing today, in daylight, where you can be seen doing it.",
  yinyinyin: "Three quiet faces. This is a holding pattern, not a defeat. Prepare the tools and do not force the gate.",
  yangyangyin: "Two steps forward, then a pause. Begin, and stop before you overreach. The third face is the editor.",
  yangyinyang: "A hesitation in the middle. The urge is true and the doubt is also true. Name the doubt, then continue.",
  yinyangyang: "A slow start that gathers. Do not judge the morning by its reluctance. The later hours carry it.",
  yinyangyin: "A brief opening between two waits. Use the middle face for one small action, then return to stillness.",
  yangyinyin: "Bright, then receding. Start only what you can pause. A large launch today will ask to be undone.",
  yinyinyang: "Quiet, then a turn toward yes. The permission arrives late. Keep the evening free for it.",
};

export function triadReading(faces: Face[]) {
  const key = faces.join("");
  return (
    TRIADS[key] ??
    "The coins have spoken in a pattern. Read each face, then the order, before you move."
  );
}

export type Toss = {
  id: string;
  at: string;
  question: string;
  faces: Face[];
};

const KEY = "veil.coin.v1";

export function loadTosses(): Toss[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Toss[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveToss(toss: Toss) {
  if (typeof window === "undefined") return;
  const next = [toss, ...loadTosses()].slice(0, 12);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
