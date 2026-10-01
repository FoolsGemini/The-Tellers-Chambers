/** Civil-date astronomy for the rites. Day pillars are anchored on a checked almanac date. */

export const STEMS = ["Jia", "Yi", "Bing", "Ding", "Wu", "Ji", "Geng", "Xin", "Ren", "Gui"] as const;
export const STEM_ZH = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
export const STEM_ELEMENT = ["Wood", "Wood", "Fire", "Fire", "Earth", "Earth", "Metal", "Metal", "Water", "Water"] as const;
export const STEM_YIN = [false, true, false, true, false, true, false, true, false, true] as const;

export const BRANCHES = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"] as const;
export const BRANCH_ZH = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;
export const BRANCH_ELEMENT = ["Water", "Earth", "Wood", "Wood", "Earth", "Fire", "Fire", "Earth", "Metal", "Metal", "Earth", "Water"] as const;

/** Eight-direction bucket for each branch. */
export const BRANCH_DIRECTION = [
  "North",
  "Northeast",
  "Northeast",
  "East",
  "Southeast",
  "Southeast",
  "South",
  "Southwest",
  "Southwest",
  "West",
  "Northwest",
  "Northwest",
] as const;

export type Direction =
  | "North"
  | "Northeast"
  | "East"
  | "Southeast"
  | "South"
  | "Southwest"
  | "West"
  | "Northwest";

const NAYIN = [
  "Metal in the sea",
  "Fire in the furnace",
  "Timber of the great forest",
  "Earth by the road",
  "Metal of the sword's edge",
  "Fire on the mountain",
  "Water in the ravine",
  "Earth of the rampart",
  "Metal of white wax",
  "Wood of the willow",
  "Water of the spring",
  "Earth of the rooftop",
  "Fire of thunder",
  "Wood of pine and cypress",
  "Water of the long stream",
  "Metal in the sand",
  "Fire under the mountain",
  "Wood of the plain",
  "Earth of the wall",
  "Metal leaf",
  "Fire of the covered lamp",
  "Water of the heavenly river",
  "Earth of the post road",
  "Metal of hairpin and bracelet",
  "Wood of mulberry",
  "Water of the great stream",
  "Earth in the sand",
  "Fire in the sky",
  "Wood of the pomegranate",
  "Water of the great sea",
] as const;

/** 2026-09-28 is 乙巳, sexagenary index 41. */
const PILLAR_ANCHOR = Date.UTC(2026, 8, 28);
const PILLAR_INDEX = 41;

export type Pillar = {
  index: number;
  stem: number;
  branch: number;
  stemName: string;
  branchName: string;
  hanzi: string;
  element: (typeof STEM_ELEMENT)[number];
  animal: (typeof BRANCHES)[number];
  nayin: string;
  label: string;
};

export function localDateParts(date = new Date()) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

export function dateKey(date = new Date()) {
  const p = localDateParts(date);
  return `${p.year}-${p.month}-${p.day}`;
}

function utcDay(year: number, month: number, day: number) {
  return Date.UTC(year, month - 1, day);
}

export function dayPillar(date = new Date()): Pillar {
  const p = localDateParts(date);
  const diff = Math.round((utcDay(p.year, p.month, p.day) - PILLAR_ANCHOR) / 86400000);
  const index = mod(PILLAR_INDEX + diff, 60);
  return pillarFromIndex(index);
}

export function pillarFromIndex(index: number): Pillar {
  const stem = mod(index, 10);
  const branch = mod(index, 12);
  const stemName = STEMS[stem] ?? "Jia";
  const branchName = BRANCHES[branch] ?? "Rat";
  return {
    index,
    stem,
    branch,
    stemName,
    branchName,
    hanzi: `${STEM_ZH[stem] ?? ""}${BRANCH_ZH[branch] ?? ""}`,
    element: STEM_ELEMENT[stem] ?? "Wood",
    animal: branchName,
    nayin: NAYIN[Math.floor(index / 2)] ?? NAYIN[0],
    label: `${stemName} ${branchName}`,
  };
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

/** Julian day at 00:00 UTC. */
export function julianDay(year: number, month: number, day: number, hour = 0) {
  return Date.UTC(year, month - 1, day, hour) / 86400000 + 2440587.5;
}

/** Apparent solar longitude, degrees 0–360. Meeus, good to a fraction of a degree. */
export function solarLongitude(jd: number) {
  const T = (jd - 2451545.0) / 36525;
  const L0 = mod(280.46646 + 36000.76983 * T + 0.0003032 * T * T, 360);
  const M = ((357.52911 + 35999.05029 * T - 0.0001537 * T * T) * Math.PI) / 180;
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
    0.000289 * Math.sin(3 * M);
  return mod(L0 + C, 360);
}

/** Meeus ch. 49, new moon as Julian day (dynamical time, close enough for the civil day). */
export function newMoonJulian(k: number) {
  const T = k / 1236.85;
  const JDE =
    2451550.09766 +
    29.530588861 * k +
    0.00015437 * T * T -
    0.00000015 * T * T * T +
    0.00000000073 * T * T * T * T;
  const rad = Math.PI / 180;
  const M = (2.5534 + 29.1053567 * k) * rad;
  const Mp = (201.5643 + 385.81693528 * k + 0.0107582 * T * T) * rad;
  const F = (160.7108 + 390.67050284 * k - 0.0016118 * T * T) * rad;
  const Om = (124.7746 - 1.56375588 * k) * rad;
  const corr =
    -0.4072 * Math.sin(Mp) +
    0.17241 * Math.sin(M) +
    0.01608 * Math.sin(2 * Mp) +
    0.01039 * Math.sin(2 * F) +
    0.00739 * Math.sin(Mp - M) -
    0.00514 * Math.sin(Mp + M) +
    0.00208 * Math.sin(2 * M) -
    0.00111 * Math.sin(Mp - 2 * F) -
    0.00057 * Math.sin(Mp + 2 * F) +
    0.00056 * Math.sin(2 * Mp + M) -
    0.00042 * Math.sin(3 * Mp) +
    0.00042 * Math.sin(M + 2 * F) +
    0.00038 * Math.sin(M - 2 * F) -
    0.00024 * Math.sin(2 * Mp - M) -
    0.00017 * Math.sin(Om);
  return JDE + corr;
}

const SYNODIC = 29.530588853;
/** Known new moon: 2000-01-06 18:14 UTC. */
const KNOWN_NEW = Date.UTC(2000, 0, 6, 18, 14);

export type MoonPhaseName =
  | "New"
  | "Waxing crescent"
  | "First quarter"
  | "Waxing gibbous"
  | "Full"
  | "Waning gibbous"
  | "Last quarter"
  | "Waning crescent";

export type MoonNow = {
  age: number;
  illumination: number;
  waxing: boolean;
  phase: MoonPhaseName;
  reading: string;
};

export function moonNow(date = new Date()): MoonNow {
  const age = mod((date.getTime() - KNOWN_NEW) / 86400000, SYNODIC);
  const illumination = (1 - Math.cos((2 * Math.PI * age) / SYNODIC)) / 2;
  const waxing = age < SYNODIC / 2;
  const phase = phaseName(age);
  return { age, illumination, waxing, phase, reading: PHASE_READING[phase] };
}

function phaseName(age: number): MoonPhaseName {
  if (age < 1.0 || age > 28.6) return "New";
  if (age < 6.4) return "Waxing crescent";
  if (age < 8.4) return "First quarter";
  if (age < 13.8) return "Waxing gibbous";
  if (age < 16.1) return "Full";
  if (age < 21.4) return "Waning gibbous";
  if (age < 23.4) return "Last quarter";
  return "Waning crescent";
}

const PHASE_READING: Record<MoonPhaseName, string> = {
  New: "The sky is dark on purpose. Begin in private. Name the thing you will grow, then do not announce it yet.",
  "Waxing crescent": "A thin light. Commit to one small repetition. The moon does not argue with the dark; it adds a little each night.",
  "First quarter": "Half the disc, and a decision. Push past the first resistance. What you started now needs a spine.",
  "Waxing gibbous": "Almost full. Refine, don't invent. Edit the work, the room, the promise, until it can stand the light.",
  Full: "Everything is visible, including what you hoped to hide. Speak plainly. Celebrate if it is real. Release if it is not.",
  "Waning gibbous": "The light is leaving with gratitude, not failure. Share what you learned. Give something away. Teach it once.",
  "Last quarter": "Cut. End the habit, the tab, the sentence that no longer serves. A clean no is the rite.",
  "Waning crescent": "Rest is the practice. Sleep, sort, forgive a small thing. Do not plant. Let the field lie.",
};

export type SolarTerm = {
  name: string;
  hanzi: string;
  next: string;
  nextHanzi: string;
  note: string;
};

const TERMS: { lon: number; name: string; hanzi: string }[] = [
  { lon: 315, name: "Start of Spring", hanzi: "立春" },
  { lon: 330, name: "Rain Water", hanzi: "雨水" },
  { lon: 345, name: "Awakening of Insects", hanzi: "惊蛰" },
  { lon: 0, name: "Spring Equinox", hanzi: "春分" },
  { lon: 15, name: "Clear and Bright", hanzi: "清明" },
  { lon: 30, name: "Grain Rain", hanzi: "谷雨" },
  { lon: 45, name: "Start of Summer", hanzi: "立夏" },
  { lon: 60, name: "Grain Full", hanzi: "小满" },
  { lon: 75, name: "Grain in Ear", hanzi: "芒种" },
  { lon: 90, name: "Summer Solstice", hanzi: "夏至" },
  { lon: 105, name: "Minor Heat", hanzi: "小暑" },
  { lon: 120, name: "Major Heat", hanzi: "大暑" },
  { lon: 135, name: "Start of Autumn", hanzi: "立秋" },
  { lon: 150, name: "Limit of Heat", hanzi: "处暑" },
  { lon: 165, name: "White Dew", hanzi: "白露" },
  { lon: 180, name: "Autumn Equinox", hanzi: "秋分" },
  { lon: 195, name: "Cold Dew", hanzi: "寒露" },
  { lon: 210, name: "Frost Descent", hanzi: "霜降" },
  { lon: 225, name: "Start of Winter", hanzi: "立冬" },
  { lon: 240, name: "Minor Snow", hanzi: "小雪" },
  { lon: 255, name: "Major Snow", hanzi: "大雪" },
  { lon: 270, name: "Winter Solstice", hanzi: "冬至" },
  { lon: 285, name: "Minor Cold", hanzi: "小寒" },
  { lon: 300, name: "Major Cold", hanzi: "大寒" },
];

export function solarTerm(date = new Date()): SolarTerm {
  const p = localDateParts(date);
  const jd = julianDay(p.year, p.month, p.day, 12);
  const lon = solarLongitude(jd);
  const ordered = [...TERMS].sort((a, b) => a.lon - b.lon);
  let current = ordered[ordered.length - 1]!;
  let next = ordered[0]!;
  for (let i = 0; i < ordered.length; i += 1) {
    const term = ordered[i]!;
    if (lon >= term.lon) {
      current = term;
      next = ordered[(i + 1) % ordered.length] ?? term;
    }
  }
  return {
    name: current.name,
    hanzi: current.hanzi,
    next: next.name,
    nextHanzi: next.hanzi,
    note: `${current.name} is the season's mark. ${next.name} comes next.`,
  };
}

export type LunarDate = {
  month: number;
  day: number;
  leap: boolean;
  monthLabel: string;
  dayLabel: string;
};

const MONTH_LABEL = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];

/** Chinese lunar date. Day 1 is the China civil date on which the new moon falls. */
export function lunarDate(date = new Date()): LunarDate {
  const p = localDateParts(date);
  const today = Date.UTC(p.year, p.month - 1, p.day);
  const jd = today / 86400000 + 2440587.5;
  const k0 = Math.round((jd - 2451550.09766) / SYNODIC);
  const moons: { jd: number; start: number }[] = [];
  for (let k = k0 - 18; k <= k0 + 14; k += 1) {
    const moonJd = newMoonJulian(k);
    const china = chinaCivil(moonJd);
    moons.push({ jd: moonJd, start: Date.UTC(china.year, china.month - 1, china.day) });
  }
  let idx = 0;
  for (let i = 0; i < moons.length - 1; i += 1) {
    if (today >= moons[i]!.start && today < moons[i + 1]!.start) {
      idx = i;
      break;
    }
  }
  const day = Math.round((today - moons[idx]!.start) / 86400000) + 1;

  const leaps = moons.map((moon, i) => {
    const next = moons[i + 1];
    if (!next) return false;
    return !containsMajorTerm(moon.jd, next.jd);
  });

  const monthEnd = moons[idx + 1]?.jd ?? moons[idx]!.jd + 30;
  let solstice = jdOfLongitude(270, monthEnd);
  if (solstice >= monthEnd) solstice = jdOfLongitude(270, monthEnd - 370);
  const m11 = indexOfMonthContaining(moons, solstice);

  const months: { n: number; leap: boolean }[] = [];
  let n = 11;
  for (let i = m11; i < moons.length - 1; i += 1) {
    const leap = leaps[i] === true;
    months[i] = { n, leap };
    if (!leap) n = n === 12 ? 1 : n + 1;
  }
  n = 11;
  for (let i = m11 - 1; i >= 0; i -= 1) {
    const leap = leaps[i] === true;
    if (!leap) n = n === 1 ? 12 : n - 1;
    months[i] = { n, leap };
  }
  const found = months[idx] ?? { n: 1, leap: false };
  const month = found.n;
  const leap = found.leap;
  const base = MONTH_LABEL[month] ?? `${month}`;
  const shown = Math.max(1, Math.min(30, day));
  return {
    month,
    day: shown,
    leap,
    monthLabel: leap ? `leap ${base} month` : `${base} month`,
    dayLabel: `day ${shown}`,
  };
}

function chinaCivil(jd: number) {
  const ms = (jd - 2440587.5) * 86400000 + 8 * 3600000;
  const d = new Date(ms);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
  };
}

function indexOfMonthContaining(moons: { jd: number }[], target: number) {
  for (let i = 0; i < moons.length - 1; i += 1) {
    if (target >= moons[i]!.jd && target < moons[i + 1]!.jd) return i;
  }
  return 0;
}

function containsMajorTerm(start: number, end: number) {
  const a = Math.floor(solarLongitude(start + 0.05) / 30);
  const b = Math.floor(solarLongitude(end - 0.05) / 30);
  return a !== b;
}

function jdOfLongitude(target: number, guess: number) {
  let jd = guess;
  for (let i = 0; i < 8; i += 1) {
    const lon = solarLongitude(jd);
    let delta = target - lon;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    jd += delta / 0.985647;
  }
  return jd;
}

/** Bazi year changes at Start of Spring, not 1 January. */
export function yearPillar(date = new Date()): Pillar {
  const p = localDateParts(date);
  const jd = julianDay(p.year, p.month, p.day, 12);
  const lon = solarLongitude(jd);
  const year = lon >= 285 && lon < 315 ? p.year - 1 : p.year;
  return pillarFromIndex(mod(year - 1984, 60));
}

/** Solar month branch changes at the “jie” terms, about every 30° from 315°. */
export function monthPillar(date = new Date(), year = yearPillar(date)): Pillar {
  const p = localDateParts(date);
  const lon = solarLongitude(julianDay(p.year, p.month, p.day, 12));
  const shifted = mod(lon - 315, 360);
  const step = Math.floor(shifted / 30);
  const branch = mod(2 + step, 12);
  const yinStem = mod(year.stem * 2 + 2, 10);
  const stem = mod(yinStem + mod(branch - 2, 12), 10);
  const index = sexagenary(stem, branch);
  return pillarFromIndex(index);
}

function sexagenary(stem: number, branch: number) {
  for (let i = 0; i < 60; i += 1) {
    if (i % 10 === stem && i % 12 === branch) return i;
  }
  return 0;
}

export const MANSIONS: { name: string; animal: string; reading: string }[] = [
  { name: "Horn", animal: "Dragon", reading: "A beginning with a point. Start the thing that has a spine." },
  { name: "Neck", animal: "Dragon", reading: "A narrow passage. Speak carefully; the words have to fit." },
  { name: "Root", animal: "Badger", reading: "Foundation. Tend what is already planted before you travel." },
  { name: "Room", animal: "Hare", reading: "A room of one's own. Hospitality and the private door both matter." },
  { name: "Heart", animal: "Fox", reading: "The center of the chest. Do not negotiate your real want today." },
  { name: "Tail", animal: "Tiger", reading: "Aftermath. Finish the old hunt before you start another." },
  { name: "Winnowing basket", animal: "Leopard", reading: "Sort. Keep the grain, let the chaff go without a speech." },
  { name: "Dipper", animal: "Unicorn", reading: "Measure. A good day for accounts, maps, and honest scales." },
  { name: "Ox", animal: "Ox", reading: "Slow strength. Carry one load well. Do not add a second." },
  { name: "Girl", animal: "Bat", reading: "Skill of the hands. Make, mend, or write. Avoid a public quarrel." },
  { name: "Emptiness", animal: "Rat", reading: "A hollow that is useful. Leave space. Do not fill the day out of nerves." },
  { name: "Rooftop", animal: "Swallow", reading: "Height and exposure. Climb only what you can maintain. Watch the eaves." },
  { name: "Encampment", animal: "Pig", reading: "Shelter. Stay with your people. Build the wall, not the argument." },
  { name: "Wall", animal: "Porcupine", reading: "Boundary. A clear no protects the house better than a clever yes." },
  { name: "Legs", animal: "Wolf", reading: "Movement. A journey, a message, a change of room. Go and come back." },
  { name: "Bond", animal: "Dog", reading: "Alliance. Pair with someone competent. Do not go alone into a contract." },
  { name: "Stomach", animal: "Pheasant", reading: "Storehouse. Eat, gather, and stop when you are fed." },
  { name: "Hairy head", animal: "Cockerel", reading: "A bristling day. Courage is useful; provocation is not." },
  { name: "Net", animal: "Crow", reading: "Catch only what you mean to keep. A trap set in anger closes on you." },
  { name: "Turtle beak", animal: "Monkey", reading: "Precision. Cut once. Wit is welcome; spite is expensive." },
  { name: "Three stars", animal: "Ape", reading: "Company of three. Collaboration wants a limit, not a crowd." },
  { name: "Well", animal: "Tapir", reading: "The deep source. Study, draw water, return to the old well." },
  { name: "Ghost", animal: "Sheep", reading: "Unseen business. Superstition is optional; unfinished grief is not." },
  { name: "Willow", animal: "Muntjac", reading: "Flexibility. Bend the plan. A rigid willow snaps in a small wind." },
  { name: "Star", animal: "Horse", reading: "Reputation. You are more visible than you feel. Act as if seen." },
  { name: "Extended net", animal: "Deer", reading: "Spread the work. Share credit. A net needs more than one hand." },
  { name: "Wings", animal: "Snake", reading: "Departure. Let something fly. Do not clip it out of fear." },
  { name: "Chariot", animal: "Worm", reading: "The vehicle. Fix the means — the road, the tool, the body — then go." },
];

/** 2026-09-28 is the Rooftop mansion, index 11. */
export function lunarMansion(date = new Date()) {
  const p = localDateParts(date);
  const diff = Math.round((utcDay(p.year, p.month, p.day) - PILLAR_ANCHOR) / 86400000);
  const index = mod(11 + diff, 28);
  return { index, ...(MANSIONS[index] ?? MANSIONS[0]!) };
}

export type BaguaSector = {
  id: Direction | "Center";
  label: string;
  life: string;
  element: string;
};

export const BAGUA: BaguaSector[] = [
  { id: "Southeast", label: "Southeast", life: "Wealth", element: "Wood" },
  { id: "South", label: "South", life: "Fame", element: "Fire" },
  { id: "Southwest", label: "Southwest", life: "Relationship", element: "Earth" },
  { id: "East", label: "East", life: "Family", element: "Wood" },
  { id: "Center", label: "Center", life: "Health", element: "Earth" },
  { id: "West", label: "West", life: "Children", element: "Metal" },
  { id: "Northeast", label: "Northeast", life: "Knowledge", element: "Earth" },
  { id: "North", label: "North", life: "Career", element: "Water" },
  { id: "Northwest", label: "Northwest", life: "Helpful people", element: "Metal" },
];
