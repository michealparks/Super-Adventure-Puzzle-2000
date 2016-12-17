const { subscribe } = require('../utils/mediator')
const { events } = require('../utils/enums')
const { ctx } = require('../canvas/controller')
const SquareBeing = require('../square_being/model')

class Bip extends SquareBeing {
  constructor (x, y, v) {
    super(x, y, v)
    this.type = 'bip'
    this.image = new window.Image()
    this.image.src = `img/bip.png`
    this.fill = '#ffffff'

    this.shield = {
      alpha: 0,
      level: 1,
      animatedLevel: 1
    }

    this.shieldAnimLevel = 1
    this.shieldLevel = 1
    this.shieldLevelDiff = 0
    this.shieldChange = false
    this.shieldAlpha = 0
    this.isEntering = true

    subscribe(events.RESUME, this.makeMovement.bind(this))
    subscribe(events.PLAYER_FROZEN, this.stopMovement.bind(this))
  }

  absorbDamage (damageAmount) {
    this.shield.level -= damageAmount

    // renderShield()
  }

  renderShieldChange () {
    if (this.shieldAnimLevel === this.shieldLevel) {
      if (this.shieldAlpha === 1) {
        this.shieldChange = false
        return
      } else {
        this.shieldAlpha -= 0.01
      }
    } else {
      this.shieldAnimLevel = Math.round((this.shieldAnimLevel + this.shieldLevelDiff) * 100) / 100
      if (this.shieldAlpha < 1) this.shieldAlpha += 0.05
    }

    ctx.fillStyle = `rgba(241, 196, 15, ${this.shieldAlpha})`
    ctx.fillRect(0, 0, window.innerWidth * this.shieldAnimLevel, 10)
  }

  changeShieldLevel (x) {
    this.shieldLevel = x
    this.shieldLevelDiff = x < this.shieldAnimLevel ? -0.02 : 0.02
    this.shieldChange = true
  }
}

module.exports = Bip
