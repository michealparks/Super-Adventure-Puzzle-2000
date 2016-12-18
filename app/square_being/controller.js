const config = require('../utils/global')
const { createExplosion } = require('../particle/controller')
const { spliceArray } = require('../utils/core')

class BeingsArray {
  constructor () {
    this.array = []
  }

  add (actor) {
    this.array.push(actor)
  }

  delete (i) {
    return spliceArray(this.array, i)
  }

  explode (i) {
    const deleted = this.array[i]

    createExplosion(
      (deleted.x * this.TILE_SIZE) + this.CENTER_OFFSET,
      (deleted.y * this.TILE_SIZE) + this.CENTER_OFFSET,
      deleted.fill,
      15
    )

    this.delete(i)
  }
}

BeingsArray.prototype.TILE_SIZE = config.TILE_SIZE
BeingsArray.prototype.CENTER_OFFSET = config.TILE_SIZE / 2

module.exports = BeingsArray
