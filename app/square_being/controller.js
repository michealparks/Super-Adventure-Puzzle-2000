import GLOBAL    from 'utils/global';
import Particles from 'particle/controller';

const tileSize = GLOBAL.tileSize;
const centerOffset = tileSize / 2;

export default class BeingsArray {
  constructor() {
    this._array = [];
    this._current = null;
  }

  get array()   { return this._array; }
  get current() { return this._current; }

  get locations() {
    const l = this._array.length;
    let locationsX = new Uint8Array(new ArrayBuffer(l));
    let locationsY = new Uint8Array(new ArrayBuffer(l));
    for (let i = 0; i < l; i++) {
      locationsX[i] = this._array[i].x;
      locationsY[i] = this._array[i].y;
    }
    return [locationsX, locationsY];
  }

  add(being) {
    this._array.push(being);
    this._current = being;
  } 

  delete(i) {
    return this._array.splice(i, 1)[0];
  }

  explode(i) {
    const deleted = this.delete(i);
    particles.createExplosion(
      (deleted.x * tileSize) + centerOffset,
      (deleted.y * tileSize) + centerOffset,
      deleted.fill);
  }
}