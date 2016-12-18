const BeingsArray = require('../square_being/controller')

class Friends extends BeingsArray {
  render (ctx) {
    for (let f, p, i = 0, il = this.array.length; i < il; i++) {
      f = this.array[i]

      if (!f.isOnPath && f.hasPaths) {
        p = f.pathList.pop()
        f.setDirection(p[0], p[1])
        f.hasPaths = f.pathList.length > 0
        f.makeMovement()
      }

      f.render(ctx)
    }
  }
}

module.exports = new Friends()
