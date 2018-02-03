var Block = require('./Block.js');

class Mouse {
  constructor(x, y) {
    this.mice = [];
    this.x = x;
    this.y = y;
  }

  makeMouse(context, slitheringSnake) {
    var mouse = new Block( 20 + Math.floor((Math.random() * 470) + 1),
      20 + Math.floor((Math.random() * 470) + 1), '#FFFFFF');

    for (var i = 0; i > slitheringSnake.snake.length; i++) {
      var snakeX = slitheringSnake.snake[i].x;
      var snakeY = slitheringSnake.snake[i].y;

      if (mouse.x === snakeX || mouse.y === snakeY || 
          mouse.y === snakeY && mouse.x === snakeX) {
        mouse.x = 25 + Math.floor((Math.random() * 460) + 2);
        mouse.y = 25 + Math.floor((Math.random() * 460) + 2);
      }
    }
    mouse.draw(context);
    this.mice.push(mouse)
  }
}

module.exports = Mouse;