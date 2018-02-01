module.exports = class Box {
	constructor (height=100, width=100) {
	  this.height = height;
	  this.width = width;
	}

	area () {
		var area = this.height * this.width;
		return area;
	}

	increaseWidth (number = 0) {
		this.width += number
	}

	increment (number = 0, dimension) {
		this[dimension] += number;
	}
}



