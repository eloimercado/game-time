var Block = require('./Block.js');

class Snake {
	constructor(x = 250, y = 250) {
    this.snake = [];
	}
  
  startingSnake() {
  	var block1 = new Block(250, 250);
    var block2 = new Block(240, 250);
    var block3 = new Block(230, 250);

    this.snake.push(block1)
    this.snake.push(block2)
    this.snake.push(block3)
  }



  draw(context) {
  	this.snake.forEach((itemInSnakeArr) => {
    itemInSnakeArr.draw(context);
}); 
  	

  }

  update(context) {
  	this.draw(context)
  }

}

module.exports = Snake;