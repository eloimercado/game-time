var Snake = require('./Snake.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var snake = new Snake(250, 250, 10, 10);
// var block2 = new Snake(150, 150, 10, 10);

var blocks = [snake];

var oldTime = Date.now();
var fps = 160;
var second = 1000;

function gameLoop () {
  var duration = Date.now() - oldTime;

  // if (duration > second / fps) {
  //   oldTime = Date.now();

  //   blocks.forEach( function (block) {

  //     //is block x less than the border
  //       block.erase(context).draw(context);
       
  //   } )  
  // }
  context.clearRect(0, 0, canvas.width, canvas.height)
  snake.draw(context);
  // draw next animation frame
  requestAnimationFrame(gameLoop);  
}

// draw first animation frame
requestAnimationFrame(gameLoop);

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "ArrowDown":
      // Do something for "down arrow" key press.
      snake.moveDown(); 
      break;
    case "ArrowUp":
      // Do something for "up arrow" key press.
      snake.moveUp();
      break;
    case "ArrowLeft":
      // Do something for "left arrow" key press.
      snake.moveLeft();
      break;
    case "ArrowRight":
      // Do something for "right arrow" key press.
      snake.moveRight();
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);