import fs from 'node:fs';

const rows = String.raw`
Spider-Man|1982|Spider-Man
Questprobe featuring The Hulk|1984|Hulk
Questprobe featuring Spider-Man|1984|Spider-Man
Questprobe: Featuring Human Torch and the Thing|1985|Fantastic Four
Howard the Duck|1986|Howard the Duck
Captain America in: The Doom Tube of Dr. Megalomann|1987|Captain America
The Amazing Spider-Man and Captain America in Dr. Doom's Revenge!|1989|Crossover
The Uncanny X-Men|1989|X-Men
X-Men: Madness in Murderworld|1989|X-Men
X-Men II: The Fall of the Mutants|1990|X-Men
The Amazing Spider-Man|1990|Spider-Man
The Punisher (MicroProse)|1990|Punisher
The Amazing Spider-Man (Game Boy)|1990|Spider-Man
Silver Surfer|1990|Silver Surfer
The Punisher (NES)|1991|Punisher
The Punisher: The Ultimate Payback!|1991|Punisher
Spider-Man vs. The Kingpin|1991|Spider-Man
Spider-Man: The Video Game|1991|Spider-Man
Wolverine|1991|Wolverine
Captain America and The Avengers|1991|Avengers
X-Men (Arcade)|1992|X-Men
The Amazing Spider-Man 2 (Game Boy)|1992|Spider-Man
Spider-Man: Return of the Sinister Six|1992|Spider-Man
Spider-Man and the X-Men in Arcade's Revenge|1992|Crossover
X-Men (Genesis)|1993|X-Men
The Punisher (Arcade)|1993|Punisher
The Amazing Spider-Man 3: Invasion of the Spider-Slayers|1993|Spider-Man
X-Men (Game Gear)|1994|X-Men
The Incredible Hulk|1994|Hulk
Spider-Man and Venom: Maximum Carnage|1994|Spider-Man / Venom
Wolverine: Adamantium Rage|1994|Wolverine
X-Men: Mutant Apocalypse|1994|X-Men
X-Men: Children of the Atom|1994|X-Men
X-Men 2: Clone Wars|1995|X-Men
X-Men: Gamesmaster's Legacy|1995|X-Men
Spider-Man (1995)|1995|Spider-Man
The Amazing Spider-Man: Lethal Foes|1995|Spider-Man
Marvel Super Heroes|1995|Crossover
Venom/Spider-Man: Separation Anxiety|1995|Spider-Man / Venom
Avengers in Galactic Storm|1996|Avengers
The Amazing Spider-Man: Web of Fire|1996|Spider-Man
X-Men vs. Street Fighter|1996|X-Men / Street Fighter
Marvel Super Heroes in War of the Gems|1996|Crossover
X-Men: Mojo World|1996|X-Men
Iron Man and X-O Manowar in Heavy Metal|1996|Iron Man
Spider-Man: The Sinister Six|1996|Spider-Man
The Incredible Hulk: The Pantheon Saga|1997|Hulk
Marvel Super Heroes vs. Street Fighter|1997|Crossover
Fantastic Four|1997|Fantastic Four
Men in Black: The Game|1997|Men in Black
X-Men: The Ravages of Apocalypse|1997|X-Men
Marvel vs. Capcom: Clash of Super Heroes|1998|Crossover
Marvel vs. Capcom 2: New Age of Heroes|2000|Crossover
X-Men: Mutant Academy|2000|X-Men
Spider-Man (2000)|2000|Spider-Man
Blade|2000|Blade
X-Men: Mutant Wars|2000|X-Men
X-Men: Wolverine's Rage|2001|X-Men
Spider-Man 2: The Sinister Six|2001|Spider-Man
Spider-Man 2: Enter Electro|2001|Spider-Man
X-Men: Mutant Academy 2|2001|X-Men
Spider-Man: Mysterio's Menace|2001|Spider-Man
X-Men: Reign of Apocalypse|2001|X-Men
Men in Black: The Series – Crashdown|2001|Men in Black
Men in Black II: Alien Escape|2002|Men in Black
Spider-Man (2002)|2002|Spider-Man
X-Men: Next Dimension|2002|X-Men
Blade II|2002|Blade
The Invincible Iron Man|2002|Iron Man
Daredevil|2003|Daredevil
The Incredible Hulk (2003)|2003|Hulk
Hulk|2003|Hulk
X2: Wolverine's Revenge|2003|X-Men
Spider-Man 2|2004|Spider-Man
Spider-Man 2: The Hero Returns|2004|Spider-Man
Blade: Trinity|2004|Blade
X-Men Legends|2004|X-Men
X-Men Legends II: Rise of Apocalypse|2005|X-Men
Fantastic Four (2005)|2005|Fantastic Four
Fantastic Four: Flame On|2005|Fantastic Four
Ultimate Spider-Man|2005|Spider-Man
Elektra|2005|Elektra
The Punisher (2005)|2005|Punisher
The Incredible Hulk: Ultimate Destruction|2005|Hulk
Marvel Nemesis: Rise of the Imperfects|2005|Crossover
X-Men: The Official Game|2006|X-Men
Marvel: Ultimate Alliance|2006|Crossover
Spider-Man: Battle for New York|2006|Spider-Man
Spider-Man 3|2007|Spider-Man
Fantastic Four: Rise of the Silver Surfer|2007|Fantastic Four
Ghost Rider|2007|Ghost Rider
Spider-Man: Friend or Foe|2007|Spider-Man
Iron Man|2008|Iron Man
The Incredible Hulk (2008)|2008|Hulk
Spider-Man: Web of Shadows|2008|Spider-Man
X-Men Origins: Wolverine|2009|X-Men
The Punisher: No Mercy|2009|Punisher
Marvel Super Hero Squad|2009|Crossover
Marvel: Ultimate Alliance 2|2009|Crossover
Spider-Man: Toxic City|2009|Spider-Man
Iron Man 2|2010|Iron Man
Spider-Man: Shattered Dimensions|2010|Spider-Man
Marvel Super Hero Squad: The Infinity Gauntlet|2010|Crossover
Marvel Super Heroes 3D: Grandmaster's Challenge|2010|Crossover
Marvel Pinball|2010|Crossover
Ultimate Spider-Man: Total Mayhem|2010|Spider-Man
Marvel vs. Capcom 3: Fate of Two Worlds|2011|Crossover
Marvel Super Hero Squad Online|2011|Crossover
Thor: God of Thunder|2011|Thor
Thor: Son of Asgard|2011|Thor
Captain America: Super Soldier|2011|Captain America
Captain America: Sentinel of Liberty|2011|Captain America
Spider-Man: Edge of Time|2011|Spider-Man
X-Men: Destiny|2011|X-Men
Marvel Super Hero Squad: Comic Combat|2011|Crossover
Ultimate Marvel vs. Capcom 3|2011|Crossover
Marvel Avengers Alliance|2012|Avengers
MIB: Alien Crisis|2012|Men in Black
Men in Black 3|2012|Men in Black
The Amazing Spider-Man (2012)|2012|Spider-Man
Marvel vs. Capcom Origins|2012|Crossover
Marvel: War of Heroes|2012|Crossover
Marvel Avengers: Battle for Earth|2012|Avengers
Avengers: Initiative|2012|Avengers
Iron Man 3: The Official Game|2013|Iron Man
Marvel Heroes|2013|Crossover
Deadpool|2013|Deadpool
Marvel Puzzle Quest|2013|Crossover
Lego Marvel Super Heroes|2013|Crossover
Thor: The Dark World – The Official Game|2013|Thor
X-Men: Battle of the Atom|2014|X-Men
Captain America: The Winter Soldier – The Official Game|2014|Captain America
The Amazing Spider-Man 2|2014|Spider-Man
Kellogg's The Amazing Spider-Man 2|2014|Spider-Man
Spider-Man Ultimate Power|2014|Spider-Man
Uncanny X-Men: Days of Future Past|2014|X-Men
Spider-Man Unlimited|2014|Spider-Man
Disney Infinity 2.0|2014|Crossover
Guardians of the Galaxy: The Universal Weapon|2014|Guardians of the Galaxy
Marvel Disk Wars: The Avengers: Ultimate Heroes|2014|Avengers
Marvel Contest of Champions|2014|Crossover
Marvel: Future Fight|2015|Crossover
Lego Marvel's Avengers|2016|Avengers
Marvel Avengers Academy|2016|Avengers
Kellogg's Marvel's Civil War VR|2016|Avengers
Marvel Tsum Tsum|2016|Crossover
Marvel Heroes Omega|2017|Crossover
Guardians of the Galaxy: The Telltale Series|2017|Guardians of the Galaxy
Spider-Man: Homecoming – Virtual Reality Experience|2017|Spider-Man
Marvel vs. Capcom: Infinite|2017|Crossover
Lego Marvel Super Heroes 2|2017|Crossover
Marvel Strike Force|2018|Crossover
Marvel End Time Arena|2018|Crossover
Marvel Battle Lines|2018|Crossover
Marvel's Spider-Man|2018|Spider-Man
Marvel Powers United VR|2018|Crossover
Spider-Man: Far From Home Virtual Reality Experience|2019|Spider-Man
Marvel Ultimate Alliance 3: The Black Order|2019|Crossover
Avengers: Damage Control|2019|Avengers
Marvel Super War|2019|Crossover
Marvel Duel|2020|Crossover
Iron Man VR|2020|Iron Man
Marvel's Avengers|2020|Avengers
Marvel Realm of Champions|2020|Crossover
Marvel's Spider-Man: Miles Morales|2020|Spider-Man
Marvel Future Revolution|2021|Crossover
Marvel's Guardians of the Galaxy|2021|Guardians of the Galaxy
Marvel Snap|2022|Crossover
Marvel's Midnight Suns|2022|Midnight Sons
Marvel's Spider-Man 2|2023|Spider-Man
Marvel vs. Capcom Fighting Collection: Arcade Classics|2024|Crossover
Marvel Rivals|2024|Crossover
Marvel Mystic Mayhem|2025|Crossover
Marvel's Deadpool VR|2025|Deadpool
Marvel Cosmic Invasion|2025|Crossover
Marvel MaXimum Collection|2026|Crossover
Marvel Tokon: Fighting Souls|2026|Crossover
Marvel's Wolverine|2026|Wolverine
Marvel's Blade|2027|Blade|zapowiedziana
Marvel's Iron Man||Iron Man|zapowiedziana
Marvel 1943: Rise of Hydra||Captain America / Black Panther|zapowiedziana
`.trim().split('\n').map(line => line.split('|'));

const slug = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const movieLinks = new Map([
  ['Spider-Man (2002)',['Spider-Man']],['Spider-Man 2',['Spider-Man 2']],['Spider-Man 3',['Spider-Man 3']],
  ['Blade',['Blade']],['Blade II',['Blade II']],['Blade: Trinity',['Blade: Trinity']],['Elektra',['Elektra']],
  ['X2: Wolverine\'s Revenge',['X2: X-Men United']],['X-Men: The Official Game',['X2: X-Men United','X-Men: The Last Stand']],
  ['X-Men Origins: Wolverine',['X-Men Origins: Wolverine']],['Fantastic Four (2005)',['Fantastic Four']],
  ['Fantastic Four: Rise of the Silver Surfer',['Fantastic Four: Rise of the Silver Surfer']],['Ghost Rider',['Ghost Rider']],
  ['Iron Man',['Iron Man']],['The Incredible Hulk (2008)',['The Incredible Hulk']],['Iron Man 2',['Iron Man 2']],
  ['Thor: God of Thunder',['Thor']],['Captain America: Super Soldier',['Captain America: The First Avenger']],
  ['The Amazing Spider-Man (2012)',['The Amazing Spider-Man']],['The Amazing Spider-Man 2',['The Amazing Spider-Man 2']],
  ['Iron Man 3: The Official Game',['Iron Man 3']],['Thor: The Dark World – The Official Game',['Thor: The Dark World']],
  ['Captain America: The Winter Soldier – The Official Game',['Captain America: The Winter Soldier']],
  ['Spider-Man: Homecoming – Virtual Reality Experience',['Spider-Man: Homecoming']],
  ['Spider-Man: Far From Home Virtual Reality Experience',['Spider-Man: Far From Home']],
  ['Avengers: Damage Control',['Avengers: Endgame']],['Lego Marvel\'s Avengers',['The Avengers','Avengers: Age of Ultron']],
]);

const sources = rows.map(([title, year, franchise, releaseStatus='wydana'], index) => {
  const key = `marvel-game-${String(index + 1).padStart(3,'0')}-${slug(title)}`;
  const relatedTitles = movieLinks.get(title) || [];
  return {
    key,
    sourceUid: `chronizo:source:${key}`,
    title,
    releaseDate: year || '',
    franchise,
    releaseStatus,
    relationType: relatedTitles.length ? 'tiein' : 'standalone',
    canonStatus: relatedTitles.length ? 'oficjalne powiązanie filmowe — zakres kanonu do weryfikacji' : 'własna ciągłość gry',
    relatedTitles,
    tags: [...(relatedTitles.length ? ['EMCU'] : []), 'MARVEL GAMES'],
  };
});

const output = {
  format: 'chronizo-marvel-games',
  version: 1,
  generatedAt: '2026-10-06',
  scope: 'Oficjalnie wydane i zapowiedziane gry oparte na własnościach Marvela; porty jednej gry scalone.',
  sources,
};

fs.writeFileSync(new URL('../data/marvel-games.sources.json', import.meta.url), `${JSON.stringify(output,null,2)}\n`);
console.log(`Marvel games catalog: ${sources.length} titles`);
