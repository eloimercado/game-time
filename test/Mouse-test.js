var chai = require('chai');
var assert = chai.assert;

var Mouse = require('../lib/Mouse');

describe('Mouse', () => {
  // context('with default attributes', function() {
    // Your tests here... 
  var mouse;

  beforeEach(() => {
    mouse = new Mouse(250, 250,);

  });

  it('should be a funtion', () => {
    assert.isFunction(Mouse)
  });

  it('should have an arrray of mice', () => {
    const expected = [];
    const actual = mouse.mice;
    assert.deepEqual(actual, expected);
  });

   it('should instantiate Mouse', function() {
    assert.isObject(mouse);
  });
});