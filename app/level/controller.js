import {ctx} from 'canvas/controller';
import {levels, tileSize} from 'level/model';

function renderGrid (levelName) {
  const level = levels[levelName];
  const grid = level.grid;

  ctx.fillStyle = level.colorKey[0];
  for (let i = 0, l = grid.length; i < l; i++) {
    for (let j = 0, l = grid[i].length; j < l; j++) {
      if (grid[i][j] === 0) {
        ctx.fillRect(i*tileSize, j*tileSize, tileSize, tileSize);
      }
    }
  }

  ctx.fillStyle = level.colorKey[1];
  for (let i = 0, l = grid.length; i < l; i++) {
    for (let j = 0, l = grid[i].length; j < l; j++) {
      if (grid[i][j] === 1) {
        ctx.fillRect(i*tileSize, j*tileSize, tileSize, tileSize);
      }
    }
  }

  // for (let i = 0, l = grid.length; i < l; i++) {
  //   for (let j = 0, l = grid[i].length; j < l; j++) {
  //     ctx.fillStyle = level.colorKey[grid[i][j]];
  //     ctx.fillRect(i*tileSize, j*tileSize, tileSize, tileSize);
  //   }
  // }
}

export {renderGrid, tileSize};
