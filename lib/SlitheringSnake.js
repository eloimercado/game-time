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
    for (var i = 1; i < snakeArray.length; i++) {
      switch ((snakeArray[i].x === x) && (snakeArray[i].y === y)) {
      case true:
        return true;
        // break;
      case false:
        return false;
        // break;
      default:
        return; // Quit when this doesn't handle the key event.
      }
    }
  }

  checkWallCollision(x, y, canvas) { 
    // right side, left side, top, bottom
    switch ((x + 10 >= canvas.width) || (x - 1 <= 0) || (y - 1 <= 0) || (y + 10 >= canvas.height)) {
    case true:
      // var collide = (slitheringSnake.snake[0].x + 10 >= canvas.width)
      // slitheringSnake.redraw(canvas)
      return true;
      // break;
    case false:
      return false;
      // break;
    default:
      return; // Quit when this doesn't handle the key event.
    }
  }

  eatAndGrow(circle1, circle2, canvas, ss) { 
    var dx = circle1.x - circle2.x;
    var dy = circle1.y - circle2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    switch (distance < circle1.radius + circle2.radius) {
    case true:
      ss.snake.push(new Block(ss.snake[0].x, ss.snake[0].y))
      return true;
      // break;
    case false:
      return false;
      // break;
    default:
      return; // Quit when this doesn't handle the key event.
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
