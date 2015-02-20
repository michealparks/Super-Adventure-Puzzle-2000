import {BeingsArray} from 'square_being/controller';

class Enemies extends BeingsArray {
  constructor() {
    super();
  }

  render(ctx) {
    for (let i = 0, il = this._array.length, enemy; enemy = this._array[i], i < il; i++) {
      if (! enemy.hasPaths) enemy.createSimpleRandomPath();
      
      if (! enemy.isOnPath && enemy.hasPaths) {
        enemy.direction = enemy.pathList.pop();
        enemy.hasPaths = enemy.pathList.length > 0;
        enemy.makeMovement();
      }

      enemy.render(ctx);
    }
  }
}

export let enemies = new Enemies();