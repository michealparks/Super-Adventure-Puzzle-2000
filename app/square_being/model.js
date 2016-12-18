const { events } = require('../utils/enums')
const { subscribe } = require('../utils/mediator')
const config = require('../utils/global')

class SquareBeing {
  constructor (x, y, v = 0.5) {
    this.x = x
    this.y = y
    this.dx = 0
    this.dy = 0
    this.velocity = v
    this.moveId = null
    this.gridPosition = { x: 0, y: 0 }
    this.isOnPath = false
    this.stopRequested = false
    this.tileSize = config.TILE_SIZE

    this.movementFrame = this.movementFrame.bind(this)

    subscribe(events.PAUSE, this.pauseMovement.bind(this))
    subscribe(events.LOAD_LEVEL, this.onLevelLoad.bind(this))
  }

  setDirection (dx, dy) {
    this.dx = dx
    this.dy = dy
  }

  onLevelLoad (level) {
    this.gridPosition.x = level.gridData.position.x * this.tileSize
    this.gridPosition.y = level.gridData.position.y * this.tileSize
  }

  movementFrame () {
    this.x += (this.velocity * this.dx)
    this.y += (this.velocity * this.dy)
    this.moveId = setTimeout(this.movementFrame, 1000 / 60)
  }

  makeMovement () {
    this.isOnPath = true
    this.moveId = setTimeout(this.movementFrame, 1000 / 60)
  }

  pauseMovement () {
    clearTimeout(this.moveId)
  }

  stopMovement () {
    clearTimeout(this.moveId)
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
    this.dx = 0
    this.dy = 0
    this.isOnPath = false
  }

  render (ctx) {
    ctx.fillStyle = this.fill

    ctx.drawImage(
      this.image,
      this.gridPosition.x + (this.x * this.tileSize),
      this.gridPosition.y + (this.y * this.tileSize),
      this.tileSize,
      this.tileSize
    )

    // ctx.fillRect(
    //   this.gridPosition.x + (this.x * this.tileSize),
    //   this.gridPosition.y + (this.y * this.tileSize),
    //   this.tileSize,
    //   this.tileSize)
  }
}

module.exports = SquareBeing

