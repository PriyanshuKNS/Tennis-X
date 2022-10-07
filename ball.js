class Ball {

	//Constructor function is called everytime a variable of given class is created. Useful for initializing variables and calling funcitons.
	constructor(game){
		this.image = document.getElementById("img_ball");
		this.game = game;
		this.maxSpeed = {
			x : game.maxBallSpeed,
			y : game.maxBallSpeed
		};

		this.position = {
			x : 10,
			y : 10
		};

		this.speed = {
			x : game.maxBallSpeed,
			y : game.maxBallSpeed
		};

		this.size = 16;
	}

	
	reset1(){
		this.position = {
			x : 10,
			y : 10
		};

		this.speed = {
			x : game.maxBallSpeed,
			y : game.maxBallSpeed
		};
	}

	reset2(){
		this.position = {
			x : 900,
			y : 10
		};

		this.speed = {
			x : -game.maxBallSpeed,
			y : game.maxBallSpeed
		};
	}

	
	update(deltaTime){
		this.position.x += this.speed.x;
		this.position.y += this.speed.y;

		//Wall on left
		if(this.position.x < 0){
			this.game.racket2.score++;
			this.reset2();
			this.game.racket1.reset();
			this.game.racket2.reset();

			if(this.game.racket1.score < 20){	
				this.game.gameState = this.game.GAMESTATE.RIGHT_VICTORY;
			}
			
			if(this.game.racket2.score === 20){
				
				this.game.gameState = this.game.GAMESTATE.GAMEOVER;
			}
		}

		//Wall on right
		if(this.position.x + this.size > this.game.gameWidth){
			this.game.racket1.score++;
			this.reset1();
			this.game.racket1.reset();
			this.game.racket2.reset();

			if(this.game.racket1.score < 20){	
				this.game.gameState = this.game.GAMESTATE.LEFT_VICTORY;
			}

			if(this.game.racket1.score === 20){
				
				this.game.gameState = this.game.GAMESTATE.GAMEOVER;
			}
		}
		

		//Wall on top
		if(this.position.y < 0 )
			this.speed.y = -this.speed.y;

		//Wall on bottom
		if(this.position.y + this.size> game.gameHeight){
			this.speed.y = -this.speed.y;
			this.position.y = game.gameHeight - this.size;
		}

		manageCollision(this, this.game.racket1, game);

		manageCollision(this, this.game.racket2, game);
		
	}

	draw(ctx){
		ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
	}

}