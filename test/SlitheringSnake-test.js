var chai = require('chai');
var assert = chai.assert;
var SlitheringSnake = require('../lib/SlitheringSnake');

describe('SlitheringSnake', () => {
  var slitheringSnake;

  beforeEach(() => {
    slitheringSnake = new SlitheringSnake(250, 250, 'right');
  });

  it('should be a funtion', () => {
    assert.isFunction(SlitheringSnake)
  });

  it('should take argument for x', () => {
    const expected = 250;
    const actual = slitheringSnake.x;
    assert.equal(actual, expected);
  });

  it('should take argument for y', () => {
    const expected = 250;
    const actual = slitheringSnake.y;
    assert.equal(actual, expected);
  });

  it('should take argument for orientation', () => {
    const expected = 'right';
    const actual = slitheringSnake.orientation;
    assert.equal(actual, expected);
  });

  it('should have a snake array', () => {
    const expected = [];
    const actual = slitheringSnake.snake;
    assert.deepEqual(actual, expected);
  });

  it('does not collide with wall when game instance starts', () => {
    const canvas = {height: 500,
                    width: 500
                  }
    const actual = slitheringSnake.checkWallCollision(250,250, canvas);
    const expected = false

    assert.equal(actual, expected);
  });

  it('does collide with right wall when snake head touches canvas right border', () => {
    const canvas = {height: 500,
                    width: 500
                  }
    const actual = slitheringSnake.checkWallCollision(500,10, canvas);
    const expected = true;

    assert.equal(actual, expected);
  });
});  
