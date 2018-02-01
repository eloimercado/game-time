/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Game = __webpack_require__(1);
	// var SlitheringSnake = require('./SlitheringSnake.js');
	
	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');
	var newGame = new Game();
	//put a snake on the canvas
	var ss = newGame.makeStartingSnake(context);
	
	ss.establishOrientation(ss);
	
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
	  // up: 38, down: 40, right: 39, left: 37
	  console.log(event.key);
	  if ((ss.orientation === 'right' || ss.orientation === 'up' || ss.orientation === 'down') && event.key === 'ArrowRight') {
	    var tailToHead = ss.snake.pop();
	
	    tailToHead.x = snakeX += 10;
	    tailToHead.y = snakeY;
	    ss.snake.unshift(tailToHead);
	  } else if ((ss.orientation === 'left' || ss.orientation === 'up' || ss.orientation === 'down') && event.key === 'ArrowLeft') {
	    tailToHead = ss.snake.pop();
	
	    tailToHead.x = snakeX -= 10;
	    tailToHead.y = snakeY;
	    ss.snake.unshift(tailToHead);
	  } else if ((ss.orientation === 'up' || ss.orientation === 'left' || ss.orientation === 'right') && event.key === 'ArrowUp') {
	    tailToHead = ss.snake.pop();
	
	    tailToHead.x = snakeX;
	    tailToHead.y = snakeY -= 10;
	    ss.snake.unshift(tailToHead);
	  } else if ((ss.orientation === 'down' || ss.orientation === 'left' || ss.orientation === 'right') && event.key === 'ArrowDown') {
	    tailToHead = ss.snake.pop();
	
	    tailToHead.x = snakeX;
	    tailToHead.y = snakeY += 10;
	    ss.snake.unshift(tailToHead);
	  } else {
	    console.log('no change in direction');
	  }
	  // Cancel the default action to avoid it being handled twice
	  event.preventDefault();
	}, true);
	
	// ss.snakeEatsAndGrows(context);
	
	//Disable the button _start_ while you're playing.
	
	var startTime = -1;
	var animationLength = 2000; // Animation length in milliseconds
	
	function gameLoop(timestamp) {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  newGame.mice.forEach(function (mouse) {
	    mouse.draw(context);
	  });
	
	  var mouseX = newGame.mice[0].x;
	  var mouseY = newGame.mice[0].y;
	
	  ss.draw(context);
	  snakeX = ss.snake[0].x;
	  snakeY = ss.snake[0].y;
	  ss.establishOrientation(ss);
	  var circle1 = { radius: 5, x: mouseX, y: mouseY };
	  var circle2 = { radius: 5, x: snakeX, y: snakeY };
	  var cannibal = ss.checkCanibalCollision(snakeX, snakeY, ss.snake);
	  var concussed = ss.checkWallCollision(snakeX, snakeY, canvas);
	  var eat = ss.eatAndGrow(circle1, circle2, canvas, ss);
	
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
	
	  if (progress < animationLength) {}
	}
	
	gameLoop();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Block = __webpack_require__(2);
	var SlitheringSnake = __webpack_require__(3);
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.mice = [];
	    this.score = 0;
	  }
	
	  _createClass(Game, [{
	    key: 'makeStartingSnake',
	    value: function makeStartingSnake(context) {
	      var newSnake = new SlitheringSnake();
	
	      newSnake.startingSnake();
	      newSnake.draw(context);
	      return newSnake;
	    }
	  }, {
	    key: 'makeMouse',
	    value: function makeMouse(context, slitheringSnake) {
	      var mouse = new Block(20 + Math.floor(Math.random() * 470 + 1), 20 + Math.floor(Math.random() * 470 + 1), 'cornsilk');
	
	      for (var i = 0; i > slitheringSnake.snake.length; i++) {
	        var snakeX = slitheringSnake.snake[i].x;
	        var snakeY = slitheringSnake.snake[i].y;
	
	        if (mouse.x === snakeX || mouse.y === snakeY || mouse.y === snakeY && mouse.x === snakeX) {
	          mouse.x = 25 + Math.floor(Math.random() * 460 + 2);
	          mouse.y = 25 + Math.floor(Math.random() * 460 + 2);
	        }
	      }
	      mouse.draw(context);
	      this.mice.push(mouse);
	    }
	  }, {
	    key: 'makeSnakeMoveRight',
	    value: function makeSnakeMoveRight(context, slitheringSnake) {
	      slitheringSnake.redrawRight(context);
	    }
	  }, {
	    key: 'scoreText',
	    value: function scoreText(context, h) {
	      // mice eaten by the snake
	      var score_text = "Score: " + this.score;
	
	      context.fillStyle = 'blue';
	      context.fillText(score_text, 145, h - 5);
	    }
	
	    // &&(slitheringSnake.snake[0].y + 10 >= canvas.height && slitheringSnake.snake[0].y <= 0 )
	
	
	    // erase(ctx) {
	    //   ctx.clearRect(this.x, this.y, this.width, this.height);
	    //   return this;
	    // }
	
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Block = function () {
	  function Block(x, y) {
	    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'sienna';
	    var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
	    var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 10;
	
	    _classCallCheck(this, Block);
	
	    this.x = x;
	    this.y = y;
	    this.color = color;
	    this.width = width;
	    this.height = height;
	  }
	
	  _createClass(Block, [{
	    key: 'draw',
	    value: function draw(context) {
	      context.fillStyle = this.color;
	      context.fillRect(this.x, this.y, this.width, this.height);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.draw();
	    }
	  }]);
	
	  return Block;
	}();
	
	module.exports = Block;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Block = __webpack_require__(2);
	
	var SlitheringSnake = function () {
	  function SlitheringSnake() {
	    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 250;
	    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
	    var orientation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'right';
	
	    _classCallCheck(this, SlitheringSnake);
	
	    this.snake = [];
	    this.speed = 3;
	    this.x = x;
	    this.y = y;
	    this.orientation = orientation;
	  }
	
	  _createClass(SlitheringSnake, [{
	    key: 'startingSnake',
	    value: function startingSnake() {
	      var length = 5;
	
	      for (var i = 0; i < length; i++) {
	        this.snake.push(new Block(250 - (i + 1) * 10, 250));
	      }
	    }
	  }, {
	    key: 'checkCanibalCollision',
	    value: function checkCanibalCollision(x, y, snakeArray) {
	      for (var i = 1; i < snakeArray.length; i++) {
	        switch (snakeArray[i].x === x && snakeArray[i].y === y) {
	          case true:
	            return true;
	          // break;
	          case false:
	            return false;
	          // break;
	          default:
	            return; // Quit when this doesn't handle the key event.
	        }
	      }
	    }
	  }, {
	    key: 'checkWallCollision',
	    value: function checkWallCollision(x, y, canvas) {
	      // right side, left side, top, bottom
	      switch (x + 10 >= canvas.width || x - 1 <= 0 || y - 1 <= 0 || y + 10 >= canvas.height) {
	        case true:
	          // var collide = (slitheringSnake.snake[0].x + 10 >= canvas.width)
	          // slitheringSnake.redraw(canvas)
	          return true;
	        // break;
	        case false:
	          return false;
	        // break;
	        default:
	          return; // Quit when this doesn't handle the key event.
	      }
	    }
	  }, {
	    key: 'eatAndGrow',
	    value: function eatAndGrow(circle1, circle2, canvas, ss) {
	      var dx = circle1.x - circle2.x;
	      var dy = circle1.y - circle2.y;
	      var distance = Math.sqrt(dx * dx + dy * dy);
	
	      switch (distance < circle1.radius + circle2.radius) {
	        case true:
	          ss.snake.push(new Block(ss.snake[0].x, ss.snake[0].y));
	          return true;
	        // break;
	        case false:
	          return false;
	        // break;
	        default:
	          return; // Quit when this doesn't handle the key event.
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(context) {
	      this.snake.forEach(function (itemInSnakeArr) {
	        itemInSnakeArr.draw(context);
	      });
	    }
	  }, {
	    key: 'establishOrientation',
	    value: function establishOrientation(ss) {
	      if (ss.snake[1].x + 10 === ss.snake[0].x) {
	        this.orientation = 'right';
	      } else if (ss.snake[1].y - 10 === ss.snake[0].y) {
	        this.orientation = 'up';
	      } else if (ss.snake[1].x - 10 === ss.snake[0].x) {
	        this.orientation = 'left';
	      } else {
	        this.orientation = 'down';
	      }
	    }
	  }]);
	
	  return SlitheringSnake;
	}();
	
	module.exports = SlitheringSnake;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGI4ZjE0YzE0ZjMyMTgxZTFhOGQiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9HYW1lLmpzIiwid2VicGFjazovLy8uL2xpYi9CbG9jay5qcyIsIndlYnBhY2s6Ly8vLi9saWIvU2xpdGhlcmluZ1NuYWtlLmpzIl0sIm5hbWVzIjpbIkdhbWUiLCJyZXF1aXJlIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwibmV3R2FtZSIsInNzIiwibWFrZVN0YXJ0aW5nU25ha2UiLCJlc3RhYmxpc2hPcmllbnRhdGlvbiIsIm1ha2VNb3VzZSIsInNuYWtlWCIsInNuYWtlIiwieCIsInNuYWtlWSIsInkiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJkZWZhdWx0UHJldmVudGVkIiwiY29uc29sZSIsImxvZyIsImtleSIsIm9yaWVudGF0aW9uIiwidGFpbFRvSGVhZCIsInBvcCIsInVuc2hpZnQiLCJwcmV2ZW50RGVmYXVsdCIsInN0YXJ0VGltZSIsImFuaW1hdGlvbkxlbmd0aCIsImdhbWVMb29wIiwidGltZXN0YW1wIiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJtaWNlIiwiZm9yRWFjaCIsIm1vdXNlIiwiZHJhdyIsIm1vdXNlWCIsIm1vdXNlWSIsImNpcmNsZTEiLCJyYWRpdXMiLCJjaXJjbGUyIiwiY2FubmliYWwiLCJjaGVja0NhbmliYWxDb2xsaXNpb24iLCJjb25jdXNzZWQiLCJjaGVja1dhbGxDb2xsaXNpb24iLCJlYXQiLCJlYXRBbmRHcm93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicHJvZ3Jlc3MiLCJCbG9jayIsIlNsaXRoZXJpbmdTbmFrZSIsInNjb3JlIiwibmV3U25ha2UiLCJzdGFydGluZ1NuYWtlIiwic2xpdGhlcmluZ1NuYWtlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaSIsImxlbmd0aCIsInB1c2giLCJyZWRyYXdSaWdodCIsImgiLCJzY29yZV90ZXh0IiwiZmlsbFN0eWxlIiwiZmlsbFRleHQiLCJtb2R1bGUiLCJleHBvcnRzIiwiY29sb3IiLCJmaWxsUmVjdCIsInNwZWVkIiwic25ha2VBcnJheSIsImR4IiwiZHkiLCJkaXN0YW5jZSIsInNxcnQiLCJpdGVtSW5TbmFrZUFyciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxLQUFJQSxPQUFPLG1CQUFBQyxDQUFRLENBQVIsQ0FBWDtBQUNBOztBQUVBLEtBQUlDLFNBQVNDLFNBQVNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYjtBQUNBLEtBQUlDLFVBQVVILE9BQU9JLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBZDtBQUNBLEtBQU1DLFVBQVUsSUFBSVAsSUFBSixFQUFoQjtBQUNBO0FBQ0EsS0FBSVEsS0FBS0QsUUFBUUUsaUJBQVIsQ0FBMEJKLE9BQTFCLENBQVQ7O0FBRUFHLElBQUdFLG9CQUFILENBQXdCRixFQUF4Qjs7QUFFQUQsU0FBUUksU0FBUixDQUFrQk4sT0FBbEIsRUFBMkJHLEVBQTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxLQUFJSSxTQUFTSixHQUFHSyxLQUFILENBQVMsQ0FBVCxFQUFZQyxDQUF6QjtBQUNBLEtBQUlDLFNBQVNQLEdBQUdLLEtBQUgsQ0FBUyxDQUFULEVBQVlHLENBQXpCOztBQUVBQyxRQUFPQyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxVQUFVQyxLQUFWLEVBQWlCO0FBQ2xELE9BQUlBLE1BQU1DLGdCQUFWLEVBQTRCO0FBQzFCLFlBRDBCLENB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QUFDckNBLHdCQUFlekMsSUFBZixDQUFvQmxDLE9BQXBCO0FBQ0QsUUFGRDtBQUlEOzs7MENBRW9CRyxFLEVBQUk7QUFDdkIsV0FBSUEsR0FBR0ssS0FBSCxDQUFTLENBQVQsRUFBWUMsQ0FBWixHQUFnQixFQUFoQixLQUF1Qk4sR0FBR0ssS0FBSCxDQUFTLENBQVQsRUFBWUMsQ0FBdkMsRUFBMEM7QUFDeEMsY0FBS1UsV0FBTCxHQUFtQixPQUFuQjtBQUNELFFBRkQsTUFFTyxJQUFJaEIsR0FBR0ssS0FBSCxDQUFTLENBQVQsRUFBWUcsQ0FBWixHQUFnQixFQUFoQixLQUF3QlIsR0FBR0ssS0FBSCxDQUFTLENBQVQsRUFBWUcsQ0FBeEMsRUFBMkM7QUFDaEQsY0FBS1EsV0FBTCxHQUFtQixJQUFuQjtBQUNELFFBRk0sTUFFQSxJQUFJaEIsR0FBR0ssS0FBSCxDQUFTLENBQVQsRUFBWUMsQ0FBWixHQUFnQixFQUFoQixLQUF1Qk4sR0FBR0ssS0FBSCxDQUFTLENBQVQsRUFBWUMsQ0FBdkMsRUFBMEM7QUFDL0MsY0FBS1UsV0FBTCxHQUFtQixNQUFuQjtBQUNELFFBRk0sTUFFQTtBQUNMLGNBQUtBLFdBQUwsR0FBbUIsTUFBbkI7QUFDRDtBQUNGOzs7Ozs7QUFLSDhDLFFBQU9DLE9BQVAsR0FBaUJqQixlQUFqQixDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOGI4ZjE0YzE0ZjMyMTgxZTFhOGQiLCJ2YXIgR2FtZSA9IHJlcXVpcmUoJy4vR2FtZS5qcycpO1xuLy8gdmFyIFNsaXRoZXJpbmdTbmFrZSA9IHJlcXVpcmUoJy4vU2xpdGhlcmluZ1NuYWtlLmpzJyk7XG5cbnZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpO1xudmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmNvbnN0IG5ld0dhbWUgPSBuZXcgR2FtZSgpO1xuLy9wdXQgYSBzbmFrZSBvbiB0aGUgY2FudmFzXG52YXIgc3MgPSBuZXdHYW1lLm1ha2VTdGFydGluZ1NuYWtlKGNvbnRleHQpO1xuXG5zcy5lc3RhYmxpc2hPcmllbnRhdGlvbihzcylcblxubmV3R2FtZS5tYWtlTW91c2UoY29udGV4dCwgc3MpO1xuLy8gdmFyIHNuYWtlU2l6ZSA9IDEwOyBcbi8vIHZhciB3ID0gNTAwO1xuLy8gdmFyIGggPSA1MDA7XG4vLyB2YXIgc2NvcmUgPSAwO1xuLy8gdmFyIHNuYWtlU2l6ZSA9IHNzLnNuYWtlLmxlbmd0aDtcblxuLy8gdmFyIGdhbWVTY29yZSA9IG5ld0dhbWUuc2NvcmVUZXh0KGNvbnRleHQsIGgpO1xuXG4vLyBoYXZlIGV2ZW50bGlzdGVuZXJzXG5cbnZhciBzbmFrZVggPSBzcy5zbmFrZVswXS54O1xudmFyIHNuYWtlWSA9IHNzLnNuYWtlWzBdLnk7IFxuICAgIFxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICBpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgIHJldHVybjsgLy8gRG8gbm90aGluZyBpZiB0aGUgZXZlbnQgd2FzIGFscmVhZHkgcHJvY2Vzc2VkXG4gIH1cbiAgLy8gdXA6IDM4LCBkb3duOiA0MCwgcmlnaHQ6IDM5LCBsZWZ0OiAzN1xuICBjb25zb2xlLmxvZyhldmVudC5rZXkpXG4gIGlmICgoc3Mub3JpZW50YXRpb24gPT09ICdyaWdodCcgfHwgIHNzLm9yaWVudGF0aW9uID09PSAndXAnIHx8IHNzLm9yaWVudGF0aW9uID09PSAnZG93bicpICYmIGV2ZW50LmtleSA9PT0gJ0Fycm93UmlnaHQnKSB7XG4gICAgdmFyIHRhaWxUb0hlYWQgPSBzcy5zbmFrZS5wb3AoKTtcblxuICAgIHRhaWxUb0hlYWQueCA9IHNuYWtlWCArPSAxMDtcbiAgICB0YWlsVG9IZWFkLnkgPSBzbmFrZVk7XG4gICAgc3Muc25ha2UudW5zaGlmdCh0YWlsVG9IZWFkKTtcbiAgfSBlbHNlIGlmICgoc3Mub3JpZW50YXRpb24gPT09ICdsZWZ0JyB8fCAgc3Mub3JpZW50YXRpb24gPT09ICd1cCcgfHwgc3Mub3JpZW50YXRpb24gPT09ICdkb3duJykgJiYgZXZlbnQua2V5ID09PSAnQXJyb3dMZWZ0Jykge1xuICAgIHRhaWxUb0hlYWQgPSBzcy5zbmFrZS5wb3AoKTtcblxuICAgIHRhaWxUb0hlYWQueCA9IHNuYWtlWCAtPSAxMDtcbiAgICB0YWlsVG9IZWFkLnkgPSBzbmFrZVk7XG4gICAgc3Muc25ha2UudW5zaGlmdCh0YWlsVG9IZWFkKTtcbiAgfSBlbHNlIGlmICgoc3Mub3JpZW50YXRpb24gPT09ICd1cCcgfHwgIHNzLm9yaWVudGF0aW9uID09PSAnbGVmdCcgfHwgc3Mub3JpZW50YXRpb24gPT09ICdyaWdodCcpICYmIGV2ZW50LmtleSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgdGFpbFRvSGVhZCA9IHNzLnNuYWtlLnBvcCgpO1xuXG4gICAgdGFpbFRvSGVhZC54ID0gc25ha2VYO1xuICAgIHRhaWxUb0hlYWQueSA9IHNuYWtlWSAtPSAxMDtcbiAgICBzcy5zbmFrZS51bnNoaWZ0KHRhaWxUb0hlYWQpO1xuICB9IGVsc2UgaWYgKChzcy5vcmllbnRhdGlvbiA9PT0gJ2Rvd24nIHx8ICBzcy5vcmllbnRhdGlvbiA9PT0gJ2xlZnQnIHx8IHNzLm9yaWVudGF0aW9uID09PSAncmlnaHQnKSAmJiBldmVudC5rZXkgPT09ICdBcnJvd0Rvd24nKSB7XG4gICAgdGFpbFRvSGVhZCA9IHNzLnNuYWtlLnBvcCgpO1xuXG4gICAgdGFpbFRvSGVhZC54ID0gc25ha2VYO1xuICAgIHRhaWxUb0hlYWQueSA9IHNuYWtlWSArPSAxMDtcbiAgICBzcy5zbmFrZS51bnNoaWZ0KHRhaWxUb0hlYWQpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKCdubyBjaGFuZ2UgaW4gZGlyZWN0aW9uJylcbiAgfSBcbiAgLy8gQ2FuY2VsIHRoZSBkZWZhdWx0IGFjdGlvbiB0byBhdm9pZCBpdCBiZWluZyBoYW5kbGVkIHR3aWNlXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59LCB0cnVlKTtcblxuXG5cblxuLy8gc3Muc25ha2VFYXRzQW5kR3Jvd3MoY29udGV4dCk7XG5cbi8vRGlzYWJsZSB0aGUgYnV0dG9uIF9zdGFydF8gd2hpbGUgeW91J3JlIHBsYXlpbmcuXG5cbnZhciBzdGFydFRpbWUgPSAtMTtcbnZhciBhbmltYXRpb25MZW5ndGggPSAyMDAwOyAvLyBBbmltYXRpb24gbGVuZ3RoIGluIG1pbGxpc2Vjb25kc1xuXG5mdW5jdGlvbiBnYW1lTG9vcCh0aW1lc3RhbXApIHsgXG4gIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodClcbiAgbmV3R2FtZS5taWNlLmZvckVhY2goZnVuY3Rpb24obW91c2UpIHtcbiAgICBtb3VzZS5kcmF3KGNvbnRleHQpO1xuICB9KTtcblxuICB2YXIgbW91c2VYID0gbmV3R2FtZS5taWNlWzBdLnhcbiAgdmFyIG1vdXNlWSA9IG5ld0dhbWUubWljZVswXS55XG4gIFxuXG4gIHNzLmRyYXcoY29udGV4dCk7XG4gIHNuYWtlWCA9IHNzLnNuYWtlWzBdLng7XG4gIHNuYWtlWSA9IHNzLnNuYWtlWzBdLnk7XG4gIHNzLmVzdGFibGlzaE9yaWVudGF0aW9uKHNzKVxuICB2YXIgY2lyY2xlMSA9IHtyYWRpdXM6IDUsIHg6IG1vdXNlWCwgeTogbW91c2VZfTtcbiAgdmFyIGNpcmNsZTIgPSB7cmFkaXVzOiA1LCB4OiBzbmFrZVgsIHk6IHNuYWtlWX07XG4gIHZhciBjYW5uaWJhbCA9IHNzLmNoZWNrQ2FuaWJhbENvbGxpc2lvbihzbmFrZVgsIHNuYWtlWSwgc3Muc25ha2UpXG4gIHZhciBjb25jdXNzZWQgPSBzcy5jaGVja1dhbGxDb2xsaXNpb24oc25ha2VYLCBzbmFrZVksIGNhbnZhcylcbiAgdmFyIGVhdCA9IHNzLmVhdEFuZEdyb3coY2lyY2xlMSwgY2lyY2xlMiwgY2FudmFzLCBzcylcblxuICBpZiAoZWF0ID09PSB0cnVlKSB7XG4gICAgbmV3R2FtZS5taWNlLnBvcCgpO1xuICAgIG5ld0dhbWUubWFrZU1vdXNlKGNvbnRleHQsIHNzKTtcbiAgICBlYXQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vbGlzdGVuIGZvciBhcnJvdyBrZXkgdG8gbWFrZSBzbmFrZSBiZWdpbiBtb3ZpbmcgYW5kIHJlZHJhdyB1bnRpbCBldmVudCB0byBjaGFuZ2UgZGlyZWN0aW9uIG9yIGVuZCBnYW1lXG4gIC8vIGZ1bmN0aW9uIHJlZHJhdygpIHtcbiAgLy8gICBkcmF3UGVuZGluZyA9IGZhbHNlO1xuICAvLyAgIC8vIERvIGRyYXdpbmcgLi4uXG4gIC8vICAgbmV3R2FtZS5tYWtlU25ha2VNb3ZlKGNvbnRleHQpXG4gIC8vIH1cblxuICAvLyB2YXIgZHJhd1BlbmRpbmcgPSBmYWxzZTtcbiAgLy8gZnVuY3Rpb24gcmVxdWVzdFJlZHJhdygpIHtcbiAgLy8gICBpZiAoIWRyYXdQZW5kaW5nKSB7XG4gIC8vICAgICBkcmF3UGVuZGluZyA9IHRydWU7XG4gIC8vICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVkcmF3KTtcbiAgLy8gICB9XG4gIC8vIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApOyBcblxuICAvLyBDYWxjdWxhdGUgYW5pbWF0aW9uIHByb2dyZXNzXG4gIHZhciBwcm9ncmVzcyA9IDA7XG5cbiAgaWYgKHN0YXJ0VGltZSA8IDApIHtcbiAgICBzdGFydFRpbWUgPSB0aW1lc3RhbXA7XG4gIH0gZWxzZSB7XG4gICAgcHJvZ3Jlc3MgPSB0aW1lc3RhbXAgLSBzdGFydFRpbWU7XG4gIH1cblxuXG4gIGlmIChwcm9ncmVzcyA8IGFuaW1hdGlvbkxlbmd0aCkge1xuICB9XG4gXG59XG5cbmdhbWVMb29wKCk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9pbmRleC5qcyIsInZhciBCbG9jayA9IHJlcXVpcmUoJy4vQmxvY2suanMnKTtcbnZhciBTbGl0aGVyaW5nU25ha2UgPSByZXF1aXJlKCcuL1NsaXRoZXJpbmdTbmFrZS5qcycpO1xuXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5taWNlID0gW107XG4gICAgdGhpcy5zY29yZSA9IDBcbiAgfVxuXG4gIG1ha2VTdGFydGluZ1NuYWtlKGNvbnRleHQpIHtcbiAgICB2YXIgbmV3U25ha2UgPSBuZXcgU2xpdGhlcmluZ1NuYWtlKCk7XG5cbiAgICBuZXdTbmFrZS5zdGFydGluZ1NuYWtlKCk7XG4gICAgbmV3U25ha2UuZHJhdyhjb250ZXh0KTtcbiAgICByZXR1cm4gbmV3U25ha2U7XG4gIH1cblxuXG4gIG1ha2VNb3VzZShjb250ZXh0LCBzbGl0aGVyaW5nU25ha2UpIHtcbiAgICB2YXIgbW91c2UgPSBuZXcgQmxvY2soIDIwICsgTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDQ3MCkgKyAxKSwgMjAgKyBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogNDcwKSArIDEpLCAnY29ybnNpbGsnKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpID4gc2xpdGhlcmluZ1NuYWtlLnNuYWtlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc25ha2VYID0gc2xpdGhlcmluZ1NuYWtlLnNuYWtlW2ldLng7XG4gICAgICB2YXIgc25ha2VZID0gc2xpdGhlcmluZ1NuYWtlLnNuYWtlW2ldLnk7XG5cbiAgICAgIGlmIChtb3VzZS54ID09PSBzbmFrZVggfHwgbW91c2UueSA9PT0gc25ha2VZIHx8IG1vdXNlLnkgPT09IHNuYWtlWSAmJiBtb3VzZS54ID09PSBzbmFrZVgpIHtcbiAgICAgICAgbW91c2UueCA9IDI1ICsgTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDQ2MCkgKyAyKTtcbiAgICAgICAgbW91c2UueSA9IDI1ICsgTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDQ2MCkgKyAyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbW91c2UuZHJhdyhjb250ZXh0KTtcbiAgICB0aGlzLm1pY2UucHVzaChtb3VzZSlcbiAgfVxuXG4gIG1ha2VTbmFrZU1vdmVSaWdodChjb250ZXh0LCBzbGl0aGVyaW5nU25ha2UpIHtcbiAgICBzbGl0aGVyaW5nU25ha2UucmVkcmF3UmlnaHQoY29udGV4dClcbiAgfVxuXG4gIHNjb3JlVGV4dChjb250ZXh0LCBoKSB7XG4gICAgLy8gbWljZSBlYXRlbiBieSB0aGUgc25ha2VcbiAgICB2YXIgc2NvcmVfdGV4dCA9IFwiU2NvcmU6IFwiICsgdGhpcy5zY29yZTtcblxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ2JsdWUnO1xuICAgIGNvbnRleHQuZmlsbFRleHQoc2NvcmVfdGV4dCwgMTQ1LCBoIC0gNSk7XG4gIH1cblxuXG5cblxuICAvLyAmJihzbGl0aGVyaW5nU25ha2Uuc25ha2VbMF0ueSArIDEwID49IGNhbnZhcy5oZWlnaHQgJiYgc2xpdGhlcmluZ1NuYWtlLnNuYWtlWzBdLnkgPD0gMCApXG5cblxuXG4gIC8vIGVyYXNlKGN0eCkge1xuICAvLyAgIGN0eC5jbGVhclJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgLy8gICByZXR1cm4gdGhpcztcbiAgLy8gfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvR2FtZS5qcyIsImNsYXNzIEJsb2NrIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgY29sb3IgPSAnc2llbm5hJywgd2lkdGggPSAxMCwgaGVpZ2h0ID0gMTApIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIGRyYXcoY29udGV4dCkge1xuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5kcmF3KClcbiAgfVxuICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCbG9jaztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvQmxvY2suanMiLCJ2YXIgQmxvY2sgPSByZXF1aXJlKCcuL0Jsb2NrLmpzJyk7XG5cbmNsYXNzIFNsaXRoZXJpbmdTbmFrZSB7XG4gIGNvbnN0cnVjdG9yKHggPSAyNTAsIHkgPSAyNTAsIG9yaWVudGF0aW9uID0gJ3JpZ2h0Jykge1xuICAgIHRoaXMuc25ha2UgPSBbXTtcbiAgICB0aGlzLnNwZWVkID0gMztcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICB9XG4gIFxuICBzdGFydGluZ1NuYWtlKCkge1xuICAgIHZhciBsZW5ndGggPSA1O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5zbmFrZS5wdXNoKG5ldyBCbG9jaygyNTAgLSAoaSArIDEpICogMTAsIDI1MCkpXG4gICAgfVxuICB9XG5cbiAgY2hlY2tDYW5pYmFsQ29sbGlzaW9uKHgsIHksIHNuYWtlQXJyYXkpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNuYWtlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN3aXRjaCAoKHNuYWtlQXJyYXlbaV0ueCA9PT0geCkgJiYgKHNuYWtlQXJyYXlbaV0ueSA9PT0geSkpIHtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIC8vIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjsgLy8gUXVpdCB3aGVuIHRoaXMgZG9lc24ndCBoYW5kbGUgdGhlIGtleSBldmVudC5cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjaGVja1dhbGxDb2xsaXNpb24oeCwgeSwgY2FudmFzKSB7IFxuICAgIC8vIHJpZ2h0IHNpZGUsIGxlZnQgc2lkZSwgdG9wLCBib3R0b21cbiAgICBzd2l0Y2ggKCh4ICsgMTAgPj0gY2FudmFzLndpZHRoKSB8fCAoeCAtIDEgPD0gMCkgfHwgKHkgLSAxIDw9IDApIHx8ICh5ICsgMTAgPj0gY2FudmFzLmhlaWdodCkpIHtcbiAgICBjYXNlIHRydWU6XG4gICAgICAvLyB2YXIgY29sbGlkZSA9IChzbGl0aGVyaW5nU25ha2Uuc25ha2VbMF0ueCArIDEwID49IGNhbnZhcy53aWR0aClcbiAgICAgIC8vIHNsaXRoZXJpbmdTbmFrZS5yZWRyYXcoY2FudmFzKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAvLyBicmVhaztcbiAgICBjYXNlIGZhbHNlOlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybjsgLy8gUXVpdCB3aGVuIHRoaXMgZG9lc24ndCBoYW5kbGUgdGhlIGtleSBldmVudC5cbiAgICB9XG4gIH1cblxuICBlYXRBbmRHcm93KGNpcmNsZTEsIGNpcmNsZTIsIGNhbnZhcywgc3MpIHsgXG4gICAgdmFyIGR4ID0gY2lyY2xlMS54IC0gY2lyY2xlMi54O1xuICAgIHZhciBkeSA9IGNpcmNsZTEueSAtIGNpcmNsZTIueTtcbiAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG4gICAgc3dpdGNoIChkaXN0YW5jZSA8IGNpcmNsZTEucmFkaXVzICsgY2lyY2xlMi5yYWRpdXMpIHtcbiAgICBjYXNlIHRydWU6XG4gICAgICBzcy5zbmFrZS5wdXNoKG5ldyBCbG9jayhzcy5zbmFrZVswXS54LCBzcy5zbmFrZVswXS55KSlcbiAgICAgIHJldHVybiB0cnVlO1xuICAgICAgLy8gYnJlYWs7XG4gICAgY2FzZSBmYWxzZTpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm47IC8vIFF1aXQgd2hlbiB0aGlzIGRvZXNuJ3QgaGFuZGxlIHRoZSBrZXkgZXZlbnQuXG4gICAgfVxuICB9XG4gIFxuICBkcmF3KGNvbnRleHQpIHtcbiAgICB0aGlzLnNuYWtlLmZvckVhY2goKGl0ZW1JblNuYWtlQXJyKSA9PiB7XG4gICAgICBpdGVtSW5TbmFrZUFyci5kcmF3KGNvbnRleHQpO1xuICAgIH1cbiAgICApXG4gIH0gXG5cbiAgZXN0YWJsaXNoT3JpZW50YXRpb24oc3MpIHtcbiAgICBpZiAoc3Muc25ha2VbMV0ueCArIDEwID09PSBzcy5zbmFrZVswXS54KSB7XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3JpZ2h0JztcbiAgICB9IGVsc2UgaWYgKHNzLnNuYWtlWzFdLnkgLSAxMCAgPT09IHNzLnNuYWtlWzBdLnkpIHtcbiAgICAgIHRoaXMub3JpZW50YXRpb24gPSAndXAnO1xuICAgIH0gZWxzZSBpZiAoc3Muc25ha2VbMV0ueCAtIDEwID09PSBzcy5zbmFrZVswXS54KSB7XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ2xlZnQnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ2Rvd24nO1xuICAgIH1cbiAgfVxuXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBTbGl0aGVyaW5nU25ha2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvU2xpdGhlcmluZ1NuYWtlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==