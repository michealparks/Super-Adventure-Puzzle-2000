import {levels} from 'grid/model';
import {ctx} from 'canvas/controller';
import {tileSize} from 'config/model';

function renderTile (x, y, tileType) {
  switch (tileType) {
    case 1:
      ctx.fillStyle = '#555555';
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
