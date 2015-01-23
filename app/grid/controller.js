import {levels} from 'grid/model';
import {ctx} from 'canvas/controller';
import {configs} from 'config/model';

const tileSize = configs.tileSize;

function renderTile (x, y, tileType) {
  switch (tileType) {
    case 1:
      ctx.fillStyle = '#555555';
      break;
    case 2:
      ctx.fillStyle = '#111111';
      break;
    case 3:
      ctx.fillStyle = '#222222';
      break;
    default:
      ctx.fillStyle = '#333333';
      break;
  }

  ctx.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
}

function renderGrid (levelName) {
  const grid = levels[levelName].grid;

  for (let i = 0, l = grid.length; i < l; i++) {
    for (let j = 0, l = grid[i].length; j < l; j++) {
      renderTile(i, j, grid[i][j]);
    }
  }
}

export {renderGrid};
