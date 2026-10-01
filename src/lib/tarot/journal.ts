import type { SavedReading } from "./types";

const KEY = "veil.journal.v1";
const MAX = 60;

function canUseStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadJournal(): SavedReading[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedReading[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveJournal(entries: SavedReading[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(KEY, JSON.stringify(entries.slice(0, MAX)));
}

export function upsertReading(entry: SavedReading): SavedReading[] {
  const next = [entry, ...loadJournal().filter((e) => e.id !== entry.id)].slice(0, MAX);
  saveJournal(next);
  return next;
}

export function removeReading(id: string): SavedReading[] {
  const next = loadJournal().filter((e) => e.id !== id);
  saveJournal(next);
  return next;
}

export function newReadingId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `r-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
