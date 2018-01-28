var Block = require('./Block.js');

class SlitheringSnake {
	constructor(x = 250, y = 250) {
    this.snake = [];
    this.speed = 3;
    this.x = x
    this.y = y
	}
  
  startingSnake() {
    var length = 4;
    for(var i=0; i<length; i++){
      this.snake.push(new Block(250-(i+1)*10, 250))
    }
    }

  checkCanibalCollision(x, y, snakeArray) {
        for(var i = 0; i < snakeArray.length; i++) {
            if(snakeArray[i].x === x && snakeArray[i].y === y)
            return true;
        } 
        return false;
    }

  draw(context) {
  	  	this.snake.forEach((itemInSnakeArr, i, snakeArr) => {
  	    itemInSnakeArr.draw(context);
  	      // console.log(snakeArr)
  	    }
  	)}  	
   //need to prohibit left key 
  redrawRight(canvas) {
    if(this.snake[0].x + 10 >= 500) {
      console.log('stop right')
       } else {
          let head = new Block(this.snake[0].x + this.speed, this.snake[0].y)
        
        this.snake.pop();
        this.snake.unshift(head);
       }
    }

    redrawUp(canvas) {
    if(this.snake[0].y + 10 <= 0) {
      console.log('stop up')
       } else {
          let head = new Block(this.snake[0].x, this.snake[0].y - this.speed)
        
        this.snake.pop();
        this.snake.unshift(head);
       }
    }

    redrawDown(canvas) {
      if(this.snake[0].y >= 500) {
        console.log('stop down')
       } else {
          let head = new Block(this.snake[0].x, this.snake[0].y + this.speed)
        
        this.snake.pop();
        this.snake.unshift(head);
       }
    }

    redrawLeft(canvas) {
      if(this.snake[0].x <= 0) {
        console.log('stop left')
       } else {
          let head = new Block(this.snake[0].x - this.speed, this.snake[0].y)
        
        this.snake.pop();
        this.snake.unshift(head);
       }
    }

  eatAndGrow(context, slitheringSnake) {
  	let block = new Block(300, 300);
	  let block2 = new Block(400, 400);
	  slitheringSnake.snake.push(block);
	  slitheringSnake.snake.push(block2);
	  slitheringSnake.snake.draw(context);
  }

}


module.exports = SlitheringSnake;
