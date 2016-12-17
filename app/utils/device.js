const hasTouch = 'ontouchstart' in window
const ptrEnabled = navigator.pointerEnabled || navigator.msPointerEnabled
const ptrdown = ptrEnabled ? 'pointerdown' : hasTouch ? 'touchstart' : 'mousedown'
const ptrmove = ptrEnabled ? 'pointermove' : hasTouch ? 'touchmove' : 'mousemove'
const ptrup = ptrEnabled ? 'pointerup' : hasTouch ? 'touchend' : 'mouseup'

module.exports = {
  hasTouch,
  ptrEnabled,
  ptrdown,
  ptrmove,
  ptrup
}
