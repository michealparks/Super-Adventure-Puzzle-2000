import {scaleFactor} from 'canvas/controller';

const configs = {
  tileSize: 25*scaleFactor
};

var status = {
  level: -1,

  curLevel (newLevel) {
    if (newLevel) this.level = newLevel;
    return this.level;
  }
}

export {configs, status};
