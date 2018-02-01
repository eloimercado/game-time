var Game = require('./Game.js');
// var SlitheringSnake = require('./SlitheringSnake.js');


var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var newGame = new Game();

document.getElementById('btn').addEventListener('click', (event) => {
  event.preventDefault();
  newGame.needNewGame = true;
});
var ss = newGame.makeStartingSnake(context);

ss.establishOrientation(ss)

newGame.makeMouse(context, ss);
 
var idVariable = document.getElementById('game-over');
var snakeX = ss.snake[0].x;
var snakeY = ss.snake[0].y; 
    
function changeDirection (event) {
  if (event.defaultPrevented) {
    return; 
  }
  // up: 38, down: 40, right: 39, left: 37
  if ((ss.orientation !== 'left') && event.key === 'ArrowRight') {
    var tailToHead = ss.snake.pop();

    tailToHead.x = snakeX += 10;
    tailToHead.y = snakeY;
    ss.snake.unshift(tailToHead);
    ss.orientation = 'right';
  } else if ((ss.orientation !== 'right') && event.key === 'ArrowLeft') {
    tailToHead = ss.snake.pop();

    tailToHead.x = snakeX -= 10;
    tailToHead.y = snakeY;
    ss.snake.unshift(tailToHead);
    ss.orientation = 'left';
  } else if ((ss.orientation !== 'down') && event.key === 'ArrowUp') {
    tailToHead = ss.snake.pop();

    tailToHead.x = snakeX;
    tailToHead.y = snakeY -= 10;
    ss.snake.unshift(tailToHead);
    ss.orientation = 'up';
  } else if ((ss.orientation !== 'up') && event.key === 'ArrowDown') {
    tailToHead = ss.snake.pop();

    tailToHead.x = snakeX;
    tailToHead.y = snakeY += 10;
    ss.snake.unshift(tailToHead);
    ss.orientation = 'down';
  } else {
  } 

  event.preventDefault();
}

function moveAutomatically () {
  if (newGame.done === false) {
  // up: 38, down: 40, right: 39, left: 37
    if ((ss.orientation === 'right')) {
      var tailToHead = ss.snake.pop();

      tailToHead.x = snakeX += 10;
      tailToHead.y = snakeY;
      ss.snake.unshift(tailToHead);
    } else if ((ss.orientation === 'left')) {
      tailToHead = ss.snake.pop();

      tailToHead.x = snakeX -= 10;
      tailToHead.y = snakeY;
      ss.snake.unshift(tailToHead);
    } else if ((ss.orientation === 'up')) {
      tailToHead = ss.snake.pop();

      tailToHead.x = snakeX;
      tailToHead.y = snakeY -= 10;
      ss.snake.unshift(tailToHead);
    } else if ((ss.orientation === 'down')) {
      tailToHead = ss.snake.pop();

      tailToHead.x = snakeX;
      tailToHead.y = snakeY += 10;
      ss.snake.unshift(tailToHead);
    } else {
      return;
    } 
  }
}



function gameLoop() { 
  if (newGame.done === true) {
    return;
  }

  if (newGame.needNewGame === true) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    newGame.mice.forEach(function(mouse) {
      mouse.draw(context);
    });
    var mouseX = newGame.mice[0].x
    var mouseY = newGame.mice[0].y

    ss.draw(context);
    snakeX = ss.snake[0].x;
    snakeY = ss.snake[0].y;
    ss.establishOrientation(ss)
    var circle1 = {radius: 5, x: mouseX, y: mouseY};
    var circle2 = {radius: 5, x: snakeX, y: snakeY};
    var cannibal = ss.checkCanibalCollision(snakeX, snakeY, ss.snake)
    var concussed = ss.checkWallCollision(snakeX, snakeY, canvas)
    var eat = ss.eatAndGrow(circle1, circle2, canvas, ss)
    var score = ss.snake.length - 5

    if (eat === true) {
      newGame.mice.pop();
      newGame.makeMouse(context, ss);
      eat = false;
    }

    if (cannibal === true) {
      newGame.endGame(idVariable);
    }

    if (concussed === true) {
      newGame.endGame(idVariable);
    }
    window.addEventListener('keydown', changeDirection, true);
    moveAutomatically();
    context.fillText("Score: " + score, 8, 20);
  }
 
  setTimeout(function() {
    requestAnimationFrame(gameLoop);
  }, 1000 / newGame.fps);
}

requestAnimationFrame(gameLoop); 


// document.getElementById('btn-level1').addEventListener('click', startGame());

