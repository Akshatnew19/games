let currMole;
let currplant;
let score = 0;
let gameOver = false;


window.onload = function()
    {     
        document.getElementById("myButton").addEventListener("click", onClickFunction, { once: true });  
            function onClickFunction() {
                document.getElementById("board").innerHTML='' //clear the body of any existing elements
                setGame();
            } 
          
    }   

function setGame(){
    for(let i=0;i < 9;i++){
        
        let tile=document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener( "click", selectTile);
        document.getElementById("board").appendChild(tile);

    }
    let time=prompt("Enter time interval (in sec)") // use of prompt
    //  code for timer
    var intervalID = window.setInterval(Timer,1000) ;  
    
//timer function
    function Timer() {
        if(gameOver==true){
            clearInterval(intervalID);
            return;
        }
        if (time == 0){
            clearInterval(intervalID);
            // showScore();
            document.getElementById("score").innerHTML = "GAME OVER: " + score.toString();         
            gameOver = true;
           
        }
        else if(time < 0){
            clearInterval(intervalID);
            document.getElementById("score").innerHTML = "Enter correct time limit";                
            gameOver = true;
        }
        else if(time == null){
            clearInterval(intervalID);
            document.getElementById("score").innerHTML = "Enter correct time limit";                
            gameOver = true;
        }
        document.getElementById("time").innerText=time+" seconds";
        time--;
    }


    setInterval(setMole,1200);
    setInterval(setPlant,1100);
    // restart button
    document.getElementById("btn1").addEventListener("click", onClickFunction);
    function onClickFunction() {
    window.location.reload();
    }  
}

function getRandomTile(){
    let num= Math.floor(Math.random()*9);
    return num.toString();
}

 
function setMole(){
    if (gameOver){
        return;
    }
    if(currMole){
        currMole.innerHTML = "";
    }
    let mole=document.createElement("img");
    mole.src= "images/mole.png";
    let num= getRandomTile();
    if(currMole && currplant.id == num){ //if there is already a mole on the board
        return;
    }
    currMole =document.getElementById(num);
    currMole.appendChild(mole);
}

function setPlant(){
    if (gameOver){
        return;
    }
    if(currplant){
        currplant.innerHTML= "";
    }
    let plant=document.createElement("img");
    plant.src = "images/plant.png"
    let num= getRandomTile();
    if(currplant && currMole.id == num){ //if there is already a plant on the board
        return;
    }
   
    currplant = document.getElementById(num);
    currplant.appendChild(plant);
}

function selectTile(){
    if (gameOver){
        return;
    }
    if (this== currMole){
        score+=10;
        document.getElementById("score").innerText = score.toString();

    }
    else if(this== currplant){
        document.getElementById("score").innerHTML = "GAME OVER: " + score.toString();
        gameOver = true;
    }
}



