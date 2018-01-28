class Block {
  constructor(x, y, color = 'sienna', width = 10, height = 10) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
  }

  draw(context) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);

    // return this; - only if stringing together for dot notation
  }

  update() {
    this.draw()
  }
  
}

module.exports = Block;