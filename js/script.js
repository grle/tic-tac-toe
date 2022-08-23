//////////////////////// GRID
//variables
let container = document.getElementById("container");
let tiles = document.getElementsByClassName("tile");
let round = 0;
//players
let player1 = {
  mark: "x",
}
let player2 = {
  mark: "o",
  bot: false
}

const aiBot = () => {
  //ai bot
  player2.bot = true;
  //make board visible
  if (container.style.display == "") {
    container.style.display = "grid";
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].classList.add("bot-layout");
      tiles[i].classList.remove("player-layout");
      tiles[i].addEventListener("click", (event) => {
        playRound(tiles[i]);
      });
    }
    //make blurb visible
    document.getElementById("two-player-score").style.display = "none";
    document.getElementById("player-vs-bot").style.display = "flex";
  }
  else {
    clearBoard();
  }
}

const twoPlayer = () => {
  //two player
  player2.bot = false;
  //make board visible
  if (container.style.display == "") {
    container.style.display = "grid";
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].classList.add("player-layout");
      tiles[i].classList.remove("bot-layout");
      tiles[i].addEventListener("click", (event) => {
        playRound(tiles[i]); //add bot round
      });

    }
    //make blurb visible
    document.getElementById("player-vs-bot").style.display = "none";
    document.getElementById("two-player-score").style.display = "flex";
  }
  else {
    clearBoard();
  }
}

//////////////////////// TWO PLAYER
const playRound = (myTiles) => {
  //prevent doubles
  if (myTiles.innerHTML == player1.mark || myTiles.innerHTML == player2.mark) {
    return;
  }
  //two player turn
  let checkTurn = round % 2;
  if (checkTurn == 0) {
    //player 1 turn
    myTiles.innerHTML = player1.mark;
    let boolOne = checkWin(tiles, player1.mark);
    if (boolOne == true) {
      alert("Player 1 wins!"); //make css for this
      clearBoard();
    }
  } else if (checkTurn == 1) {
    //player 2 turn
    if (player2.bot == true) {
      botRound();
    }
    else if (player2.bot == false) {
      myTiles.innerHTML = player2.mark;
      let boolTwo = checkWin(tiles, player2.mark);
      if (boolTwo == true) {
        alert("Player 2 wins!"); //make css for this
        clearBoard();
      }
    }
  }
  round++;
  //draw
  if (round == 9) {
    alert("It's a draw!"); //make css for this
    clearBoard();
  }
  console.log(round);
}

const botRound = () => {

}

const checkWin = (array, mark) => {
  //three in a row
  if (array[0].innerHTML == mark && array[1].innerHTML == mark && array[2].innerHTML == mark) {
    return true;
  } else if (array[3].innerHTML == mark && array[4].innerHTML == mark && array[5].innerHTML == mark) {
    return true;
  } else if (array[6].innerHTML == mark && array[7].innerHTML == mark && array[8].innerHTML == mark) {
    return true;
  }
  //three in a column
  if (array[0].innerHTML == mark && array[3].innerHTML == mark && array[6].innerHTML == mark) {
    return true;
  } else if (array[1].innerHTML == mark && array[4].innerHTML == mark && array[7].innerHTML == mark) {
    return true;
  } else if (array[2].innerHTML == mark && array[5].innerHTML == mark && array[8].innerHTML == mark) {
    return true;
  }
  //three in a diagonal
  if (array[0].innerHTML == mark && array[4].innerHTML == mark && array[8].innerHTML == mark) {
    return true;
  } else if (array[2].innerHTML == mark && array[4].innerHTML == mark && array[6].innerHTML == mark) {
    return true;
  }

  //no win
  return false;
}

const clearBoard = () => {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].innerHTML = "";
  }
  round = 0;
  console.log(round);
}
