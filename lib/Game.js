var Block = require('./Block.js');
var Snake = require('./Snake.js');


class Game {
  constructor() {
    this.food = [];
    
    // this.dx = 1.5;
    // this.dy = 1.5;
  }


  makeStartingSnake(context) {
  	// console.log("here is my snake: ", Snake)
    var newSnake = new Snake();
    newSnake.startingSnake();
    newSnake.update(context);
  }

  makeFood() {
    var snakeFood = new Block(20, 20, 'cornsilk')
    this.food.push(snakeFood)
  }

  makeSnakeMove() {
  	
  }

  snakeEatsAndGrows() {
  	
  }



  

  




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
