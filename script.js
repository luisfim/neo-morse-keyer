```javascript
const button = document.getElementById("morseButton");
const currentMorseElement = document.getElementById("currentMorse");
const wordOutput = document.getElementById("wordOutput");

const DOT_THRESHOLD = 300;

let startTime = 0;
let currentMorse = "";

const audioContext = new(window.AudioContext || window.webkitAudioContext)();

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

function playBeep(duration) {

    const oscillator = audioContext.createOscillator();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        600,
        audioContext.currentTime
    );

    oscillator.connect(audioContext.destination);

    oscillator.start();

    setTimeout(() => {
        oscillator.stop();
    }, duration);
}

function startPress() {

    startTime = Date.now();
}

function endPress() {

    if (startTime === 0) return;

    const duration = Date.now() - startTime;

    if (duration < DOT_THRESHOLD) {

        currentMorse += ".";

        playBeep(100);

    } else {

        currentMorse += "-";

        playBeep(300);
    }

    currentMorseElement.textContent = currentMorse;

    startTime = 0;
}

function confirmLetter() {

    const translated = morseTable[currentMorse];

    if (translated) {

        const block = document.createElement("div");

        block.className = "letterBlock";

        block.innerHTML = `
            <div class="letter">${translated}</div>
            <div class="miniMorse">${currentMorse}</div>
        `;

        wordOutput.appendChild(block);

    } else if (currentMorse !== "") {

        currentMorseElement.textContent = "INVALID";

        setTimeout(() => {

            currentMorseElement.textContent = "";

        }, 1000);
    }

    currentMorse = "";
}

button.addEventListener("mousedown", startPress);

button.addEventListener("mouseup", endPress);

button.addEventListener("touchstart", startPress);

button.addEventListener("touchend", endPress);

document.addEventListener("keydown", (e) => {

    if (e.repeat) return;

    if (e.code === "Space" && startTime === 0) {

        e.preventDefault();

        startPress();
    }

    if (e.code === "Enter") {

        confirmLetter();
    }

    if (e.code === "Backspace") {

        const last = wordOutput.lastElementChild;

        if (last) {

            last.remove();
        }
    }
});

document.addEventListener("keyup", (e) => {

    if (e.code === "Space") {

        e.preventDefault();

        endPress();
    }
});
```
