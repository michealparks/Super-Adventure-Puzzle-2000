const config = require('../utils/global')
const { createExplosion } = require('../particle/controller')

class BeingsArray {
  constructor () {
    this._array = []
    this._current = null
    this.centerOffset = config.TILE_SIZE / 2
    this.tileSize = config.TILE_SIZE
  }

  get array () {
    return this._array
  }
  get current () {
    return this._current
  }

  get locations () {
    const l = this._array.length
    let locationsX = new Uint8Array(new ArrayBuffer(l))
    let locationsY = new Uint8Array(new ArrayBuffer(l))
    for (let i = 0; i < l; i++) {
      locationsX[i] = this._array[i].x
      locationsY[i] = this._array[i].y
    }
    return [locationsX, locationsY]
  }

  add (being) {
    this._array.push(being)
    this._current = being
  }

  delete (i) {
    return this._array.splice(i, 1)[0]
  }

  explode (i) {
    const deleted = this.delete(i)

    config.SHAKE_MAGNITUDE = 15

    createExplosion(
      (deleted.x * this.tileSize) + this.centerOffset,
      (deleted.y * this.tileSize) + this.centerOffset,
      deleted.fill)
  }
}

module.exports = BeingsArray
