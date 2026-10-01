import type { Meaning, Rank, Suit, TarotCard } from "./types";

const ROMAN = [
  "0",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
  "XIII",
  "XIV",
  "XV",
  "XVI",
  "XVII",
  "XVIII",
  "XIX",
  "XX",
  "XXI",
] as const;

function m(keywords: string, text: string): Meaning {
  return { keywords: keywords.split(", ").map((k) => k.trim()), text };
}

const majors: TarotCard[] = [
  {
    id: "major-0",
    name: "The Fool",
    arcana: "major",
    number: 0,
    roman: ROMAN[0],
    epithet: "the first step",
    art: "/cards/major-00.jpg",
    upright: m("beginnings, trust, the open road", "A step is taken before the map is finished. Innocence is not ignorance here — it is the nerve to leave the known path with a small pack and a willing heart."),
    reversed: m("hesitation, folly, a false start", "The cliff is real, or the dog is warning you. Recklessness dressed as freedom, or a journey delayed by fear of looking foolish."),
  },
  {
    id: "major-1",
    name: "The Magician",
    arcana: "major",
    number: 1,
    roman: ROMAN[1],
    epithet: "will made visible",
    art: "/cards/major-01.jpg",
    upright: m("focus, craft, manifestation", "The tools are already on the table. Skill, speech, and attention can turn a wish into work. What you concentrate on will take form."),
    reversed: m("trickery, scattered will, unused gifts", "Talent without direction, or a performance that hides an empty hand. The work is being talked about instead of done."),
  },
  {
    id: "major-2",
    name: "The High Priestess",
    arcana: "major",
    number: 2,
    roman: ROMAN[2],
    epithet: "the held secret",
    art: "/cards/major-02.jpg",
    upright: m("intuition, stillness, the unseen", "Not every answer arrives in daylight. Wait, listen, and keep your own counsel. Something true is already known to you, if you stop performing."),
    reversed: m("noise, denial, secrets that sour", "Inner knowing is being drowned out, or a secret is being used as a wall. Silence has become avoidance."),
  },
  {
    id: "major-3",
    name: "The Empress",
    arcana: "major",
    number: 3,
    roman: ROMAN[3],
    epithet: "the living garden",
    art: "/cards/major-03.jpg",
    upright: m("nourishment, beauty, abundance", "A season of growing. Care for what is alive — body, craft, relationship, land. Pleasure is not a distraction; it is information."),
    reversed: m("depletion, smothering, fallow ground", "The garden has been overworked or neglected. Creativity stalls when you give from an empty bowl."),
  },
  {
    id: "major-4",
    name: "The Emperor",
    arcana: "major",
    number: 4,
    roman: ROMAN[4],
    epithet: "the stone seat",
    art: "/cards/major-04.jpg",
    upright: m("structure, authority, protection", "Order is a kindness when the world is windy. Boundaries, plans, and a spine. Someone must hold the line — perhaps you."),
    reversed: m("rigidity, tyranny, a collapsed frame", "Control that has forgotten its purpose, or a refusal to take the seat. Power used to shrink rather than shelter."),
  },
  {
    id: "major-5",
    name: "The Hierophant",
    arcana: "major",
    number: 5,
    roman: ROMAN[5],
    epithet: "the received teaching",
    art: "/cards/major-05.jpg",
    upright: m("tradition, blessing, a shared rite", "There is wisdom in the old rooms: teachers, vows, the way a craft is handed down. Seek a lineage, or become one."),
    reversed: m("dogma, empty ritual, a needed heresy", "The institution has become a costume. Question the lesson, or leave the hall that no longer blesses you."),
  },
  {
    id: "major-6",
    name: "The Lovers",
    arcana: "major",
    number: 6,
    roman: ROMAN[6],
    epithet: "the chosen bond",
    art: "/cards/major-06.jpg",
    upright: m("union, choice, aligned values", "A meeting that asks for the whole person. Love, yes — and the moral choice beneath it. What you join, you become responsible for."),
    reversed: m("discord, a split self, a cheap choice", "Attraction without alignment. A decision postponed until it decides you. Harmony requires telling the truth."),
  },
  {
    id: "major-7",
    name: "The Chariot",
    arcana: "major",
    number: 7,
    roman: ROMAN[7],
    epithet: "the held reins",
    art: "/cards/major-07.jpg",
    upright: m("will, victory, directed motion", "Opposing forces can be driven if the hands stay on the reins. Ambition with discipline. Go, but go as the driver, not the horses."),
    reversed: m("drift, aggression, lost direction", "The chariot runs without a road, or the driver has dropped the reins. Force is not the same as progress."),
  },
  {
    id: "major-8",
    name: "Strength",
    arcana: "major",
    number: 8,
    roman: ROMAN[8],
    epithet: "the quiet hand",
    art: "/cards/major-08.jpg",
    upright: m("courage, composure, gentle force", "The lion is not slain; it is met. True strength is patience with what is fierce in you — and in others. Softness that does not collapse."),
    reversed: m("self-doubt, raw impulse, a clenched jaw", "The animal is driving, or the will has gone meek. Force and fear are taking turns at the same door."),
  },
  {
    id: "major-9",
    name: "The Hermit",
    arcana: "major",
    number: 9,
    roman: ROMAN[9],
    epithet: "the lantern",
    art: "/cards/major-09.jpg",
    upright: m("solitude, guidance, inner light", "Withdraw not to hide, but to see. A period of study, grief, or craft that needs no audience. The lamp is for the path, not the parade."),
    reversed: m("isolation, exile, a refused lesson", "Alone has become lost. Or you are asking the crowd for a truth that only silence can give."),
  },
  {
    id: "major-10",
    name: "Wheel of Fortune",
    arcana: "major",
    number: 10,
    roman: ROMAN[10],
    epithet: "the turning",
    art: "/cards/major-10.jpg",
    upright: m("change, luck, a cycle completing", "What was stuck begins to move. Fortune is not a prize — it is a weather system. Turn with it, and plant something in the new season."),
    reversed: m("setback, clinging, a stalled wheel", "Resistance to the turn, or a run of ill luck that wants a change of method, not more force."),
  },
  {
    id: "major-11",
    name: "Justice",
    arcana: "major",
    number: 11,
    roman: ROMAN[11],
    epithet: "the balanced blade",
    art: "/cards/major-11.jpg",
    upright: m("truth, consequence, fair measure", "Cause and effect come due. Speak plainly, weigh the facts, and accept the cost of being right — or of having been wrong."),
    reversed: m("bias, delay, an unpaid debt", "The scales are being tipped. Accountability is avoided, or a judgment is being made on incomplete evidence."),
  },
  {
    id: "major-12",
    name: "The Hanged Man",
    arcana: "major",
    number: 12,
    roman: ROMAN[12],
    epithet: "the yielded view",
    art: "/cards/major-12.jpg",
    upright: m("pause, surrender, a new angle", "Progress by stillness. Hang long enough to see the room upside down. What looks like delay is a required inversion of values."),
    reversed: m("stalling, martyrdom, a useless sacrifice", "You are hanging after the lesson has arrived. Or you refuse to stop, and so learn nothing."),
  },
  {
    id: "major-13",
    name: "Death",
    arcana: "major",
    number: 13,
    roman: ROMAN[13],
    epithet: "the necessary ending",
    art: "/cards/major-13.jpg",
    upright: m("ending, shedding, passage", "Something is over, whether named or not. Let it finish so the next life of this story can start. Transformation is rarely polite."),
    reversed: m("clinging, stagnation, a death delayed", "The old form is being kept on life support. Grief refused becomes a room you cannot leave."),
  },
  {
    id: "major-14",
    name: "Temperance",
    arcana: "major",
    number: 14,
    roman: ROMAN[14],
    epithet: "the mixing of waters",
    art: "/cards/major-14.jpg",
    upright: m("patience, alchemy, the middle path", "Two temperatures, one vessel. Blend rather than choose a camp. Healing and art both happen at a measured pour."),
    reversed: m("excess, impatience, a broken mix", "Too much of one element. The experiment curdles when you rush the chemistry or refuse to compromise."),
  },
  {
    id: "major-15",
    name: "The Devil",
    arcana: "major",
    number: 15,
    roman: ROMAN[15],
    epithet: "the gilded chain",
    art: "/cards/major-15.jpg",
    upright: m("bondage, appetite, a material spell", "A habit, a contract, a hunger wearing your name. The chain is often loose enough to slip — if you admit you are wearing it."),
    reversed: m("release, shadow work, the spell breaking", "The hook comes out. Freedom is awkward at first. Look at the appetite without becoming it."),
  },
  {
    id: "major-16",
    name: "The Tower",
    arcana: "major",
    number: 16,
    roman: ROMAN[16],
    epithet: "the struck house",
    art: "/cards/major-16.jpg",
    upright: m("rupture, revelation, false structure", "What was built on a lie cannot be renovated. The lightning is merciless and clarifying. After the dust, there is sky."),
    reversed: m("a delayed crash, fear of change, rubble ignored", "You can feel the crack and still live in it. Disaster postponed is not safety."),
  },
  {
    id: "major-17",
    name: "The Star",
    arcana: "major",
    number: 17,
    roman: ROMAN[17],
    epithet: "the open well",
    art: "/cards/major-17.jpg",
    upright: m("hope, healing, quiet faith", "After the storm, water. A gentle, durable optimism. Share what you have; the well refills when it is used with care."),
    reversed: m("discouragement, dry faith, hope withheld", "The stars are still there; the night is simply louder. Rest, then pour again. Cynicism is not the same as wisdom."),
  },
  {
    id: "major-18",
    name: "The Moon",
    arcana: "major",
    number: 18,
    roman: ROMAN[18],
    epithet: "the path of animals",
    art: "/cards/major-18.jpg",
    upright: m("dreams, fear, the uncertain path", "Not everything that howls is an enemy. Walk by feel. Illusion, anxiety, and poetry share a road — test each shape before you name it."),
    reversed: m("clarity arriving, secrets thinning, fear unmasked", "The fog lifts, or you finally admit which fear was a story. Do not replace one dream with another unexamined."),
  },
  {
    id: "major-19",
    name: "The Sun",
    arcana: "major",
    number: 19,
    roman: ROMAN[19],
    epithet: "the open day",
    art: "/cards/major-19.jpg",
    upright: m("joy, vitality, success in the open", "Warmth without a catch. A childlike yes. Work and love that can stand the light. Let yourself be seen succeeding."),
    reversed: m("dimmed joy, delayed success, a clouded noon", "The sun is not gone; it is briefly covered. Pride, burnout, or a happiness you will not claim."),
  },
  {
    id: "major-20",
    name: "Judgement",
    arcana: "major",
    number: 20,
    roman: ROMAN[20],
    epithet: "the horn",
    art: "/cards/major-20.jpg",
    upright: m("awakening, reckoning, a second life", "A call you cannot unhear. Rise from an old identity. Forgiveness — of self, of others — is part of answering."),
    reversed: m("self-reproach, a refused calling, the snooze of the soul", "The horn sounds and you roll over. Or you judge yourself so harshly that no new life can stand."),
  },
  {
    id: "major-21",
    name: "The World",
    arcana: "major",
    number: 21,
    roman: ROMAN[21],
    epithet: "the completed dance",
    art: "/cards/major-21.jpg",
    upright: m("completion, integration, a whole circuit", "A cycle closes with grace. You contain the journey you took. Celebrate, then choose the next circle with both feet."),
    reversed: m("loose ends, incompletion, a dance unfinished", "Almost. One piece is still outside the wreath. Finish it, or admit this ending is not yet yours."),
  },
];

type MinorSpec = {
  rank: Rank;
  pip?: number;
  name: string;
  epithet: string;
  upright: Meaning;
  reversed: Meaning;
};

const SUIT_META: Record<
  Suit,
  { label: string; of: string; art: string }
> = {
  wands: { label: "Wands", of: "of Wands", art: "/cards/suit-wands.jpg" },
  cups: { label: "Cups", of: "of Cups", art: "/cards/suit-cups.jpg" },
  swords: { label: "Swords", of: "of Swords", art: "/cards/suit-swords.jpg" },
  pentacles: { label: "Pentacles", of: "of Pentacles", art: "/cards/suit-pentacles.jpg" },
};

const RANK_TITLE: Record<Rank, string> = {
  ace: "Ace",
  two: "Two",
  three: "Three",
  four: "Four",
  five: "Five",
  six: "Six",
  seven: "Seven",
  eight: "Eight",
  nine: "Nine",
  ten: "Ten",
  page: "Page",
  knight: "Knight",
  queen: "Queen",
  king: "King",
};

const PIP: Record<Rank, number | undefined> = {
  ace: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  page: undefined,
  knight: undefined,
  queen: undefined,
  king: undefined,
};

const WANDS: MinorSpec[] = [
  { rank: "ace", name: "Ace of Wands", epithet: "the first spark", upright: m("inspiration, a green fuse, yes", "A live wire of will. Begin the project, send the message, light the work. The match is already struck."), reversed: m("false start, a damp wick", "Desire without a plan, or a plan you do not actually want. Wait for a truer spark.") },
  { rank: "two", name: "Two of Wands", epithet: "the held horizon", upright: m("planning, dominion, the long look", "You have a small world in hand and a larger one in view. Choose a direction before the map yellows."), reversed: m("playing small, fear of the voyage", "The globe stays on the shelf. Ambition is being mistaken for disloyalty to the familiar.") },
  { rank: "three", name: "Three of Wands", epithet: "ships on the water", upright: m("expansion, foresight, work leaving the harbor", "What you launched is moving. Look farther than the dock. Collaboration and trade are in season."), reversed: m("delays, a short horizon", "Ships return late, or you never sent them. The world is larger than your current plan.") },
  { rank: "four", name: "Four of Wands", epithet: "the wreath over the door", upright: m("homecoming, rite, shared joy", "A threshold worth marking: house, union, a finished stage. Invite people in. Stability can be festive."), reversed: m("unstable foundation, a party postponed", "The walls are up but not blessed. Celebration feels premature, or home is a question.") },
  { rank: "five", name: "Five of Wands", epithet: "the practice bout", upright: m("contest, friction, many wills", "Conflict that can still be sport. Test your idea against others. Noise is not always war."), reversed: m("avoided conflict, inner brawl", "The fight has gone underground, or the bickering has no prize. Pick a hill or walk away.") },
  { rank: "six", name: "Six of Wands", epithet: "the public wreath", upright: m("recognition, a won field, morale", "A victory that can be seen. Take the credit without becoming the parade. Let success feed the next march."), reversed: m("private win, tarnished praise", "Glory delayed, or praise that does not land. Pride needs a truer audience — including yourself.") },
  { rank: "seven", name: "Seven of Wands", epithet: "the high ground", upright: m("defense, conviction, holding the rise", "You have position, and it is being tested. Stand. Not every challenger deserves the hill."), reversed: m("overwhelm, a lost footing", "Too many staffs, not enough stance. Yield a lesser point so the real one can be kept.") },
  { rank: "eight", name: "Eight of Wands", epithet: "the flying messages", upright: m("swiftness, travel, news in the air", "Things accelerate. Send it, go, answer. Alignment makes speed feel like grace."), reversed: m("delays, crossed wires", "Arrows in the mud. Wait for a clear sky before you fire another round of messages.") },
  { rank: "nine", name: "Nine of Wands", epithet: "the last watch", upright: m("resilience, boundaries, almost there", "Wounded and still standing. Guard what you built. Rest is part of the watch, not a desertion."), reversed: m("exhaustion, paranoia", "The siege is mostly in the nerves now. Lay one wand down. You do not have to fight shadows.") },
  { rank: "ten", name: "Ten of Wands", epithet: "the carried bundle", upright: m("burden, duty, the last mile", "You took on too much because you could. Set some of it down, or ask for a second pair of arms."), reversed: m("release, a load refused", "The bundle slips — by choice or collapse. Delegation is not failure.") },
  { rank: "page", name: "Page of Wands", epithet: "the untried flame", upright: m("messenger, curiosity, a first quest", "A spark in a young hand. Study, travel, a brave draft. Follow the heat and learn the craft as you go."), reversed: m("restless, unfocused, a rumor of fire", "Ideas without a path. The messenger is distracted, or the news is only a wish.") },
  { rank: "knight", name: "Knight of Wands", epithet: "the charged ride", upright: m("pursuit, charisma, sudden departure", "Heat and motion. Charm that moves rooms. Act while the courage is high — and watch for scorch marks."), reversed: m("impulsiveness, a thrown ride", "Leaving too fast, promising too much. Passion without a road is just smoke.") },
  { rank: "queen", name: "Queen of Wands", epithet: "the solar chair", upright: m("warmth, magnetism, confident host", "A person who lights the room without begging it. Creative authority, loyalty, a cat's independent grace."), reversed: m("jealousy, a dimmed hearth", "Warmth turned demanding, or confidence collapsed into performance. Reclaim the fire without the theatrics.") },
  { rank: "king", name: "King of Wands", epithet: "the visionary seat", upright: m("leadership, vision, noble risk", "A captain of enterprise and spirit. See far, decide cleanly, and let others bring their own fire."), reversed: m("tyranny, impulse in a crown", "A leader who cannot hear. Vision has become vanity. Share the map or lose the company.") },
];

const CUPS: MinorSpec[] = [
  { rank: "ace", name: "Ace of Cups", epithet: "the overflowing cup", upright: m("new feeling, grace, an open heart", "A cup is offered. Love, art, or a well of compassion wants to begin. Receive it before you analyze it."), reversed: m("blocked feeling, a withheld cup", "The well is capped. Numbness, a love not dared, or emotion leaking where it cannot be held.") },
  { rank: "two", name: "Two of Cups", epithet: "the pledged pair", upright: m("partnership, mutual regard, a toast", "Two wills meeting as equals. Romance, alliance, the chemistry of respect. What is exchanged here can last."), reversed: m("imbalance, a broken toast", "The cups are not both full. A mismatch of need, or a bond that has forgotten courtesy.") },
  { rank: "three", name: "Three of Cups", epithet: "the shared table", upright: m("friendship, reunion, communal joy", "Harvest among friends. Celebrate the small success in company. Belonging is a practice."), reversed: m("gossip, a party that costs", "The circle has gone sour, or solitude is needed after too much wine. Choose your table.") },
  { rank: "four", name: "Four of Cups", epithet: "the refused cup", upright: m("apathy, contemplation, a missed offer", "Satiety that looks like sadness. Something is being offered while you stare at the three you already hold."), reversed: m("a yes at last, leaving the tree", "The trance breaks. Curiosity returns. Take the cup that arrived while you were numb.") },
  { rank: "five", name: "Five of Cups", epithet: "the spilled wine", upright: m("grief, regret, what remains", "Three cups down, two still standing. Mourn what spilled. Then turn around — the river is still there, and so is the rest."), reversed: m("acceptance, a return from mourning", "The cloak lifts. Forgiveness, of self especially. You may walk the bridge now.") },
  { rank: "six", name: "Six of Cups", epithet: "the old garden", upright: m("memory, kindness, a child-self", "The past arrives as a gift, not a trap. Innocence, reunion, a simpler sweetness. Receive it without moving in."), reversed: m("nostalgia as a cage, a stuck then", "Memory is editing the present. Honor where you came from without asking it to host you forever.") },
  { rank: "seven", name: "Seven of Cups", epithet: "the clouded choices", upright: m("fantasy, options, a glittering fog", "Many cups, not all of them real. Dream fully, then pick one vessel you can actually drink from."), reversed: m("discernment, a chosen cup", "The fog thins. One option is true. Commit, and let the rest of the clouds pass.") },
  { rank: "eight", name: "Eight of Cups", epithet: "the night departure", upright: m("leaving, quest, a fuller search", "The cups were good. They are no longer enough. Walk toward the mountain while you still have night for cover."), reversed: m("staying, a return, fear of the road", "You circle the old table. Either the leaving was premature, or the courage has not yet arrived.") },
  { rank: "nine", name: "Nine of Cups", epithet: "the satisfied host", upright: m("contentment, wish granted, ease", "A full board and a private smile. Pleasure earned. Enjoy it without immediately asking what is next."), reversed: m("hollowness, a greedy wish", "The display is richer than the feeling. Want has outgrown gratitude. Recalibrate the wish.") },
  { rank: "ten", name: "Ten of Cups", epithet: "the family rainbow", upright: m("emotional fulfillment, home, lasting peace", "The rare card of a happiness that includes other people. Protect it with ordinary care."), reversed: m("a cracked hearth, the picture vs the room", "The image of family has outrun the truth of it. Repair, or stop performing the rainbow.") },
  { rank: "page", name: "Page of Cups", epithet: "the fish in the cup", upright: m("tender news, imagination, a first love", "A message from the feeling-life: an apology, a poem, a shy offering. Stay curious about your own depths."), reversed: m("moodiness, a dropped cup", "Feelings unmanaged, or a creative spark ignored. Do not mock the messenger in you.") },
  { rank: "knight", name: "Knight of Cups", epithet: "the grail ride", upright: m("romance, invitation, a quest of the heart", "An offer carried carefully. Charm, art, a proposal. Follow beauty — and ask if it can survive daylight."), reversed: m("seduction, a mood on horseback", "Promises too liquid to hold. Infatuation riding as love. Slow the horse.") },
  { rank: "queen", name: "Queen of Cups", epithet: "the still water", upright: m("empathy, inner vision, held feeling", "Deep water with a calm surface. Counsel, art, a listening so complete it heals. Keep one foot on the shore."), reversed: m("overflow, porous boundaries", "Everyone's weather is in your cup. Feel, then set the cup down. Care is not self-erasure.") },
  { rank: "king", name: "King of Cups", epithet: "the diplomatic sea", upright: m("emotional mastery, counsel, calm authority", "Feeling without shipwreck. A mature kindness that can also decide. Lead with the heart, steer with the mind."), reversed: m("manipulation, a cold tide", "Emotions used as weather control. Or a king who will not feel. Warmth must be genuine to govern well.") },
];

const SWORDS: MinorSpec[] = [
  { rank: "ace", name: "Ace of Swords", epithet: "the clear blade", upright: m("truth, a cutting idea, breakthrough", "A thought sharp enough to end confusion. Name it. Write it. The crown belongs to clarity, not to noise."), reversed: m("confusion, a misused blade", "The idea is half-forged, or the truth is being used to wound. Wait until the edge is clean.") },
  { rank: "two", name: "Two of Swords", epithet: "the blindfold truce", upright: m("stalemate, a needed pause, two truths", "The heart is crossed and the eyes are covered. Do not choose until you are willing to see. Temporary peace is still peace."), reversed: m("the blindfold slips, a forced choice", "Indecision has become its own injury. Information is available. Use it.") },
  { rank: "three", name: "Three of Swords", epithet: "the weather of grief", upright: m("heartbreak, necessary pain, a clean cut", "Sorrow with a name. Let it rain. Honesty about loss is the beginning of weather that can change."), reversed: m("recovering, a pain delayed", "The swords are coming out, or they never went in cleanly. Grieve in private if you must, but grieve.") },
  { rank: "four", name: "Four of Swords", epithet: "the stone rest", upright: m("recovery, retreat, mental quiet", "The mind needs a chapel. Rest is strategy. Healing happens when you stop arguing with the day."), reversed: m("restlessness, a rest refused", "The body is still in the tomb of busyness. Burnout is the bill for unpaid silence.") },
  { rank: "five", name: "Five of Swords", epithet: "the hollow win", upright: m("conflict, humiliation, a bitter prize", "Someone won, and the field is uglier for it. Ask whether this argument deserves your honor."), reversed: m("an olive branch, walking away", "The need to be right loosens. Return a sword. Dignity is a better trophy.") },
  { rank: "six", name: "Six of Swords", epithet: "the water crossing", upright: m("passage, recovery, leaving with the swords", "A quiet voyage out of trouble. You take the lessons with you. The water will calm as you go."), reversed: m("stuck on the bank, a voyage resisted", "You know you must leave and you have not. Unfinished mental cargo is rocking the boat.") },
  { rank: "seven", name: "Seven of Swords", epithet: "the taken blades", upright: m("strategy, stealth, a lone plan", "Not every truth is for the square. Cunning, a private exit, work done offstage. Use it ethically."), reversed: m("exposure, a confession, the ruse ending", "The hidden thing wants air. Get ahead of it. Or stop stealing energy from a situation you could leave.") },
  { rank: "eight", name: "Eight of Swords", epithet: "the bound woman", upright: m("feeling trapped, harsh self-talk", "The bindings are mostly thought. The swords do not even touch. One careful step and a belief falls."), reversed: m("finding a gap, a story ending", "The blindfold loosens. Help is usable now. Talk back to the inner jailer.") },
  { rank: "nine", name: "Nine of Swords", epithet: "the night of the mind", upright: m("anxiety, rumination, 3 a.m.", "The mind as an unkind companion. Name the fear out loud; it shrinks. This card is suffering, not prophecy."), reversed: m("a dawn, help taken", "The spiral loosens. Speak to someone. The worst picture was a picture.") },
  { rank: "ten", name: "Ten of Swords", epithet: "the ended night", upright: m("rock bottom, a complete ending", "It is finished. The dawn is already in the sky. Stop standing up so the last sword can miss."), reversed: m("a slow recovery, refusing the last blow", "The worst has passed or was survived. Do not re-stab what is trying to heal.") },
  { rank: "page", name: "Page of Swords", epithet: "the watchful wind", upright: m("curiosity, news, a keen apprentice", "Questions as a form of love. Vigilance, study, a message that cuts through fog. Stay honest and stay kind."), reversed: m("gossip, prying, a scattered mind", "Information without wisdom. Speak less until you know. The page can become a spy.") },
  { rank: "knight", name: "Knight of Swords", epithet: "the charging idea", upright: m("intellect on horseback, a crusade", "Speed of mind, a cause, a cutting ride. Brilliant — and capable of trampling. Aim, then gallop."), reversed: m("brutality, a reckless thesis", "Words as weapons, plans without mercy. Pull the horse up. Being first is not being right.") },
  { rank: "queen", name: "Queen of Swords", epithet: "the clear air", upright: m("discernment, independence, honest speech", "A mind that has survived weather. Boundaries as care. Say the true thing without decorating it."), reversed: m("coldness, a bitter tongue", "Clarity without compassion becomes a blade for its own sake. Warm the truth before you serve it.") },
  { rank: "king", name: "King of Swords", epithet: "the just mind", upright: m("ethics, analysis, fair command", "Law, strategy, a decision that can be defended in daylight. Think, then rule. The head serves the whole."), reversed: m("cruel reason, a tyrant of principle", "Intelligence used to dominate. Or a refusal to decide. Justice without humanity is just weather.") },
];

const PENTACLES: MinorSpec[] = [
  { rank: "ace", name: "Ace of Pentacles", epithet: "the offered coin", upright: m("a seed of matter, opportunity, the body yes", "A real chance: work, money, health, a plot of earth. Plant it. Practical magic begins with a yes you can touch."), reversed: m("a missed seed, shaky ground", "The offer is flawed, or your hands are full. Do not plant in frozen soil.") },
  { rank: "two", name: "Two of Pentacles", epithet: "the juggled world", upright: m("balance, flexibility, the dance of duties", "Two weights, one graceful figure-eight. Adapt. The ships behind you will wait if you keep the rhythm."), reversed: m("drop, overcommitment", "The dance has become dropping. Choose a coin. Simplifying is a skill.") },
  { rank: "three", name: "Three of Pentacles", epithet: "the workshop", upright: m("collaboration, craft, earned skill", "Work that wants other hands. Apprenticeship, feedback, a cathedral built in layers. Show the work."), reversed: m("ego in the guild, shoddy work", "No one is listening in the nave. Align the team, or go learn the part you faked.") },
  { rank: "four", name: "Four of Pentacles", epithet: "the held coins", upright: m("conservation, security, a closed fist", "Stability through holding. Sensible — until it becomes a statue. Ask what the coins are for."), reversed: m("release, a loosened grip", "Spending, sharing, or a fear of loss that is costing more than the coins. Let some gold move.") },
  { rank: "five", name: "Five of Pentacles", epithet: "the winter window", upright: m("hardship, exclusion, a cold stretch", "Lack is real. So is the lit window you have not knocked on. Help exists; pride is an expensive coat."), reversed: m("recovery, asking, a thaw", "The storm is ending. Accept warmth. Poverty of spirit can end before the ledger does.") },
  { rank: "six", name: "Six of Pentacles", epithet: "the balanced gift", upright: m("generosity, fair exchange, patronage", "Give or receive without a performance. Power in charity must stay honest. The scales are watching."), reversed: m("strings attached, a debt of pride", "Gifts that bind, or help refused. Clean up the terms of exchange.") },
  { rank: "seven", name: "Seven of Pentacles", epithet: "the long crop", upright: m("assessment, patience, tending", "You have worked. Now wait and judge the yield. Not every vine is worth another season."), reversed: m("impatience, a wasted plot", "Harvest anxiety. Either the work was unfocused, or you will not let it ripen. Change the method, not just the weather.") },
  { rank: "eight", name: "Eight of Pentacles", epithet: "the apprentice's bench", upright: m("diligence, skill, repetition", "The dignified boredom of mastery. Do the repetitions. Quality is a pile of ordinary days."), reversed: m("perfectionism, careless labor", "Busy without better. Or a talent untrained. Return to the bench, not the daydream of being finished.") },
  { rank: "nine", name: "Nine of Pentacles", epithet: "the walled garden", upright: m("self-sufficiency, refined pleasure, earned grace", "A life arranged with taste and solitude that is not lonely. Enjoy what your work bought. You may receive guests — on your terms."), reversed: m("isolation, display, a garden unshared", "Independence curdled into exile, or luxury that is only a set. Open a gate, or simplify the estate.") },
  { rank: "ten", name: "Ten of Pentacles", epithet: "the house of lineage", upright: m("legacy, family wealth, lasting structure", "The long house: money, kin, a name that outlives a mood. Build something that can be inherited — including culture."), reversed: m("family strain, a shaky estate", "The institution is cracking. Talk about money and belonging before the walls do.") },
  { rank: "page", name: "Page of Pentacles", epithet: "the studying coin", upright: m("student, a practical beginning, diligence", "A beginner who takes matter seriously: a class, a job, a body practice. Be faithful to the small start."), reversed: m("procrastination, a dropped coin", "The lesson is unpaid. Talent without study stays a rumor.") },
  { rank: "knight", name: "Knight of Pentacles", epithet: "the slow field", upright: m("steadfast work, reliability, the long ride", "The least glamorous knight, and often the one who arrives. Routine as devotion. Keep going."), reversed: m("stubbornness, stagnation", "So careful nothing moves. Or duty used to avoid desire. A little risk will not ruin the crop.") },
  { rank: "queen", name: "Queen of Pentacles", epithet: "the abundant house", upright: m("practical care, hospitality, embodied wisdom", "Nourishment you can eat. Money handled as a garden. She makes the ordinary feel tended."), reversed: m("smothering care, self-neglect", "Everyone is fed but the queen. Or comfort used to avoid growth. Put your own body back on the list.") },
  { rank: "king", name: "King of Pentacles", epithet: "the established orchard", upright: m("stewardship, prosperity, steady rule", "A builder of real things. Wealth with ethics, a handshake that holds. Provide, and teach how."), reversed: m("greed, a stagnant empire", "The orchard is only for the king. Or security has become a religion. Generosity is part of mastery.") },
];

function buildSuit(suit: Suit, specs: MinorSpec[]): TarotCard[] {
  return specs.map((spec) => ({
    id: `${suit}-${spec.rank}`,
    name: spec.name,
    arcana: "minor" as const,
    epithet: spec.epithet,
    suit,
    rank: spec.rank,
    pip: PIP[spec.rank],
    art: `/cards/${suit}-${spec.rank}.jpg`,
    upright: spec.upright,
    reversed: spec.reversed,
  }));
}

export const CARDS: TarotCard[] = [
  ...majors,
  ...buildSuit("wands", WANDS),
  ...buildSuit("cups", CUPS),
  ...buildSuit("swords", SWORDS),
  ...buildSuit("pentacles", PENTACLES),
];

const BY_ID = new Map(CARDS.map((c) => [c.id, c]));

export function getCard(id: string): TarotCard | undefined {
  return BY_ID.get(id);
}

export function suitArt(suit: Suit) {
  return SUIT_META[suit].art;
}

export function suitLabel(suit: Suit) {
  return SUIT_META[suit].label;
}

export function rankTitle(rank: Rank) {
  return RANK_TITLE[rank];
}

export const SUITS: Suit[] = ["wands", "cups", "swords", "pentacles"];
