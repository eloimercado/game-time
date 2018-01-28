var Game = require('./Game.js');
var SlitheringSnake = require('./SlitheringSnake.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
const newGame = new Game();
//put a snake on the canvas
var slitheringSnake = newGame.makeStartingSnake(context);
var snakeSize = 10; 
var w = 500;
var h = 500;
var score = 0;
var snakeSize = slitheringSnake.snake.length;

var gameScore = newGame.scoreText(context, h);

// have eventlisteners

var snakeX = slith.snake[0].x;
var snakeY = slith.snake[0].y; 
    
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  var tailToHead = slith.snake.pop();
  switch (event.key) {
    case "ArrowDown":
      tailToHead.y = snakeY+=10;
      break;
    case "ArrowUp":
      tailToHead.y = snakeY-=10;
      break;
    case "ArrowLeft":
      tailToHead.x = snakeX-=10;
      break;
    case "ArrowRight":
        tailToHead.x = snakeX+=10
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }
  slith.snake.unshift(tailToHead);
  console.log(slith.snake)
  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

// slitheringSnake.snakeEatsAndGrows(context);

//Disable the button _start_ while you're playing.

var startTime = -1;
var animationLength = 2000; // Animation length in milliseconds
/********************************************************************************************************************************/
/* gameLoop is the rendering function*/
function gameLoop(timestamp) { 
//put new food on the canvas when collision happens
  // newGame.food.forEach(itemInFood, i, newGame.food) => {
  //   itemInFood.draw(context)
  // }

  context.clearRect(0, 0, canvas.width, canvas.height)
  // newGame.makeSnakeMoveRight(context,slitheringSnake)
  slitheringSnake.draw(context)
  var mouse = newGame.makeMouse(context, slitheringSnake)

  // newGame.snakeWallCollision(slitheringSnake, canvas)


  //listen for arrow key to make snake begin moving and redraw until event to change direction or end game
// function redraw() {
//   drawPending = false;
//   // Do drawing ...
//   newGame.makeSnakeMove(context)
// }

// var drawPending = false;
// function requestRedraw() {
//   if (!drawPending) {
//     drawPending = true;
//     requestAnimationFrame(redraw);
//   }
// }

  requestAnimationFrame(gameLoop); 

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
}
  /* Tell the browser to 1. perform an animation and 2. call a specified function to the animation before the next redraw. The method takes as an argument - a callback function to be invoked before the redraw. Will only be called once, except we keep calling it from our gameLoop rendering function.
*/
}
/*************************************************************************************************************** */

//call game method that starts gameloop
gameLoop();

