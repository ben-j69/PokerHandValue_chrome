import { handRanks } from './handRanks.js';

// DOM references
const inputField = document.getElementById("handInput");
const resultDisplay = document.getElementById("search-result");
const pokerTable = document.getElementById("poker-table");

// Load data in the window
window.addEventListener("load", () => {
    inputField.focus();
    displayHandRanks(); // Charger la table à droite
    populatePokerTable(); // Charger la table à gauche
});

// React on inputs
inputField.addEventListener("input", () => {
    const searchQuery = inputField.value.toLowerCase();
    const matches = findMatchingHands(searchQuery);
    const sortedMatches = matches.sort((a, b) => handRanks[a] - handRanks[b]);

    // Update search results
    if (sortedMatches.length > 0) {
        resultDisplay.innerHTML = generateResultTable(sortedMatches);
    } else {
        resultDisplay.innerText = "No matching hands found";
    }

    // Highlight in static table
    highlightMatchingCells(searchQuery);
});

// Display static table on left
function populatePokerTable() {
    let row = document.createElement('tr');
    pokerTable.appendChild(row);
    let count = 0;

    Object.entries(handRanks).forEach(([hand, value]) => {
        const handType = getHandType(hand)
        const cell = document.createElement('td');
        cell.className = handType

        // Crée des spans pour la main et la valeur
        const handSpan = document.createElement('span');
        handSpan.className = `hand-span`;
        handSpan.textContent = hand;

        const valueSpan = document.createElement('span');
        valueSpan.className = "value-span";
        valueSpan.textContent = value;

        cell.appendChild(handSpan);
        cell.appendChild(document.createElement('br'));
        cell.appendChild(valueSpan);

        cell.style.backgroundColor = getGradientColor(value);
        row.appendChild(cell);
        count++;

        if (count % 13 === 0) {
            row = document.createElement('tr');
            pokerTable.appendChild(row);
        }
    });
}


// Generate list of results
function displayHandRanks() {
    const sortedHands = Object.keys(handRanks).sort((a, b) => handRanks[a] - handRanks[b]);
    resultDisplay.innerHTML = generateResultTable(sortedHands);
}

// Display results in the search list
function generateResultTable(hands) {
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

// Find the matching hands in the search panel
function findMatchingHands(query) {
    return Object.keys(handRanks).filter((hand) => {
        const reversedHand = hand.split("").reverse().join(""); // Inverser la main

        if (query === "o" || query === "s") {
            return hand.endsWith(query.toLowerCase()); // Vérifie les suffixes spécifiques
        }

        return hand.includes(query) || reversedHand.includes(query) || hand.includes(query.toUpperCase()) || reversedHand.includes(query.toUpperCase());
    });
}

// Returns the background color of the cell
function getGradientColor(value) {
    let r, g, b;

    if (value <= 50) {
        // Red to orange
        r = 255;
        g = Math.round((value / 50) * 200);
        b = 0;
    } else {
        // Blue
        r = Math.round(255 - ((value - 50) / 50) * 150);
        g = Math.round(220 - ((value - 50) / 50) * 100);
        b = Math.round((value - 50) / 50 * 200);
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

// Highlight searched hand in the left static board
function highlightMatchingCells(query) {
    const rows = pokerTable.getElementsByTagName("tr");

    // Reinit if empty search
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

    // Browse cells and highlight
    for (const row of rows) {
        const cells = row.getElementsByTagName("td");
        for (const cell of cells) {
            const handSpan = cell.querySelector('.hand-span');
            const handText = handSpan.textContent;
            const reversedHandText = handText.split("").reverse().join("");

            // Check if inverted hand contains the search patterne
            if (handText.includes(query) || reversedHandText.includes(query) ||handText.includes(query.toUpperCase()) ||reversedHandText.includes(query.toUpperCase())) {
                cell.style.backgroundColor = "rgba(0, 100, 0, 0.5)";
            } else {
                cell.style.border = "";
                const value = parseInt(cell.querySelector('.value-span').textContent, 10);
                cell.style.backgroundColor = getGradientColor(value); // Back to original color
            }
        }
    }
}
