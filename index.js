const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const word = ['cholesterol', 'Acetone', 'glycolysis', 'Hexokinase', 'metabolism', 'hormones', 'replication', 'genome', 'synthesis', 'phosphorylase', 'neuron', 'phage', 'glucogenic', 'hemoglobin', 'proteoglycans', 'cobalamin', 'ATP', 'activesite', 'chaperone', 'bilayer', 'attenuator', 'centromere', 'diabetes', 'deaminations', 'glucose', 'erythrocyte', 'exonucleases', 'lipogenesis', 'haploid', 'immunodeficiency', 'inducer', 'krebscycle', 'oligopeptide', 'plasmalogen', 'pyranose', 'substrate', 'translation'];


let selectedWord = word[Math.floor(Math.random() * word.length)];
let playable = true;

const correctLetters = [];
const wrongLetters = [];


function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
  `;
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won! 😃 ';
        popup.style.display = 'flex';
        playable = false;
    }

}
// Update the wrong letters
function updateWrongLettersEl() {
    // Display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
        popup.style.display = 'flex';

        playable = false;
    }
}
// Show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//keydown letter press
window.addEventListener('keydown', e => {
    if (playable) {
        //console.log(e.keyCode);
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            const letter = e.key.toLowerCase();

            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);

                    displayWord();
                } else {
                    showNotification();
                }
            } else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);

                    updateWrongLettersEl();
                } else {
                    showNotification();
                }
            }
        }
    }
});
// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    playable = true;

    //  Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = word[Math.floor(Math.random() * word.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});


displayWord();