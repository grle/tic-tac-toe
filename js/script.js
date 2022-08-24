//////////////////////// GRID
//variables
let container = document.getElementById("container");
let tiles = document.getElementsByClassName("tile");
let round = 0;
let endRound = false;
//players
let player1Turn = document.getElementById("first-player-turn").style;
let player2Turn = document.getElementById("second-player-turn").style;
let player1 = {
  mark: "x",
  //score: 0,
  path: 0
};
let player2 = {
  mark: "o",
  //score: 0,
  path: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  bot: false
};

const showGrid = () => {
  container.style.display = "grid";
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", (event) => {
      playRound(tiles[i]);
    });
  }
}

const aiBot = () => {
  //ai bot
  player2.bot = true;
  //make board visible
  if (container.style.display == "") {
    showGrid();
  }
  //change style
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].classList.add("bot-layout");
    tiles[i].classList.remove("player-layout");
  }
  //make blurb visible
  document.getElementById("two-player-score").style.display = "none";
  document.getElementById("player-vs-bot").style.display = "flex";
  //clear
  clearBoard();
}

const twoPlayer = () => {
  //two player
  player2.bot = false;
  //make board visible
  if (container.style.display == "") {
    showGrid();
  }
  //change style
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].classList.add("player-layout");
    tiles[i].classList.remove("bot-layout");
  }
  //make blurb visible
  document.getElementById("player-vs-bot").style.display = "none";
  document.getElementById("two-player-score").style.display = "flex";
  player1Turn["border-bottom"] = "5px solid var(--off-pink)";
  player2Turn["border-bottom"] = "none";
  //clear
  clearBoard();
}

//////////////////////// TWO PLAYER
const playRound = (myTiles) => {
  //prevent doubles
  if (myTiles.innerHTML == player1.mark || myTiles.innerHTML == player2.mark) {
    return;
  }
  //prevent playing at end of round
  if (endRound == true) {
    return;
  }

  //play against bot
  if (player2.bot == true) {
    //player 1 turn
    player1.path = myTiles.getAttribute("data-index-number");
    myTiles.innerHTML = player1.mark;
    let boolOne = checkWin(tiles, player1.mark);
    if (boolOne == true) {
      //player 1 wins
      document.getElementById("announcement").style.display = "block";
      document.getElementById("winner").innerHTML = "Player 1 wins!";
      //player1.score += 1;
      endRound = true;
      return;
    }

    //bot turn
    botRound();
    round++;
    //setTimeout(botRound, 300); //causes a delay

    //bot win
    let boolBot = checkWin(tiles, player2.mark);
    if (boolBot == true) {
      document.getElementById("announcement").style.display = "block";
      document.getElementById("winner").innerHTML = "AI Bot wins!";
      endRound = true;
    }
    //return;
  }

  //two player turn
  if (player2.bot == false) {
    let checkTurn = round % 2;
    if (checkTurn == 0) {
      //player 1 turn
      player2Turn["border-bottom"] = "5px solid var(--off-pink)";
      player1Turn["border-bottom"] = "none";
      myTiles.innerHTML = player1.mark;
      let boolOne = checkWin(tiles, player1.mark);
      if (boolOne == true) {
        //player 1 wins
        player1Turn["border-bottom"] = "none";
        player2Turn["border-bottom"] = "none";
        document.getElementById("announcement").style.display = "block";
        document.getElementById("winner").innerHTML = "Player 1 wins!";
        //player1.score += 1;
        endRound = true;
      }
    } else if (checkTurn == 1) {
      //player 2 turn
      player1Turn["border-bottom"] = "5px solid var(--off-pink)";
      player2Turn["border-bottom"] = "none";
      myTiles.innerHTML = player2.mark;
      let boolTwo = checkWin(tiles, player2.mark);
      //player 2 wins
      if (boolTwo == true) {
        player1Turn["border-bottom"] = "none";
        player2Turn["border-bottom"] = "none";
        document.getElementById("announcement").style.display = "block";
        document.getElementById("winner").innerHTML = "Player 2 wins!";
        //player1.score += 1;
        endRound = true;
      }
    }
  }
  round++;
  //draw
  if (round == 9 || round == 10) { //9 for 2 player, 10 for bot
    player1Turn["border-bottom"] = "none";
    player2Turn["border-bottom"] = "none";
    document.getElementById("announcement").style.display = "block";
    document.getElementById("winner").innerHTML = "It's a draw!";
  }
  console.log(round);
}

//////////////////////// AI BOT
const botRound = () => {
  ///////////block player1 from achieving three in a row
  // //rows
  // let row1 = checkThree(tiles[0], tiles[1], tiles[2]);
  // if (row1 == true) { return; }
  // let row2 = checkThree(tiles[3], tiles[4], tiles[5]);
  // if (row2 == true) { return; }
  // let row3 = checkThree(tiles[6], tiles[7], tiles[8]);
  // if (row3 == true) { return; }
  // //columns
  // let col1 = checkThree(tiles[0], tiles[3], tiles[6]);
  // if (col1 == true) { return; }
  // let col2 = checkThree(tiles[1], tiles[4], tiles[7]);
  // if (col2 == true) { return; }
  // let col3 = checkThree(tiles[2], tiles[5], tiles[8]);
  // if (col3 == true) { return; }
  // //diagonals
  // let diag1 = checkThree(tiles[0], tiles[4], tiles[8]);
  // if (diag1 == true) { return; }
  // let diag2 = checkThree(tiles[2], tiles[4], tiles[6]);
  // if (diag2 == true) { return; }

  ///////////try to get three in a row

  ///////////select one
  easyMode();

}

//EASY MODE
const easyMode = () => {
  for (let i = 0; i < player2.path.length; i++) {
    if (player2.path[i] == player1.path) {
      player2.path.splice(i, 1);
    }
  }

  if (player2.path.length == 0) {
    return;
  }

  let num = Math.floor(Math.random() * player2.path.length); //generate random number
  let select = player2.path[num];
  tiles[select].innerHTML = player2.mark;

  for (let i = 0; i < player2.path.length; i++) {
    if (player2.path[i] == select) {
      player2.path.splice(i, 1);
    }
  }
}

//block player1 from achieving three in a row
const checkThree = (tile1, tile2, tile3) => {
  if (tile1.innerHTML == player1.mark && tile2.innerHTML == player1.mark) {
    tile3.innerHTML = player2.mark;
    return true;
  } else if (tile1.innerHTML == player1.mark && tile3.innerHTML == player1.mark) {
    tile2.innerHTML = player2.mark;
    return true;
  } else if (tile2.innerHTML == player1.mark && tile3.innerHTML == player1.mark) {
    tile1.innerHTML = player2.mark;
    return true;
  } else {
    return false;
  }
}

//try to get three in a row
const getThree = (array) => {

}


//////////////////////// GAME BOARD
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
  endRound = false;
  // player1.score = 0;
  // player2.score = 0;
  player2.path = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  document.getElementById("announcement").style.display = "none";
  player1Turn["border-bottom"] = "5px solid var(--off-pink)";
  player2Turn["border-bottom"] = "none";
}
