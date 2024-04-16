var board;
var playero= "O";
var playerx= "X";
var winner=false;
var gameOver = false;  //game over
var currPlayer= playero;

window.onload =function(){
    setGame();
}
//create the tic-tac-toe board
function setGame() {
    board = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ];
    for(let r =0;r<3;r++){
        for(let c=0;c<3;c++){
            // div tag for tile <div id="0-0"></div>
            let tile=document.createElement("div");
            tile.id = r.toString() + "-" +c.toString();
            tile.classList.add("tile");
            //  for making lines on board 
            if(r===0 || r===1 ){
                tile.classList.add("horizontal-line");
            }
            if(c===0 || c===1 ){
                tile.classList.add("vertical-line");
            }
            tile.addEventListener('click',setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
   
}
function setTile() {
    if(gameOver) {
        return;
    }
    let cord = this.id.split("-"); // "0-0" => [0,0]
    let row = parseInt(cord[0]);
    let col = parseInt(cord[1]);
    if ( board[row][col]!=' '){
        return;
    }
    board[row][col]=currPlayer; // X or O
    this.innerText  = currPlayer;
    if(currPlayer == playero){
        currPlayer = playerx;
    }
    else{
        currPlayer = playero;
    }

    checkWinner();
    draw();
}

function checkWinner(){
    // horizontally
    for(let  i=0 ;i<3; i++){
        if(board[i][0]==board[i][1] && board[i][1]==board[i][2] && board[i][0]!=" ") {
            for (let r = 0; r < 3; r++) {
               let tile=document.getElementById(i.toString()+"-"+r.toString());
               tile.classList.add("winner"); 
            }
            winner=true;
            gameOver=true;
            return;
        }
    }   
    //  vertically
    for(let  i=0 ;i<3; i++){
        if(board[0][i]==board[1][i] && board[1][i]==board[2][i] && board[0][i]!=" ") {
            for (let r = 0; r < 3; r++) {
               let tile=document.getElementById(r.toString()+"-"+i.toString());
               tile.classList.add("winner"); 
            }
            
            winner=true;
            gameOver=true;
            return;
        }
    }   
    // diagonals
    if(board[0][0]==board[1][1] && board[1][1]==board[2][2] && board[2][2]!=' '){
        for (let r = 0; r < 3; r++) {
            let tile=document.getElementById(r.toString()+"-"+r.toString());
            tile.classList.add("winner"); 
         }
         
         winner=true;
         gameOver=true;
         return;
    }
    // anti diagonal
    if(board[0][2]==board[1][1] && board[1][1]==board[2][0] && board[2][0]!=' ') {
        let tile=document.getElementById("0-2");
        tile.classList.add("winner"); 
         tile=document.getElementById("1-1");
        tile.classList.add("winner"); 
         tile=document.getElementById("2-0");
        tile.classList.add("winner"); 
        
        winner=true;
         gameOver=true;
         return;
    }
}

function draw(){
    for(let row in  board) {
       for(let col in board[row]){
           if(board[row][col]==" ") 
            {return false;}
       }
   }
   for(let  i=0 ;i<3; i++){
    for(let r = 0; r < 3; r++) {
    let tile=document.getElementById(r.toString()+"-"+i.toString());
    tile.classList.add("draw"); 
        }
    }
    gameOver= true;
    return;

 }

function resetBoard() {
    window.location.reload();
    } 

