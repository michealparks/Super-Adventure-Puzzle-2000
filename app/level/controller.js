import GLOBAL               from 'utils/global';
import {subscribe, publish} from 'utils/mediator';

import level_1 from 'level/levels/level_1/model';
import level_2 from 'level/levels/level_2/model';

const tileSize = GLOBAL.tileSize;

class Levels {
  constructor() {
    this._current = null;
    this.level_1 = level_1;
    this.level_2 = level_2;

    subscribe('event::exit', (next) => {
      publish('GLOBAL::pause');
      this.level(next, () => { publish('GLOBAL::resume') })
    })
  }

  get current()     { return this._current; }
  set current(name) { this._current = this[name]; }

  get currentGrid() { return this._current.gridData.grid; }

  load(name, done) {
    this._current = this[name];
    this._current.build();
    this._current.startEvent();
    publish('load::level', this._current);
    done();
  }

  renderGrid(ctx) {
    const level = this._current;
    const grid = level.gridData.grid;
    const posX = level.gridData.position.x * tileSize;
    const posY = level.gridData.position.y * tileSize;

    for (let i = 0, il = level.colorKey.length; i < il; i++) {
      ctx.fillStyle = level.colorKey[i];
      for (let j = 0, jl = grid.length; j < jl; j++) {
        for (let k = 0, kl = grid[j].length; k < kl; k++) {
          if (grid[j][k] === i) {
            ctx.fillRect(posX+(j*tileSize), posY+(k*tileSize), tileSize, tileSize);
          }
        }
      }
    }
  }
}

export let levels = new Levels();

