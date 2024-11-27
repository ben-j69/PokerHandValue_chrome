const handRanks = {
    "AA": 0, "AKs": 2, "AQs": 2, "AJs": 3, "ATs": 5, "A9s": 8, "A8s": 10, "A7s": 13, "A6s": 14, "A5s": 12, "A4s": 14, "A3s": 14, "A2s": 17,
    "AKo": 5, "KK": 1, "KQs": 3, "KJs": 3, "KTs": 6, "K9s": 10, "K8s": 16, "K7s": 19, "K6s": 24, "K5s": 25, "K4s": 25, "K3s": 26, "K2s": 26,
    "AQo": 8, "KQo": 9, "QQ": 1, "QJs": 5, "QTs": 6, "Q9s": 10, "Q8s": 19, "Q7s": 26, "Q6s": 28, "Q5s": 29, "Q4s": 29, "Q3s": 30, "Q2s": 31,
    "AJo": 12, "KJo": 14, "QJo": 15, "JJ": 2, "JTs": 6, "J9s": 11, "J8s": 17, "J7s": 27, "J6s": 33, "J5s": 35, "J4s": 37, "J3s": 37, "J2s": 38,
    "ATo": 18, "KTo": 20, "QTo": 22, "JTo": 21, "TT": 4, "T9s": 10, "T8s": 16, "T7s": 25, "T6s": 31, "T5s": 40, "T4s": 40, "T3s": 41, "T2s": 42,
    "A9o": 32, "K9o": 35, "Q9o": 36, "J9o": 34, "T9o": 31, "99 ": 7, "98s": 17, "97s": 24, "96s": 29, "95s": 38, "94s": 47, "93s": 47, "92s": 49,
    "A8o": 39, "K8o": 50, "Q8o": 53, "J8o": 48, "T8o": 43, "98o": 42, "88 ": 9, "87s": 21, "86s": 27, "85s": 33, "84s": 40, "83s": 53, "82s": 54,
    "A7o": 45, "K7o": 57, "Q7o": 66, "J7o": 64, "T7o": 59, "97o": 55, "87o": 52, "77 ": 12, "76s": 25, "75s": 28, "74s": 37, "73s": 45, "72s": 56,
    "A6o": 51, "K6o": 60, "Q6o": 71, "J6o": 80, "T6o": 74, "96o": 68, "86o": 61, "76o": 57, "66 ": 16, "65s": 27, "64s": 29, "63s": 38, "62s": 49,
    "A5o": 44, "K5o": 63, "Q5o": 75, "J5o": 82, "T5o": 89, "95o": 83, "85o": 73, "75o": 65, "65o": 58, "55 ": 20, "54s": 28, "53s": 32, "52s": 39,
    "A4o": 46, "K4o": 67, "Q4o": 76, "J4o": 85, "T4o": 90, "94o": 95, "84o": 88, "74o": 78, "64o": 70, "54o": 62, "44 ": 23, "43s": 36, "42s": 41,
    "A3o": 49, "K3o": 67, "Q3o": 77, "J3o": 86, "T3o": 92, "93o": 96, "83o": 98, "73o": 93, "63o": 81, "53o": 72, "43o": 76, "33 ": 23, "32s": 46,
    "A2o": 54, "K2o": 69, "Q2o": 79, "J2o": 87, "T2o": 94, "92o": 97, "82o": 99, "72o": 100, "62o": 95, "52o": 84, "42o": 86, "32o": 91, "22 ": 24
};

// Références DOM
const inputField = document.getElementById("handInput");
const resultDisplay = document.getElementById("search-result");
const pokerTable = document.getElementById("poker-table");

// Charger les données à la fenêtre
window.addEventListener("load", () => {
    inputField.focus();
    displayHandRanks(); // Charger la table à droite
    populatePokerTable(); // Charger la table à gauche
});

// Mettre à jour les résultats lors de la saisie
inputField.addEventListener("input", () => {
    const searchQuery = inputField.value.toUpperCase();
    const matches = findMatchingHands(searchQuery);
    const sortedMatches = matches.sort((a, b) => handRanks[a] - handRanks[b]);

    // Mettre à jour les résultats de la recherche
    if (sortedMatches.length > 0) {
        resultDisplay.innerHTML = generateTable(sortedMatches);
    } else {
        resultDisplay.innerText = "No matching hands found";
    }

    // Mettre en surbrillance les cellules correspondantes dans la table de gauche
    highlightMatchingCells(searchQuery);
});

// Charger la table à gauche
function populatePokerTable() {
    let row = document.createElement('tr');
    pokerTable.appendChild(row);
    let count = 0;

    Object.entries(handRanks).forEach(([hand, value]) => {
        const cell = document.createElement('td');

        // Crée des spans pour la main et la valeur
        const handSpan = document.createElement('span');
        handSpan.className = "hand-span";
        handSpan.textContent = hand;

        const valueSpan = document.createElement('span');
        valueSpan.className = "value-span";
        valueSpan.textContent = value;

        cell.appendChild(handSpan);
        cell.appendChild(document.createElement('br')); // Saut de ligne entre la main et la valeur
        cell.appendChild(valueSpan);

        // Définir la couleur de fond
        cell.style.backgroundColor = getGradientColor(value);
        row.appendChild(cell);
        count++;

        if (count % 13 === 0) {
            row = document.createElement('tr');
            pokerTable.appendChild(row);
        }
    });
}


// Générer la table principale
function displayHandRanks() {
    const sortedHands = Object.keys(handRanks).sort((a, b) => handRanks[a] - handRanks[b]);
    resultDisplay.innerHTML = generateTable(sortedHands);
}

function generateTable(hands) {
    const limitedHands = hands.slice(0, 10); // Limite à 11 éléments

    return `
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Hand</th>
                    <th>Rank</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                ${limitedHands.map((hand) => {
                    const handType = getHandType(hand);
                    const icon = getHandTypeIcon(handType);
                    const highlightedHand = highlightQuery(hand, inputField.value.toUpperCase());
                    const color = getGradientColor(handRanks[hand]);
                    const progressWidth = Math.round(((100 - handRanks[hand]) / 100) * 100);
                    return `
                        <tr>
                            <td class="hand-type">${icon}</td>
                            <td style="font-size: 20px;">${highlightedHand}</td>
                            <td style="color: ${color}; font-size: 20px;">${handRanks[hand]}</td>
                            <td>
                                <div style="background-color: ${color}; width: ${progressWidth}%; height: 10px; border-radius: 5px;"></div>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}


function findMatchingHands(query) {
    return Object.keys(handRanks).filter((hand) =>
        hand.includes(query) || hand.split("").reverse().join("").includes(query)
    );
}

function getGradientColor(value) {
    let r, g, b;

    if (value <= 50) {
        // Transition du rouge au orange moins saturé
        r = 255;
        g = Math.round((value / 50) * 200); // Limite le vert pour éviter un jaune trop vif
        b = 0;
    } else {
        // Transition vers un bleu plus foncé
        r = Math.round(255 - ((value - 50) / 50) * 200); // Réduit davantage le rouge
        g = Math.round(200 - ((value - 50) / 50) * 150); // Réduit le vert pour éviter un ton turquoise
        b = Math.round((value - 50) / 50 * 150); // Garde le bleu sombre et lisible
    }

    return `rgb(${r}, ${g}, ${b})`;
}

function highlightQuery(hand, query) {
    const regex = new RegExp(query, 'gi');
    return hand.replace(regex, (match) => `<span style="background-color: yellow;">${match}</span>`);
}

function getHandType(hand) {
    if (hand[0] === hand[1]) return "pair";
    if (hand.endsWith("o")) return "o";
    if (hand.endsWith("s")) return "s";
    return "unknown";
}

function getHandTypeIcon(type) {
    if (type === "pair") return "🃏🃏";
    if (type === "o") return "🔹🔸";
    if (type === "s") return "🔺🔺";
    return "❓";
}

function highlightMatchingCells(query) {
    const rows = pokerTable.getElementsByTagName("tr");

    // Si la recherche est vide, réinitialiser toutes les cellules
    if (!query) {
        for (const row of rows) {
            const cells = row.getElementsByTagName("td");
            for (const cell of cells) {
                cell.style.border = "";
                const value = parseInt(cell.querySelector('.value-span').textContent, 10);
                cell.style.backgroundColor = getGradientColor(value); // Couleur d'origine
            }
        }
        return;
    }

    // Parcourir les cellules et mettre en surbrillance les correspondances
    for (const row of rows) {
        const cells = row.getElementsByTagName("td");
        for (const cell of cells) {
            const handSpan = cell.querySelector('.hand-span');
            const valueSpan = cell.querySelector('.value-span');

            // Vérifier si la main contient la recherche
            if (handSpan.textContent.toUpperCase().includes(query)) {
                cell.style.border = "1px solid black"; // Ajoute un contour noir
                cell.style.backgroundColor = "rgba(0, 100, 0, 0.5)"; // Surlignage léger
            } else {
                cell.style.border = "";
                const value = parseInt(valueSpan.textContent, 10);
                cell.style.backgroundColor = getGradientColor(value); // Couleur d'origine
            }
        }
    }
}


