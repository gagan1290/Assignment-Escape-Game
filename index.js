const me = document.getElementById("me");
const assignment = document.getElementById("assignment");
const stage = document.getElementById("game");
const bgMusic = new Audio("music/Super Mario.mp3");
const bgMusic1 = new Audio("music/Death.mp3");
const bgMusic2 = new Audio("music/jump.mp3");
bgMusic.loop = true;

function jump() {
  if (me.classList != "jump") {
    me.classList.add("jump");

    setTimeout(function () {
      me.classList.remove("jump");
    }, 500);
  }
}
function fall() {
  me.classList.add("fall");

  setTimeout(function () {
    me.classList.remove("fall");
  }, 500);
}

let myAssignment;
let isAlive;
let score = 0; // Initialize the score to 0
let canEarnPoints = true; // Initialize the points flag to true
isAlive = setInterval(function () {
  let metop = parseInt(window.getComputedStyle(me).getPropertyValue("top"));
  myAssignment = parseInt(
    window.getComputedStyle(assignment).getPropertyValue("left")
  );

  if (myAssignment < 300 && myAssignment > 200 && metop >= 350) {
    bgMusic.pause();
    bgMusic1.play();
    alert("10% deducted from your final grade");
    bgMusic.play();
    fall();
    score = 0;
  } else if (myAssignment < -20 && canEarnPoints) {
    // Player successfully avoids the obstacle
    score += 0.045; // Increase the score by 10
    document.getElementById("score").innerHTML = Math.floor(score); // Update the score display
    canEarnPoints = false; // Set the points flag to false
    if (score == 4) {
      stage.style.backgroundImage = "url(imgs/download.jpg)";
    }
  } else if (myAssignment < -80) {
    // Reset the points flag when the obstacle is off screen
    canEarnPoints = true;
  }
}, 10);

bgMusic.play();
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    bgMusic2.play();
    jump();
  }
});
