const config = require('../utils/global')
const { ptrdown, ptrmove, ptrup } = require('../utils/device')
const Player = require('../player')

let ptrDownX = 0
let ptrDownY = 0

window.addEventListener('keyup', function (e) {
  return config.IS_PAUSED
    ? onOutGameKeyUp(e)
    : onInGameKeyUp(e)
})

window.addEventListener(ptrdown, function (e) {
  return config.IS_PAUSED
    ? null
    : onInGamePtrDown(e)
})

window.addEventListener(ptrmove, function (e) {
  return onPtrMove(e)
})

window.addEventListener(ptrup, function (e) {
  return config.IS_PAUSED
    ? null
    : onInGamePtrUp(e)
})

function acceptedKeys (keyCode) {
  return (
    keyCode === 37 ||
    keyCode === 38 ||
    keyCode === 39 ||
    keyCode === 40 ||
    keyCode === 65 ||
    keyCode === 68 ||
    keyCode === 83 ||
    keyCode === 87
  )
}

function onOutGameKeyUp (e) {

}

function onInGameKeyUp (e) {
  let key = e.keyCode

  if (!acceptedKeys(key)) return
  if (key === 87) key = 38
  if (key === 83) key = 40
  if (key === 65) key = 37
  if (key === 68) key = 39

  Player.stopMovement()
  Player.setDirection((key - 38) % 2, (key - 39) % 2)
  Player.makeMovement()
}

function onInGamePtrDown (e) {
  ptrDownX = e.pageX || e.touches[0].pageX
  ptrDownY = e.pageY || e.touches[0].pageY
}

function onPtrMove (e) {
  e.preventDefault()
}

function onInGamePtrUp (e) {
  const swipeDeltaX = (e.pageX || e.changedTouches[0].pageX) - ptrDownX
  const swipeDeltaY = (e.pageY || e.changedTouches[0].pageY) - ptrDownY

  if (Math.abs(swipeDeltaX) > 10 || Math.abs(swipeDeltaY) > 10) {
    Player.stopMovement()
    if (Math.abs(swipeDeltaX) > Math.abs(swipeDeltaY)) {
      Player.setDirection(swipeDeltaX > 0 ? 1 : -1, 0)
    } else {
      Player.setDirection(0, swipeDeltaY < 0 ? -1 : 1)
    }
    Player.makeMovement()
  }
}

