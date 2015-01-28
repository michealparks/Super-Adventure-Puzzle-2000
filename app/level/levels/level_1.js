import {scaleFactor} from 'canvas/controller';
import {RandomlyGeneratedTerrain} from 'level/levels/generator';

var data = new RandomlyGeneratedTerrain(
  /** width  */ 15,
  /** height */ 24
);

data.colorKey = new Map();
data.colorKey[0] = '#333333';
data.colorKey[1] = '#555555';
data.colorKey[2] = '#262626';
data.colorKey[3] = '#222222';

export {data};
