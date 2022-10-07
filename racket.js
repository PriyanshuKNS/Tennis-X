
class Racket1 {
	constructor(game){
		this.image = document.getElementById("img_racket1");

		//Dimensions of Racket1
		this.width = 40;
		this.height = 150;

		//Parameters of motion of racket1
		this.position = {
			x : game.sideMargin,
			y : game.gameHeight/2 - this.height/2
		}

		this.speed = {
			x : 0,
			y : 0
		};
		this.maxspeed = {
			x : 7,
			y : 7
		}

		this.game = game;

		//Score of player 1
		this.score = 0;

	}


	draw(ctx){
		ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}

	update(deltaTime){
		//Updating the position of racket
		this.position.x += this.speed.x;
		this.position.y += this.speed.y;

		//Lower line
		if(this.position.y + this.height >= this.game.gameHeight){
			this.position.y = this.game.gameHeight - this.height;
		}

		//Upper line
		if(this.position.y < 0){
			this.position.y = 0;
		}

		//Left line
		if(this.position.x < 0){
			this.position.x = 0;
		}

		//Net
		if(this.position.x + this.width > this.game.gameWidth/2){
			this.position.x = this.game.gameWidth/2 - this.width;
		}
	}

	reset(){
		this.position = {
			x : game.sideMargin,
			y : game.gameHeight/2 - this.height/2
		};

		this.speed = {
			x : 0,
			y : 0
		};
	}

	moveLeft(){
		this.speed.x = -this.maxspeed.x;
	}
	moveRight(){
		this.speed.x = this.maxspeed.x;
	}
	moveUp(){
		this.speed.y = -this.maxspeed.y;
	}
	moveDown(){
		this.speed.y = this.maxspeed.y;
	}
}

class Racket2 {
	constructor(game){
		this.image = document.getElementById("img_racket2");

		//Dimensions of Racket2
		this.width = 40;
		this.height = 150;

		//Parameters of motion of racket1
		this.position = {
			x :  game.gameWidth - game.sideMargin - 100,
			y : game.gameHeight/2 - this.height/2
		};

		this.speed = {
			x : 0,
			y : 0
		};
		this.maxspeed = {
			x : 7,
			y : 7
		};

		this.game = game;

		//Score of player 2
		this.score = 0;

	}


	draw(ctx){
		ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}

	update(deltaTime){
		//Updating the position of racket
		this.position.x += this.speed.x;
		this.position.y += this.speed.y;

		//Lower line
		if(this.position.y + this.height >= this.game.gameHeight){
			this.position.y = this.game.gameHeight - this.height;
		}

		//Upper line
		if(this.position.y < 0){
			this.position.y = 0;
		}

		//Right line
		if(this.position.x + this.width > this.game.gameWidth){
			this.position.x = this.game.gameWidth - this.width;
		}

		//Net
		if(this.position.x < this.game.gameWidth/2){
			this.position.x = this.game.gameWidth/2;
		}
	}

	reset(){
		this.position = {
			x :  game.gameWidth - game.sideMargin - 100,
			y : game.gameHeight/2 - this.height/2
		};

		this.speed = {
			x : 0,
			y : 0
		};
	}

	moveLeft(){
		this.speed.x = -this.maxspeed.x;
	}
	moveRight(){
		this.speed.x = this.maxspeed.x;
	}
	moveUp(){
		this.speed.y = -this.maxspeed.y;
	}
	moveDown(){
		this.speed.y = this.maxspeed.y;
	}
}

