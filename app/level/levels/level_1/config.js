import Level from 'level/model';

let config = {};

config.levelName = 'level_1';

config.position = {x: 3, y: 9};
config.width  = 9;
config.height = 9;

config.gridData = ((width, height) => {
  let grid = [];
  for (let i = 0; i < width; i++) {
    grid.push(new Int8Array(height));
  }

  grid[2][0] = 2;
  grid[4][0] = 3;
  
  return {
    grid,
    position: config.position,
    width,
    height,
    entrancePoint: {
      x: 2, 
      y: 0
    },
    exitPoint: {
      x: 4, 
      y: 0,
      leadsTo: 'level_2'
    }
  };
})(config.width, config.height);

config.colorKey = [];

config.colorKey[0] = '#333333'; // Ground
config.colorKey[1] = '#555555'; // Wall
config.colorKey[2] = '#333333'; // Entrance
config.colorKey[3] = '#222222'; // Exit

export default config;
