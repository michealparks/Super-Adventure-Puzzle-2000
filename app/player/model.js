const { subscribe } = require('../utils/mediator')
const { events } = require('../utils/enums')
const config = require('../utils/global')
const SquareBeing = require('../square_being/model')
const { createExplosion } = require('../particle/controller')

class Player extends SquareBeing {
  constructor (x, y, v) {
    super(x, y, v)
    this.type = 'player'
    this.image = new window.Image()
    this.image.src = 'img/player.png'
    this.fill = '#ffffff'
    this.isEntering = true

    this.animLevel = 1
    this.shieldLevel = 1
    this.shieldLevelDiff = 0
    this.shieldAlpha = 0
    this.isTakingDamage = false
    this.shouldFadeOut = false
    this.shouldFadeIn = false

    this.switchFadeOut = this.switchFadeOut.bind(this)
    this.startHealing = this.startHealing.bind(this)

    subscribe(events.RESUME, this.makeMovement.bind(this))
    subscribe(events.PLAYER_FROZEN, this.stopMovement.bind(this))
  }

  switchFadeOut () {
    this.shouldFadeOut = true
  }

  fadeOutShield () {
    if (this.shieldAlpha > 0) {
      this.shieldAlpha -= 0.01
    } else {
      this.shieldAlpha = 0
      this.shouldFadeOut = false
    }
  }

  fadeInShield () {
    if (this.shieldAlpha < 1) {
      this.shieldAlpha += 0.05
    } else {
      this.shieldAlpha = 1
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

  renderShield (ctx) {
    if (this.shouldFadeOut) this.fadeOutShield()
    if (this.shouldFadeIn) this.fadeInShield()

    if (this.shieldAlpha === 1 && this.animLevel === 1) {
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

    console.log(this.animLevel)

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

  setLocation (x, y) {
    this.x = x
    this.y = y
  }

  explode () {
    createExplosion(
      (this.x * this.TILE_SIZE) + this.CENTER_OFFSET,
      (this.y * this.TILE_SIZE) + this.CENTER_OFFSET,
      this.fill,
      30
    )
  }

  render (ctx) {
    super.render(ctx)
    this.renderShield(ctx)
  }
}

Player.prototype.TILE_SIZE = config.TILE_SIZE
Player.prototype.CENTER_OFFSET = config.TILE_SIZE / 2
Player.prototype.CANVAS_WIDTH = config.CANVAS_WIDTH

module.exports = Player
