import {SquareBeing} from 'square_being/model';
import {levels} from 'level/model';
import {Bip} from 'bip/model';

export class Enemy extends SquareBeing {
  constructor (x, y, v) {
    super(x, y, v);
    this.fill = '#89414e';
    this.hasPaths = false;
    this.pathList = null;
  }

  getPath () {
    let steps = Math.floor(Math.random()*5);

    this.pathList = [];

    while (steps-- > 0) {
      const a = Math.round(Math.random()*1);
      const b = Math.round(Math.random()*1);
      const c = b === 0 ? 1 : -1;

      if (a === 1) {
        this.pathList.push([0,c]);
      } else {
        this.pathList.push([c,0]);
      }
    }

    this.hasPaths = this.pathList.length > 0;
  }

  static getEnemies () {
    return this.enemies;
  }

  static addEnemy (enemy) {
    this.enemies = this.enemies || [];
    this.enemies.push(enemy);
  }

  static delete (i) {
    this.enemies.splice(i, 1);
  }

  static getLocations () {
    let locationsX = new Uint8Array(new ArrayBuffer(this.enemies.length));
    let locationsY = new Uint8Array(new ArrayBuffer(this.enemies.length));
    let i = this.enemies.length;
    while (i-- > 0) {
      locationsX[i] = this.enemies[i].x;
      locationsY[i] = this.enemies[i].y;
    }
    return [locationsX, locationsY];
  }

  static renderAll () {
    const enemies = this.enemies;

    let i = enemies.length;
    while (i-- > 0) {
      if (! enemies[i].hasPaths) {
        enemies[i].getPath();
      }

      if (! enemies[i].isOnPath && enemies[i].hasPaths) {
        const path = enemies[i].pathList.pop();
        enemies[i].hasPaths = enemies[i].pathList.length > 0;
        enemies[i].setMovement(path[0], path[1]);
        enemies[i].makeMovement();
      }

      enemies[i].render();
    }
  }
}
