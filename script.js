console.log("Hallo");

const wordEl = document.querySelector(".word");
const oldWordsEl = document.querySelector(".old-words");
const countdownText = document.querySelector(".countdown");

//Wortliste
let words = [];
let currentWord = "";
let previousWords = [];
let seconds = 0;

fetch("words.txt")
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    words = text.split(",");
  });

//Das passiert, wenn du den Button drückst
function onClick() {
  startGame();
    if(currentWord) {
        //Wenn wir gerade noch ein Wort anzeigen, so fügen wir dieses den vorherigen Wörtern hinzu
        previousWords.push(currentWord);
        //Danach aktualisieren wir unsere Website, um den neuen Wert anzuzeigen
        oldWordsEl.innerHTML = previousWords.join(", ");
    }
  startCountdown();
  //Neues Wort generieren und als aktuelles Wort speichern
  currentWord = getRandomWord();
  //Danach aktualisieren wir unsere Website, um das neue Wort anzuzeigen
  wordEl.innerHTML = currentWord;
}

function getRandomNumber(maxNumber) {
  return Math.floor(Math.random() * maxNumber);
}

function getRandomWord() {
  return words[getRandomNumber(words.length)];
}

function startCountdown() {
  seconds = 10;

  let countdown = setInterval(function() {
    countdownText.innerHTML=seconds;
    seconds--;
    if(seconds<=0) {
      gameOver();
      clearInterval(countdown)
    }
  }, 1000);
}

function gameOver(){
  countdownText.style.color = "#a04f4f";
  wordEl.style.color = "#a04f4f";
  countdownText.innerHTML="Die Zeit ist abgelaufen!"
}

function startGame() {
  countdownText.style.color = "#fff";
  wordEl.style.color = "#fff";
  countdownText.innerHTML=""
}