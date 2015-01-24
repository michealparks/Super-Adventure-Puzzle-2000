import {SquareBeing} from 'square_being/model';
import {levels} from 'level/model';
import {Bip} from 'bip/model';

class Enemy extends SquareBeing {
  constructor (x, y, v) {
    super(x, y, v);
    this.fill = '#89414e';
    this.hasPaths = false;
    this.isCalculatingPaths = false;
    this.worker = null;
    this.pathList = null;
  }

  startPath (e) {
    this.worker.terminate();
    this.isCalculatingPaths = false;
    this.pathList = e.data;
    this.hasPaths = this.pathList.length > 0;
  }

  getPath () {
    this.isCalculatingPaths = true;
    this.worker = new Worker('path.js');
    this.worker.onmessage = this.startPath.bind(this);
    this.worker.postMessage([levels.getCurrentGrid(), Bip.getLocations()]);
  }

  static getEnemies () {
    return this.enemies;
  }

  static addEnemy (enemy) {
    this.enemies = this.enemies || [];
    this.enemies.push(enemy);
  }

  static removeEnemy (coord) {
    let enemies = this.enemies;
    let i = enemies.length;
    while (i-- > 0) {
      if (enemies[i].x === coord.x && enemies[i].y === coord.y) {
        enemies.splice(i, 1);
      }
    }
  }

  static renderAll () {
    const enemies = this.enemies;
    let i = enemies.length;

    while (i-- > 0) {
      if (! enemies[i].hasPaths && ! enemies[i].isCalculatingPaths) {
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

export {Enemy};
