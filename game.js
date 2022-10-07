



class Game {

	constructor(GAME_WIDTH, GAME_HEIGHT){

		this.image = document.getElementById("img_tennisCourt");
		this.imageWelcomePage = document.getElementById("img_welcomeImage");
		this.imageMenuPage = document.getElementById("img_menuImage");
		this.imageMyself = document.getElementById("img_myPic");
		this.imageRightVictory = document.getElementById("img_rightVictory");
		this.imageLeftVictory = document.getElementById("img_leftVictory");
		this.imageGreenNadal = document.getElementById("img_greenNadal");
		this.imageYellowNadal = document.getElementById("img_yellowNadal");
		this.imageGreenNadalwon = document.getElementById("img_greenNadalwon");
		this.imageYellowNadalwon = document.getElementById("img_yellowNadalwon");
		this.imageTennisStadium = document.getElementById("img_tennisStadium");


		this.GAMESTATE = {

			PAUSED: 0,
			RUNNING: 1,
			MENU: 2,
			HOW_TO_PLAY: 3,
			GAMEOVER: 4,
			WELCOME: 5,
			CONTROLS: 6,
			ABOUT: 7,
			RIGHT_VICTORY: 8,
			LEFT_VICTORY: 9,
			READY: 10

		}

		this.gameWidth = GAME_WIDTH;
		this.gameHeight = GAME_HEIGHT;
		this.sideMargin = 50;
		this.maxBallSpeed = 5;
		
		this.gameState = this.GAMESTATE.WELCOME;
		this.ball = new Ball(this);
		this.racket1 = new Racket1(this);
		this.racket2 = new Racket2(this);

		
		this.gameObjects = [];

		new InputHandler(this, this.racket1, this.racket2);			


		//Pause page specifications:
		this.pausePage = {
			resumeBox : {
				x: 375,
				y: 215,
				width: 250,
				height: 70
			},

			newGameBox : {
				x: 375,
				y: 300,
				width: 250,
				height: 70
			}
		}	


		//Menu page specifications:
		this.menu = {
			playBox : {
				x: 750,
				y: 300,
				width: 250,
				height: 60
			},

			controlBox : {
				x: 750,
				y: 400,
				width: 250,
				height: 60
			},

			howToPlayBox : {
				x: 750,
				y: 500,
				width: 250,
				height: 60
			},

			aboutBox : {
				x: 750,
				y: 600,
				width: 250,
				height: 60
			}
		}							


		this.backKey = {
			x: 750,
			y: 600,
			width: 250,
			height: 60
		}



	}

	start(){
		
		if(this.gameState === this.GAMESTATE.MENU || this.gameState === this.GAMESTATE.WELCOME){
			return;
		}

		this.gameObjects = [this.ball, this.racket1, this.racket2];

		this.gameState = this.GAMESTATE.RUNNING;

	}

	update(deltaTime){
		if(this.gameState === this.GAMESTATE.RUNNING){
			this.gameObjects.forEach(object => object.update(deltaTime));
		}
	}

	draw(ctx){
		//___________________________________________________________________________
		//Running display
		if(this.gameState === this.GAMESTATE.RUNNING){
			
			//Drawing the tennis court
			ctx.drawImage(this.image, 0, 0, this.gameWidth, this.gameHeight);

			//Scores
			ctx.font = "30px Aerial";
			ctx.fillStyle = "rgba(100, 250, 0, 1)";
			ctx.fillText("SCORE: " + this.racket1.score, 30, 30);
			ctx.fillStyle = "yellow";
			ctx.fillText("SCORE: " + this.racket2.score, this.gameWidth - 150, 30);

			this.gameObjects.forEach(object => object.draw(ctx));

		}

		

		//_______________________________________________________________________________
		//Menu display
		if(this.gameState === this.GAMESTATE.MENU){

			this.racket1.score = 0;
			this.racket2.score = 0;

			ctx.drawImage(this.imageMenuPage, 0, 0, this.gameWidth, this.gameHeight);

			//Menu
			ctx.font = "bold 60px serif";
			ctx.fillStyle = "white";
			ctx.fillText("MENU", 800, 200);

			//Play button
			ctx.font = "30px cursive";
			ctx.fillStyle = "rgba(0, 100, 100, 1)";
			ctx.fillRect(this.menu.playBox.x, this.menu.playBox.y, this.menu.playBox.width, this.menu.playBox.height);
			ctx.fillStyle = "white";
			ctx.fillText("PLAY", this.menu.playBox.x + 90, this.menu.playBox.y + 40);

			//Control button
			ctx.font = "30px cursive";
			ctx.fillStyle = "rgba(0, 100, 100, 1)";
			ctx.fillRect(this.menu.controlBox.x, this.menu.controlBox.y, this.menu.controlBox.width, this.menu.controlBox.height);
			ctx.fillStyle = "white";
			ctx.fillText("CONTROLS", this.menu.controlBox.x + 50, this.menu.controlBox.y + 40);

			//How to play button
			ctx.font = "30px cursive";
			ctx.fillStyle = "rgba(0, 100, 100, 1)";
			ctx.fillRect(this.menu.howToPlayBox.x, this.menu.howToPlayBox.y, this.menu.howToPlayBox.width, this.menu.howToPlayBox.height);
			ctx.fillStyle = "white";
			ctx.fillText("HOW TO PLAY", this.menu.howToPlayBox.x + 21, this.menu.howToPlayBox.y + 40);

			//About button
			ctx.font = "30px cursive";
			ctx.fillStyle = "rgba(0, 100, 100, 1)";
			ctx.fillRect(this.menu.aboutBox.x, this.menu.aboutBox.y, this.menu.aboutBox.width, this.menu.aboutBox.height);
			ctx.fillStyle = "white";
			ctx.fillText("ABOUT", this.menu.aboutBox.x + 70, this.menu.aboutBox.y + 40);
		}


		//_________________________________________________________________________________
		//Paused display
		if(this.gameState === this.GAMESTATE.PAUSED){
			ctx.clearRect(0,0,this.gameWidth, this.gameHeight);

			//Background
			ctx.fillStyle = "rgba(180,180,0,1)";
			ctx.fillRect(0,0,this.gameWidth, this.gameHeight);

			//RESUME BUTTON 
			ctx.fillStyle = "rgba(0, 100, 100, 1)";
			ctx.fillRect(this.pausePage.resumeBox.x, this.pausePage.resumeBox.y,this.pausePage.resumeBox.width,this.pausePage.resumeBox.height);
			ctx.font = "30 px Arial";
			ctx.fillStyle = "white";
			ctx.fillText("RESUME",this.pausePage.resumeBox.x + 70, this.pausePage.resumeBox.y + 45);

			//NEW GAME BUTTON
			ctx.fillStyle = "rgba(0, 100, 100, 1)";
			ctx.fillRect(this.pausePage.newGameBox.x, this.pausePage.newGameBox.y,this.pausePage.newGameBox.width,this.pausePage.newGameBox.height);
			ctx.font = "30 px Arial";
			ctx.fillStyle = "white";
			ctx.fillText("NEW GAME",this.pausePage.newGameBox.x + 50, this.pausePage.newGameBox.y + 45);

			//Back button
			ctx.font = "30px cursive";
			ctx.fillStyle = "rgba(0, 100, 100, 1)";
			ctx.fillRect(this.backKey.x, this.backKey.y, this.backKey.width, this.backKey.height);
			ctx.fillStyle = "white";
			ctx.fillText("BACK TO MENU", this.backKey.x + 10, this.backKey.y + 40);


		}


		//_________________________________________________________________________________________________
		//Welcome display
		if(this.gameState === this.GAMESTATE.WELCOME){
			ctx.drawImage(this.imageWelcomePage,0, 0, this.gameWidth, this.gameHeight);

			ctx.font = "bold 48px serif";
			ctx.fillStyle = "white";
			ctx.fillText("WELCOME", 200, 450);
			ctx.fillText("TO", 250, 500);

			ctx.font = "bold 80px cursive";
			ctx.fillStyle = "rgba(10, 200, 200)";
			ctx.fillText("TENNIS X", 210, 570);

			ctx.font = "20px Aerial";
			ctx.fillStyle = "white";
			ctx.fillText("Press SPACE ... ", 200, 650);
		}
		

		//____________________________________________________________________________________________________
		//Controls display
		if(this.gameState === this.GAMESTATE.CONTROLS){
			ctx.drawImage(this.imageMenuPage, 0, 0, this.gameWidth, this.gameHeight);

			ctx.font = "bold 48px cursive";
			ctx.fillStyle = "white";
			ctx.fillText("Arrow Keys",50, 200);
			ctx.fillText("Move Right Player", 450, 200);
			ctx.fillText("A, S, D, W", 50, 300);
			ctx.fillText("Move Left Player", 450, 300);
			ctx.fillText("Esc", 50, 400);
			ctx.fillText("Pause the game", 450, 400);


			//Back button
			ctx.font = "30px cursive";
			ctx.fillStyle = "rgba(0, 100, 100, 1)";
			ctx.fillRect(this.backKey.x, this.backKey.y, this.backKey.width, this.backKey.height);
			ctx.fillStyle = "white";
			ctx.fillText("BACK ->", this.backKey.x + 70, this.backKey.y + 40);

		}


		//_________________________________________________________________________________________________
		//HOW TO PLAY display
		if(this.gameState === this.GAMESTATE.HOW_TO_PLAY){
			ctx.drawImage(this.imageMenuPage, 0, 0, this.gameWidth, this.gameHeight);

			ctx.font = "bold 48px serif";
			ctx.fillStyle = "white";
			ctx.fillText("GAME RULES",100, 200);
			ctx.font = "bold 30px cursive";
			ctx.fillText("If a player misses the ball, the other gets 1 point", 50, 300);
			ctx.fillText("First player to score 20 points wins the game", 50, 400);
			


			//Back button
			ctx.font = "30px cursive";
			ctx.fillStyle = "rgba(0, 100, 100, 1)";
			ctx.fillRect(this.backKey.x, this.backKey.y, this.backKey.width, this.backKey.height);
			ctx.fillStyle = "white";
			ctx.fillText("BACK ->", this.backKey.x + 70, this.backKey.y + 40);

		}


		//__________________________________________________________________________________________________
		//ABOUT display
		if(this.gameState === this.GAMESTATE.ABOUT){
			ctx.drawImage(this.imageMyself, 0, 0, this.gameWidth, this.gameHeight);

			
			ctx.font = "bold 30px cursive";
			ctx.fillText("This game is created by Priyanshu Yadav ", 20, 300);
			ctx.fillText("Enjoy the game", 20, 500 );
			ctx.font = "bold 40px cursive";
			ctx.fillText("Happy Tennis!", 20, 600);
			


			//Back button
			ctx.font = "30px cursive";
			ctx.fillStyle = "rgba(0, 100, 100, 1)";
			ctx.fillRect(this.backKey.x, this.backKey.y, this.backKey.width, this.backKey.height);
			ctx.fillStyle = "white";
			ctx.fillText("BACK ->", this.backKey.x + 70, this.backKey.y + 40);

		}


		//___________________________________________________________________________________________________
		//VICTORY PAGE
		if(this.gameState === this.GAMESTATE.RIGHT_VICTORY){
			ctx.drawImage(this.image, 0, 0, this.gameWidth, this.gameHeight);
			ctx.drawImage(this.racket1.image, this.racket1.position.x, this.racket1.position.y, this.racket1.width, this.racket1.height);
			ctx.drawImage(this.racket2.image, this.racket2.position.x, this.racket2.position.y, this.racket2.width, this.racket2.height);
			ctx.drawImage(this.imageRightVictory, 200, 200, 600, 300);

			
			//Scores
			ctx.font = "30px Aerial";
			ctx.fillStyle = "rgba(100, 250, 0, 1)";
			ctx.fillText("SCORE: " + this.racket1.score, 30, 30);
			ctx.fillStyle = "yellow";
			ctx.fillText("SCORE: " + this.racket2.score, this.gameWidth - 150, 30);

			ctx.font = "20px cursive";
			ctx.fillStyle = "white";
			ctx.fillText("Press ENTER", 450, 650);

		}
		if(this.gameState === this.GAMESTATE.LEFT_VICTORY){
			ctx.drawImage(this.image, 0, 0, this.gameWidth, this.gameHeight);
			ctx.drawImage(this.racket1.image, this.racket1.position.x, this.racket1.position.y, this.racket1.width, this.racket1.height);
			ctx.drawImage(this.racket2.image, this.racket2.position.x, this.racket2.position.y, this.racket2.width, this.racket2.height);
			ctx.drawImage(this.imageLeftVictory, 200, 200, 600, 300);

			//Scores
			ctx.font = "30px Aerial";
			ctx.fillStyle = "rgba(100, 250, 0, 1)";
			ctx.fillText("SCORE: " + this.racket1.score, 30, 30);
			ctx.fillStyle = "yellow";
			ctx.fillText("SCORE: " + this.racket2.score, this.gameWidth - 150, 30);

			ctx.font = "20px cursive";
			ctx.fillStyle = "white";
			ctx.fillText("Press ENTER", 450, 650);
		}


		//______________________________________________________________________________________________________
		//READY PAGE
		if(this.gameState === this.GAMESTATE.READY){

			ctx.drawImage(this.image, 0, 0, this.gameWidth, this.gameHeight);
			ctx.drawImage(this.racket1.image, this.racket1.position.x, this.racket1.position.y, this.racket1.width, this.racket1.height);
			ctx.drawImage(this.racket2.image, this.racket2.position.x, this.racket2.position.y, this.racket2.width, this.racket2.height);

			//Scores
			ctx.font = "30px Aerial";
			ctx.fillStyle = "rgba(100, 250, 0, 1)";
			ctx.fillText("SCORE: " + this.racket1.score, 30, 30);
			ctx.fillStyle = "yellow";
			ctx.fillText("SCORE: " + this.racket2.score, this.gameWidth - 150, 30);

			ctx.drawImage(this.imageGreenNadal, 200, 200, 250, 350);
			ctx.drawImage(this.imageYellowNadal, 550, 200, 250, 350);

			ctx.font = "30px cursive";
			ctx.fillStyle = "white";
			ctx.fillText("VS", 480, 375);

			ctx.font = "20px cursive";
			ctx.fillStyle = "white";
			ctx.fillText("Press ENTER", 450, 650);
		}

		//_________________________________________________________________________________________________
		//GAME OVER screen

		if(this.gameState === this.GAMESTATE.GAMEOVER){

			ctx.drawImage(this.imageTennisStadium, 0, 0, this.gameWidth, this.gameHeight);

			ctx.font ="bold 50px serif";
			ctx.fillStyle = "black";
			ctx.fillText("CONGRATULATIONS", 270, 70);

			if(this.racket1.score >= 20){
				ctx.drawImage(this.imageGreenNadalwon, 380, 250, 250, 400);

				ctx.font = "bold 40px cursive";
				ctx.fillStyle = "white";
				ctx.fillText("GREEN NADAL", 350, 170);
			}
			else if(this.racket2.score >= 20){
				ctx.drawImage(this.imageYellowNadalwon, 380, 250, 300, 400);

				ctx.font = "bold 40px cursive";
				ctx.fillStyle = "yellow";
				ctx.fillText("YELLOW NADAL", 380, 170);
			}

			//Back button
			ctx.font = "30px cursive";
			ctx.fillStyle = "rgba(0, 100, 100, 1)";
			ctx.fillRect(this.backKey.x, this.backKey.y, this.backKey.width, this.backKey.height);
			ctx.fillStyle = "white";
			ctx.fillText("BACK TO MENU", this.backKey.x + 10, this.backKey.y + 40);

		}

		//__________________________________________________________________________________________________

	}

	togglePause(){
		if(this.gameState === this.GAMESTATE.PAUSED){
			this.gameState = this.GAMESTATE.RUNNING;
		}
		else if(this.gameState === this.GAMESTATE.RUNNING){
			this.gameState = this.GAMESTATE.PAUSED;
		}
	}

}