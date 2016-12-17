const BeingsArray = require('../square_being/controller')

class Bips extends BeingsArray {
  render (ctx) {
    for (let b, i = 0, l = this._array.length; i < l; i++) {
      b = this._array[i]

      b.render(ctx)
      b.renderShieldChange()
    }
  }
}

module.exports = new Bips()
