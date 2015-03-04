export default class GeneratedTerrain {
  constructor(width, height, position) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.grid = this.populateGrid([], width, height);
    this.grid = this.generateWalls(this.grid, width, height, /** freq */ 4);

    // Entrance and exit
    this.entrancePoint = this.generateWallPoint(width, height);
    this.exitPoint = this.generateWallPoint(width, height);

    this.grid[this.entrancePoint.x][this.entrancePoint.y] = 2;
    this.grid[this.exitPoint.x][this.exitPoint.y] = 3;
  }

  flipCoin() {
    return Math.round(Math.random()*1);
  }

  populateGrid(grid, width, height) {
    for (let i = 0; i < width; i++) {
      grid.push(new Int8Array(new ArrayBuffer(height)));
    }
    return grid;
  }

  generateWalls(grid, width, height, freq) {
    for (let i = 0; i < freq; i++) {
      for (let j = 0; j < width; j++) {
        grid[j][Math.floor(Math.random()*height)] = 1;
      }
    }
    return grid;
  }

  generateWallPoint(width, height) {
    if (this.flipCoin() === 1) {
      // Point along left/right sides
      return {x: this.flipCoin()*(width-1), y: Math.floor(Math.random()*height)}
    } else {
      // Point along top/bottom sides
      return {x: Math.floor(Math.random()*width), y: this.flipCoin()*(height-1)}
    }
  }
}
