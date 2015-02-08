import {scaleFactor} from 'canvas/controller';
import {data as level_1} from 'level/levels/level_1';
import {data as level_2} from 'level/levels/level_2';

const tileSize = 25*scaleFactor;

const levels = {
  _current: null,

  'level_1': level_1,
  'level_2': level_2,

  current (newLevel) {
    if (newLevel) levels._current = newLevel;
    return levels._current;
  },

  getCurrentGrid () {
    return levels[levels._current];
  }
};

export {levels, tileSize};
