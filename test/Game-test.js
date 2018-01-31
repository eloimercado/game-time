var chai = require('chai');
var assert = chai.assert;

var Game = require('../lib/Game');

describe('Game', () => {
  
  var newGame;

  beforeEach(() => {
    newGame = new Game()
  });

  it('should be a function', () => {
    assert.isFunction(Game)
  });

  it('should have an arrray of mice', () => {
    const expected = [];
    const actual = newGame.mice;
    assert.deepEqual(actual, expected);
  });

  it('should have starting score of 0', () => {
    const expected = 0;
    const actual = newGame.score;
    assert.equal(actual, expected);
  });

  it('should have property of done', () => {
    const expected = false;
    const actual = newGame.done;
    assert.equal(actual, expected);
  });

  it('should keep score', () => {
    const sampleSnake = {snake:[{x: 250, y:250},
                    {x: 250, y:240},
                    {x: 250, y:230},
                    {x: 250, y:220},
                    {x: 250, y:210},
                    {x: 250, y:200},
                    {x: 250, y:190},
                    {x: 250, y:180}]};
    newGame.keepScore(sampleSnake);
    const expected = 3;
    const actual = newGame.score;
    assert.equal(actual, expected);
  });




  });  