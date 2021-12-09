const gameContainer = document.getElementById("game");
const start = document.querySelector(`#start`);
const currentScore = document.querySelector(`#score`);
let cardFlipped = 0;
let pair = 0;
let score = 0;
const ifMatch = [];

currentScore.children[2].innerText = localStorage.getItem("lowestScore") || 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  //Limit 2 tries and not continue the game when finish
  if(cardFlipped > 1 || event.target.classList.contains(`flipped`) || pair === COLORS.length / 2){
    return;
  }
  ifMatch[cardFlipped] = event.target;
  cardFlipped++;
  score++;
  currentScore.children[0].innerText = score;
  event.target.style.backgroundColor = event.target.className;
  event.target.classList.add(`flipped`);
  if(cardFlipped > 1){
    setTimeout(function(){
      if(ifMatch[0].className !== ifMatch[1].className){
        ifMatch[0].style.backgroundColor = ``;
        ifMatch[1].style.backgroundColor = ``;
        ifMatch[0].classList.remove(`flipped`);
        ifMatch[1].classList.remove(`flipped`);
      }
      else{
        pair++;
      }
      cardFlipped = 0;

      //End Game
      if(pair === COLORS.length / 2){
        alert(`Congrats! You beat the Memory Game! Click Start to restart the game.`)
        let lowScore = +localStorage.getItem("lowestScore") || Infinity;
        if(lowScore > score){
          localStorage.setItem(`lowestScore`,score);
          currentScore.children[2].innerText = score;
        }
      }
    },1000)
  }
}
// when the DOM loads
start.addEventListener("click",function(){
  score = 0;
  pair = 0;
  currentScore.children[0].innerText = 0;
  gameContainer.innerHTML = ``;
  createDivsForColors(shuffledColors);
})
