// SELECTORS
const moves = document.getElementById("movesVal");
const timeTaken = document.getElementById("timeTaken");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const container = document.querySelector(".container");
const results = document.getElementById("results");
const controls = document.querySelector(".controls");

//Array of images
const imageData = [
  { name: 'batman', image: './images/batman.jpg' },
  { name: 'captain-america', image: './images/captain-america.jpg' },
  { name: 'hulk', image: './images/hulk.png' },
  { name: 'ironman', image: './images/ironman.jpg' },
  { name: 'spiderman', image: './images/spiderman.jpg' },
  { name: 'thor', image: './images/thor.jpg' },
  { name: 'wanda', image: './images/wanda.png' },
  { name: 'wonderwoman', image: './images/wonderwoman.png' },
];
let cards;
let timeGap;
let cardFirst = false;
let cardSecond = false;

let seconds = 0;
let minutes = 0;
let moves_val = 0;
let win_val = 0;
let secondsValue = 0;
let minutesValue = 0;

//Core Concept
const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeTaken.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

const movesCalculator = () => {
  moves_val += 1;
  moves.innerHTML = `<span>Moves:</span>${moves_val}`;
};

const random_img = (size = 4) => {
  let tempImage = [...imageData];
  let cardValues = [];
  size = (size * size)/ 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempImage.length);
    cardValues.push(tempImage[randomIndex]);
    tempImage.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  container.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
  
    container.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">X</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  container.style.gridTemplateColumns = `repeat(${size},auto)`;
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!cardFirst) {
          cardFirst = card;
          cardFirstValue = card.getAttribute("data-card-value");
        } else {
          movesCalculator();
          cardSecond = card;
          let cardSecondValue = card.getAttribute("data-card-value");
          if (cardFirstValue == cardSecondValue) {
            cardFirst.classList.add("matched");
            cardSecond.classList.add("matched");
            cardFirst = false;
            win_val += 1;
            if (win_val == Math.floor(cardValues.length / 2)) {
              results.innerHTML = `<h2>Game Completed</h2>
            <h3>Moves: ${moves_val}</h3>`;
              stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [cardFirst, cardSecond];
            cardFirst = false;
            cardSecond = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};
//Start the game
startButton.addEventListener("click", () => {
  moves_val = 0;
  seconds = 0;
  secondsValue = 0;
  minutesValue = 0;
  minutes = 0;
  timeTaken.innerHTML = `<span>Time:</span>00:00`;
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  timeGap = setInterval(timeGenerator, 1000);
  moves.innerHTML = `<span>Moves:</span>${moves_val}`;
  initializer();
});

//Stop the game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
      secondsValue=0;
      minutesValue = 0;
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(timeGap);
  })
);

const initializer = () => {
  results.innerText = "";
  win_val = 0;
  let cardValues = random_img();
  console.log(cardValues);
  matrixGenerator(cardValues);
};