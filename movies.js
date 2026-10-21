// Movie data for the carousel.
// `wiki` is the English Wikipedia article title; the poster is fetched from it at runtime.
// Ratings are 0–10 (0 = none, 10 = extreme).
window.MOVIES = [
  {
    title: "You Might Be the Killer",
    year: 2018,
    wiki: "You_Might_Be_the_Killer",
    description:
      "As bodies pile up at Camp Clear Vista, counselor Sam phones his friend Chuck, a horror-obsessed comic shop clerk, for slasher-survival advice. Together they slowly work out that the masked killer might be Sam himself.",
    whyClassic:
      "It grew out of a viral Twitter thread between authors Sam Sykes and Chuck Wendig, and it plays like a love letter to '80s summer-camp slashers. Fans love the jumbled timeline, the self-aware jokes about genre rules, and the phone-call chemistry between Fran Kranz and Alyson Hannigan.",
    ratings: { gore: 6, jumpScares: 3, violence: 6 },
  },
  {
    title: "The Wolf of Snow Hollow",
    year: 2020,
    wiki: "The_Wolf_of_Snow_Hollow",
    description:
      "In a small Utah ski town, a brutal killing on the night of a full moon sends sleep-deprived, short-fused deputy John Marshall into a spiral as the town starts whispering about a werewolf.",
    whyClassic:
      "Writer-director-star Jim Cummings mixes a grim creature feature with an awkward, painfully funny character study of a man coming apart. Viewers praise the tonal tightrope, the snowy small-town atmosphere, and Robert Forster's warm final screen performance.",
    ratings: { gore: 5, jumpScares: 4, violence: 5 },
  },
  {
    title: "Tales from the Crypt: Demon Knight",
    year: 1995,
    wiki: "Tales_from_the_Crypt:_Demon_Knight",
    description:
      "A drifter guarding an ancient, blood-filled key holes up in a run-down New Mexico boarding house with a group of misfits, while a smooth-talking demon called the Collector lays siege with an army of ghouls.",
    whyClassic:
      "Billy Zane's gleefully hammy villain steals every scene, and the gooey practical effects are pure '90s monster-movie fun. Introduced by the Crypt Keeper, it's a tight siege movie with a dark sense of humour, and Jada Pinkett makes a great final girl.",
    ratings: { gore: 8, jumpScares: 4, violence: 8 },
  },
  {
    title: "Duel",
    year: 1971,
    wiki: "Duel_(1971_film)",
    description:
      "Mild-mannered salesman David Mann passes a rusty tanker truck on a desert highway. The unseen driver takes it personally, and a road trip turns into a relentless fight for survival.",
    whyClassic:
      "Steven Spielberg's feature debut (made for TV from Richard Matheson's script) builds unbearable tension from almost nothing: one man, one truck, and an empty road. The faceless driver makes the truck itself the monster, a trick Spielberg would reuse on a larger scale in Jaws.",
    ratings: { gore: 1, jumpScares: 3, violence: 4 },
  },
  {
    title: "Christine",
    year: 1983,
    wiki: "Christine_(1983_film)",
    description:
      "Nerdy teenager Arnie Cunningham buys a battered 1958 Plymouth Fury and restores it to its former glory. As the car's jealous, murderous personality takes hold, Arnie changes with it.",
    whyClassic:
      "John Carpenter turns a Stephen King car into a convincing villain. Fans point to the eerie self-repair scene, the burning car chasing a man down the highway, Carpenter's synth score mixed with '50s rock 'n' roll, and Keith Gordon's unsettling shift from loser to swaggering bully.",
    ratings: { gore: 3, jumpScares: 4, violence: 5 },
  },
  {
    title: "Carrie",
    year: 1976,
    wiki: "Carrie_(1976_film)",
    description:
      "Shy, bullied Carrie White lives under the thumb of her fanatically religious mother. As her telekinetic powers awaken, a cruel prank at the senior prom pushes her past breaking point.",
    whyClassic:
      "This was the first Stephen King adaptation, and Brian De Palma's split-screens and slow motion made the prom scene one of horror's most famous set pieces. Sissy Spacek and Piper Laurie both earned Oscar nominations, and the final graveyard scare still makes audiences jump.",
    ratings: { gore: 5, jumpScares: 6, violence: 6 },
  },
  {
    title: "Rosemary's Baby",
    year: 1968,
    wiki: "Rosemary's_Baby_(film)",
    description:
      "Rosemary and her actor husband move into a grand old Manhattan apartment building. After she becomes pregnant, their overly attentive elderly neighbours and her husband's sudden success make her fear something sinister has designs on her child.",
    whyClassic:
      "Roman Polanski's slow-burn paranoia thriller gets its horror almost entirely from suggestion, gaslighting, and everyday details. Mia Farrow is heartbreaking, Ruth Gordon won an Oscar as the meddling neighbour, and the film helped kick off the wave of prestige horror that followed.",
    ratings: { gore: 1, jumpScares: 2, violence: 2 },
  },
  {
    title: "The Dead Zone",
    year: 1983,
    wiki: "The_Dead_Zone_(film)",
    description:
      "Schoolteacher Johnny Smith wakes from a five-year coma able to see a person's past and future with a single touch. When he shakes hands with a rising politician, he sees a catastrophe he may have to stop at any cost.",
    whyClassic:
      "David Cronenberg trades body horror for melancholy. Christopher Walken gives one of his most soulful performances as a man cursed by his gift, Martin Sheen is chilling as the populist Greg Stillson, and the moral dilemma at its heart still feels timely.",
    ratings: { gore: 3, jumpScares: 3, violence: 4 },
  },
  {
    title: "Needful Things",
    year: 1993,
    wiki: "Needful_Things_(film)",
    description:
      "A charming stranger opens an antiques shop in Castle Rock, Maine, where every item is exactly what the customer most desires. The price is a small \"prank\" on a neighbour, and the pranks set the whole town at each other's throats.",
    whyClassic:
      "Max von Sydow is having devilish fun as Leland Gaunt, and Ed Harris anchors the chaos as the town's sheriff. Fans enjoy its pitch-black humour and the satisfying, if grim, way petty grudges escalate into all-out war.",
    ratings: { gore: 4, jumpScares: 2, violence: 6 },
  },
  {
    title: "Lost Highway",
    year: 1997,
    wiki: "Lost_Highway_(film)",
    description:
      "Jazz saxophonist Fred Madison and his wife start receiving anonymous videotapes filmed inside their home. After a shocking turn of events, Fred's story mysteriously becomes that of a young mechanic named Pete.",
    whyClassic:
      "David Lynch's dreamlike neo-noir is built to be argued over. Viewers love its nightmare logic, Robert Blake's deeply creepy Mystery Man, Patricia Arquette's double role, and a moody industrial soundtrack produced by Trent Reznor.",
    ratings: { gore: 3, jumpScares: 4, violence: 5 },
  },
  {
    title: "They Live",
    year: 1988,
    wiki: "They_Live",
    description:
      "A drifter called Nada finds a box of sunglasses that reveal the truth: Earth's elite are skull-faced aliens, and every billboard and banknote carries hidden orders like OBEY and CONSUME.",
    whyClassic:
      "John Carpenter's sharp satire of '80s consumerism has aged remarkably well. Roddy Piper's deadpan delivery gave us \"I have come here to chew bubblegum and kick ass...\", and his absurdly long alley fight with Keith David is legendary.",
    ratings: { gore: 2, jumpScares: 2, violence: 6 },
  },
  {
    title: "The Lawnmower Man",
    year: 1992,
    wiki: "The_Lawnmower_Man_(film)",
    description:
      "A scientist uses virtual reality and experimental drugs to boost the intelligence of Jobe, a gentle, simple-minded gardener. Jobe's new mind grows into godlike, vengeful power.",
    whyClassic:
      "It's a time capsule of early-'90s cyber-hype, with groundbreaking (now gloriously retro) CGI virtual worlds. Pierce Brosnan and Jeff Fahey commit fully, and it's notorious for using Stephen King's name on a story it barely resembles, which King successfully sued to have removed.",
    ratings: { gore: 3, jumpScares: 2, violence: 4 },
  },
  {
    title: "Children of the Corn",
    year: 1984,
    wiki: "Children_of_the_Corn_(1984_film)",
    description:
      "Driving through rural Nebraska, a young couple stumble into the town of Gatlin, where the children have murdered every adult in the name of a cornfield deity called He Who Walks Behind the Rows.",
    whyClassic:
      "Creepy kid-cult horror at its most iconic. Fans quote John Franklin's preacher Isaac and Courtney Gains's snarling Malachai (\"Outlander!\"), and the endless cornfields became a horror shorthand that launched a long-running franchise.",
    ratings: { gore: 4, jumpScares: 3, violence: 6 },
  },
  {
    title: "Piranha",
    year: 1978,
    wiki: "Piranha_(1978_film)",
    description:
      "While searching for missing teens, a skip tracer and a reclusive scientist accidentally release genetically engineered, military-bred piranha into a river that flows straight towards a summer camp and a brand-new water resort.",
    whyClassic:
      "Joe Dante and writer John Sayles made a Roger Corman Jaws knockoff that's smarter and funnier than it had any right to be. It's full of tongue-in-cheek satire and inventive low-budget effects, and Steven Spielberg himself reportedly called it the best of the Jaws rip-offs.",
    ratings: { gore: 5, jumpScares: 4, violence: 5 },
  },
  {
    title: "Tremors",
    year: 1990,
    wiki: "Tremors_(1990_film)",
    description:
      "Handymen Val and Earl are finally leaving the tiny desert town of Perfection, Nevada, until giant underground worms start picking off the residents and anyone who touches the ground is fair game.",
    whyClassic:
      "It's the ultimate monster-movie comfort food: a clever \"the floor is lava\" premise, great practical creature effects, and hilarious banter between Kevin Bacon and Fred Ward. Michael Gross and Reba McEntire's gun-crazy survivalists steal the show.",
    ratings: { gore: 3, jumpScares: 5, violence: 4 },
  },
  {
    title: "The Thing",
    year: 1982,
    wiki: "The_Thing_(1982_film)",
    description:
      "At a remote Antarctic research station, a team led by helicopter pilot MacReady discovers an alien that perfectly imitates any living thing it absorbs. Soon nobody can trust anybody.",
    whyClassic:
      "It flopped on release but is now regarded as one of the greatest horror films ever made. Rob Bottin's grotesque practical effects remain jaw-dropping, the blood-test scene is a masterclass in tension, and Ennio Morricone's pulsing score and the ambiguous ending fuel debate to this day.",
    ratings: { gore: 9, jumpScares: 7, violence: 7 },
  },
];
