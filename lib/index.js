var Game = require('./Game.js');
var SlitheringSnake = require('./SlitheringSnake.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
const newGame = new Game();
//put a snake on the canvas
var slitheringSnake = newGame.makeStartingSnake(context);
// have eventlisteners
window.addEventListener('keydown', function (event){
  if (event.defaultPrevented) {
    // Do nothing if the event was already processed
    return; 
  }
  switch (event.key) {
    case "ArrowDown":
      slitheringSnake.redrawDown(canvas);
      break;
    case "ArrowUp":
      slitheringSnake.redrawUp(canvas);
      break;
    case "ArrowLeft":
      slitheringSnake.redrawLeft(canvas)
      break;
    case "ArrowRight":
      slitheringSnake.redrawRight(canvas)
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }
// Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);


//put mice in the Game.food array
// draw a mouse on the canvas

// canvas.addEventListener('click', moveSnake);
// function moveSnake() {
//   newGame.makeSnakeMove(context, slitheringSnake)
//   console.log(slitheringSnake.snake)
//   slitheringSnake.draw(context)
// }
// function growSnake() {
//   let block = new Block(300, 300);
//   let block2 = new Block(400, 400);
//   slitheringSnake.snake.push(block);
//   slitheringSnake.snake.push(block2);
// }
// slitheringSnake.snakeEatsAndGrows(context);
// console.log(slitheringSnake.snake.length)
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
  var mouse = newGame.makeMice(context)

  // newGame.snakeWallCollision(slitheringSnake, canvas)

  slitheringSnake.redrawRight(canvas)

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

