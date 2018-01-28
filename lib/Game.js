var Block = require('./Block.js');
var SlitheringSnake = require('./SlitheringSnake.js');

class Game {
  constructor() {
    this.food = [];
    this.score = 0
  }

  makeStartingSnake(context) {
    var newSnake = new SlitheringSnake();
    newSnake.startingSnake();
    newSnake.draw(context);
    return newSnake;
  }


  makeMouse(context, slitheringSnake) {
    var mouse = new Block(20+Math.floor((Math.random() *500) +1), 20+Math.floor((Math.random() * 500) + 1), 'cornsilk');
    //should not put food where the snake's body is
        for (var i=0; i>slitheringSnake.snake.length; i++) {
            var snakeX = slitheringSnake.snake[i].x;
            var snakeY = slitheringSnake.snake[i].y;
            
            if (mouse.x===snakeX || mouse.y === snakeY || mouse.y === snakeY && mouse.x===snakeX) {
                mouse.x = 20 + Math.floor((Math.random() * 500) + 1);
                mouse.y = 20 + Math.floor((Math.random() * 500) + 1);
            }
        }
        mouse.draw(context);
        this.food.push(mouse)
  }

  makeSnakeMoveRight(context,slitheringSnake) {
  	slitheringSnake.redrawRight(context)
  }

  scoreText(context, h) {
    // mice eaten by the snake
    var score_text = "Score: " + this.score;
    context.fillStyle = 'blue';
    context.fillText(score_text, 145, h-5);
}

  snakeEatsAndGrows(context,slitheringSnake) {
  	// slitheringSnake.eatAndGrow(context,slitheringSnake)
  }

  // snakeWallCollision(slitheringSnake, canvas) {
  //   // right side of snake / right side of canvas
  //   // console.log(slitheringSnake.snake[0].x + 10 >= canvas.width)
  //   // console.log(canvas.height)
  //   if((slitheringSnake.snake[0].x + 10 >= canvas.width && slitheringSnake.snake[0].x <= 0 )) {
  //         var collide = (slitheringSnake.snake[0].x + 10 >= canvas.width)    
  //         slitheringSnake.redraw(canvas)

  //   }

  // }

  // &&(slitheringSnake.snake[0].y + 10 >= canvas.height && slitheringSnake.snake[0].y <= 0 )



  

  




  // makeFood() {

  // }

  // let snake = new Snake(250, 250, 10, 10);


  // moveDown() {
  //   this.y = Math.floor(this.y + this.dy);
  //   console.log(this.y);
  // }

  // moveUp() {
  //   this.y = Math.floor(this.y - this.dy);
  // }

  // moveLeft() {
  //   this.x = Math.floor(this.x - this.dx);
  // }

  // moveRight() {
  //   this.x = Math.floor(this.x + this.dx);
  //   console.log(this.x)
  // }


  // erase(ctx) {
  //   ctx.clearRect(this.x, this.y, this.width, this.height);
  //   return this;
  // }
}

module.exports = Game;
