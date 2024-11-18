const handRanks = {
    "AA": 0, "KK": 1, "QQ": 2, "JJ": 3, "TT": 4, "AKS": 5, "AQS": 6, "AJT": 7, "KQS": 8, "ATs": 9, "AKO": 10, "AQO": 11, "KQs": 12,
    "99": 13, "AQs": 14, "KJs": 15, "ATo": 16, "KQo": 17, "AJs": 18, "JTs": 19, "KTs": 20, "QTs": 21, "J9S": 22, "A9S": 23, "K9S": 24, "T9S": 25,
    "T8S": 26, "J8S": 27, "Q8S": 28, "K8S": 29, "A8S": 30, "98S": 31, "J7S": 32, "A7S": 33, "97S": 34, "K7S": 35, "T7S": 36, "Q7S": 37, "J6S": 38,
    "A6S": 39, "96S": 40, "K6S": 41, "T6S": 42, "Q6S": 43, "85S": 44, "J5S": 45, "A5S": 46, "94S": 47, "K5S": 48, "T5S": 49, "J4S": 50, "Q5S": 51,
    "85O": 52, "A4S": 53, "K4S": 54, "T4S": 55, "Q4S": 56, "84S": 57, "J3S": 58, "A3S": 59, "93S": 60, "K3S": 61, "T3S": 62, "Q3S": 63, "83S": 64,
    "A2S": 65, "92S": 66, "K2S": 67, "T2S": 68, "Q2S": 69, "82S": 70, "72S": 71, "52S": 72, "63S": 73, "43S": 74, "32S": 75, "22": 76,
    "AKO": 77, "KQo": 78, "QQ": 79, "KJo": 80, "QJo": 81, "JTo": 82, "TJo": 83, "J9O": 84, "A9O": 85, "K9O": 86, "T9O": 87, "99": 88,
    "88": 89, "A8O": 90, "K8O": 91, "Q8O": 92, "J8O": 93, "T8O": 94, "98O": 95, "87O": 96, "77": 97, "76S": 98, "65S": 99, "64S": 100,
    "54S": 101, "A7O": 102, "K7O": 103, "Q7O": 104, "J7O": 105, "T7O": 106, "97O": 107, "87O": 108, "66": 109, "A6O": 110, "K6O": 111,
    "Q6O": 112, "J6O": 113, "T6O": 114, "96O": 115, "86O": 116, "76O": 117, "55": 118, "A5O": 119, "K5O": 120, "Q5O": 121, "J5O": 122,
    "T5O": 123, "95O": 124, "85O": 125, "75O": 126, "65O": 127, "44": 128, "A4O": 129, "K4O": 130, "Q4O": 131, "J4O": 132, "T4O": 133,
    "94O": 134, "84O": 135, "74O": 136, "64O": 137, "54O": 138, "43O": 139, "33": 140, "A3O": 141, "K3O": 142, "Q3O": 143, "J3O": 144,
    "T3O": 145, "93O": 146, "83O": 147, "73O": 148, "63O": 149, "53O": 150, "43O": 151, "32O": 152, "22": 153
};

const inputField = document.getElementById("handInput");
const resultDisplay = document.getElementById("result");

// Focus on the input field when the extension opens
window.addEventListener("load", () => {
    inputField.focus();
    displayHandRanks(); // Display the full list of hand ranks on load
});

inputField.addEventListener("input", () => {
    const searchQuery = inputField.value.toUpperCase(); // Convert input to uppercase
    const matches = Object.keys(handRanks).filter((hand) =>
        hand.includes(searchQuery) // Recherche directe dans les clés
    );

    // Trier les mains par valeur croissante
    const sortedMatches = matches.sort((a, b) => handRanks[a] - handRanks[b]);

    // Display matching hands and their values in a table
    if (sortedMatches.length > 0) {
        resultDisplay.innerHTML = `
            <table>
                <thead>
                    <tr><th>Hand</th><th>Value</th></tr>
                </thead>
                <tbody>
                    ${sortedMatches.map((hand) => {
                        const style = hand.endsWith("S") ? "color: red;" : ""; // Red color for suited hands
                        const displayHand = hand.slice(0, 2).toUpperCase() + hand.slice(2).toLowerCase(); // Majuscule pour les 2 premiers caractères
                        return `<tr><td style="${style}">${displayHand}</td><td>${handRanks[hand]}</td></tr>`;
                    }).join('')}
                </tbody>
            </table>
        `;
    } else {
        resultDisplay.innerText = "No matching hands found";
    }
});

// Function to display the full list of hands by default in a table
function displayHandRanks() {
    const sortedHands = Object.keys(handRanks).sort((a, b) => handRanks[a] - handRanks[b]);

    resultDisplay.innerHTML = `
        <table>
            <thead>
                <tr><th>Hand</th><th>Value</th></tr>
            </thead>
            <tbody>
                ${sortedHands.map((hand) => {
                    const style = hand.endsWith("S") ? "color: red;" : ""; // Red color for suited hands
                    const displayHand = hand.slice(0, 2).toUpperCase() + hand.slice(2).toLowerCase(); // Majuscule pour les 2 premiers caractères
                    return `<tr><td style="${style}">${displayHand}</td><td>${handRanks[hand]}</td></tr>`;
                }).join('')}
            </tbody>
        </table>
    `;
}
