var Block = require('./Block.js');
var SlitheringSnake = require('./SlitheringSnake.js');

class Game {
  constructor() {
    this.food = [];
  }

  makeStartingSnake(context) {
    var newSnake = new SlitheringSnake();
    newSnake.startingSnake();
    newSnake.draw(context);
    return newSnake;
  }

  makeMice(context) {
    var mouse1 = new Block(20, 20, 'cornsilk')
    var mouse2 = new Block(20,20, 'cornsilk')
    mouse1.draw(context);
    this.food.push(mouse1)
    this.food.push(mouse2) 
  }

  makeSnakeMoveRight(context,slitheringSnake) {
  	slitheringSnake.redrawRight(context)
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
