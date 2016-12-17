const { subscribe } = require('./mediator')
const { events } = require('./enums')

const config = {
  IS_PAUSED: true,
  IS_PLAYER_FROZEN: false,
  IS_LEVEL_EXITABLE: false,

  SCALE: window.devicePixelRatio,
  TILE_SIZE: Math.ceil(window.devicePixelRatio * window.innerWidth / 15),

  CANVAS_WIDTH: window.innerWidth * window.devicePixelRatio,
  CANVAS_HEIGHT: window.innerHeight * window.devicePixelRatio,

  SHAKE_MAGNITUDE: 0
}

subscribe(events.PAUSE, function () {
  config.IS_PAUSED = true
})

subscribe(events.RESUME, function () {
  config.IS_PAUSED = false
})
subscribe(events.PLAYER_FROZEN, function () {
  this.IS_PLAYER_FROZEN = true
})

subscribe(events.PLAYER_UNFROZEN, function () {
  this.IS_PLAYER_FROZEN = false
})

module.exports = config
