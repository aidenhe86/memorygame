const gameContainer = document.getElementById("game");
let cardFlipped = 0;
const ifMatch = [];

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
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);

  //Limit 2 tries and not continue the game when finish
  if(cardFlipped > 1 || event.target.classList.contains(`flipped`) || gameContainer.querySelectorAll(`.match`).length === COLORS.length){
    return false;
  }
  ifMatch[cardFlipped] = event.target.className;
  cardFlipped++;  
  event.target.style.backgroundColor = event.target.className;
  event.target.classList.add(`flipped`);

  // check if match
  if(cardFlipped > 1){
    setTimeout(function(){
      while(gameContainer.querySelector(`.flipped`) !== null){
        if(ifMatch[0] !== ifMatch[1]){
          gameContainer.querySelector(`.flipped`).style.backgroundColor = ``;
        }
        else{
          gameContainer.querySelector(`.flipped`).classList.add(`match`);
        }
        gameContainer.querySelector(`.flipped`).classList.remove(`flipped`);
      }
      cardFlipped = 0;
      //end game
      if(gameContainer.querySelectorAll(`.match`).length === COLORS.length){
        alert(`Congrats! You beat the Memory Game!`)
      }
    },1000)
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
