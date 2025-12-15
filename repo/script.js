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

        // Hint woorden per categorie (gerelateerde woorden)
        const hintWords = {
            games: ['Console', 'Spelen', 'Controller', 'Level', 'Character'],
            films: ['Kijken', 'Scherm', 'Serie', 'Film', 'Netflix'],
            landen: ['Wereld', 'Vlag', 'Continent', 'Grens', 'Hoofdstad'],
            dieren: ['Natuur', 'Wildlife', 'Beest', 'Dier', 'Leven'],
            beroepen: ['Werk', 'Job', 'Carrière', 'Beroep', 'Functie'],
            eten: ['Eten', 'Drinken', 'Maaltijd', 'Voedsel', 'Gerecht'],
            sport: ['Sporten', 'Wedstrijd', 'Team', 'Competitie', 'Bal'],
            muziek: ['Geluid', 'Artiest', 'Song', 'Concert', 'Beat'],
            voorwerpen: ['Ding', 'Object', 'Item', 'Spullen', 'Materiaal'],
            activiteiten: ['Doen', 'Actie', 'Bezigheid', 'Handeling', 'Taak']
        };

        // Categorie informatie
        const categoryInfo = {
            games: { emoji: '🎮', name: 'Games' },
            films: { emoji: '🎬', name: 'Films & Series' },
            landen: { emoji: '🌍', name: 'Landen' },
            dieren: { emoji: '🦁', name: 'Dieren' },
            beroepen: { emoji: '💼', name: 'Beroepen' },
            eten: { emoji: '🍕', name: 'Eten & Drinken' },
            sport: { emoji: '⚽', name: 'Sport' },
            muziek: { emoji: '🎵', name: 'Muziek' },
            voorwerpen: { emoji: '📦', name: 'Voorwerpen' },
            activiteiten: { emoji: '🎯', name: 'Activiteiten' }
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

        // Database met woorden per categorie
        const database = {
            games: [
                'Minecraft', 'Fortnite', 'Call of Duty', 'FIFA', 'GTA',
                'The Legend of Zelda', 'Mario Kart', 'Among Us', 'Roblox', 'Pokemon',
                'League of Legends', 'Valorant', 'Overwatch', 'Apex Legends', 'Rocket League',
                'CS:GO', 'Dota 2', 'World of Warcraft', 'The Witcher', 'Skyrim',
                'Red Dead Redemption', 'Spider-Man', 'God of War', 'Halo', 'Destiny',
                'Minecraft Dungeons', 'Animal Crossing', 'Sims', 'Assassins Creed', 'Far Cry',
                'Elden Ring', 'Dark Souls', 'Fallout', 'Mass Effect', 'Dragon Age',
                'Final Fantasy', 'Persona', 'Metroid', 'Kirby', 'Donkey Kong',
                'Crash Bandicoot', 'Spyro', 'Sonic', 'Mega Man', 'Street Fighter',
                'Mortal Kombat', 'Tekken', 'Pac-Man', 'Tetris', 'Candy Crush'
            ],
            films: [
                'Harry Potter', 'Star Wars', 'Marvel Avengers', 'Lord of the Rings', 'Jurassic Park',
                'The Matrix', 'Batman', 'Spider-Man', 'Titanic', 'Avatar',
                'Inception', 'Interstellar', 'The Dark Knight', 'Pulp Fiction', 'Forrest Gump',
                'The Godfather', 'Breaking Bad', 'Game of Thrones', 'Stranger Things', 'The Mandalorian',
                'Wednesday', 'The Last of Us', 'Money Heist', 'Squid Game', 'Friends',
                'The Office', 'Rick and Morty', 'Attack on Titan', 'Naruto', 'One Piece',
                'The Lion King', 'Frozen', 'Toy Story', 'Finding Nemo', 'Shrek',
                'Madagascar', 'Despicable Me', 'Kung Fu Panda', 'How to Train Your Dragon', 'Moana',
                'Inside Out', 'Coco', 'Wall-E', 'Up', 'Ratatouille',
                'The Incredibles', 'Cars', 'Monsters Inc', 'Brave', 'Tangled'
            ],
            landen: [
                'Nederland', 'België', 'Duitsland', 'Frankrijk', 'Spanje',
                'Italië', 'Verenigd Koninkrijk', 'Verenigde Staten', 'Canada', 'Mexico',
                'Brazilië', 'Argentinië', 'Japan', 'China', 'India',
                'Australië', 'Zuid-Afrika', 'Egypte', 'Marokko', 'Turkije',
                'Rusland', 'Griekenland', 'Zweden', 'Noorwegen', 'Denemarken',
                'Zwitserland', 'Oostenrijk', 'Portugal', 'Polen', 'Thailand',
                'Zuid-Korea', 'Vietnam', 'Indonesië', 'Maleisië', 'Singapore',
                'Filipijnen', 'Nieuw-Zeeland', 'IJsland', 'Finland', 'Ierland',
                'Schotland', 'Wales', 'Kroatië', 'Servië', 'Roemenië',
                'Bulgarije', 'Hongarije', 'Tsjechië', 'Slowakije', 'Oekraïne'
            ],
            dieren: [
                'Leeuw', 'Tijger', 'Olifant', 'Giraffe', 'Zebra',
                'Panda', 'Kangoeroe', 'Koala', 'Dolfijn', 'Walvis',
                'Haai', 'Pinguïn', 'Adelaar', 'Papegaai', 'Flamingo',
                'Krokodil', 'Slang', 'Schildpad', 'Kameel', 'Gorilla',
                'Chimpansee', 'Wolf', 'Beer', 'Vos', 'Konijn',
                'Kat', 'Hond', 'Paard', 'Koe', 'Varken',
                'Schaap', 'Geit', 'Ezel', 'Lama', 'Alpaca',
                'Neushoorn', 'Nijlpaard', 'Luipaard', 'Jachtluipaard', 'Hyena',
                'Meerkat', 'Otter', 'Zeehond', 'Walrus', 'IJsbeer',
                'Rendier', 'Eland', 'Hert', 'Ree', 'Buffel'
            ],
            beroepen: [
                'Dokter', 'Verpleegkundige', 'Leraar', 'Politieagent', 'Brandweerman',
                'Piloot', 'Stewardess', 'Kok', 'Kellner', 'Barista',
                'Programmeur', 'Designer', 'Architect', 'Ingenieur', 'Wetenschapper',
                'Advocaat', 'Rechter', 'Journalist', 'Fotograaf', 'YouTuber',
                'Acteur', 'Zanger', 'Danser', 'Voetballer', 'Atleet',
                'Monteur', 'Elektricien', 'Loodgieter', 'Kapper', 'Schoonmaker',
                'Timmerman', 'Schilder', 'Metselaar', 'Tuinman', 'Bakker',
                'Slager', 'Visboer', 'Boer', 'Dierenarts', 'Tandarts',
                'Apotheker', 'Fysiotherapeut', 'Psycholoog', 'Makelaar', 'Accountant',
                'Bankier', 'Manager', 'Secretaresse', 'Receptioniste', 'Beveiliger'
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
                'Mayonaise', 'Ketchup', 'Mosterd', 'Sate Saus', 'Sambal'
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
                'Rolschaatsen', 'Inline Skaten', 'Hardlopen', 'Wandelen', 'Fitness'
            ],
            muziek: [
                'Rock', 'Pop', 'Hip Hop', 'Rap', 'Jazz',
                'Blues', 'Country', 'Reggae', 'Techno', 'House',
                'EDM', 'Dubstep', 'Metal', 'Punk', 'Indie',
                'R&B', 'Soul', 'Funk', 'Disco', 'Classical',
                'Gitaar', 'Piano', 'Drums', 'Viool', 'Saxofoon',
                'Trompet', 'Fluit', 'DJ', 'Concert', 'Festival',
                'Hardstyle', 'Trance', 'Drum and Bass', 'Garage', 'Grime',
                'K-Pop', 'J-Pop', 'Latin', 'Salsa', 'Merengue',
                'Opera', 'Musical', 'Symphony', 'Orchestra', 'Band',
                'Solo', 'Duet', 'Trio', 'Quartet', 'Choir'
            ],
            voorwerpen: [
                'Telefoon', 'Laptop', 'Tablet', 'Computer', 'Televisie',
                'Auto', 'Fiets', 'Motor', 'Bus', 'Tram',
                'Stoel', 'Tafel', 'Bank', 'Bed', 'Kast',
                'Lamp', 'Klok', 'Spiegel', 'Foto', 'Schilderij',
                'Boek', 'Krant', 'Tijdschrift', 'Pen', 'Potlood',
                'Schaar', 'Mes', 'Vork', 'Lepel', 'Bord',
                'Kopje', 'Glas', 'Fles', 'Tas', 'Rugzak',
                'Portemonnee', 'Sleutel', 'Horloge', 'Bril', 'Zonnebril',
                'Jas', 'Trui', 'Broek', 'Shirt', 'Schoenen',
                'Ballon', 'Speelgoed', 'Bal', 'Puzzel', 'Spel'
            ],
            activiteiten: [
                'Zwemmen', 'Wandelen', 'Hardlopen', 'Fietsen', 'Skaten',
                'Dansen', 'Zingen', 'Tekenen', 'Schilderen', 'Koken',
                'Bakken', 'Lezen', 'Schrijven', 'Gamen', 'Filmen',
                'Fotograferen', 'Reizen', 'Kamperen', 'Picknicken', 'BBQ',
                'Shoppen', 'Winkelen', 'Internetten', 'Chatten', 'Bellen',
                'Videobellen', 'Studeren', 'Leren', 'Werken', 'Slapen',
                'Eten', 'Drinken', 'Feesten', 'Vieren', 'Sporten',
                'Ontspannen', 'Mediteren', 'Yoga', 'Stretchen', 'Masseren',
                'Knippen', 'Verven', 'Plakken', 'Vouwen', 'Breien',
                'Haken', 'Naaien', 'Borduren', 'Tuinieren', 'Schoonmaken'
            ]
        };

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
                            <div class="location-title">💡 Hint Woord</div>
                            <div class="location-name" style="font-size: 1.3em;">${hintWord}</div>
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