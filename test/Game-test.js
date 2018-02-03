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
});  