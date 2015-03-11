import GLOBAL               from 'utils/global';
import {subscribe, publish} from 'utils/mediator';
import {ctx}                from 'canvas/controller';

import level_1 from 'level/levels/level_1/model';
import level_2 from 'level/levels/level_2/model';

const tileSize = GLOBAL.tileSize;

class Levels {
  constructor() {
    this._current = null;
    this.level_1 = level_1;
    this.level_2 = level_2;

    this.canvasNode = document.getElementById('canvas');
  }

  get current()     { return this._current; }
  set current(name) { this._current = this[name]; }

  get currentGrid() { return this._current.gridData.grid; }

  load(name, done) {

    this.canvasNode.classList.add('faded');
    publish('GLOBAL::pause');
    publish('Levels::exit');

    window.setTimeout(() => {
      this._current && this._current.clean();
      this._current = this[name];
      this._current.build();
      this._current.startEvent();
      publish('Levels::load', this._current);
      publish('GLOBAL::resume');

      done && done();

      this.canvasNode.classList.remove('faded');
    }, 300);
  }

  renderGrid(ctx) {
    console.log(this._current)
    const level = this._current;
    const data = level.gridData;
    const grid = data.grid;
    const posX = data.position.x * tileSize;
    const posY = data.position.y * tileSize;
    const entrances = data.entrances;
    const exits = data.exits;

    for (let i = 0, il = level.colorKey.length; i < il; i++) {
      ctx.fillStyle = level.colorKey[i];

      for (let j = 0, jl = grid.length; j < jl; j++) {
        for (let k = 0, kl = grid[j].length; k < kl; k++) {

          if (grid[j][k] === i) {

            if (i == 1 || i == 2) {
              let tile;

              if (i == 1) tile = entrances.get(`${j},${k}`);
              if (i == 2) tile = exits.get(`${j},${k}`);

              if (tile.leadsTo === null) {

                ctx.fillStyle = level.colorKey[0];
                ctx.fillRect(posX+(j*tileSize), posY+(k*tileSize), tileSize, tileSize);
              
              } else {

                ctx.fillRect(posX+(j*tileSize), posY+(k*tileSize), tileSize, tileSize);

                const gx = posX+((j+tile.dir.x)*tileSize);
                const gy = posY+((k+tile.dir.y)*tileSize);
                const gradient = ctx.createLinearGradient(
                  gx, 
                  gy, 
                  gx + (tile.dir.x * tileSize),
                  gy + (tile.dir.y * tileSize)
                );
                gradient.addColorStop(0, 'rgba(255,255,255,1)');
                gradient.addColorStop(1, 'rgba(255,255,255,0)');

                ctx.fillStyle = gradient;
                ctx.fillRect(gx, gy, tileSize, tileSize);
              }

            } else {
              ctx.fillRect(posX+(j*tileSize), posY+(k*tileSize), tileSize, tileSize);
            }
          }

        }
      }
    }
  }
}

export default new Levels();

