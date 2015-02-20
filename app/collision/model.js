import {GLOBAL}             from 'utils/global';
import {publish, subscribe} from 'utils/mediator'

import {bips}    from 'bip/controller';
import {enemies} from 'enemy/controller';
import {levels}  from 'level/controller';

import {effects} from 'sound/effects';

const tileSize = GLOBAL.tileSize;

let grid;

subscribe('load::level', (level) => { 
  grid = level.gridData.grid; 

  window.setTimeout(seekCollisions, 1000/60);
});

function seekCollisions() {
  // Reverse loops are necessary to prevent indexing issues
  // since array is spliced during the loop.
  let b = bips.array;
  let i = b.length;
  while (i-- > 0) {
    let bip = b[i];

    if (detectWallCollision(bip.x, bip.y, bip.dx, bip.dy, grid)) {
      bip.stopMovement();
      effects.play('hit.wav');
    }

    let e = enemies.array;
    let j = e.length;
    while (j-- > 0) {
      let enemy = e[j];

      if (detectWallCollision(enemy.x, enemy.y, enemy.dx, enemy.dy, grid)) {
        enemy.stopMovement();
      }

      if (detectEnemyCollision(bip, enemy)) {
        if (! bip.hasShield) {
          bips.explode(i);
        }
        enemies.explode(j);
        effects.play('explosion.wav');
      }
    }
  }

  window.setTimeout(seekCollisions, 1000/60);
}

function detectWallCollision(x, y, dx, dy, grid) {
  if (Math.floor(x) !== x ||
      Math.floor(y) !== y) return false;

  publish('bip::location', [x, y]);

    // >
  if (dx > 0) {
    if (x+1 === grid.length) return true;
    if (grid[x+1][y] === 1) return true;
    // <
  } else if (dx < 0) {
    if (x === 0) return true;
    if (grid[x-1][y] === 1) return true;
    // v
  } else if (dy > 0) {
    if (y+1 === grid[x].length) return true;
    if (grid[x][y+1] === 1) return true;
    // ^
  } else if (dy < 0) {
    if (y === 0) return true;
    if (grid[x][y-1] === 1) return true;
  }

  return false;
}

function detectEnemyCollision(bip, enemy) {
  if (bip.y === enemy.y) {
    // left
    if (enemy.x - bip.x < 1 && enemy.x - bip.x > 0) return true;
    // right
    if (bip.x - enemy.x < 1 && bip.x - enemy.x > 0) return true;
  }

  if (bip.x === enemy.x) {
    // top
    if (bip.y - enemy.y < 1 && bip.y - enemy.y > 0) return true;
    // bottom
    if (enemy.y - bip.y < 1 && enemy.y - bip.y > 0) return true;
  }
}



