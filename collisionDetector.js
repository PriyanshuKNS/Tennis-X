function manageCollision(ball, racket, game){
	
	//Dimensions of ball
	let topBall = ball.position.y;
	let bottomBall = ball.position.y + ball.size;
	let leftBall = ball.position.x;
	let rightBall = ball.position.x + ball.size;


	//Dimensions of racket
	let topRacket = racket.position.y;
	let bottomRacket = racket.position.y + racket.height;
	let leftRacket = racket.position.x;
	let rightRacket = racket.position.x + racket.width;

	//Case 1: ball strikes from Top
	if(bottomBall > topRacket && topBall < topRacket && rightBall > leftRacket && leftBall < rightRacket){
		ball.speed.y = -ball.speed.y;
		ball.position.y = topRacket - ball.size;
		
	}

	//Case 2: ball strikes from Bottom
	else if(topBall < bottomRacket && bottomBall > bottomRacket && rightBall > leftRacket && leftBall < rightRacket){
		ball.speed.y = -ball.speed.y;
		ball.position.y = bottomRacket;
		
	}

	//Case 3: ball strikes from left
	else if(rightBall > leftRacket && leftBall < leftRacket && bottomBall > topRacket && topBall < bottomRacket){
		ball.speed.x = -5 + racket.speed.x;
		ball.position.x = leftRacket - ball.size;
		
	}

	//Case 4: ball strikes from right
	else if(leftBall < rightRacket && rightBall > rightRacket && bottomBall > topRacket && topBall < bottomRacket){
		ball.speed.x = 5 + racket.speed.x;
		ball.position.x = rightRacket;
		
	}

}