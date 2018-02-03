var SlitheringSnake = require('./SlitheringSnake.js');

class Game {
  constructor() {
    this.score = 0;
    this.done = false;
    this.needNewGame = false;
    this.fps = 8;
  }

  makeStartingSnake(context) {
    var newSnake = new SlitheringSnake();

    newSnake.startingSnake();
    newSnake.draw(context);
    return newSnake;
  }

  endGame(idVariable) {
    if (idVariable.style.display === 'none') {
      idVariable.style.display = 'block';
      this.done = true;
    } else {
      idVariable.style.display = 'none';
    }
  } 
}

module.exports = Game;
