const BeingsArray = require('../square_being/controller')

class Enemies extends BeingsArray {
  render (ctx) {
    for (let e, i = 0, l = this._array.length; i < l; i++) {
      e = this._array[i]

      if (!e.hasPaths) {
        e.createSimpleRandomPath()
      }

      if (!e.isOnPath && e.hasPaths) {
        e.direction = e.pathList.pop()
        e.hasPaths = e.pathList.length > 0
        e.makeMovement()
      }

      e.render(ctx)
    }
  }
}

module.exports = new Enemies()
