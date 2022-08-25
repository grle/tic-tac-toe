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
  //path: 0
};
let player2 = {
  mark: "o",
  //score: 0,
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
    myTiles.innerHTML = player1.mark;
    let boolOne = checkWin(tiles, player1.mark);
    if (boolOne == true) {
      //player 1 wins
      declareWinner("PLAYER 2 WINS!");
      endRound = true;
      return;
    }
    round++;

    //bot turn
    botRound(); //setTimeout(botRound, 300); //causes boolBot fail by one round
    //bot win
    let boolBot = checkWin(tiles, player2.mark);
    if (boolBot == true) {
      declareWinner("AI BOT WINS!")
      endRound = true;
    }
    round++;
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
        declareWinner("PLAYER 1 WINS!")
        endRound = true;
      }
    } else if (checkTurn == 1) {
      //player 2 turn
      player1Turn["border-bottom"] = "5px solid var(--off-pink)";
      player2Turn["border-bottom"] = "none";
      myTiles.innerHTML = player2.mark;
      let boolTwo = checkWin(tiles, player2.mark);
      if (boolTwo == true) {
        //player 2 wins
        declareWinner("PLAYER 2 WINS!")
        endRound = true;
      }
    }
    round++;
  }

  //filled graph
  if (round == 9 || round == 10) { // two player: 9,  bot: 10
    //player 1 wins
    boolOne = checkWin(tiles, player1.mark);
    if (boolOne == true) {
      declareWinner("PLAYER 1 WINS!");
      return;
    }
    //player 2 wins OR bot wins
    boolTwo = checkWin(tiles, player2.mark);
    if (boolTwo == true) {
      if (player2.bot == true) {
        declareWinner("AI BOT WINS!");
        return;
      }
      declareWinner("PLAYER 2 WINS!");
      return;
    }
    //declare tie
    declareWinner("IT'S A DRAW!");
  }
}

//winner
const declareWinner = (winnerString) => {
  player1Turn["border-bottom"] = "none";
  player2Turn["border-bottom"] = "none";
  document.getElementById("announcement").style.display = "block";
  document.getElementById("winner").innerHTML = winnerString;
}


//////////////////////// AI BOT
const botRound = () => {
  //rows [0, 1, 2] [3, 4, 5] [6, 7, 8]
  let row1 = lookThree(0, 1, 2);
  if (row1 != -1) {
    tiles[row1].innerHTML = player2.mark;
    return;
  }
  let row2 = lookThree(3, 4, 5);
  if (row2 != -1) {
    tiles[row2].innerHTML = player2.mark;
    return;
  }
  let row3 = lookThree(6, 7, 8);
  if (row3 != -1) {
    tiles[row3].innerHTML = player2.mark;
    return;
  }

  //columns [0, 3, 6] [1, 4, 7] [2, 5, 8]
  let col1 = lookThree(0, 3, 6);
  if (col1 != -1) {
    tiles[col1].innerHTML = player2.mark;
    return;
  }
  let col2 = lookThree(1, 4, 7);
  if (col2 != -1) {
    tiles[col2].innerHTML = player2.mark;
    return;
  }
  let col3 = lookThree(2, 5, 8);
  if (col3 != -1) {
    tiles[col3].innerHTML = player2.mark;
    return;
  }

  //diagonals [0, 4, 8] [2, 4, 6]
  let diag1 = lookThree(0, 4, 8);
  if (diag1 != -1) {
    tiles[diag1].innerHTML = player2.mark;
    return;
  }
  let diag2 = lookThree(2, 4, 6);
  if (diag2 != -1) {
    tiles[diag2].innerHTML = player2.mark;
    return;
  }

  randomSelect();
}

//generate random value
const randomSelect = () => {
  let num = Math.floor(Math.random() * tiles.length);
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[num].innerHTML.length == 0) {
      tiles[num].innerHTML = player2.mark;
      break;
    }
    num++;
    if (num == tiles.length) {
      num = 0;
    }
  }
}

//combine "get three in a row" with "block three in a row"
const lookThree = (n1, n2, n3) => {
  let num = -1;
  if (tiles[n1].innerHTML.length == 1 && tiles[n2].innerHTML.length == 1 && tiles[n3].innerHTML.length == 1) {
    return num;
  }

  //get three in a row
  if (tiles[n1].innerHTML == player2.mark && tiles[n2].innerHTML == player2.mark) {
    return n3;
  } else if (tiles[n1].innerHTML == player2.mark && tiles[n3].innerHTML == player2.mark) {
    return n2;
  } else if (tiles[n2].innerHTML == player2.mark && tiles[n3].innerHTML == player2.mark) {
    return n1;
  }

  //block from getting three in a row
  if (tiles[n1].innerHTML == player1.mark && tiles[n2].innerHTML == player1.mark) {
    return n3;
  } else if (tiles[n1].innerHTML == player1.mark && tiles[n3].innerHTML == player1.mark) {
    return n2;
  } else if (tiles[n2].innerHTML == player1.mark && tiles[n3].innerHTML == player1.mark) {
    return n1;
  }


  if (tiles[n1].innerHTML == player1.mark || tiles[n2].innerHTML == player1.mark || tiles[n3].innerHTML == player1.mark) {
    return num;
  }
  //get two in a row
  if (tiles[n1].innerHTML == player2.mark) {
    if (tiles[n2].innerHTML.length == 1) return n2;
    if (tiles[n3].innerHTML.length == 1) return n3;
  }
  if (tiles[n2].innerHTML == player2.mark) {
    if (tiles[n3].innerHTML.length == 1) return n3;
    if (tiles[n1].innerHTML.length == 1) return n1;
  }
  if (tiles[n3].innerHTML == player2.mark) {
    if (tiles[n2].innerHTML.length == 1) return n2;
    if (tiles[n1].innerHTML.length == 1) return n1;
  }

  //catch all
  return num;
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
  document.getElementById("announcement").style.display = "none";
  player1Turn["border-bottom"] = "5px solid var(--off-pink)";
  player2Turn["border-bottom"] = "none";
}
