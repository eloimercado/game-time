var Block = require('./Block.js');
var SlitheringSnake = require('./SlitheringSnake.js');

class Game {
  constructor() {
    this.mice = [];
    this.score = 0;
    this.done = false;
  }

  makeStartingSnake(context) {
    var newSnake = new SlitheringSnake();

    newSnake.startingSnake();
    newSnake.draw(context);
    return newSnake;
  }


  makeMouse(context, slitheringSnake) {
    var mouse = new Block( 20 + Math.floor((Math.random() * 470) + 1), 20 + Math.floor((Math.random() * 470) + 1), 'cornsilk');

    for (var i = 0; i > slitheringSnake.snake.length; i++) {
      var snakeX = slitheringSnake.snake[i].x;
      var snakeY = slitheringSnake.snake[i].y;

      if (mouse.x === snakeX || mouse.y === snakeY || mouse.y === snakeY && mouse.x === snakeX) {
        mouse.x = 25 + Math.floor((Math.random() * 460) + 2);
        mouse.y = 25 + Math.floor((Math.random() * 460) + 2);
      }
    }
    mouse.draw(context);
    this.mice.push(mouse)
  }

  makeSnakeMoveRight(context, slitheringSnake) {
    slitheringSnake.redrawRight(context)
  }

  scoreText(context, h) {
    // mice eaten by the snake
    var score_text = "Score: " + this.score;

    context.fillStyle = 'blue';
    context.fillText(score_text, 145, h - 5);
  }

  endGame(idVariable) {
    if(idVariable.style.display === 'none') {
    idVariable.style.display = 'block';
    this.done = true;
    console.log(this.done);
  } else {
    idVariable.style.display = 'none';
  }
}
  




  // &&(slitheringSnake.snake[0].y + 10 >= canvas.height && slitheringSnake.snake[0].y <= 0 )



  // erase(ctx) {
  //   ctx.clearRect(this.x, this.y, this.width, this.height);
  //   return this;
  // }
}

module.exports = Game;
