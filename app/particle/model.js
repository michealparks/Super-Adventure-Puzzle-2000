const config = require('../utils/global')

class Particle {
  constructor (x, y, c, r, ss, vx, vy) {
    this.x = x
    this.y = y
    this.color = c
    this.radius = r
    this.scaleSpeed = ss
    this.velocityX = vx
    this.velocityY = vy
    this.scale = 1.0
    this.frameDelay = 1000.0 / 60
    this.tileSize = config.TILE_SIZE
  }

  update () {
    this.scale -= this.scaleSpeed * this.frameDelay / 1000.0

    if (this.scale <= 0) return false

    this.x += this.velocityX * this.frameDelay / 1000.0
    this.y += this.velocityY * this.frameDelay / 1000.0

    return true
  }

  render (ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale(this.scale, this.scale)
    ctx.fillStyle = this.color
    ctx.fillRect(-this.tileSize / 2, -this.tileSize / 2, this.radius * 2, this.radius * 2)
    ctx.restore()
  }
}

module.exports = Particle
