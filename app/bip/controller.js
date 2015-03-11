import BeingsArray from 'square_being/controller';

class Bips extends BeingsArray {
  constructor() {
    super();
  }

  render(ctx) {
    for (let i = 0, bip; bip = this._array[i]; i++) {
      bip.render(ctx);

      if (bip.shieldChange) {
        bip.renderShieldChange();
      }
    }
  }
}

export default new Bips();
