import { dictionary } from "./dictionary.js"; //array

document.addEventListener('DOMContentLoaded', function() {

const userGuessInput = document.getElementById('userGuess');
const numOfGuesses = 6;
let currentRow = 0;

let correctWord = dictionary[Math.floor(Math.random() * dictionary.length)];
const submitButton = document.getElementById('submitButton');
const newGameButton = document.getElementById('newGameButton');

let usedLetters = {}; //track the letters used in a JS object

const guessRows = document.querySelectorAll('.guessRow');

function startNewGame() {
    currentRow = 0;
    correctWord = dictionary[Math.floor(Math.random() * dictionary.length)]; 
    console.log("Correct word is: " + correctWord); //displays correct word in console
    
    userGuessInput.value = ''; //clears input field

    usedLetters = {}; //clears data of used letters
    const usedLetterBoard = document.getElementById('usedLetterBoard'); //retrieves from index.html
    usedLetterBoard.innerHTML = ''; //clears used letter board

    guessRows.forEach(row => { //forEach function used
        const letterBoxes = row.getElementsByClassName('letterBox');
            for (let i = 0; i < letterBoxes.length; i++) {
                letterBoxes[i].textContent = '';
                letterBoxes[i].classList.remove('correct', 'exists', 'absent'); //removes exisitng status of letters
            }
    });
}

submitButton.addEventListener('click', function() { //event handler
    const userGuess = userGuessInput.value;
    
    if (userGuess === '') {
        alert('Take a guess!');
        return;
    }

    if (currentRow < numOfGuesses) { //assuming there are guesses remaining
        validateWord(userGuess);
    }
});
    
newGameButton.addEventListener('click', startNewGame); //refreshes game

userGuessInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        submitButton.click(); //"enter" counts as submit
    }
});

function validateWord(guess) {
    if (guess.length !== 5) {
        alert(guess + ' is not a 5 letter word!');
        return;
    }

    realWordCheck(guess)
        .then(isValid => {
            if (isValid) {
                checkWord(guess); 
            } else {
                alert('According to the Merriam Webster Dictionary, ' + guess + ' is not a valid 5-letter word!');
            }
        });
}

async function realWordCheck(word) {
    const result = await fetch (`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=d2d52ee8-503d-41fb-b37a-9666092cc09f`);
    const data = await result.json();

    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && data[0].meta) {
        return true;
    }
    return false;
}

function checkWord(guess) {
    const wordArray = guess.toLowerCase().split(''); //convert word to all lowercase and split it into an array
    const letterBoxes = guessRows[currentRow].getElementsByClassName('letterBox');

    let correctWordArray = correctWord ? correctWord.split('') : [];

        for (let i = 0; i < 5; i++) {
            letterBoxes[i].textContent = wordArray[i]; //updates the letter boxes with letters from the guessed word
            
            letterBoxes[i].classList.remove('correct', 'exists', 'absent');

            if (wordArray[i] === correctWordArray[i]) {
                letterBoxes[i].classList.add('correct');
                correctWordArray[i] = null;
                usedLetters[wordArray[i]] = 'correct';
            }
        }

        for (let i = 0; i < 5; i++) {
            if (letterBoxes[i].classList.contains('correct')) {
                continue;
            } else if (correctWordArray.includes(wordArray[i])) {
                letterBoxes[i].classList.add('exists');
                correctWordArray[correctWordArray.indexOf(wordArray[i])] = null;
                usedLetters[wordArray[i]] = 'exists';
            } else {
                letterBoxes[i].classList.add('absent');
                if (!usedLetters[wordArray[i]]) {
                    usedLetters[wordArray[i]] = 'absent';
                }
            }
        }

        if (guess.toLowerCase() === correctWord) {
            setTimeout(() => {
                alert(`Congrats! The correct word was ${correctWord.toUpperCase()}.`);
                startNewGame();
            }, 300);
        }

        currentRow++;

        userGuessInput.value = ''; //resets input field after each guess

        if (currentRow === numOfGuesses) {
            setTimeout(() => {
                displayCorrectWord(); 
            }, 300)
        }

        updateUsedLetterBoard();
    }  

    function displayCorrectWord() {
        alert(`Game Over! The correct word was ${correctWord.toUpperCase()}.`);
        newGameButton.style.display = 'block';
    }

    function updateUsedLetterBoard() {
        const usedLetterBoard = document.getElementById('usedLetterBoard')
        usedLetterBoard.innerHTML = ''; //board starts empty

        Object.keys(usedLetters).forEach(letter => { //arrow function
            const letterElement = document.createElement('span');
            letterElement.textContent = letter;
            letterElement.classList.add('letter-status');
            
            if (usedLetters[letter] === 'correct') {
                letterElement.classList.add('correct-letter');
            } else if (usedLetters[letter] === 'exists') {
                letterElement.classList.add('exists-letter');
            } else if (usedLetters[letter] === 'absent') {
                letterElement.classList.add('absent-letter');
            }
    
            usedLetterBoard.appendChild(letterElement);
        });
    }
});
