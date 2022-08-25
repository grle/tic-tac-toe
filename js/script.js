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
      declareWinner("Player 2 wins!");
      endRound = true;
      return;
    }
    round++;

    //bot turn
    botRound(); //setTimeout(botRound, 300); //causes boolBot fail by one round
    //bot win
    let boolBot = checkWin(tiles, player2.mark);
    if (boolBot == true) {
      declareWinner("AI Bot wins!")
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
        declareWinner("Player 1 wins!")
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
        declareWinner("Player 2 wins!")
        endRound = true;
      }
    }
    round++;
  }

  //no winners
  if (round == 9 || round == 10) { //9 for 2 player, 10 for bot
    //player 1 wins
    boolOne = checkWin(tiles, player1.mark);
    if (boolOne == true) {
      declareWinner("Player 1 wins!");
    }
    //player 2 wins OR bot wins
    boolTwo = checkWin(tiles, player2.mark);
    if (boolTwo == true) {
      if (player2.bot == true) {
        declareWinner("AI Bot wins!");
        return;
      }
      declareWinner("Player 2 wins!");
    }
    //declare tie
    declareWinner("It's a draw!");
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
  ///////////block player1 from achieving three in a row
  //rows [0, 1, 2] [3, 4, 5] [6, 7, 8]
  let row1 = checkThree(0, 1, 2);
  if (row1 == true) return;
  let row2 = checkThree(3, 4, 5);
  if (row2 == true) return;
  let row3 = checkThree(6, 7, 8);
  if (row3 == true) return;
  //columns [0, 3, 6] [1, 4, 7] [2, 5, 8]
  let col1 = checkThree(0, 3, 6);
  if (col1 == true) return;
  let col2 = checkThree(1, 4, 7);
  if (col2 == true) return;
  let col3 = checkThree(2, 5, 8);
  if (col3 == true) return;
  //diagonals [0, 4, 8] [2, 4, 6]
  let diag1 = checkThree(0, 4, 8);
  if (diag1 == true) return;
  let diag2 = checkThree(2, 4, 6);
  if (diag2 == true) return;

  ///////////get three in a row
  //rows [0, 1, 2] [3, 4, 5] [6, 7, 8]
  row1 = getThree(0, 1, 2);
  if (row1 == true) return;
  row2 = getThree(3, 4, 5);
  if (row2 == true) return;
  row3 = getThree(6, 7, 8);
  if (row3 == true) return;
  //columns [0, 3, 6] [1, 4, 7] [2, 5, 8]
  col1 = getThree(0, 3, 6);
  if (col1 == true) return;
  col2 = getThree(1, 4, 7);
  if (col2 == true) return;
  col3 = getThree(2, 5, 8);
  if (col3 == true) return;
  //diagonals [0, 4, 8] [2, 4, 6]
  diag1 = getThree(0, 4, 8);
  if (diag1 == true) return;
  diag2 = getThree(2, 4, 6);
  if (diag2 == true) return;

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

//get three in a row
const getThree = (n1, n2, n3) => {
  let chooseNum = 10;
  if (tiles[n1].innerHTML == player1.mark || tiles[n2].innerHTML == player1.mark || tiles[n3].innerHTML == player1.mark) {
    return false;
  }
  if (tiles[n1].innerHTML.length != 0 && tiles[n2].innerHTML.length != 0 && tiles[n3].innerHTML.length != 0) {
    return false;
  }

  //get two in a row
  if (tiles[n1].innerHTML == player2.mark) {
    if (tiles[n2].innerHTML.length != 0) chooseNum = n2;
    if (tiles[n3].innerHTML.length != 0) chooseNum = n3;
  }
  if (tiles[n2].innerHTML == player2.mark) {
    if (tiles[n3].innerHTML.length != 0) chooseNum = n3;
    if (tiles[n1].innerHTML.length != 0) chooseNum = n1;
  }
  if (tiles[n3].innerHTML == player2.mark) {
    if (tiles[n2].innerHTML.length != 0) chooseNum = n2;
    if (tiles[n1].innerHTML.length != 0) chooseNum = n1;
  }

  //get three in a row from two
  if (tiles[n1].innerHTML == player2.mark && tiles[n2].innerHTML == player2.mark) {
    chooseNum = n3;
  }
  else if (tiles[n1].innerHTML == player2.mark && tiles[n3].innerHTML == player2.mark) {
    chooseNum = n2;
  }
  else if (tiles[n2].innerHTML == player2.mark && tiles[n3].innerHTML == player2.mark) {
    chooseNum = n1;
  }

  if (chooseNum != 10) {
    tiles[chooseNum].innerHTML = player2.mark;
    return true;
  }
  return false;
}

//block player1 from achieving three in a row
const checkThree = (num1, num2, num3) => {
  let chooseNum = 10;
  if (tiles[num1].innerHTML.length != 0 && tiles[num2].innerHTML.length != 0 && tiles[num3].innerHTML.length != 0) {
    return false;
  }

  if (tiles[num1].innerHTML == player1.mark && tiles[num2].innerHTML == player1.mark) {
    chooseNum = num3;
  } else if (tiles[num1].innerHTML == player1.mark && tiles[num3].innerHTML == player1.mark) {
    chooseNum = num2;
  } else if (tiles[num2].innerHTML == player1.mark && tiles[num3].innerHTML == player1.mark) {
    chooseNum = num1;
  }

  if (chooseNum != 10) {
    tiles[chooseNum].innerHTML = player2.mark;
    return true;
  }
  return false;
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
