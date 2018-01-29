var Game = require('./Game.js');
// var SlitheringSnake = require('./SlitheringSnake.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
const newGame = new Game();
//put a snake on the canvas
var ss = newGame.makeStartingSnake(context);

newGame.makeMouse(context, ss);
// var snakeSize = 10; 
// var w = 500;
// var h = 500;
// var score = 0;
// var snakeSize = ss.snake.length;

// var gameScore = newGame.scoreText(context, h);

// have eventlisteners

var snakeX = ss.snake[0].x;
var snakeY = ss.snake[0].y; 
    
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  var tailToHead = ss.snake.pop();

  switch (event.key) {
  case "ArrowDown":
    tailToHead.y = snakeY += 10;
    tailToHead.x = snakeX;
    break;
  case "ArrowUp":
    tailToHead.y = snakeY -= 10;
    tailToHead.x = snakeX;
    break;
  case "ArrowLeft":
    tailToHead.x = snakeX -= 10;
    tailToHead.y = snakeY;
    break;
  case "ArrowRight":
    tailToHead.x = snakeX += 10
    tailToHead.y = snakeY;
    break;
  default:
    return; // Quit when this doesn't handle the key event.
  }
  ss.snake.unshift(tailToHead);
  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

// ss.snakeEatsAndGrows(context);

//Disable the button _start_ while you're playing.

var startTime = -1;
var animationLength = 2000; // Animation length in milliseconds

function gameLoop(timestamp) { 
  context.clearRect(0, 0, canvas.width, canvas.height)
  newGame.mice.forEach(function(mouse) {
    mouse.draw(context);
  });

  var mouseX = newGame.mice[0].x
  var mouseY = newGame.mice[0].y
  

  ss.draw(context);
  snakeX = ss.snake[0].x;
  snakeY = ss.snake[0].y;
  var circle1 = {radius: 5, x: mouseX, y: mouseY};
  var circle2 = {radius: 5, x: snakeX, y: snakeY};
  var cannibal = ss.checkCanibalCollision(snakeX, snakeY, ss.snake)
  var concussed = ss.checkWallCollision(snakeX, snakeY, canvas)
  var eat = ss.eatAndGrow(circle1, circle2, canvas, ss)

  if (eat === true) {
    newGame.mice.pop();
    newGame.makeMouse(context, ss);
    eat = false;
  }

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

  // Calculate animation progress
  var progress = 0;

  if (startTime < 0) {
    startTime = timestamp;
  } else {
    progress = timestamp - startTime;
  }


  if (progress < animationLength) {
  }
 
}

gameLoop();

