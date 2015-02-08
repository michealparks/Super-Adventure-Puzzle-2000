import {ctx, scaleFactor} from 'canvas/controller';
import {cacheCtx, cacheCanvas} from 'cacheCanvas/controller';

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
    return levels[levels._current].grid;
  }
};

function renderGrid (levelName, toPreRender) {
  const level = levels[levelName];
  const grid = level.grid;
  const _ctx = (toPreRender ? cacheCtx : ctx);

  for (let i = 0, l = level.colorKey.length; i < l; i++) {
    _ctx.fillStyle = level.colorKey[i];
    for (let j = 0, _l = grid.length; j < _l; j++) {
      for (let k = 0, __l = grid[j].length; k < __l; k++) {
        if (grid[j][k] === i) {
          _ctx.fillRect(j*tileSize, k*tileSize, tileSize, tileSize);
        }
      }
    }
  }
}

function renderGridFromCache () {
  ctx.drawImage(cacheCanvas, 0, 0);
}

export {
  levels,
  renderGrid, 
  renderGridFromCache, 
  tileSize
};
