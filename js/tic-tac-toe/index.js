let turn = "x";
let symbols = [["", "", ""], ["", "", ""], ["", "", ""]];
let game_over = false;

const board = document.querySelector(".board");                   //board html element
const tiles = Array.from(document.querySelectorAll(".tile"));     //array of html tile elements

board.addEventListener("click", ({target}) => {                   //Listen to entire board, get the clicked tile
  const classes = Array.from(target.classList);                   //list of classes: "tile" for the <div>
  if (classes.includes("tile") && classes.length !== 1) return;   //prevents from overriding existing Xs and Os
  if(game_over) return;

  const idx = tiles.indexOf(target);                              //index of tile clicked

  target.classList.add(`tile-${turn}`);                           //adds 'tile-x' or 'tile-o' depending on turn
  symbols[idx % 3][Math.floor(idx / 3)] = turn;                   //changes appropriate symbol to x or y
  turn = turn === "x" ? "o" : "x";                                //turn changed to the other one

  displayTurn(turn);

  checkWin(symbols,turn);
});


function displayTurn(turn) {
  let turn_name="";
  if(turn=="x") turn_name="X turn";
  else turn_name="O turn";
  const turn_element = document.querySelector(".turn"); 
  turn_element.innerHTML = turn_name;
}

// Check if someone won
function checkWin(symbols,c) {
  c = c === "x" ? "o" : "x";
  let win = false;
  for(let i = 0; i < 3; i++) if(symbols[i][0] == c && symbols[i][1] == c && symbols[i][2] == c) win = true;
  for(let i = 0; i < 3; i++) if(symbols[0][i] == c && symbols[1][i] == c && symbols[2][i] == c) win = true;
  if(symbols[0][0] == c && symbols[1][1] == c && symbols[2][2] == c) win = true;
  if(symbols[0][2] == c && symbols[1][1] == c && symbols[2][0] == c) win = true;
  if(win){
    game_over = true;
    if(c=="x") alert("Player X won");
    if(c=="o") alert("Player O won");
  }
}


// Reseting the game
const res = document.querySelector(".reset");
res.addEventListener("click",reset);
function reset() {
  turn = "x";
  symbols = [["", "", ""], ["", "", ""], ["", "", ""]];
  for(let i=0;i<9;i++){
    tiles[i].classList.remove("tile-x");
    tiles[i].classList.remove("tile-o");
  }
  const turn_element = document.querySelector(".turn"); 
  turn_element.innerHTML = "X turn";
  game_over = false;
}
