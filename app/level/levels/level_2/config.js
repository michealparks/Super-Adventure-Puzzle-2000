import Level            from 'level/model';
import GeneratedTerrain from 'level/levels/generator';

let config = {};

config.position = {x: 0, y: 0};
config.width  = 15;
config.height = 24;

config.gridData = new GeneratedTerrain(
  config.width, 
  config.height, 
  config.position);

config.colorKey = [];

config.colorKey[0] = '#333333'; // Ground
config.colorKey[1] = '#555555'; // Wall
config.colorKey[2] = '#262626'; // Entrance
config.colorKey[3] = '#222222'; // Exit

export default config;
