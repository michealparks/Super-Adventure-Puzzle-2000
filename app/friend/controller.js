const BeingsArray = require('../square_being/controller')

class Friends extends BeingsArray {
  render (ctx) {
    for (let f, i = 0, il = this._array.length; i < il; i++) {
      f = this._array[i]

      if (!f.isOnPath && f.hasPaths) {
        f.direction = f.pathList.pop()
        f.hasPaths = f.pathList.length > 0
        f.makeMovement()
      }

      f.render(ctx)
    }
  }
}

module.exports = new Friends()
