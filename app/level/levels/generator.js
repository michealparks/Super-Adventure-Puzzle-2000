function populateGrid (grid, width, height) {
  for (let i = 0; i < width; i++) {
    grid.push(new Int8Array(new ArrayBuffer(height)));
  }
  return grid;
}

function randomlyInsertWalls (grid, width, height, freq) {
  for (let i = 0; i < freq; i++) {
    for (let j = 0; j < width; j++) {
      grid[j][Math.floor(Math.random()*height)] = 1;
    }
  }
  return grid;
}

function flipCoin () {
  return Math.round(Math.random()*1);
}

function generateRandomPointAlongWall (width, height) {
  if (flipCoin() === 1) {
    // Point along left/right sides
    return {x: flipCoin()*(width-1), y: Math.floor(Math.random()*height)}
  } else {
    // Point along top/bottom sides
    return {x: Math.floor(Math.random()*width), y: flipCoin()*(height-1)}
  }
}

export class RandomlyGeneratedTerrain {
  constructor (width, height) {
    this.width = width;
    this.height = height;
    this.grid = populateGrid([], width, height);
    this.grid = randomlyInsertWalls(this.grid, width, height, /** freq */ 4);

    // Entrance and exit
    const entrancePoint = generateRandomPointAlongWall(width, height);
    const exitPoint = generateRandomPointAlongWall(width, height);

    this.grid[entrancePoint.x][entrancePoint.y] = 2;
    this.grid[exitPoint.x][exitPoint.y] = 3;

    this.entrancePoint = entrancePoint;
    this.exitPoint = exitPoint;
  }
}
