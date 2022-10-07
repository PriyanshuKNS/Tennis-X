//Get canvas from main.html
let canvas = document.getElementById("gameScreen");


//ctx is the  context of our canvas
let ctx = canvas.getContext("2d");


//Size of canvas
var GAME_WIDTH = 1000;
var GAME_HEIGHT = 700;


//lastTime used to find deltaTime
var lastTime = 0;

//Defining game
var game = new Game(GAME_WIDTH, GAME_HEIGHT);

game.start();

//animation function
function gameLoop(timeStamp){
	
	deltaTime = timeStamp - lastTime;
	lastTime = timeStamp;


	//Clear the canvas;
	ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);


	//Update and draw everything on canvas again
	game.update(deltaTime);
	game.draw(ctx);


	//requestAnimationFrame call the function and passes timestamp as argument
	requestAnimationFrame(gameLoop);
}


//Starting the game
requestAnimationFrame(gameLoop);