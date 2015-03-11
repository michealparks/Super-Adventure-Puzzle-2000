export default class GeneratedTerrain {
  constructor(width, height, position) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.grid = this.populateGrid([], width, height);
    this.grid = this.generateWalls(this.grid, width, height, /** freq */ 4);

    // Entrance and exit
    this.entrances = new Map();
    const tempEnt = this.generateWallPoint(width, height);
    this.entrances.set(`${tempEnt.x},${tempEnt.y}`, {
      x: tempEnt.x,
      y: tempEnt.y,
      dir: {x: 0, y: 0},
      leadsTo: {
        level: 'level_1',
        entrance: 0
      }
    });

    this.exits = new Map();
    const tempExit = this.generateWallPoint(width, height);
    this.exits.set(`${tempExit.x},${tempExit.y}`, {
      x: tempExit.x,
      y: tempExit.y,
      dir: {x: 0, y: 0},
      leadsTo: {
        level: 'level_3',
        entrance: 0
      }
    });

    this.entrances.forEach((entrance) => {
      this.grid[entrance.x][entrance.y] = 1;
    });

    this.exits.forEach((exit) => {
      this.grid[exit.x][exit.y] = 2;
    });
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
        grid[j][Math.floor(Math.random()*height)] = 3;
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
