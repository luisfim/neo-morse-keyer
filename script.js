const button = document.getElementById("morseButton");
const morseOutput = document.getElementById("morseOutput");
const textOutput = document.getElementById("textOutput");

const DOT_THRESHOLD = 300;

let startTime = 0;
let morse = "";

const morseTable = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z"
};

function startPress() {
    startTime = Date.now();
}

function endPress() {

    const duration = Date.now() - startTime;

    if (duration < DOT_THRESHOLD) {
        morse += ".";
    } else {
        morse += "-";
    }

    morseOutput.textContent = morse;

    if (morseTable[morse]) {
        textOutput.textContent = morseTable[morse];
    } else {
        textOutput.textContent = "Unknown";
    }
}

button.addEventListener("mousedown", startPress);
button.addEventListener("mouseup", endPress);

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        startPress();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
        endPress();
    }
});