const btn = $(".btn");

const title = $("#level-title");

const buttonColors = ["green", "blue", "red", "yellow"];

let userClickedPattern = [];
let level = 0;

let greenAudio = new Audio("sounds/green.mp3");
let blueAudio = new Audio("sounds/blue.mp3");
let redAudio = new Audio("sounds/red.mp3");
let yellowAudio = new Audio("sounds/yellow.mp3");
let wrongAudio = new Audio("sounds/wrong.mp3");

let gamePattern = [];

//Playing the audio based on the button clicked and the random button selected
function playAudio(color) {
  switch (color) {
    case "green":
      greenAudio.play();
      break;
    case "blue":
      blueAudio.play();
      break;
    case "red":
      redAudio.play();
      break;
    case "yellow":
      yellowAudio.play();
      break;
  }
}
let started = false;
let gameisOver = false;
$(document).keydown(function (e) {
  //If the game has not started, the started = true, therefore the user can click any key and begin the game
  if (!started) {
    nextSequence();
    started = true;
  }
});

btn.click(function () {
  const userChosenColor = $(this).attr("id"); //Selects the id of a button
  userClickedPattern.push(userChosenColor);
  playAudio(userChosenColor);
  animatePress($(this)); //Selects the div element that we want to animate on
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
  currentColor.addClass("pressed");
  setTimeout(function () {
    currentColor.removeClass("pressed");
  }, 100);
}

function gameOver() {
  title.text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
  wrongAudio.play();
}

function resetGame() {
  gamePattern = [];
  level = 0;
  started = false;
}

function checkAnswer(current_level) {
  console.log(userClickedPattern, gamePattern);
  if (userClickedPattern[current_level] === gamePattern[current_level]) {
    //The last index of the user clicked pattern is checked against the game pattern e.g. gamePattern = ["blue","green"] then userclickedpattern = ["blue","green"] then the answer seuquence would be wrong
    if (gamePattern.length === userClickedPattern.length) {
      //Checking if the sequeunce if finished, the next sequence would only be called if we have reached the end of userClicked Array
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
    gameisOver = true;
    resetGame();
  }
}

function selectBtn(randomColor) {
  const selectedBtn = $("#" + randomColor);
  selectedBtn.animate({ opacity: 0.2 }, 50);
  setTimeout(function () {
    selectedBtn.animate({ opacity: 1 });
  }, 100);
  playAudio(randomColor);
}

function nextSequence() {
  userClickedPattern = []; //Array gets reset everytime this function is called so that the sequeunce of userclicked pattern is maintained.
  level++;
  title.text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColors[randomNumber]);
  selectBtn(buttonColors[randomNumber]);
}
