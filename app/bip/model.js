import {SquareBeing} from 'square_being/model';

class Bip extends SquareBeing {
  constructor (x, y, v) {
    super(x, y, v);
    this.fill = '#ffffff'
  }

  static getBips () {
    return this.bips;
  }

  static getCurBip () {
    return this.curBip || console.log('Attempting to get curBip. No bips.');
  }

  static addBip (bip) {
    this.bips = this.bips || [];
    this.bips.push(bip);
    this.curBip = bip;
  }

  static removeBip (coord) {
    let i = this.bips.length;
    while (i-- > 0) {
      if (this.bips[i].x === coord.x && this.bips[i].y === coord.y) {
        this.bips.splice(i, 1);
      }
    }
  }

  static getLocations () {
    let locationsX = new Uint8Array(new ArrayBuffer(this.bips.length));
    let locationsY = new Uint8Array(new ArrayBuffer(this.bips.length));
    let i = this.bips.length;
    while (i-- > 0) {
      locationsX[i] = this.bips[i].x;
      locationsY[i] = this.bips[i].y;
    }
    return [locationsX, locationsY];
  }

  static renderAll () {
    let i = this.bips.length;
    while (i-- > 0) {
      this.bips[i].render();
    }
  }

}

export {Bip};
