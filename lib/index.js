var Game = require('./Game.js');
var Mouse = require('./Mouse.js');
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var newGame = new Game();
var mouse = new Mouse(null, null);
var ss = newGame.makeStartingSnake(context);
var idVariable = document.getElementById('game-over');
var snakeX = ss.snake[0].x;
var snakeY = ss.snake[0].y; 
var imageObj = new Image();


imageObj.onload = function() {
  context.drawImage(imageObj, 0, 0, 500, 500);
};
imageObj.src = 'https://techprolonged.com/wp-content/uploads/2017/03/Snake-for-Messenger-featured.jpg';

document.getElementById('btn').addEventListener('click', (event) => {
  event.preventDefault();
  newGame.needNewGame = true;
});

document.getElementById('new-game').addEventListener('click', (event) => {
  event.preventDefault();
  window.location.reload(true);
});

document.getElementById('make-hard').addEventListener('click', (event) => {
  event.preventDefault();
  newGame.needNewGame = true;
  newGame.fps = 16;
});

ss.establishOrientation(ss)

mouse.makeMouse(context, ss);
    
function changeDirection (event) {
  const right = (ss.orientation !== 'left') && event.key === 'ArrowRight'
  const left = (ss.orientation !== 'right') && event.key === 'ArrowLeft'
  const up = (ss.orientation !== 'down') && event.key === 'ArrowUp'
  const down = (ss.orientation !== 'up') && event.key === 'ArrowDown'
  
  if (right) {
    changeDirectionRight();
  } else if (left) {
    changeDirectionLeft()
  } else if (up) {
    changeDirectionUp()
  } else if (down) {
    changeDirectionDown()
    
  } else {
    return;
  } 
}

function changeDirectionRight() {
  var tailToHead = ss.snake.pop();

  tailToHead.x = snakeX += 10;
  tailToHead.y = snakeY;
  ss.snake.unshift(tailToHead);
  ss.orientation = 'right';
}

function changeDirectionLeft() {
  var tailToHead = ss.snake.pop();

  tailToHead.x = snakeX -= 10;
  tailToHead.y = snakeY;
  ss.snake.unshift(tailToHead);
  ss.orientation = 'left';
}

function changeDirectionUp() {
  var tailToHead = ss.snake.pop();

  tailToHead.x = snakeX;
  tailToHead.y = snakeY -= 10;
  ss.snake.unshift(tailToHead);
  ss.orientation = 'up'; 
}

function changeDirectionDown() {
  var tailToHead = ss.snake.pop();

  tailToHead.x = snakeX;
  tailToHead.y = snakeY += 10;
  ss.snake.unshift(tailToHead);
  ss.orientation = 'down'; 
}

function moveAutomatically () {
  var tailToHead = ss.snake.pop();
  
  ss.snake.unshift(tailToHead);
  
  if (newGame.done === false) {
    if ((ss.orientation === 'right')) {

      tailToHead.x = snakeX += 10;
      tailToHead.y = snakeY;
    } else if ((ss.orientation === 'left')) {

      tailToHead.x = snakeX -= 10;
      tailToHead.y = snakeY;
    } else if ((ss.orientation === 'up')) {

      tailToHead.x = snakeX;
      tailToHead.y = snakeY -= 10;
    } else if ((ss.orientation === 'down')) {

      tailToHead.x = snakeX;
      tailToHead.y = snakeY += 10;
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
    mouse.mice.forEach(function(mouse) {
      mouse.draw(context);
    });
    var mouseX = mouse.mice[0].x
    var mouseY = mouse.mice[0].y

    ss.draw(context);
    snakeX = ss.snake[0].x;
    snakeY = ss.snake[0].y;
    ss.establishOrientation(ss)
    var circle1 = {radius: 5, x: mouseX, y: mouseY};
    var circle2 = {radius: 5, x: snakeX, y: snakeY};
    var cannibal = ss.checkCanibalCollision(snakeX, snakeY, ss.snake);
    var concussed = ss.checkWallCollision(snakeX, snakeY, canvas);
    var eat = ss.eatAndGrow(circle1, circle2, canvas, ss);
    var score = ss.snake.length - 5;

    if (eat === true) {
      mouse.mice.pop();
      mouse.makeMouse(context, ss);
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
    context.fillStyle = '#003F87';
    context.font = '22px sans-serif';
    context.fillText("Score: " + score, 235, 25);
  }
 
  setTimeout(function() {
    requestAnimationFrame(gameLoop);
  }, 1000 / newGame.fps);
}

requestAnimationFrame(gameLoop); 

