import {scaleFactor} from 'canvas/controller';

const configs = {
  tileSize: 25*scaleFactor
};

var status = {
  level: -1,
  bip: 0,

  curLevel (newLevel) {
    if (newLevel) level = newLevel;
    return level;
  },

  curBip (newBip) {
    if (newBip) bip = newBip
    return bip;
  }
}

export {configs, status};
