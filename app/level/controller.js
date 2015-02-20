import {GLOBAL} from 'utils/global';

import {data as level_1} from 'level/levels/level_1/model';

const tileSize = GLOBAL.tileSize;

class Levels {
  constructor() {
    this._current = null;
    this.level_1 = level_1;
  }

  get current()     { return this._current; }
  set current(name) { this._current = this[name]; }

  get currentGrid() { return this._current.gridData.grid; }

  renderGrid(ctx) {
    const level = this._current;
    const grid = level.gridData.grid;

    for (let i = 0, il = level.colorKey.length; i < il; i++) {
      ctx.fillStyle = level.colorKey[i];
      for (let j = 0, jl = grid.length; j < jl; j++) {
        for (let k = 0, kl = grid[j].length; k < kl; k++) {
          if (grid[j][k] === i) {
            ctx.fillRect(j*tileSize, k*tileSize, tileSize, tileSize);
          }
        }
      }
    }
  }
}

export let levels = new Levels();

