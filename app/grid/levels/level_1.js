// Random level generator
var data = {};

data.width = 15;
data.height = 24;
data.grid = [];

for (let i = 0; i < data.width; i++) {
  data.grid.push([]);
  for (let j = 0; j < data.height; j++) {
    data.grid[i].push(0);
  }
}

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < data.width; j++) {
    data.grid[j][Math.floor(Math.random()*data.height)] = 1;
  }
}

// Entrance and exit
const entrancePoint = generateRandomPointAlongWall();
const exitPoint = generateRandomPointAlongWall();

data.grid[entrancePoint.x][entrancePoint.y] = 2;
data.grid[exitPoint.x][exitPoint.y] = 3;

data.entrancePoint = entrancePoint;
data.exitPoint = exitPoint;

function flipCoin () {
  return Math.round(Math.random()*1);
}

function generateRandomPointAlongWall () {
  if (flipCoin() === 1) {
    // Point along left/right sides
    return {x: flipCoin()*(data.width-1), y: Math.floor(Math.random()*data.height)}
  } else {
    // Point along top/bottom sides
    return {x: Math.floor(Math.random()*data.width), y: flipCoin()*(data.height-1)}
  }
}

export {data};
