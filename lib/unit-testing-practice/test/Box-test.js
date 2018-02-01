const { assert } = require('chai');

// const chai = require('chai');
// const assert = chai.assert;

/* Iteration 1:
- You should have a Box constructor which has a default height and width of 100.
- User should be able to pass in specific height and widths if they so choose.
- You should be able to calculate the area of your box using the method `.area()`.   */


const Box = require('../Box.js');

describe('Box', function() {
	var box;

	beforeEach(function(){
	box = new Box(30,30)
	})
  it('should return true', function() {
    assert.equal(true, true);
  });

  it('should have a default height and a width', function() {
    var box = new Box();

    assert.equal(box.height, 100);
    assert.equal(box.width, 100);
  });

  it('should have take a height and a width as arguments', function() {
    // var box = new Box(30, 30);

    assert.equal(box.height, 30);
    assert.equal(box.width, 30);
  });

  it('should calculate its area', function() {
    // var box = new Box(30, 30);

    assert.equal(box.area(), 900);
  });


  it('should increment the width by a value', function() {
  	assert.equal(box.width, 30);

  	box.increaseWidth(10);

  	assert.equal(box.width, 40);
	});

	it('should increment width or height in one function', function(){
		assert.equal(box.width, 30)

		box.increment(10, 'width');

		assert.equal(box.width, 40)
	})



});

