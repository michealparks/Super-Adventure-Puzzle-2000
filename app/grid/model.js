import {data as level_1} from 'grid/levels/level_1';

const levels = {
  _current: null,

  'level_1': level_1,

  current (newLevel) {
    if (newLevel) levels._current = newLevel;
    return levels._current;
  }
};

export {levels};
