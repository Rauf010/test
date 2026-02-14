        // Game State
        let players = [];
        let currentPlayerIndex = 0;
        let gameLocation = '';
        let gameCategory = '';
        let gameCategoryKey = '';
        let imposters = [];
        let gameStartTime = null;
        let imposterCount = 1;
        let timerInterval = null;
        let selectedCategories = [];
        let hintWord = '';
        let imposterType = 'normal'; // 'normal' of 'alternative'
        let alternativeWord = ''; // Voor alternatieve imposter


        // Categorie information
const categoryInfo = {
    games: { emoji: '🎮', name: 'Games' },
    sport: { emoji: '⚽', name: 'Sport' },
    anime: { emoji: '⚔️', name: 'Anime/Manga' },
    slurs: { emoji: '🗣️', name: 'Slurs' },
    eten: { emoji: '🍕', name: 'Eten & Drinken' },
    aardrijkskunde: { emoji: '🌍', name: 'Aardrijkskunde' },
    muziek: { emoji: '🎵', name: 'Muziek' },
    geloof: { emoji: '🕌', name: 'Geloof' },
    manwha: { emoji: '📚', name: 'Manwha/Manhua' },
    beroemdheden: { emoji: '⭐', name: 'Beroemdheden' }
};

// Hint woorden per categorie
const hintWords = {
    games: ['Console', 'Spelen', 'Controller', 'Level', 'Character'],
    sport: ['Sporten', 'Wedstrijd', 'Team', 'Competitie', 'Bal'],
    anime: ['Character', 'Episode', 'Arc', 'Power', 'Jutsu'],
    slurs: ['Woord', 'Uitdrukking', 'Term', 'Slang', 'Dialect'],
    eten: ['Eten', 'Drinken', 'Maaltijd', 'Voedsel', 'Gerecht'],
    aardrijkskunde: ['Wereld', 'Plaats', 'Locatie', 'Gebied', 'Region'],
    muziek: ['Geluid', 'Artiest', 'Song', 'Concert', 'Beat'],
    geloof: ['Religie', 'Traditie', 'Ceremonie', 'Feest', 'Heilig'],
    manwha: ['Chapter', 'Protagonist', 'Story', 'Panel', 'Series'],
    beroemdheden: ['Bekend', 'Beroemd', 'Persoon', 'Wereldwijd', 'Ster']
};

// Database met woorden per categorie (100 per categorie)
const database = {
    games: [
        'Minecraft', 'Fortnite', 'Call of Duty', 'FIFA', 'GTA',
        'The Legend of Zelda', 'Mario Kart', 'Among Us', 'Roblox', 'Pokemon',
        'League of Legends', 'Valorant', 'Overwatch', 'Apex Legends', 'Rocket League',
        'CS:GO', 'PES', 'World of Warcraft', 'The Witcher', 'Skyrim',
        'Red Dead Redemption', 'Spider-Man', 'God of War', 'Halo', 'Destiny',
        'Minecraft Dungeons', 'Animal Crossing', 'Sims', 'Assassins Creed', 'Far Cry',
        'Elden Ring', 'Dark Souls', 'Fallout', 'Mass Effect', 'Dragon Age',
        'Final Fantasy', 'Persona', 'Black Myth-Wukong', 'Kirby', 'Donkey Kong',
        'Crash Bandicoot', 'Spyro', 'Sonic', 'Mega Man', 'Street Fighter',
        'Mortal Kombat', 'Tekken', 'Pac-Man', 'Tetris', 'Candy Crush',
        'Battlefield', 'Rainbow Six Siege', 'Warzone', 'PUBG', 'Rust',
        'Ark Survival Evolved', 'DayZ', 'Terraria', 'Stardew Valley', 'Hollow Knight',
        'Celeste', 'Cuphead', 'Undertale', 'Deltarune', 'Hades',
        'Dead Cells', 'Binding of Isaac', 'Enter the Gungeon', 'Slay the Spire', 'Risk of Rain',
        'Portal', 'Half-Life', 'Left 4 Dead', 'Team Fortress', 'Bioshock',
        'Dishonored', 'Lethal Company', 'Deathloop', 'Ghostwire Tokyo', 'Resident Evil',
        'Silent Hill', 'Dead Space', 'Alien Isolation', 'Outlast', 'Amnesia',
        'Five Nights at Freddys', 'Phasmophobia', 'Dead by Daylight', 'Friday the 13th', 'Evil Dead',
        'Hitman', 'Metal Gear Solid', 'Splinter Cell', 'Watch Dogs', 'Sleeping Dogs',
        'Risk', 'Monopoly', 'Mafia', 'Valorant', 'Overwatch'
    ],
    sport: [
        'Voetbal', 'Tennis', 'Basketbal', 'Volleybal', 'Handbal',
        'Honkbal', 'American Football', 'Rugby', 'Hockey', 'Cricket',
        'Golf', 'Formule 1', 'MotoGP', 'Wielrennen', 'Zwemmen',
        'Atletiek', 'Turnen', 'Judo', 'Karate', 'Boksen',
        'Kickboksen', 'Schaken', 'Darts', 'Biljarten', 'Bowlen',
        'Schaatsen', 'Skiën', 'Snowboarden', 'Surfen', 'Duiken',
        'Tafeltennis', 'Badminton', 'Squash', 'Korfbal', 'Softball',
        'Hondenrennen', 'Paardrijden', 'Zeilen', 'Roeien', 'Kanoën',
        'Klimmen', 'Boulderen', 'Parkour', 'BMX', 'Skateboarden',
        'Rolschaatsen', 'Inline Skaten', 'Hardlopen', 'Wandelen', 'Fitness',
        'Crossfit', 'Powerlifting', 'Bodybuilding', 'Wrestling', 'MMA',
        'UFC', 'Muay Thai', 'Taekwondo', 'Krav Maga', 'Capoeira',
        'Fencing', 'Archery', 'BJJ', 'Biathlon', 'Triathlon',
        'Marathon', 'Horden', 'Hoogspringen', 'Verspringen',
        'Polsstokhoogspringen', 'Kogelstoten', 'Discuswerpen', 'Speerwerpen', 'Hamerslingeren',
        'Waterpolo', 'Synchroonzwemmen', 'Schoonspringen', 'Reddend Zwemmen',
        'Beachvolleybal', 'Beachsoccer', 'Ultimate Frisbee', 'Lacrosse', 'WaterPolo',
        'Curling', 'Bobslee', 'Skeleton', 'Rodelen', 'Langlaufen',
        'Schansspringen', 'Noordse Combinatie', 'Freestyle Skiën', 'Snowboard Cross', 'Halfpipe',
        'Wielerbaan', 'BMX Racing', 'Mountainbike', 'Trial', 'Cyclocross'
    ],
    anime: [
        'Naruto', 'One Piece', 'Dragon Ball', 'Attack on Titan', 'Death Note',
        'My Hero Academia', 'Demon Slayer', 'Bleach', 'Fullmetal Alchemist', 'Hunter x Hunter',
        'Tokyo Ghoul', 'Sword Art Online', 'One Punch Man', 'Fairy Tail', 'Black Clover',
        'Jujutsu Kaisen', 'Chainsaw Man', 'Spy x Family', 'Mob Psycho', 'Haikyuu',
        'Gintama', 'Code Geass', 'Steins Gate', 'Cowboy Bebop', 'Neon Genesis Evangelion',
        'Pokemon', 'Digimon', 'Yu-Gi-Oh', 'Beyblade', 'Bakugan',
        'Sailor Moon', 'Horimiya', 'Inuyasha', 'Ranma', 'Fruit Basket',
        'Ouran High School', 'Clannad', 'Your Lie in April', 'Anohana', 'A Silent Voice',
        'Violet Evergarden', 'Made in Abyss', 'Re:Zero', 'Konosuba', 'Overlord',
        'The Rising of the Shield Hero', 'That Time I Got Reincarnated as a Slime', 'Mushoku Tensei', 'Classroom of the Elite', 'Horimiya',
        'Naruto Shippuden', 'Boruto', 'Dragon Ball Z', 'Dragon Ball Super', 'Dragon Ball GT',
        'One Piece Film Red', 'Demon Slayer Mugen Train', 'Your Name', 'Weathering With You', 'Suzume',
        'Akira', 'Ghost in the Shell', 'Perfect Blue', 'Paprika', 'Tokyo Godfathers',
        'Howls Moving Castle', 'Spirited Away', 'Princess Mononoke', 'My Neighbor Totoro', 'Kikis Delivery Service',
        'Fire Force', 'Dr Stone', 'Vinland Saga', 'Beastars', 'Dorohedoro',
        'The Promised Neverland', 'Erased', 'Monster', 'Parasyte', 'Another',
        'Elfen Lied', 'Mirai Nikki', 'Higurashi', 'Shiki', 'Corpse Party',
        'School Days', 'Madoka Magica', 'Kill la Kill', 'Gurren Lagann', 'FLCL',
        'Trigun', 'Samurai Champloo', 'Space Dandy', 'Outlaw Star', 'Lupin III',
        'JoJos Bizarre Adventure', 'Baki', 'Kengan Ashura', 'Hajime no Ippo', 'Megalo Box'
    ],
    slurs: [
        'Bro', 'Dude', 'Mate', 'Fam', 'Homie',
        'Chief', 'Boss', 'Buddy', 'Pal', 'Champ',
        'G', 'Dawg', 'Bruh', 'Yo', 'Man',
        'Boi', 'Lad', 'Geezer', 'Bloke', 'Chap',
        'Dope', 'Lit', 'Fire', 'Sick', 'Cool',
        'Swag', 'Flex', 'Vibe', 'Mood', 'Slay',
        'Cap', 'Bet', 'Facts', 'Tea', 'Sus',
        'Bussin', 'Sheesh', 'Valid', 'Mid', 'Salty',
        'Goat', 'Simp', 'Stan', 'Ship', 'Canon',
        'Cringe', 'Based', 'Cope', 'Ratio', 'L',
        'W', 'Drip', 'Clout', 'Lowkey', 'Highkey',
        'Slaps', 'Hits Different', 'No Cap', 'For Real', 'Deadass',
        'Straight Up', 'Real Talk', 'On God', 'Frfr', 'Periodt',
        'Oop', 'Yeet', 'Skrrt', 'Oof', 'Rip',
        'Big Yikes', 'Yikes', 'Wack', 'Trash', 'Toxic',
        'Snatched', 'Glow Up', 'Snack', 'Thirsty', 'Pressed',
        'Shook', 'Dead', 'Deceased', 'Screaming', 'Crying',
        'Im Weak', 'Im Done', 'Im Out', 'Bye Felicia', 'K',
        'Sis', 'Hun', 'Babe', 'Love', 'Sweetie',
        'Receipts', 'Shade', 'Throwing Shade', 'Snatched My Wig', 'Wig'
    ],
    eten: [
        'Pizza', 'Hamburger', 'Pasta', 'Sushi', 'Kebab',
        'Frikandel', 'Kroket', 'Bitterballen', 'Poffertjes', 'Stroopwafel',
        'Pannenkoeken', 'Friet', 'Shoarma', 'Döner', 'Taco',
        'Burrito', 'Nasi', 'Bami', 'Saté', 'Loempia',
        'Kapsalon', 'Broodje gezond', 'Tosti', 'Ijs', 'Taart',
        'Chocolade', 'Chips', 'Popcorn', 'Koffie', 'Cola',
        'Appeltaart', 'Vlaai', 'Tompouce', 'Bossche Bol', 'Oliebollen',
        'Gevulde Koek', 'Speculaas', 'Pepernoten', 'Hagelslag', 'Pindakaas',
        'Kaas', 'Worst', 'Haring', 'Kibbeling', 'Patat',
        'Mayonaise', 'Ketchup', 'Mosterd', 'Sate Saus', 'Sambal',
        'Ramen', 'Pho', 'Dim Sum', 'Dumplings', 'Gyoza',
        'Spring Rolls', 'Pad Thai', 'Tom Yum', 'Green Curry', 'Rendang',
        'Naan', 'Biryani', 'Tikka Masala', 'Samosa', 'Pakora',
        'Falafel', 'Hummus', 'Baba Ganoush', 'Tabouleh', 'Shawarma',
        'Paella', 'Tapas', 'Churros', 'Gazpacho', 'Tortilla',
        'Lasagne', 'Risotto', 'Tiramisu', 'Gelato', 'Bruschetta',
        'Croissant', 'Baguette', 'Quiche', 'Crêpe', 'Macaron',
        'Bratwurst', 'Sauerkraut', 'Pretzel', 'Schnitzel', 'Strudel',
        'Fish and Chips', 'Shepherd Pie', 'Scones', 'Trifle', 'Yorkshire Pudding',
        'Bagel', 'Donut', 'Brownie', 'Cheesecake', 'Cupcake'
    ],
    aardrijkskunde: [
        'Nederland', 'België', 'Duitsland', 'Frankrijk', 'Spanje',
        'Italië', 'Verenigd Koninkrijk', 'Verenigde Staten', 'Canada', 'Mexico',
        'Brazilië', 'Argentinië', 'Japan', 'China', 'India',
        'Australië', 'Zuid-Afrika', 'Egypte', 'Marokko', 'Turkije',
        'Rusland', 'Griekenland', 'Zweden', 'Noorwegen', 'Denemarken',
        'Amsterdam', 'Parijs', 'Londen', 'New York', 'Tokio',
        'Berlijn', 'Rome', 'Madrid', 'Barcelona', 'Brussel',
        'Alpen', 'Himalaya', 'Sahara', 'Amazone', 'Nijl',
        'Atlantische Oceaan', 'Stille Oceaan', 'Middellandse Zee', 'Noordzee', 'Oostzee',
        'Europa', 'Azië', 'Afrika', 'Amerika', 'Oceanië',
        'Zuidpool', 'Noordpool', 'Groenland', 'IJsland', 'Madagascar',
        'Hawaï', 'Bali', 'Fiji', 'Malediven', 'Seychellen',
        'Dubai', 'Abu Dhabi', 'Singapore', 'Hong Kong', 'Shanghai',
        'Seoul', 'Bangkok', 'Mumbai', 'Delhi', 'Karachi',
        'São Paulo', 'Rio de Janeiro', 'Buenos Aires', 'Lima', 'Bogotá',
        'Los Angeles', 'Chicago', 'Houston', 'Miami', 'Las Vegas',
        'Toronto', 'Vancouver', 'Montreal', 'Sydney', 'Melbourne',
        'Kaapstad', 'Johannesburg', 'Nairobi', 'Lagos', 'Caïro',
        'Moskou', 'Sint-Petersburg', 'Warschau', 'Praag', 'Boedapest',
        'Wenen', 'Zürich', 'Stockholm', 'Kopenhagen', 'Helsinki'
    ],
    muziek: [
        'Rock', 'Pop', 'Hip Hop', 'Rap', 'Jazz',
        'Blues', 'Country', 'Reggae', 'Techno', 'House',
        'EDM', 'Dubstep', 'Metal', 'Punk', 'Indie',
        'R&B', 'Soul', 'Funk', 'Disco', 'Classical',
        'Gitaar', 'Piano', 'Drums', 'Viool', 'Saxofoon',
        'The Beatles', 'Michael Jackson', 'Queen', 'Elvis Presley', 'Madonna',
        'Drake', 'Taylor Swift', 'Ed Sheeran', 'Ariana Grande', 'The Weeknd',
        'BTS', 'Blackpink', 'Justin Bieber', 'Rihanna', 'Beyoncé',
        'Eminem', 'Kanye West', 'Jay-Z', 'Tupac', 'Biggie',
        'Coldplay', 'Imagine Dragons', 'Maroon 5', 'One Direction', 'Billie Eilish',
        'Rolling Stones', 'Led Zeppelin', 'Pink Floyd', 'Nirvana', 'Metallica',
        'AC/DC', 'Guns N Roses', 'Aerosmith', 'Bon Jovi', 'U2',
        'Radiohead', 'Muse', 'Arctic Monkeys', 'The Strokes', 'Red Hot Chili Peppers',
        'Green Day', 'Blink-182', 'Sum 41', 'Fall Out Boy', 'Panic at the Disco',
        'Twenty One Pilots', 'Linkin Park', 'System of a Down', 'Slipknot', 'Korn',
        'Daft Punk', 'Calvin Harris', 'David Guetta', 'Avicii', 'Martin Garrix',
        'Tiësto', 'Armin van Buuren', 'Hardwell', 'Afrojack', 'Steve Aoki',
        'Skrillex', 'Deadmau5', 'Marshmello', 'Diplo', 'Major Lazer',
        'Post Malone', 'Travis Scott', 'Lil Nas X', 'Doja Cat', 'Megan Thee Stallion',
        'Cardi B', 'Nicki Minaj', 'SZA', 'H.E.R.', 'Anderson .Paak'
    ],
    geloof: [
        'Islam', 'Christendom', 'Jodendom', 'Boeddhisme', 'Hindoeïsme',
        'Moskee', 'Kerk', 'Synagoge', 'Tempel', 'Gurdwara',
        'Koran', 'Bijbel', 'Torah', 'Tripitaka', 'Vedas',
        'Ramadan', 'Pasen', 'Kerstmis', 'Wesak', 'Divali',
        'Gebed', 'Meditatie', 'Pelgrimage', 'Ceremonie', 'Ritueel',
        'Allah', 'God', 'Jahweh', 'Boeddha', 'Brahma',
        'Profeet', 'Messias', 'Heilige', 'Monnik', 'Priester',
        'Vasten', 'Offeren', 'Zegen', 'Sacrament', 'Verlichting',
        'Hemel', 'Hel', 'Paradijs', 'Nirwana', 'Moksha',
        'Engel', 'Duivel', 'Demon', 'Geest', 'Ziel',
        'Mohammed', 'Jezus', 'Mozes', 'Abraham', 'Siddharta',
        'Vishnu', 'Shiva', 'Krishna', 'Ganesha', 'Lakshmi',
        'Hadj', 'Zakat', 'Salat', 'Shahada', 'Sawm',
        'Doop', 'Eucharistie', 'Biecht', 'Huwelijk', 'Wijding',
        'Bar Mitswa', 'Bat Mitswa', 'Pesach', 'Jom Kipoer', 'Chanoeka',
        'Karma', 'Dharma', 'Samsara', 'Mantra', 'Chakra',
        'Yoga', 'Puja', 'Prasad', 'Om', 'Namaste',
        'Zen', 'Sangha', 'Sutra', 'Bodhisattva', 'Dalai Lama',
        'Paus', 'Patriarch', 'Bisschop', 'Dominee', 'Pastoor',
        'Imam', 'Moefti', 'Rabbijn', 'Lama', 'Goeroe'
    ],
    manwha: [
        'Solo Leveling', 'Tower of God', 'The Beginning After The End', 'Omniscient Reader', 'Second Life Ranker',
        'The Breaker', 'God of High School', 'Noblesse', 'Hardcore Leveling Warrior', 'Dice',
        'Unordinary', 'Sweet Home', 'Bastard', 'Lookism', 'Eleceed',
        'The Gamer', 'Tomb Raider King', 'A Returners Magic', 'Mercenary Enrollment', 'Nano Machine',
        'Tales of Demons and Gods', 'Battle Through the Heavens', 'Soul Land', 'Martial Peak', 'Apotheosis',
        'Against the Gods', 'Rebirth of the Urban Immortal', 'I Am The Sorcerer King', 'Overgeared', 'Legendary Moonlight Sculptor',
        'Versatile Mage', 'Star Martial God Technique', 'The Kings Avatar', 'Release That Witch', 'Yuan Zun',
        'Magic Emperor', 'Metropolitan System', 'Chronicles of Heavenly Demon', 'Legend of the Northern Blade', 'Volcanic Age',
        'Return of the Mount Hua Sect', 'Lightning Degree', 'Reincarnation of the Suicidal Battle God', 'The Max Level Hero', 'SSS-Class Suicide Hunter',
        'Omniscient Readers Viewpoint', 'The Rankers Return', 'Kill the Hero', 'Limit Breaker', 'The Tutorial Is Too Hard',
        'Dungeon Reset', 'Seoul Station Druid', 'Leveling With The Gods', 'Doom Breaker', 'Return to Player',
        'The Player That Cant Level Up', 'Worthless Regression', 'Regression Instruction Manual', 'The Lone Necromancer', 'Memorize',
        'The Great Mage Returns After 4000 Years', 'Arcane Sniper', 'Heavenly Demon Instructor', 'Reaper of the Drifting Moon', 'Murim Login',
        'The Scholar Reincarnation', 'Doctor Rebirth', 'The Lords Coins', 'Im the Max Level Newbie', 'Player',
        'Auto Hunting', 'The Max Level Hero Has Returned', 'I Stack Experience Through Reading Books', 'Superhuman Era', 'Overpowered Sword',
        'Dungeon House', 'Boundless Necromancer', 'The Tutorial Tower', 'Kill the Dragon', 'Academy Undercover Professor',
        'Trash of the Counts Family', 'Lout of the Counts Family', 'The Constellation That Returned From Hell', 'My Civil Servant Life', 'Heavenly Demon Cultivation',
        'Reincarnated War God', 'Return of the Disaster Class Hero', 'The Heavenly Demon Cant Live a Normal Life', 'Im Not That Kind of Talent', 'The Newbie is Too Strong',
        'Absolute Sword Sense', 'Damn Reincarnation', 'Wandering Warrior of Wudang', 'Path of the Shaman', 'Youngest Scion of the Mages'
    ],
    beroemdheden: [
        'Cristiano Ronaldo', 'Lionel Messi', 'LeBron James', 'Tom Brady', 'Serena Williams',
        'Taylor Swift', 'Beyoncé', 'Drake', 'Ariana Grande', 'Ed Sheeran',
        'Dwayne Johnson', 'Tom Cruise', 'Leonardo DiCaprio', 'Brad Pitt', 'Will Smith',
        'Elon Musk', 'Jeff Bezos', 'Bill Gates', 'Mark Zuckerberg', 'Warren Buffett',
        'Kim Kardashian', 'Kylie Jenner', 'Kendall Jenner', 'Khloé Kardashian', 'Kourtney Kardashian',
        'Justin Bieber', 'Selena Gomez', 'Miley Cyrus', 'Demi Lovato', 'Shawn Mendes',
        'Zendaya', 'Tom Holland', 'Timothée Chalamet', 'Millie Bobby Brown', 'Billie Eilish',
        'Harry Styles', 'Zayn Malik', 'Niall Horan', 'Louis Tomlinson', 'Liam Payne',
        'Rihanna', 'Lady Gaga', 'Katy Perry', 'Adele', 'Bruno Mars',
        'The Weeknd', 'Post Malone', 'Travis Scott', 'Cardi B', 'Nicki Minaj',
        'Kylian Mbappé', 'Neymar', 'Erling Haaland', 'Kevin De Bruyne', 'Mohamed Salah',
        'Usain Bolt', 'Simone Biles', 'Michael Phelps', 'Roger Federer', 'Rafael Nadal',
        'Novak Djokovic', 'Naomi Osaka', 'Lewis Hamilton', 'Max Verstappen', 'Valentino Rossi',
        'Conor McGregor', 'Khabib Nurmagomedov', 'Mike Tyson', 'Floyd Mayweather', 'Manny Pacquiao',
        'Emma Watson', 'Jennifer Lawrence', 'Scarlett Johansson', 'Margot Robbie', 'Gal Gadot',
        'Chris Hemsworth', 'Chris Evans', 'Chris Pratt', 'Robert Downey Jr', 'Ryan Reynolds',
        'Johnny Depp', 'Keanu Reeves', 'Morgan Freeman', 'Denzel Washington', 'Samuel L Jackson',
        'Oprah Winfrey', 'Ellen DeGeneres', 'Jimmy Fallon', 'Stephen Colbert', 'Trevor Noah',
        'MrBeast', 'PewDiePie', 'Logan Paul', 'Jake Paul', 'KSI',
        'Charli DAmelio', 'Addison Rae', 'Khaby Lame', 'Emma Chamberlain', 'David Dobrik'
    ]
};

        // Initialize categories
        function initializeCategories() {
            const container = document.getElementById('categoryContainer');
            container.innerHTML = '';
            
            Object.keys(categoryInfo).forEach(key => {
                const info = categoryInfo[key];
                const checkboxId = `cat_${key}`;
                
                const wrapper = document.createElement('div');
                wrapper.innerHTML = `
                    <input type="checkbox" id="${checkboxId}" class="category-checkbox" value="${key}" onchange="updateSelectedCategories()">
                    <label for="${checkboxId}" class="category-label">
                        ${info.emoji} ${info.name}
                    </label>
                `;
                container.appendChild(wrapper);
            });
            
            // Selecteer alle categorieën standaard
            selectAllCategories();
        }

        // Update geselecteerde categorieën
        function updateSelectedCategories() {
            selectedCategories = [];
            document.querySelectorAll('.category-checkbox:checked').forEach(cb => {
                selectedCategories.push(cb.value);
            });
            
            // Update warning als geen categorieën geselecteerd zijn
            updateSetupWarning();
        }

        // Selecteer alle categorieën
        function selectAllCategories() {
            document.querySelectorAll('.category-checkbox').forEach(cb => {
                cb.checked = true;
            });
            updateSelectedCategories();
        }

        // Deselecteer alle categorieën
        function deselectAllCategories() {
            document.querySelectorAll('.category-checkbox').forEach(cb => {
                cb.checked = false;
            });
            updateSelectedCategories();
        }

        // Update setup warning
        function updateSetupWarning() {
            const warning = document.getElementById('setupWarning');
            
            // Bereken maximale imposters
            let maxImposters;
            if (players.length < 7) {
                maxImposters = 1;
            } else {
                maxImposters = Math.floor(players.length / 3);
            }
            
            const canStart = players.length >= 3 && imposterCount >= 1 && imposterCount <= maxImposters && selectedCategories.length > 0;
            document.getElementById('startGameBtn').disabled = !canStart;
            
            if (selectedCategories.length === 0) {
                warning.textContent = '⚠️ Selecteer minimaal 1 categorie!';
                warning.style.background = '#fff3cd';
                warning.style.color = '#856404';
                warning.style.borderColor = '#ffc107';
            } else if (players.length < 3) {
                warning.textContent = '⚠️ Minimaal 3 spelers nodig om te starten';
                warning.style.background = '#fff3cd';
                warning.style.color = '#856404';
                warning.style.borderColor = '#ffc107';
            } else if (players.length < 7 && imposterCount > 1) {
                warning.textContent = '⚠️ Minimaal 7 spelers nodig voor 2 imposters!';
                warning.style.background = '#fff3cd';
                warning.style.color = '#856404';
                warning.style.borderColor = '#ffc107';
            } else if (imposterCount > maxImposters) {
                warning.textContent = `⚠️ Te veel imposters! Maximaal ${maxImposters} voor ${players.length} spelers`;
                warning.style.background = '#fff3cd';
                warning.style.color = '#856404';
                warning.style.borderColor = '#ffc107';
            } else if (imposterCount < 1) {
                warning.textContent = '⚠️ Minimaal 1 imposter nodig';
                warning.style.background = '#fff3cd';
                warning.style.color = '#856404';
                warning.style.borderColor = '#ffc107';
            } else {
                warning.textContent = `✅ Klaar om te starten! (${selectedCategories.length} ${selectedCategories.length === 1 ? 'categorie' : 'categorieën'} geselecteerd)`;
                warning.style.background = '#d4edda';
                warning.style.color = '#155724';
                warning.style.borderColor = '#28a745';
            }
        }


        // LocalStorage functies
        function saveStats(key, value) {
            localStorage.setItem(key, value);
        }

        function getStats(key, defaultValue = 0) {
            return parseInt(localStorage.getItem(key)) || defaultValue;
        }

        // Spelers opslaan
        function savePlayers() {
            if (players.length > 0) {
                localStorage.setItem('savedPlayers', JSON.stringify(players));
                checkSavedPlayers();
            }
        }

        function getSavedPlayers() {
            const saved = localStorage.getItem('savedPlayers');
            return saved ? JSON.parse(saved) : [];
        }

        function loadSavedPlayers() {
            const saved = getSavedPlayers();
            if (saved.length > 0) {
                players = [...saved];
                updatePlayerList();
            }
        }

        function clearAllSavedPlayers() {
            if (confirm('Weet je zeker dat je alle opgeslagen spelers wilt verwijderen?')) {
                localStorage.removeItem('savedPlayers');
                checkSavedPlayers();
                showScreen('homeScreen');
            }
        }

        function checkSavedPlayers() {
            const saved = getSavedPlayers();
            const section = document.getElementById('savedPlayersSection');
            if (saved.length > 0) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        }

        function manageSavedPlayers() {
            const saved = getSavedPlayers();
            const list = document.getElementById('managedPlayersList');
            
            if (saved.length === 0) {
                list.innerHTML = '<div class="info-box">Geen opgeslagen spelers</div>';
            } else {
                list.innerHTML = '<ul class="player-list">' + 
                    saved.map(p => `<li class="player-item"><span class="player-name">${p}</span></li>`).join('') +
                    '</ul>';
            }
            
            showScreen('managePlayersScreen');
        }

        // Get hint woord voor imposter
        function getHintWord() {
            const hints = hintWords[gameCategoryKey] || ['Mystery', 'Geheim', 'Onbekend'];
            return hints[Math.floor(Math.random() * hints.length)];
        }

        // Screen navigatie
        function showScreen(screenId) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            document.getElementById(screenId).classList.add('active');
        }

        // Selecteer imposter type
        function selectImposterType(type) {
            imposterType = type;
            document.querySelectorAll('input[name="imposterType"]').forEach(radio => {
                const label = radio.parentElement;
                if (radio.value === type) {
                    radio.checked = true;
                    label.style.borderColor = '#667eea';
                    label.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)';
                } else {
                    radio.checked = false;
                    label.style.borderColor = '#f5f5f5';
                    label.style.background = '#f5f5f5';
                }
            });
        }

        // Speler toevoegen
        function addPlayer() {
            const input = document.getElementById('playerNameInput');
            const name = input.value.trim();
            
            if (name && !players.includes(name)) {
                players.push(name);
                updatePlayerList();
                input.value = '';
                input.focus();
            }
        }

        // Update imposter count
        function changeImposterCount(change) {
            const newCount = imposterCount + change;
            let maxImposters;
            
            // Bereken maximale imposters op basis van aantal spelers
            if (players.length < 7) {
                maxImposters = 1; // Alleen 1 imposter onder 7 spelers
            } else {
                maxImposters = Math.floor(players.length / 3); // Max 1 imposter per 3 spelers
            }
            
            if (newCount >= 1 && newCount <= maxImposters) {
                imposterCount = newCount;
                document.getElementById('imposterCountDisplay').textContent = imposterCount;
                updatePlayerList();
            }
        }

        // Speler lijst updaten
        function updatePlayerList() {
            const list = document.getElementById('playerList');
            list.innerHTML = '';
            
            players.forEach((player, index) => {
                const li = document.createElement('li');
                li.className = 'player-item';
                li.innerHTML = `
                    <span class="player-name">${player}</span>
                    <button class="remove-btn" onclick="removePlayer(${index})">✕</button>
                `;
                list.appendChild(li);
            });

            // Update counters
            document.getElementById('playerCount').textContent = players.length;
            const crewCount = Math.max(0, players.length - imposterCount);
            document.getElementById('crewCount').textContent = crewCount;

            // Bereken maximale imposters op basis van aantal spelers
            let maxImposters;
            if (players.length < 7) {
                maxImposters = 1; // Alleen 1 imposter onder 7 spelers
            } else {
                maxImposters = Math.floor(players.length / 3); // Max 1 imposter per 3 spelers
            }
            
            if (imposterCount > maxImposters) {
                imposterCount = maxImposters;
                document.getElementById('imposterCountDisplay').textContent = imposterCount;
            }

            // Update warning
            updateSetupWarning();
        }

        // Speler verwijderen
        function removePlayer(index) {
            players.splice(index, 1);
            updatePlayerList();
        }

        // Get woorden uit database
        function getWordsFromCategory(category) {
            if (category === 'alle') {
                const allWords = [];
                for (let cat in database) {
                    allWords.push(...database[cat]);
                }
                return allWords;
            }
            return database[category] || [];
        }

        // Get woorden uit geselecteerde categorieën
        function getWordsFromSelectedCategories() {
            const allWords = [];
            selectedCategories.forEach(cat => {
                if (database[cat]) {
                    allWords.push(...database[cat].map(word => ({ word, category: cat })));
                }
            });
            return allWords;
        }

        // Start spel
        function startGame() {
            if (players.length < 3) {
                alert('Minimaal 3 spelers nodig!');
                return;
            }

            // Bereken maximale imposters
            let maxImposters;
            if (players.length < 7) {
                maxImposters = 1;
            } else {
                maxImposters = Math.floor(players.length / 3);
            }

            if (imposterCount > maxImposters || imposterCount < 1) {
                alert(`Kies tussen 1 en ${maxImposters} imposters voor ${players.length} spelers!`);
                return;
            }

            if (selectedCategories.length === 0) {
                alert('Selecteer minimaal 1 categorie!');
                return;
            }

            // Sla spelers op
            savePlayers();

            // Shuffle spelers EERST voor willekeurige volgorde
            players = players.sort(() => Math.random() - 0.5);
            
            // Maak een array van alle speler indices
            const playerIndices = players.map((_, index) => index);
            
            // Shuffle de indices voor willekeurige imposter selectie
            const shuffledIndices = playerIndices.sort(() => Math.random() - 0.5);
            
            // Selecteer willekeurige imposters op basis van geshuffelde indices
            imposters = shuffledIndices.slice(0, imposterCount).map(index => players[index]);
            
            // Selecteer woord uit geselecteerde categorieën
            const words = getWordsFromSelectedCategories();
            const randomWord = words[Math.floor(Math.random() * words.length)];
            gameLocation = randomWord.word;
            gameCategoryKey = randomWord.category;
            gameCategory = categoryInfo[randomWord.category].emoji + ' ' + categoryInfo[randomWord.category].name;
            
            // Voor alternatieve imposter: selecteer een ander woord uit dezelfde categorie
            if (imposterType === 'alternative') {
                const categoryWords = database[gameCategoryKey];
                // Filter het echte woord eruit
                const otherWords = categoryWords.filter(w => w !== gameLocation);
                alternativeWord = otherWords[Math.floor(Math.random() * otherWords.length)];
            }
            
            // Selecteer hint woord
            hintWord = getHintWord();
            
            currentPlayerIndex = 0;
            gameStartTime = Date.now();
            
            showNextPlayer();
        }

        // Timer functie
        function startTimer() {
            if (timerInterval) clearInterval(timerInterval);
            
            timerInterval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - gameStartTime) / 1000);
                const minutes = Math.floor(elapsed / 60);
                const seconds = elapsed % 60;
                document.getElementById('gameTimer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        }

        // Toon volgende speler
        function showNextPlayer() {
            document.getElementById('currentPlayerName').textContent = players[currentPlayerIndex];
            showScreen('roleScreen');
        }

        // Onthul rol
        function revealRole() {
            const player = players[currentPlayerIndex];
            const isImposter = imposters.includes(player);
            
            const roleContent = document.getElementById('roleContent');
            
            if (isImposter) {
                if (imposterType === 'normal') {
                    // Normale imposter - krijgt alleen hint
                    roleContent.innerHTML = `
                        <div class="role-title role-imposter">🔴 JIJ BENT DE IMPOSTER!</div>
                        <div class="role-description">
                            Je kent het geheime woord NIET!<br><br>
                            Probeer onopgemerkt te blijven en raad het woord door slimme vragen te stellen.
                        </div>
                        <div class="location" style="background: #ff9800;">
                            <div class="location-title">💡 Category</div>
                            <div class="location-name" style="font-size: 1.3em;">${gameCategory}</div>
                        </div>
                        <div class="info-box" style="margin-top: 15px;">
                            ℹ️ Dit hint woord is gerelateerd aan de categorie, maar niet het echte woord!
                        </div>
                    `;
                } else {
                    // Alternatieve imposter - krijgt een ander woord uit dezelfde categorie
                    roleContent.innerHTML = `
                        <div class="role-title" style="color: #ff9800;">🟠 JIJ BENT DE ALTERNATIEVE IMPOSTER!</div>
                        <div class="location" style="background: #ff9800;">
                            <div class="location-title">🔐 Jouw Woord</div>
                            <div class="location-name">${alternativeWord}</div>
                            <div class="category-badge">${gameCategory}</div>
                        </div>
                        <div class="role-description">
                            Jij hebt een ANDER woord uit dezelfde categorie!<br><br>
                            De crew heeft: <strong style="color: #ff5252;">"???"</strong><br>
                            Jij hebt: <strong style="color: #ff9800;">"${alternativeWord}"</strong><br><br>
                            Probeer onopgemerkt te blijven en raad het echte woord van de crew!
                        </div>
                        <div class="info-box" style="margin-top: 15px;">
                            ⚠️ Pas op! Als je te specifiek bent over jouw woord, word je ontmaskerd!
                        </div>
                    `;
                }
            } else {
                roleContent.innerHTML = `
                    <div class="role-title role-crew">🟢 JIJ BENT CREW</div>
                    <div class="location">
                        <div class="location-title">🔐 Het Geheime Woord</div>
                        <div class="location-name">${gameLocation}</div>
                        <div class="category-badge">${gameCategory}</div>
                    </div>
                    <div class="role-description">
                        Help de imposter te vinden door vragen te stellen over dit woord!<br>
                        Let op: De imposter kent dit woord ${imposterType === 'normal' ? 'NIET' : 'NIET (of heeft een ander woord)'}.
                    </div>
                `;
            }

            const nextBtn = document.getElementById('nextPlayerBtn');
            if (currentPlayerIndex < players.length - 1) {
                nextBtn.textContent = '➡️ Volgende Speler';
            } else {
                nextBtn.textContent = '🎮 Start Discussie';
            }

            showScreen('roleDisplayScreen');
        }

        // Volgende speler
        function nextPlayer() {
            currentPlayerIndex++;
            
            if (currentPlayerIndex < players.length) {
                showNextPlayer();
            } else {
                startGamePhase();
            }
        }

        // Start game fase
        function startGamePhase() {
            document.getElementById('totalPlayers').textContent = players.length;
            document.getElementById('totalImposters').textContent = imposters.length;
            document.getElementById('totalCrew').textContent = players.length - imposters.length;
            document.getElementById('gameLocation').textContent = gameLocation;
            document.getElementById('gameCategory').textContent = gameCategory;
            
            startTimer();
            showScreen('gameScreen');
        }

        // Toon spelers
        function showPlayers() {
            let playerList = 'Alle Spelers:\n\n';
            players.forEach((player, index) => {
                playerList += `${index + 1}. ${player}\n`;
            });
            alert(playerList);
        }

        // Toon game end opties
        function showGameEndOptions() {
            if (timerInterval) clearInterval(timerInterval);
            
            document.getElementById('revealedWord').textContent = gameLocation;
            document.getElementById('revealedCategory').textContent = gameCategory;
            
            showScreen('gameEndScreen');
        }

        // Crew wint en speel opnieuw
        function crewWonPlayAgain() {
            const timePlayed = Math.floor((Date.now() - gameStartTime) / 60000);
            
            // Statistieken bijwerken
            saveStats('gamesPlayed', getStats('gamesPlayed') + 1);
            saveStats('totalTime', getStats('totalTime') + timePlayed);
            saveStats('crewWins', getStats('crewWins') + 1);
            
            // Speel opnieuw met dezelfde spelers
            playAgainAfterWin();
        }

        // Imposter wint en speel opnieuw
        function imposterWonPlayAgain() {
            const timePlayed = Math.floor((Date.now() - gameStartTime) / 60000);
            
            // Statistieken bijwerken
            saveStats('gamesPlayed', getStats('gamesPlayed') + 1);
            saveStats('totalTime', getStats('totalTime') + timePlayed);
            saveStats('imposterWins', getStats('imposterWins') + 1);
            
            // Speel opnieuw met dezelfde spelers
            playAgainAfterWin();
        }

        // Speel opnieuw na overwinning (behoudt spelers)
        function playAgainAfterWin() {
            // Reset game state maar behoud spelers EN imposter type
            imposters = [];
            currentPlayerIndex = 0;
            gameLocation = '';
            gameCategory = '';
            gameCategoryKey = '';
            hintWord = '';
            alternativeWord = '';
            
            // Ga naar setup scherm met huidige spelers
            showScreen('setupScreen');
        }

        // Beëindig spel volledig (ga naar home)
        function endGameCompletely() {
            if (confirm('Weet je zeker dat je het spel wilt beëindigen? Alle spelers worden gereset.')) {
                goHome();
            }
        }

        // Beëindig spel met winnaar (oude functie - niet meer gebruikt)
        function endGameWithWinner(winner) {
            const timePlayed = Math.floor((Date.now() - gameStartTime) / 60000);
            
            saveStats('gamesPlayed', getStats('gamesPlayed') + 1);
            saveStats('totalTime', getStats('totalTime') + timePlayed);
            
            if (winner === 'crew') {
                saveStats('crewWins', getStats('crewWins') + 1);
            } else {
                saveStats('imposterWins', getStats('imposterWins') + 1);
            }
            
            goHome();
        }

        // Speel opnieuw met dezelfde spelers (wordt nu aangeroepen na overwinning)
        function playAgain() {
            // Reset game state maar behoud spelers EN imposter type
            imposters = [];
            currentPlayerIndex = 0;
            gameLocation = '';
            gameCategory = '';
            gameCategoryKey = '';
            hintWord = '';
            alternativeWord = '';
            
            // Ga naar setup scherm met huidige spelers
            showScreen('setupScreen');
        }

        // Ga naar home
        function goHome() {
            // Reset alles inclusief imposter type
            players = [];
            imposters = [];
            currentPlayerIndex = 0;
            imposterCount = 1;
            gameLocation = '';
            gameCategory = '';
            gameCategoryKey = '';
            hintWord = '';
            alternativeWord = '';
            imposterType = 'normal';
            
            document.getElementById('imposterCountDisplay').textContent = imposterCount;
            selectImposterType('normal'); // Reset naar normale imposter
            updatePlayerList();
            showScreen('homeScreen');
        }

        // Toon statistieken
        function showStats() {
            document.getElementById('gamesPlayed').textContent = getStats('gamesPlayed');
            document.getElementById('crewWins').textContent = getStats('crewWins');
            document.getElementById('imposterWins').textContent = getStats('imposterWins');
            document.getElementById('totalTime').textContent = getStats('totalTime');
            showScreen('statsScreen');
        }

        // Reset statistieken
        function resetStats() {
            if (confirm('Weet je zeker dat je alle statistieken wilt verwijderen?')) {
                localStorage.clear();
                showStats();
            }
        }

        // PWA Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('data:text/javascript;base64,c2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJyxmdW5jdGlvbihlKXtlLndhaXRVbnRpbChzZWxmLnNraXBXYWl0aW5nKCkpfSk7c2VsZi5hZGRFdmVudExpc3RlbmVyKCdmZXRjaCcsZnVuY3Rpb24oZSl7ZS5yZXNwb25kV2l0aChmZXRjaChlLnJlcXVlc3QpKX0p');
        }

        // Initialize app
        window.addEventListener('DOMContentLoaded', () => {
            initializeCategories();
            checkSavedPlayers();
        });

        // Nieuwe ronde starten (zelfde als crewWonPlayAgain maar zonder stats)
function playNewRound() {
    playAgainAfterWin(); // gebruikt bestaande reset logica
}

// Onthul imposters
function revealImposters() {
    const box = document.getElementById('impostersRevealBox');
    
    if (imposters.length === 0) {
        box.innerHTML = "Geen imposters gevonden.";
    } else {
        box.innerHTML = `
            <strong>🔴 De Imposter${imposters.length > 1 ? 's waren' : ' was'}:</strong><br><br>
            ${imposters.map(name => `• ${name}`).join('<br>')}
        `;
    }
    
    box.style.display = 'block';
}