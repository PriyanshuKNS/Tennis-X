class InputHandler {
	
	constructor(game, racket1, racket2){
		
		document.addEventListener("keydown", event => {

			switch(event.keyCode) {

				//Racket 2 controls
				case 37:					
					racket2.moveLeft();							
					break;

				case 38:
					racket2.moveUp();
					break;

				case 39:
					racket2.moveRight();
					break;

				case 40:
					racket2.moveDown();
					break;
				

				//Racket 1 controls
				case 65:					
					racket1.moveLeft();
					break;

				case 87:
					racket1.moveUp();
					break;

				case 68:
					racket1.moveRight();
					break;

				case 83:
					racket1.moveDown();
					break;


				//Pause game
				//27 is the ESC key.
				case 27:
					game.togglePause();
					break;


				//Start game
				//32 is the SPACE key.
				case 32:
					if(game.gameState === game.GAMESTATE.WELCOME){
						game.gameState = game.GAMESTATE.MENU;
					}
					break;


				//Enter key : 13
				case 13:
					if(game.gameState === game.GAMESTATE.RIGHT_VICTORY || game.gameState === game.GAMESTATE.LEFT_VICTORY){
						game.gameState = game.GAMESTATE.RUNNING;
					}
					else if(game.gameState === game.GAMESTATE.READY){
						game.gameState = game.GAMESTATE.RUNNING;
						game.start();
					}
					break;
			}
		}) 


		document.addEventListener("keyup", event => {
			
			switch(event.keyCode) {
				case 37:
					if(racket2.speed.x < 0) racket2.speed.x = 0;
					break;

				case 38:
					if(racket2.speed.y < 0) racket2.speed.y = 0;
					break;

				case 39:
					if(racket2.speed.x > 0) racket2.speed.x = 0;
					break;

				case 40:
					if(racket2.speed.y > 0) racket2.speed.y = 0;
					break;


				case 65:
					if(racket1.speed.x < 0) racket1.speed.x = 0;
					break;

				case 87:
					if(racket1.speed.y < 0) racket1.speed.y = 0;
					break;

				case 68:
					if(racket1.speed.x > 0) racket1.speed.x = 0;
					break;

				case 83:
					if(racket1.speed.y > 0) racket1.speed.y = 0;
					break;
				
			}
		}) 


		document.addEventListener("click", event => {
			
			//______________________________________________________________________________________________	
			//PAUSE page
			if(game.gameState === game.GAMESTATE.PAUSED){
				if(
					event.pageX > game.pausePage.resumeBox.x 
					&& event.pageX < game.pausePage.resumeBox.x + game.pausePage.resumeBox.width + 20
					&& event.pageY > game.pausePage.resumeBox.y 
					&& event.pageY < game.pausePage.resumeBox.y + game.pausePage.resumeBox.height + 20
			  	){
					game.gameState = game.GAMESTATE.RUNNING;
				}

				else if(
					event.pageX > game.pausePage.newGameBox.x 
					&& event.pageX < game.pausePage.newGameBox.x + game.pausePage.newGameBox.width + 20
					&& event.pageY > game.pausePage.newGameBox.y 
					&& event.pageY < game.pausePage.newGameBox.y + game.pausePage.newGameBox.height + 20
			  	){
					racket1.score = 0;
					racket2.score = 0;

					game.ball.reset1();
					racket1.reset();
					racket2.reset();

					game.gameState = game.GAMESTATE.READY;
				}

				else if(
					event.pageX > game.backKey.x 
					&& event.pageX < game.backKey.x + game.backKey.width + 20
					&& event.pageY > game.backKey.y 
					&& event.pageY < game.backKey.y + game.backKey.height + 20
				){
					game.gameState = game.GAMESTATE.MENU;
					racket1.score = 0;
					racket2.score = 0;
				}
			}

			//__________________________________________________________________________________________________
			//MENU page
			else if(game.gameState === game.GAMESTATE.MENU){
				if(
					event.pageX > game.menu.playBox.x 
					&& event.pageX < game.menu.playBox.x + game.menu.playBox.width + 20
					&& event.pageY > game.menu.playBox.y 
					&& event.pageY < game.menu.playBox.y + game.menu.playBox.height + 20
			  	){
					game.gameState = game.GAMESTATE.READY;
					
				}
				else if(
					event.pageX > game.menu.controlBox.x 
					&& event.pageX < game.menu.controlBox.x + game.menu.controlBox.width + 20
					&& event.pageY > game.menu.controlBox.y 
					&& event.pageY < game.menu.controlBox.y + game.menu.controlBox.height + 20
			  	){
					game.gameState = game.GAMESTATE.CONTROLS;
				}

				else if(
					event.pageX > game.menu.howToPlayBox.x 
					&& event.pageX < game.menu.howToPlayBox.x + game.menu.howToPlayBox.width + 20
					&& event.pageY > game.menu.howToPlayBox.y 
					&& event.pageY < game.menu.howToPlayBox.y + game.menu.howToPlayBox.height + 20
			  	){
					game.gameState = game.GAMESTATE.HOW_TO_PLAY;
				}

				else if(
					event.pageX > game.menu.aboutBox.x 
					&& event.pageX < game.menu.aboutBox.x + game.menu.aboutBox.width + 20
					&& event.pageY > game.menu.aboutBox.y 
					&& event.pageY < game.menu.aboutBox.y + game.menu.aboutBox.height + 20
			  	){
					game.gameState = game.GAMESTATE.ABOUT;
				}
			}

			//__________________________________________________________________________________________________
			//CONTROLS page, HOW_TO_PLAY page, ABOUT page
			else if(game.gameState === game.GAMESTATE.CONTROLS || game.gameState === game.GAMESTATE.HOW_TO_PLAY || game.gameState === game.GAMESTATE.ABOUT){
				if(
					event.pageX > game.backKey.x 
					&& event.pageX < game.backKey.x + game.backKey.width + 20
					&& event.pageY > game.backKey.y 
					&& event.pageY < game.backKey.y + game.backKey.height + 20
			  	){
					game.gameState = game.GAMESTATE.MENU;
				}
			}

			//_______________________________________________________________________________________________
			//VICTORY page
			else if(game.gameState === game.GAMESTATE.GAMEOVER){
				if(
					event.pageX > game.backKey.x 
					&& event.pageX < game.backKey.x + game.backKey.width + 20
					&& event.pageY > game.backKey.y 
					&& event.pageY < game.backKey.y + game.backKey.height + 20
				){
					game.gameState = game.GAMESTATE.MENU;
				}
			}
		})

	}
}