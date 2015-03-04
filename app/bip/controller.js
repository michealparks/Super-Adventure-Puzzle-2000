import BeingsArray from 'square_being/controller';

class Bips extends BeingsArray {
  constructor() {
    super();
  }

  render(ctx) {
    for (let i = 0, il = this._array.length; i < il; i++) {
      this._array[i].render(ctx);
    }
  }
}

export default new Bips();
