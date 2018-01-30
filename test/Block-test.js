var chai = require('chai');
var assert = chai.assert;

var Block = require('../lib/Block');

describe('Block', function() {
  // context('should be a function', function() {
    // Your tests here...
  var block;

  beforeEach(function() {
    block = new Block(250, 250, 'sienna', 10, 10);
  });

  it('should return true', function() {
    assert.equal(true, true);
  });

  it('should take arrgument for x', function() {
    const expected = 250;
    const actual = block.x;
    assert.equal(actual, expected);
  });
    
  it('should take arrgument for y', function() {
    const expected = 250;
    const actual =  block.y;
    assert.equal(actual, expected);
  });

  it('should take arrgument for color', function() {
    const expected = 'sienna';
    const actual = block.color;
    assert.equal(actual, expected);
  });
    
  it('should take arrugment for width', function() {
    const expected = 10;
    const actual = block.width;
    assert.equal(actual, expected);
  });

  it('should take arrgument for height', function() {
    const expected = 10;
    const actual = block.height;
    assert.equal(actual, expected);
  })


});  