const config = require('../utils/global')
const { ptrdown, ptrmove, ptrup } = require('../utils/device')
const Bips = require('../bip/controller')

class UserInput {
  constructor () {
    this.ptrDownX = 0
    this.ptrDownY = 0

    window.addEventListener('keyup', (e) => {
      return config.IS_PAUSED
        ? this.onOutGameKeyUp(e)
        : this.onInGameKeyUp(e)
    })

    window.addEventListener(ptrdown, (e) => {
      if (config.IS_PAUSED) return

      this.onInGamePtrDown(e)
    })

    window.addEventListener(ptrmove, (e) => {
      this.onPtrMove(e)
    })

    window.addEventListener(ptrup, (e) => {
      if (config.IS_PAUSED) return

      this.onInGamePtrUp(e)
    })
  }

  onInGameKeyUp (e) {
    const bip = Bips.current
    bip.stopMovement()
    bip.direction = [(e.keyCode - 38) % 2, (e.keyCode - 39) % 2]
    bip.makeMovement()
  }

  onOutGameKeyUp (e) {

  }

  onInGamePtrDown (e) {
    this.ptrDownX = e.pageX || e.touches[0].pageX
    this.ptrDownY = e.pageY || e.touches[0].pageY
  }

  onPtrMove (e) {
    e.preventDefault()
  }

  onInGamePtrUp (e) {
    const bip = Bips.current
    const swipeDeltaX = (e.pageX || e.changedTouches[0].pageX) - this.ptrDownX
    const swipeDeltaY = (e.pageY || e.changedTouches[0].pageY) - this.ptrDownY

    if (Math.abs(swipeDeltaX) > 10 || Math.abs(swipeDeltaY) > 10) {
      bip.stopMovement()
      if (Math.abs(swipeDeltaX) > Math.abs(swipeDeltaY)) {
        bip.direction = [swipeDeltaX > 0 ? 1 : -1, 0]
      } else {
        bip.direction = [0, swipeDeltaY < 0 ? -1 : 1]
      }
      bip.makeMovement()
    }
  }
}

module.exports = {
  userInput: new UserInput()
}
