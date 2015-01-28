import {scaleFactor} from 'canvas/controller';
import {data as level_1} from 'level/levels/level_1';

const tileSize = 25*scaleFactor;

const levels = {
  _current: null,

  'level_1': level_1,

  current (newLevel) {
    if (newLevel) levels._current = newLevel;
    return levels._current;
  },

  getCurrentGrid () {
    return levels[levels._current];
  }
};

export {levels, tileSize};
