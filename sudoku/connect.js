var playerRed = "R";
var playerYellow="Y";
var currentPlayer = playerRed;
var gameOver = false;
var board;
var currColumns;
var rows=6;
var columns=7;
let nclick=0;

window.onload =  function() {
    setGame();
}
function setGame(){
    board=[];
    currColumns = [5,5,5,5,5,5,5];
    for(let r=0 ; r<rows ; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {

            row.push(' ');

            // div tag
            let tile = document.createElement("div");
            tile.id = r.toString()+ "-"+  c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece );
            document.getElementById("board").append(tile);

        }
        board.push(row);
        let turn1= document.getElementById("t1");
        let turn2= document.getElementById("t2");
        turn1.innerText="Start";
        turn2.innerText=" ";
       
        }
    
}

function setPiece(){
    let turn1= document.getElementById("t1");
    let turn2= document.getElementById("t2");
    if(gameOver) {
       
        return;
    }
    
   if(currentPlayer==playerRed){
    turn2.innerText="Play";
    turn1.innerText=" ";
    nclick+=1;
   }
   else{
    turn1.innerText="Play";
    turn2.innerText=" ";
    nclick+=1;
   }
    let coords = this.id.split("-"); // "0-0"-> [0,0]
    let r= parseInt(coords[0]);
    let c= parseInt(coords[1]);

    r = currColumns[c];
    if ( r< 0){
        return;
    }

    board[r][c]=currentPlayer;
    let tile =document.getElementById(r.toString()+ '-' + c.toString());
    
    if(currentPlayer == playerRed){
        tile.classList.add("red-piece");
        currentPlayer = playerYellow;
        
    }
    else{
        tile.classList.add("yellow-piece");
        currentPlayer =playerRed;
    }
    r -=1 ; // update the row heigth for column
    currColumns[c] =r; // update the array

    checkWinner();

    //draw
    if(nclick==42){
        turn2.innerText="Tie";
        turn1.innerText="Tie";
        gameOver= true;
        return;
    }

}

function checkWinner(){
    // horizontally
    for (let r=0;r < rows;r++){
        for(let c =0; c< columns-3;c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r][c+1] && board[r][c+1]==board[r][c+2] && board[r][c+2]==board[r][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    // vertically
        for(let c =0; c< columns;c++){
            for (let r=0;r < rows-3;r++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c] && board[r+1][c]==board[r+2][c] && board[r+2][c]==board[r+3][c]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //antidiagonal 
    for (let r=0;r < rows-3;r++){
        for(let c =0; c< columns-3;c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1]==board[r+2][c+2] && board[r+2][c+2]==board[r+3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }

    }

    // diagonal
    for (let r=0;r < rows;r++){
        for(let c =0; c< columns-3;c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1]==board[r-2][c+2] && board[r-2][c+2]==board[r-3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }

    }
}

function setWinner(r,c){
    let divred= document.getElementById("div1");
    let divyel= document.getElementById("div3");
let turn1= document.getElementById("t1");
let turn2= document.getElementById("t2");
    if ( board[r][c] == playerRed){
        turn2.innerText=" ";
        turn1.innerText="WINNER";
        divred.style.backgroundColor='goldenrod';
    }
    else {
        turn2.innerText="WINNER";
        turn1.innerText=" ";
        divyel.style.backgroundColor="goldenrod";
    }
    gameOver = true;
}



function restartg(){
        window.location.reload();
}