// Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");

// Array
const words = [
  "dependent",
  "dog",
  "superficial",
  "admit",
  "juice",
  "javascript",
  "developer",
  "airplane",
  "great",
  "fun",
  "manipulate",
  "cat",
  "transition",
  "school",
  "computer",
  "programming",
  "drag",
  "loving",
  "north",
];

//Initializing word
let randomWord;

//Initializing score
let score = 0;

//Initializing time
let time = 10;

// Add an event listener so that you can change the difficulty 
let level = "easy";
difficultySelect.value = level;

difficultySelect.addEventListener("change", (event) => {
  level = event.target.value;
});


// Create a updateTime function using the setInterval( ) method, 
// every time it runs it should decrement -1 from the timer. 
// Stop the timer when it reaches zero. 
const gameTimer = setInterval(updateTime, 1000);
function updateTime() {
    time--;
    timeEl.innerText = `${time}s`;

    if (time === 0) {
        clearInterval(gameTimer);
        gameOver();
    }
}


// Create a addWordToDOM function that will update 
// the "word" element with a random item from the words array 
function addWordToDOM() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  word.innerText = randomWord;
}

// Create a updateScore function that will increment score by +1 
function updateScore() {
  score++;
  scoreEl.innerText = score;
}

//Add an event listener to the "text" element. 
// When you type in the correct word, the function should:  
// Call updateScore, give the user a new word by calling addWordToDOM 
// increment time by 5 seconds, reset the input to empty string 
text.addEventListener("input", (event) => {
  const userInput = event.target.value;

  if (userInput === randomWord ) {
    updateScore();
    addWordToDOM();

    if (level == "hard") {
      time += 2;
    } else if (level == "medium") {
      time += 5;
    } else if (level == "easy") {
      time += 7;
    }
    updateTime();
    event.target.value = "";
  }
});


// Create  a gameOver function that will display 
// the end-game-container once the timer hits zero 
function gameOver() {
  if (score < 8) {
    endgameEl.style.display = 'flex';
    endgameEl.innerHTML = `<p>Oops, only ${score} words! Time to train your fingers... or maybe just your coffee intake?</p>
    <button onclick="location.reload()">Ready for a rematch?</button>`;
  }
  else {
    endgameEl.style.display = 'flex';
    endgameEl.innerHTML = `<p>Great job! ${score} words! You're a typing champion!</p>
    <button onclick="location.reload()">Ready for a rematch?</button>`;
  }
}

// Add an event listener to the settings button that will hide the settings 
settingsBtn.addEventListener("click", () => {
  if (settings.style.display == 'none') {
    settings.style.display = 'flex'; 
  } else {
    settings.style.display = 'none'; 
  }
});

addWordToDOM();