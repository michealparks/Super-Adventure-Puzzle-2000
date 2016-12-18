const BeingsArray = require('../square_being/controller')

class Enemies extends BeingsArray {
  render (ctx) {
    for (let e, p, i = 0, l = this.array.length; i < l; i++) {
      e = this.array[i]

      if (!e.hasPaths) {
        e.createSimpleRandomPath()
      }

      if (!e.isOnPath && e.hasPaths) {
        p = e.pathList.pop()
        e.setDirection(p[0], p[1])
        e.hasPaths = e.pathList.length > 0
        e.makeMovement()
      }

      e.render(ctx)
    }
  }
}

module.exports = new Enemies()
