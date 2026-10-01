export type Shelf = "book" | "play" | "poem" | "film";

export type Passage = {
  id: string;
  shelf: Shelf;
  line: string;
  work: string;
  by: string;
};

export const SHELF_LABEL: Record<Shelf, string> = {
  book: "From a book",
  play: "From a play",
  poem: "From a poem",
  film: "From a film",
};

/** Every line is a public-domain passage, credited to the work it was taken from. */
export const PASSAGES: Passage[] = [
  {
    id: "tempest",
    shelf: "play",
    line: "Our revels now are ended. These our actors, as I foretold you, were all spirits, and are melted into air, into thin air. We are such stuff as dreams are made on, and our little life is rounded with a sleep.",
    work: "The Tempest",
    by: "William Shakespeare",
  },
  {
    id: "macbeth-hour",
    shelf: "play",
    line: "Tomorrow, and tomorrow, and tomorrow, creeps in this petty pace from day to day to the last syllable of recorded time, and all our yesterdays have lighted fools the way to dusty death. Come what come may, time and the hour runs through the roughest day.",
    work: "Macbeth",
    by: "William Shakespeare",
  },
  {
    id: "hamlet-self",
    shelf: "play",
    line: "This above all: to thine own self be true, and it must follow, as the night the day, thou canst not then be false to any man.",
    work: "Hamlet",
    by: "William Shakespeare",
  },
  {
    id: "caesar",
    shelf: "play",
    line: "Men at some time are masters of their fates. The fault, dear Brutus, is not in our stars, but in ourselves, that we are underlings.",
    work: "Julius Caesar",
    by: "William Shakespeare",
  },
  {
    id: "lear",
    shelf: "play",
    line: "The weight of this sad time we must obey; speak what we feel, not what we ought to say. The oldest hath borne most: we that are young shall never see so much, nor live so long.",
    work: "King Lear",
    by: "William Shakespeare",
  },
  {
    id: "dickinson",
    shelf: "poem",
    line: "Hope is the thing with feathers that perches in the soul, and sings the tune without the words, and never stops at all.",
    work: "Poems",
    by: "Emily Dickinson",
  },
  {
    id: "whitman",
    shelf: "poem",
    line: "Do I contradict myself? Very well then I contradict myself. I am large, I contain multitudes. I too am not a bit tamed, I too am untranslatable.",
    work: "Song of Myself",
    by: "Walt Whitman",
  },
  {
    id: "whitman-boots",
    shelf: "poem",
    line: "I bequeath myself to the dirt to grow from the grass I love. If you want me again look for me under your boot-soles. You will hardly know who I am or what I mean.",
    work: "Song of Myself",
    by: "Walt Whitman",
  },
  {
    id: "wilde",
    shelf: "play",
    line: "We are all in the gutter, but some of us are looking at the stars. In this world there are only two tragedies. One is not getting what one wants, and the other is getting it.",
    work: "Lady Windermere's Fan",
    by: "Oscar Wilde",
  },
  {
    id: "poe",
    shelf: "poem",
    line: "I stand amid the roar of a surf-tormented shore, and I hold within my hand grains of the golden sand. How few, yet how they creep through my fingers to the deep. All that we see or seem is but a dream within a dream.",
    work: "A Dream Within a Dream",
    by: "Edgar Allan Poe",
  },
  {
    id: "shelley",
    shelf: "book",
    line: "Nothing is so painful to the human mind as a great and sudden change. The sun might shine, or the clouds might lower, but nothing could appear to me as it had done the day before.",
    work: "Frankenstein",
    by: "Mary Shelley",
  },
  {
    id: "austen",
    shelf: "book",
    line: "I cannot fix on the hour, or the spot, or the look, or the words, which laid the foundation. It is too long ago. I was in the middle before I knew that I had begun.",
    work: "Pride and Prejudice",
    by: "Jane Austen",
  },
  {
    id: "keats",
    shelf: "poem",
    line: "A thing of beauty is a joy for ever: its loveliness increases; it will never pass into nothingness, but still will keep a bower quiet for us, and a sleep full of sweet dreams.",
    work: "Endymion",
    by: "John Keats",
  },
  {
    id: "yeats",
    shelf: "poem",
    line: "Turning and turning in the widening gyre the falcon cannot hear the falconer. Things fall apart; the centre cannot hold. Mere anarchy is loosed upon the world.",
    work: "The Second Coming",
    by: "W. B. Yeats",
  },
  {
    id: "ecclesiastes",
    shelf: "book",
    line: "To every thing there is a season, and a time to every purpose under the heaven: a time to plant, and a time to pluck up that which is planted; a time to weep, and a time to laugh; a time to keep, and a time to cast away.",
    work: "Ecclesiastes",
    by: "King James Bible",
  },
  {
    id: "psalm",
    shelf: "book",
    line: "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.",
    work: "Psalm 23",
    by: "King James Bible",
  },
  {
    id: "aurelius",
    shelf: "book",
    line: "Such as are thy habitual thoughts, such also will be the character of thy mind; for the soul is dyed by the thoughts. Dye it then with a continuous series of such thoughts as these: that where a man can live, there he can also live well.",
    work: "Meditations",
    by: "Marcus Aurelius, tr. George Long",
  },
  {
    id: "legge",
    shelf: "book",
    line: "The tree which fills the arms grew from the tiniest sprout; the tower of nine storeys rose from a small heap of earth; the journey of a thousand li commenced with a single step.",
    work: "Tao Te Ching",
    by: "Laozi, tr. James Legge",
  },
  {
    id: "show-train",
    shelf: "play",
    line: "All the world's a stage, and all the men and women merely players. They have their exits and their entrances, and one man in his time plays many parts.",
    work: "As You Like It",
    by: "William Shakespeare",
  },
  {
    id: "show-hall",
    shelf: "play",
    line: "Be not afraid of greatness. Some are born great, some achieve greatness, and some have greatness thrust upon them.",
    work: "Twelfth Night",
    by: "William Shakespeare",
  },
  {
    id: "show-name",
    shelf: "play",
    line: "The quality of mercy is not strained. It droppeth as the gentle rain from heaven upon the place beneath.",
    work: "The Merchant of Venice",
    by: "William Shakespeare",
  },
  {
    id: "show-door",
    shelf: "play",
    line: "The course of true love never did run smooth.",
    work: "A Midsummer Night's Dream",
    by: "William Shakespeare",
  },
  {
    id: "show-bridge",
    shelf: "play",
    line: "There are more things in heaven and earth, Horatio, than are dreamt of in your philosophy.",
    work: "Hamlet",
    by: "William Shakespeare",
  },
  {
    id: "show-ending",
    shelf: "play",
    line: "These violent delights have violent ends, and in their triumph die, like fire and powder, which, as they kiss, consume.",
    work: "Romeo and Juliet",
    by: "William Shakespeare",
  },
  {
    id: "show-music",
    shelf: "play",
    line: "The truth is rarely pure and never simple. Modern life would be very tedious if it were either, and modern literature a complete impossibility.",
    work: "The Importance of Being Earnest",
    by: "Oscar Wilde",
  },
  {
    id: "show-truth",
    shelf: "play",
    line: "The world is a stage, but the play is badly cast.",
    work: "A Woman of No Importance",
    by: "Oscar Wilde",
  },
  {
    id: "show-credits",
    shelf: "play",
    line: "Life's but a walking shadow, a poor player that struts and frets his hour upon the stage, and then is heard no more.",
    work: "Macbeth",
    by: "William Shakespeare",
  },
  {
    id: "show-coat",
    shelf: "play",
    line: "I do love nothing in the world so well as you. Is not that strange?",
    work: "Much Ado About Nothing",
    by: "William Shakespeare",
  },
  {
    id: "show-haunted",
    shelf: "play",
    line: "Then must you speak of one that loved not wisely, but too well.",
    work: "Othello",
    by: "William Shakespeare",
  },
  {
    id: "show-quiet",
    shelf: "play",
    line: "If we shadows have offended, think but this, and all is mended: that you have but slumbered here while these visions did appear.",
    work: "A Midsummer Night's Dream",
    by: "William Shakespeare",
  },
  {
    id: "anime-bowl",
    shelf: "poem",
    line: "To see a world in a grain of sand, and a heaven in a wild flower, hold infinity in the palm of your hand, and eternity in an hour.",
    work: "Auguries of Innocence",
    by: "William Blake",
  },
  {
    id: "anime-forest",
    shelf: "poem",
    line: "Tyger, tyger, burning bright in the forests of the night, what immortal hand or eye could frame thy fearful symmetry?",
    work: "The Tyger",
    by: "William Blake",
  },
  {
    id: "anime-clock",
    shelf: "poem",
    line: "Because I could not stop for Death, he kindly stopped for me. The carriage held but just ourselves and Immortality.",
    work: "Because I could not stop for Death",
    by: "Emily Dickinson",
  },
  {
    id: "anime-fox",
    shelf: "poem",
    line: "Beauty is truth, truth beauty — that is all ye know on earth, and all ye need to know.",
    work: "Ode on a Grecian Urn",
    by: "John Keats",
  },
  {
    id: "anime-lanterns",
    shelf: "poem",
    line: "The world is too much with us; late and soon, getting and spending, we lay waste our powers.",
    work: "The World Is Too Much with Us",
    by: "William Wordsworth",
  },
  {
    id: "anime-mountain",
    shelf: "poem",
    line: "My name is Ozymandias, king of kings: look on my works, ye Mighty, and despair.",
    work: "Ozymandias",
    by: "Percy Bysshe Shelley",
  },
  {
    id: "anime-map",
    shelf: "poem",
    line: "How many loved your moments of glad grace, and loved your beauty with love false or true, but one man loved the pilgrim soul in you, and loved the sorrows of your changing face.",
    work: "When You Are Old",
    by: "W. B. Yeats",
  },
  {
    id: "anime-rice",
    shelf: "poem",
    line: "Two roads diverged in a wood, and I — I took the one less traveled by, and that has made all the difference.",
    work: "The Road Not Taken",
    by: "Robert Frost",
  },
  {
    id: "anime-alley",
    shelf: "poem",
    line: "I have measured out my life with coffee spoons.",
    work: "The Love Song of J. Alfred Prufrock",
    by: "T. S. Eliot",
  },
  {
    id: "anime-tide",
    shelf: "poem",
    line: "Remember me when I am gone away, gone far away into the silent land.",
    work: "Remember",
    by: "Christina Rossetti",
  },
  {
    id: "anime-cup",
    shelf: "poem",
    line: "That you are here — that life exists and identity — that the powerful play goes on, and you may contribute a verse.",
    work: "O Me! O Life!",
    by: "Walt Whitman",
  },
  {
    id: "anime-stations",
    shelf: "poem",
    line: "Death, be not proud, though some have called thee mighty and dreadful, for thou art not so.",
    work: "Holy Sonnet 10",
    by: "John Donne",
  },
  {
    id: "film-metropolis-heart",
    shelf: "film",
    line: "There can be no understanding between the hand and the head unless the heart acts as mediator.",
    work: "Metropolis",
    by: "1927 · spoken by Maria",
  },
  {
    id: "film-metropolis-tower",
    shelf: "film",
    line: "Come, let us build us a tower whose top may reach unto the stars. And the top of the tower we will write the words: Great is the world and its Creator, and great is Man.",
    work: "Metropolis",
    by: "1927 · the legend of the Tower",
  },
  {
    id: "film-metropolis-faces",
    shelf: "film",
    line: "I wanted to look into the faces of the people whose little children are my brothers, my sisters.",
    work: "Metropolis",
    by: "1927 · spoken by Freder",
  },
  {
    id: "film-metropolis-hands",
    shelf: "film",
    line: "Your magnificent city, Father, and you the brain of this city, and all of us in the city's light. And where are the people, Father, whose hands built your city?",
    work: "Metropolis",
    by: "1927 · spoken by Freder",
  },
  {
    id: "film-jazz-nothin",
    shelf: "film",
    line: "Wait a minute, wait a minute, you ain't heard nothin' yet. Wait a minute, I tell ya. You ain't heard nothin'.",
    work: "The Jazz Singer",
    by: "1927 · spoken by Jack Robin",
  },
  {
    id: "film-jazz-show",
    shelf: "film",
    line: "We in the show business have our religion too. On every day, the show must go on.",
    work: "The Jazz Singer",
    by: "1927 · spoken by Jack Robin",
  },
  {
    id: "film-jazz-love",
    shelf: "film",
    line: "I came home with a heart full of love, but you don't want to understand. Some day you'll understand, the same as Mama does.",
    work: "The Jazz Singer",
    by: "1927 · spoken by Jack Robin",
  },
  {
    id: "film-jazz-son",
    shelf: "film",
    line: "My son was to stand at my side and sing tonight, but now I have no son.",
    work: "The Jazz Singer",
    by: "1927 · spoken by Cantor Rabinowitz",
  },
  {
    id: "film-jazz-dream",
    shelf: "film",
    line: "My son came to me in my dreams. He sang Kol Nidre so beautifully. If he would only sing like that tonight, surely he would be forgiven.",
    work: "The Jazz Singer",
    by: "1927 · spoken by Cantor Rabinowitz",
  },
  {
    id: "film-animal-elephant",
    shelf: "film",
    line: "One morning I shot an elephant in my pajamas. How he got in my pajamas, I don't know.",
    work: "Animal Crackers",
    by: "1930 · spoken by Captain Spaulding",
  },
  {
    id: "film-animal-going",
    shelf: "film",
    line: "Hello, I must be going. I cannot stay, I came to say I must be going. I'm glad I came, but just the same I must be going.",
    work: "Animal Crackers",
    by: "1930 · spoken by Captain Spaulding",
  },
  {
    id: "film-phantom",
    shelf: "film",
    line: "Feast your eyes. Glut your soul on my accursed ugliness.",
    work: "The Phantom of the Opera",
    by: "1925 · the Phantom",
  },
  {
    id: "film-anna",
    shelf: "film",
    line: "Gimme a whiskey, ginger ale on the side, and don't be stingy, baby.",
    work: "Anna Christie",
    by: "1930 · spoken by Anna",
  },
  {
    id: "film-virginian",
    shelf: "film",
    line: "If you want to call me that, smile.",
    work: "The Virginian",
    by: "1929",
  },
  {
    id: "film-cocoanuts",
    shelf: "film",
    line: "I'll meet you tonight under the moon. Oh, I can see you now, you and the moon. You wear a necktie so I'll know ya.",
    work: "The Cocoanuts",
    by: "1929 · Groucho Marx",
  },
];


export function drawPassage(avoidId?: string): Passage {
  const fresh = PASSAGES.filter((p) => p.id !== avoidId);
  const bag = fresh.length > 0 ? fresh : PASSAGES;
  const index = Math.floor(Math.random() * bag.length);
  return bag[index] ?? PASSAGES[0]!;
}

export type Opening = {
  id: string;
  at: string;
  question: string;
  passageId: string;
};

const KEY = "veil.biblio.v1";

export function loadOpenings(): Opening[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Opening[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveOpening(opening: Opening) {
  if (typeof window === "undefined") return;
  const next = [opening, ...loadOpenings()].slice(0, 8);
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function passageById(id: string) {
  return PASSAGES.find((p) => p.id === id);
}
