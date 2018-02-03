var Block = require('./Block.js');

class SlitheringSnake {
  constructor(x = 250, y = 250, orientation = 'right') {
    this.snake = [];
    this.speed = 3;
    this.x = x;
    this.y = y;
    this.orientation = orientation;
  }
  
  startingSnake() {
    var length = 5;

    for (var i = 0; i < length; i++) {
      this.snake.push(new Block(250 - (i + 1) * 10, 250))
    }
  }

  checkCanibalCollision(x, y, snakeArray) {
    var endOfSnake = snakeArray.slice(4) 
    var snakeBite;
      
    snakeBite = function(block) {

      return (x === block.x && y === block.y);
    };  
    return endOfSnake.some(snakeBite);
  }

  checkWallCollision(x, y, canvas) { 
    switch ((x + 10 >= canvas.width) || (x - 1 <= 0) || (y - 1 <= 0) || (y + 10 >= canvas.height)) {
    case true:
      return true;
    case false:
      return false;
    default:
      return;
    }
  }

  eatAndGrow(circle1, circle2, canvas, ss) { 
    var dx = circle1.x - circle2.x;
    var dy = circle1.y - circle2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    let snakeIndexMinus1 = ss.snake.length - 1;
    let newXcoord = ss.snake[snakeIndexMinus1].x;
    let newYcoord = ss.snake[snakeIndexMinus1].y;

    switch (distance < circle1.radius + circle2.radius) {
    case true:
      if (this.orientation === 'right') {
        ss.snake.push(new Block(ss.snake[snakeIndexMinus1].x - 10, newYcoord))
      } else if (this.orientation === 'left') {
        ss.snake.push(new Block(ss.snake[snakeIndexMinus1].x + 10, newYcoord))
      } else if (this.orientation === 'up') {
        ss.snake.push(new Block(newXcoord, ss.snake[snakeIndexMinus1].y + 10))
      } else {
        ss.snake.push(new Block(newXcoord, ss.snake[snakeIndexMinus1].y - 10))
      }
      return true;
    case false:
      return false;
    default:
      return; 
    }
  }
  
  draw(context) {
    this.snake.forEach((itemInSnakeArr) => {
      itemInSnakeArr.draw(context);
    }
    )
  } 

  establishOrientation(ss) {
    if (ss.snake[1].x + 10 === ss.snake[0].x) {
      this.orientation = 'right';
    } else if (ss.snake[1].y - 10  === ss.snake[0].y) {
      this.orientation = 'up';
    } else if (ss.snake[1].x - 10 === ss.snake[0].x) {
      this.orientation = 'left';
    } else {
      this.orientation = 'down';
    }
  }
}

module.exports = SlitheringSnake;
