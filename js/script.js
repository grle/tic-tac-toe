//////////////////////// GRID
//variables
let container = document.getElementById("container");
let tiles = document.getElementsByClassName("tile");

function aiBot() {
  //make board visible
  container.style.display = "grid";
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].classList.add("bot-layout");
    tiles[i].classList.remove("player-layout");
    tiles[i].addEventListener("click", (event) => {
      playRound();
    });
  }
  //make blurb visible
  document.getElementById("two-player-score").style.display = "none";
  document.getElementById("player-vs-bot").style.display = "flex";
}

function twoPlayer() {
  //make board visible
  container.style.display = "grid";
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].classList.add("player-layout");
    tiles[i].classList.remove("bot-layout");
    tiles[i].addEventListener("click", (event) => {
      playRound();
      //add bot round
    });
  }
  //make blurb visible
  document.getElementById("player-vs-bot").style.display = "none";
  document.getElementById("two-player-score").style.display = "flex";
}

//////////////////////// PLAYER SELECT
//variables
let round = 0;
let player1 = {
  name: name,
  mark: 'x'
}
let player2 = {
  name: name,
  mark: 'o'
}
