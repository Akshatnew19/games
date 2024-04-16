// board
let board;
let boardwidth= 500;
let boardheight= 500;
let content;

//players
let playerwidth = 10;
let playerheight= 50;
let playervelY = 0;

let player1 = {
    x:10,
    y: boardheight/2,
    width:playerwidth,
    height:playerheight,
    velocityY:playervelY
}
let player2 = {
    x: boardwidth - playerwidth -10,
    y: boardheight/2,
    width:playerwidth,
    height:playerheight,
    velocityY:playervelY
}

// ball 
let ballWidth =10;
let ballHeigth = 10;
let ball ={
    x : boardwidth/2,
    y : boardheight/2,
    width:ballWidth,
    height:ballHeigth,
    velX :1,
    velY:2
}

let player1Score = 0;
let player2Score = 0;
const movew = document.getElementById("p1top");
let mover = document.getElementById("p1bottom");
window.onload = function() {
    document.getElementById("start").addEventListener("click", start, { once: true });
    
    board = document.getElementById( "board" );
    board.height= boardheight;
    board.width = boardwidth;
    content = board.getContext( '2d' ); // used for drawing  on the board
    // draw player 1
    content.fillStyle = "skyblue";
    content.fillRect(player1.x,player1.y,player1.width,player1.height);
    content.fillRect(player2.x,player2.y,player2.width,player2.height);
    
    content.fillStyle = "white";
    for(let i=10;i<board.height;i+=25){
        content.fillRect(board.width/2-10,i,5,5);

    }
    function start(){
    requestAnimationFrame(update);
    document.addEventListener('keyup',movePlayer);
    }

}

function update(){
    requestAnimationFrame(update);
    content.clearRect(0,0,board.width,board.height) ;
    // player1
    content.fillStyle = "skyblue";
    // player1.y += player1.velocityY;
    let nextP1Y =  player1.y + player1.velocityY;
     if (!outOfBounds(nextP1Y)) {
         player1.y = nextP1Y;
     } 
    content.fillRect(player1.x,player1.y,player1.width,player1.height);

    // player 2
    // player2.y += player2.velocityY;
    let nextP2Y =  player2.y + player2.velocityY;
    if (!outOfBounds(nextP2Y)) {
        player2.y = nextP2Y;
     } 
    content.fillRect(player2.x,player2.y,player2.width,player2.height);

    //ball
    content.fillStyle="white";
    ball.x+=ball.velX;
    ball.y+=ball.velY;
    content.fillRect(ball.x,ball.y,ball.width,ball.height);
    // if ball touches bottom and top
    if(ball.y<=0 || (ball.y + ball.height>=boardheight)){
        ball.velY *= -1; // reverse  y direction of velocity
    }

    // bounce the ball
    if(detectCollision(ball,player1)){
        if(ball.x <=player1.x+player1.width){
            // left side of ball
            ball.velX*=-1;//reverse x direction of velocity
            }
            
        }
        else if(detectCollision(ball,player2)){
            if(ball.x + ballWidth>=player2.x){
                //   right side of ball
                ball.velX*=-1;
            }
    }

    // game over
    if(ball.x < 0){
        player2Score++;
        resetGame(1);
    }
    else if(ball.x + ballWidth > boardwidth) {
        player1Score++ ;
        resetGame(-1);
    }

    content.font = "45px sans-serif";
    content.fillText(player1Score,boardwidth/5,45);
    content.fillText(player2Score,boardwidth*4/5 -45,45);

    // dotted line
    for(let i=10;i<board.height;i+=25){
        content.fillRect(board.width/2-10,i,5,5);
    }

   
}

function movePlayer(e){
    // player 1
    if ( e.code == "KeyW" || movew) {
        player1.velocityY =-3;
        movew.addEventListener('click',function(){
            player1.velocityY = -3;
        });
    }
    else if ( e.code == "KeyS"){
        player1.velocityY =3;
    }

    //player 2
    if(e.code =="ArrowUp"){
        player2.velocityY =-3;
    }
    else if(e.code =="ArrowDown"){
        player2.velocityY =3;
    }
}

function outOfBounds(yPosition){
    return (yPosition < 0 || yPosition+playerheight>boardheight);
}

function detectCollision(a,b){
    // this fucn is detect intersection of two rect
    return a.x<b.x +b.width && // a top left corner doesnt reach  the b's right corner
    a.x +a.width > b.x &&  // a top right corner passes  b's left corner
    a.y < b.y + b.height && // a  top right  corner does not go beyond b's bottom edge
    a.y +a.height > b.y ; //  a's bottom edge goes beyond b's top edge
}

function resetGame(direction){
    ball ={
        x : boardwidth/2,
        y : boardheight/2,
        width:ballWidth,
        height:ballHeigth,
        velX :direction,
        velY:2
    }
}

function restart(){
    // code to restart game
    window.location.reload();// reload page
}