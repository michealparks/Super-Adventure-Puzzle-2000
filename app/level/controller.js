import {levels} from 'level/model';
import {ctx} from 'canvas/controller';
import {configs} from 'config/model';

const tileSize = configs.tileSize;

function renderTile (x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
}

function renderGrid (levelName) {
  const level = levels[levelName];
  const grid = level.grid;

  for (let i = 0, l = grid.length; i < l; i++) {
    for (let j = 0, l = grid[i].length; j < l; j++) {
      renderTile(i, j, level.colorKey[grid[i][j]]);
    }
  }
}

export {renderGrid};
