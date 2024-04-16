// LOGIC : here we make a board and rows and columns are x and y coordinate in graph

//  board
var blockSize = 25;
var rows = 20;
var cols= 20;
var board;
var context;
var gameOver= false;
var score = 0;

// snake head
var snakeX = blockSize*5;
var snakeY = blockSize*5;
var velX = 0;
var velY = 0;
var snakeBody =[]

// food
var foodX;
var foodY;

window.onload = function(){
    board = document.getElementById("board");
    board.width = cols * blockSize;
    board.height = rows * blockSize;
    context = board.getContext('2d'); // use for drawing on the board
    placeFood();
    document.addEventListener("keyup",changeDirect)
    // update();
    setInterval(update,110); // because we want that snake moves in every  100 milliseconds
}

function update(){

    if(gameOver){
        return;
    }
    context.fillStyle = "black"; // used to fill back canvas
    context.fillRect(0,0, board.width, board.height); 
    
    context.fillStyle = "red"; // position of snake
    context.fillRect(foodX,foodY,blockSize,blockSize) ;

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX,foodY])
        score += 10;
        document.getElementById("score").innerHTML="Score: "+score;
        placeFood();
    }

    for (let i =snakeBody.length-1;i>0;i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length){
        snakeBody[0] =[snakeX,snakeY];
    }
    context.fillStyle = "lime"; // position of snake
    snakeX += velX * blockSize;
    snakeY += velY * blockSize ;
    context.fillRect(snakeX,snakeY,blockSize,blockSize) ;
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1],blockSize,blockSize);
    }

    // game over
    if(snakeX < 0 || snakeX > (cols-1)*blockSize || snakeY > (rows-1) * blockSize || snakeY < 0){
        gameOver =true;
        document.getElementById("result").innerHTML="Game Over";
        document.getElementById("r_score").innerHTML="Your Score: "+score;

    }
    
    for (let i = 0; i < snakeBody.length; i++) {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver= true;
            document.getElementById("result").innerHTML="Game Over";
            document.getElementById("r_score").innerHTML="Your Score: "+score;
        }
        
    }
}

function placeFood(){
    foodX = Math.floor(Math.random()*(cols))*blockSize; // math.random generate no btn 0-1 * 20-> 0-19.9 .floor to remove decimal
    foodY = Math.floor(Math.random()*(rows))*blockSize;
}



function changeDirect(e){
    if(e.code ==  "ArrowUp" &&  velY !=  1 ){
        
        velX = 0;
        velY = -1;
    }
    else if(e.code ==  "ArrowDown" && velY!=-1){
        velX = 0;
        velY = 1;
    }
    else if(e.code ==  "ArrowLeft" && velX!=1){
        velX = -1;
        velY = 0;
    }
   else  if(e.code ==  "ArrowRight" && velX!=-1){
        velX = 1;
        velY = 0;
    }
}

function restartB(){
    window.location.reload();
}