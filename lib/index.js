var Game = require('./Game.js');

/* The Canvas API supports a number of different contexts for drawing on it; we’ll be using the basic two-dimensional context.
*/
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var newGame = new Game()

newGame.makeStartingSnake(context)
newGame.makeFood()
/* gameLoop is our rendering function*/
function gameLoop() {

  // console.log('hi')



  newGame.food.forEach(function(block) {
    block.draw(context)
  })


  /* Tell the browser to 1. perform an animation and 2. call a specified function to the animation before the next redraw. The method takes as an argument - a callback function to be invoked before the redraw. Will only be called once, except we keep calling it from our gameLoop rendering function.
*/
  requestAnimationFrame(gameLoop); 
}

gameLoop();

// var oldTime = Date.now();
// var fps = 160;
// var second = 1000;


//have eventlisteners
//get canvas and ctx and pass down
//want to call your gamdBoard class and start the game


//const Game = new Gameboard(pass whatever you need)

//call gameboard method that starts gameloop


// window.addEventListener("keydown", function (event) {
//   if (event.defaultPrevented) {
//     return; // Do nothing if the event was already processed
//   }

//   switch (event.key) {
//     case "ArrowDown":
//       // Do something for "down arrow" key press.
//       snake.moveDown(); 
//       break;
//     case "ArrowUp":
//       // Do something for "up arrow" key press.
//       snake.moveUp();
//       break;
//     case "ArrowLeft":
//       // Do something for "left arrow" key press.
//       snake.moveLeft();
//       break;
//     case "ArrowRight":
//       // Do something for "right arrow" key press.
//       snake.moveRight();
//       break;
//     default:
//       return; // Quit when this doesn't handle the key event.
//   }

// Cancel the default action to avoid it being handled twice
//   event.preventDefault();
// }, true);