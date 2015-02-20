import {SquareBeing} from 'square_being/model';

export class Enemy extends SquareBeing {
  constructor(x, y, v) {
    super(x, y, v);
    this.type = 'enemy';
    this.fill = '#89414e';
    this.hasPaths = false;
    this.pathList = null;
  }

  createSimpleRandomPath() {
    let steps = Math.floor(Math.random()*5);

    this.pathList = [];

    while (steps-- > 0) {
      const a = Math.round(Math.random()*1);
      const b = Math.round(Math.random()*1);
      const c = b === 0 ? 1 : -1;

      if (a === 1) this.pathList.push([0, c]);
      else         this.pathList.push([c, 0]);
    }

    this.hasPaths = this.pathList.length > 0;
  }
}
