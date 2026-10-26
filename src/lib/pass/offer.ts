export const PRICE_LABEL = "$9.99";

export const FREE_SPREADS = new Set(["single", "three"]);

export const FREE_RITES = new Set(["/rites/table", "/rites/coin"]);

export function spreadIsFree(id: string) {
  return FREE_SPREADS.has(id);
}

export function riteIsFree(to: string) {
  return FREE_RITES.has(to);
}
