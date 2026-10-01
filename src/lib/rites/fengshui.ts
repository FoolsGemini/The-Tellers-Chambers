import {
  BRANCH_DIRECTION,
  BRANCHES,
  BAGUA,
  type Direction,
  dayPillar,
  monthPillar,
  solarTerm,
  yearPillar,
  type Pillar,
} from "./calendar";

export type Tone = "auspicious" | "harsh";

const JOY: Direction[] = [
  "Northeast",
  "Northwest",
  "Southwest",
  "South",
  "Southeast",
  "Northeast",
  "Northwest",
  "Southwest",
  "South",
  "Southeast",
];

const WEALTH: Direction[] = [
  "Northeast",
  "Northeast",
  "Southwest",
  "Southwest",
  "North",
  "North",
  "East",
  "East",
  "South",
  "South",
];

const NOBLE_BRANCHES: number[][] = [
  [1, 7],
  [0, 8],
  [11, 9],
  [11, 9],
  [1, 7],
  [0, 8],
  [1, 7],
  [2, 6],
  [5, 3],
  [5, 3],
];

const GODS: { name: string; hanzi: string; tone: Tone }[] = [
  { name: "Azure Dragon", hanzi: "青龙", tone: "auspicious" },
  { name: "Bright Hall", hanzi: "明堂", tone: "auspicious" },
  { name: "Heaven's Punishment", hanzi: "天刑", tone: "harsh" },
  { name: "Vermilion Bird", hanzi: "朱雀", tone: "harsh" },
  { name: "Golden Coffer", hanzi: "金匮", tone: "auspicious" },
  { name: "Heaven's Virtue", hanzi: "天德", tone: "auspicious" },
  { name: "White Tiger", hanzi: "白虎", tone: "harsh" },
  { name: "Jade Hall", hanzi: "玉堂", tone: "auspicious" },
  { name: "Heaven's Prison", hanzi: "天牢", tone: "harsh" },
  { name: "Dark Warrior", hanzi: "玄武", tone: "harsh" },
  { name: "Master of Fate", hanzi: "司命", tone: "auspicious" },
  { name: "Winding Hook", hanzi: "勾陈", tone: "harsh" },
];

const HOUR_LABEL = [
  "23:00–01:00",
  "01:00–03:00",
  "03:00–05:00",
  "05:00–07:00",
  "07:00–09:00",
  "09:00–11:00",
  "11:00–13:00",
  "13:00–15:00",
  "15:00–17:00",
  "17:00–19:00",
  "19:00–21:00",
  "21:00–23:00",
];

const ELEMENT_COUNSEL: Record<string, { do: string; avoid: string; house: string }> = {
  Wood: {
    do: "Begin something that can grow: a letter, a planting, a plan you will still want next week.",
    avoid: "Do not answer metal with metal. Skip the cutting remark and the unnecessary demolition.",
    house: "Open a window on the east side of the room you actually use. Let air move.",
  },
  Fire: {
    do: "Be seen. Cook, present, light the lamp you have been saving. Fame today is just clarity.",
    avoid: "Do not feed a quarrel. Fire on fire only makes a bigger room to regret.",
    house: "Clear the south wall. One living flame or a warm lamp is enough; clutter there steals the day.",
  },
  Earth: {
    do: "Settle. Repair, file, host, put the object back where the hand expects it.",
    avoid: "Do not start a journey with no return named. Earth days want a threshold, not a disappearance.",
    house: "The center of the home wants to be empty enough to cross. Move the thing that blocks the path.",
  },
  Metal: {
    do: "Decide and edit. One clean cut — a sentence, a bill, a promise — is the rite.",
    avoid: "Do not over-prune what is still green. Metal serves wood; it should not erase it.",
    house: "The west holds metal. Straighten one edge there: a shelf, a blade, a stack of papers.",
  },
  Water: {
    do: "Listen, research, and let a plan travel on paper before it travels in the world.",
    avoid: "Do not sign what you have not read. Water hides the stone until you look.",
    house: "The north is the career quarter. Clear the floor there and face that way when you work.",
  },
};

export type HourRow = {
  branch: number;
  animal: string;
  clock: string;
  god: string;
  hanzi: string;
  tone: Tone;
  current: boolean;
};

export type FengShuiDay = {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  termName: string;
  termHanzi: string;
  termNote: string;
  joy: Direction;
  wealth: Direction;
  nobles: Direction[];
  clashAnimal: string;
  clashDirection: Direction;
  hours: HourRow[];
  counsel: string;
  sectorNote: string;
  highlighted: (Direction | "Center")[];
};

export function fengShuiDay(date = new Date()): FengShuiDay {
  const year = yearPillar(date);
  const month = monthPillar(date, year);
  const day = dayPillar(date);
  const term = solarTerm(date);
  const joy = JOY[day.stem] ?? "Northeast";
  const wealth = WEALTH[day.stem] ?? "Northeast";
  const nobleBranches = NOBLE_BRANCHES[day.stem] ?? [0, 8];
  const nobles = nobleBranches.map((b) => BRANCH_DIRECTION[b] ?? "North");
  const clashBranch = (day.branch + 6) % 12;
  const clashAnimal = BRANCHES[clashBranch] ?? "Pig";
  const clashDirection = BRANCH_DIRECTION[clashBranch] ?? "North";
  const shift = (month.branch - 3 + 12) % 12;
  const currentBranch = branchFromHour(date.getHours());
  const hours: HourRow[] = HOUR_LABEL.map((clock, branch) => {
    const god = GODS[(branch + shift) % 12] ?? GODS[0]!;
    return {
      branch,
      animal: BRANCHES[branch] ?? "Rat",
      clock,
      god: god.name,
      hanzi: god.hanzi,
      tone: god.tone,
      current: branch === currentBranch,
    };
  });
  const element = day.element;
  const voice = ELEMENT_COUNSEL[element] ?? ELEMENT_COUNSEL.Wood!;
  const wealthLife = BAGUA.find((b) => b.id === wealth)?.life ?? "the highlighted quarter";
  const counsel = `${day.label} is ${element.toLowerCase()} — ${day.nayin.toLowerCase()}. ${voice.do} ${voice.avoid}`;
  const sectorNote = `${voice.house} Wealth sits ${wealth.toLowerCase()} today (${wealthLife}). Joy sits ${joy.toLowerCase()}. The day clashes with the ${clashAnimal}; go gently in the ${clashDirection.toLowerCase()}.`;
  const highlighted = Array.from(new Set<Direction | "Center">([joy, wealth, ...nobles]));
  return {
    year,
    month,
    day,
    termName: term.name,
    termHanzi: term.hanzi,
    termNote: term.note,
    joy,
    wealth,
    nobles,
    clashAnimal,
    clashDirection,
    hours,
    counsel,
    sectorNote,
    highlighted,
  };
}

function branchFromHour(hour: number) {
  return Math.floor(((hour + 1) % 24) / 2);
}

export function lifeFor(direction: Direction | "Center") {
  return BAGUA.find((b) => b.id === direction);
}
