var Game = require('./Game.js');

/* The Canvas API supports a number of different contexts for drawing on it; we’ll be using the basic two-dimensional context.
*/
//get canvas and ctx and pass down
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
//const Game = new Gameboard(pass whatever you need)
//want to call your Game class and start the game
const newGame = new Game()

newGame.makeStartingSnake(context)
newGame.makeFood()

var startTime = -1;
var animationLength = 2000; // Animation length in milliseconds
/* gameLoop is our rendering function*/
function gameLoop(timestamp) {
  newGame.food.forEach(function(block) {
    block.draw(context)
  })
  
  //listen for arrow key, make snake begin moving

  newGame.snakeEatsAndGrows()
  // Calculate animation progress
  var progress = 0;

  if (startTime < 0) {
      startTime = timestamp;
  } else {
      progress = timestamp - startTime;
  }

  // Do animation ...

  if (progress < animationLength) {
        requestAnimationFrame(gameLoop); 
}


  /* Tell the browser to 1. perform an animation and 2. call a specified function to the animation before the next redraw. The method takes as an argument - a callback function to be invoked before the redraw. Will only be called once, except we keep calling it from our gameLoop rendering function.
*/
}
//call game method that starts gameloop
gameLoop();

//have eventlisteners
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "ArrowDown":
      // Do something for "down arrow" key press.
      snake.makeSnakeMove(); 
      break;
    case "ArrowUp":
      // Do something for "up arrow" key press.
      snake.makeSnakeMove();
      break;
    case "ArrowLeft":
      // Do something for "left arrow" key press.
      snake.makeSnakeMove();
      break;
    case "ArrowRight":
      // Do something for "right arrow" key press.
      snake.makeSnakeMove();
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

// Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);