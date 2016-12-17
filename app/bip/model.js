const { subscribe } = require('../utils/mediator')
const { events } = require('../utils/enums')
const config = require('../utils/global')
const { ctx } = require('../canvas/controller')
const SquareBeing = require('../square_being/model')

class Bip extends SquareBeing {
  constructor (x, y, v) {
    super(x, y, v)
    this.type = 'bip'
    this.image = new window.Image()
    this.image.src = 'img/bip.png'
    this.fill = '#ffffff'
    this.isEntering = true

    this.animLevel = 1
    this.shieldLevel = 1
    this.shieldLevelDiff = 0
    this.shieldAlpha = 0
    this.isTakingDamage = false
    this.shouldFadeOut = false
    this.shouldFadeIn = false
    this.isVisible = false

    this.switchFadeOut = this.switchFadeOut.bind(this)
    this.startHealing = this.startHealing.bind(this)

    subscribe(events.RESUME, this.makeMovement.bind(this))
    subscribe(events.PLAYER_FROZEN, this.stopMovement.bind(this))
  }

  switchFadeOut () {
    this.shouldFadeOut = true
  }

  fadeOutShield () {
    if (this.shieldAlpha >= 0) {
      this.shieldAlpha -= 0.01
    } else {
      this.shouldFadeOut = false
    }
  }

  fadeInShield () {
    if (this.shieldAlpha < 1) {
      this.shieldAlpha += 0.05
    } else {
      this.shouldFadeIn = false
    }
  }

  startHealing () {
    if (this.shieldLevel + 0.001 >= 1) {
      this.shieldLevel = 1
      return
    }

    this.shieldLevel += 0.001
    this.animLevel = this.shieldLevel

    this.shieldRegenTimerId = setTimeout(this.startHealing, 1000 / 60)
  }

  stopHealing () {
    clearTimeout(this.shieldRegenTimerId)
  }

  renderShieldChange () {
    if (this.shouldFadeOut) this.fadeOutShield()
    if (this.shouldFadeIn) this.fadeInShield()

    if (this.isVisible && this.shieldLevel === 1) {
      this.isTakingDamage = false
      setTimeout(this.switchFadeOut, 500)
    }

    if (this.isTakingDamage) {
      this.animLevel = Math.round((this.animLevel + this.shieldLevelDiff) * 100) / 100
    }

    if (this.isTakingDamage && this.shieldLevel === this.animLevel) {
      this.stopHealing()

      this.isTakingDamage = false
      this.shieldRegenTimerId = setTimeout(this.startHealing, 500)
    }

    ctx.fillStyle = `rgba(241, 196, 15, ${this.shieldAlpha})`
    ctx.fillRect(0, 0, this.CANVAS_WIDTH * this.animLevel, 10)
  }

  changeShieldLevel (x) {
    this.isTakingDamage = x < this.shieldLevel

    if (this.isTakingDamage) {
      this.stopHealing()
    }

    this.shouldFadeIn = true
    this.shieldLevel = x
    this.shieldLevelDiff = x < this.animLevel ? -0.02 : 0.02
  }
}

Bip.prototype.CANVAS_WIDTH = config.CANVAS_WIDTH

module.exports = Bip
