const config = require('../utils/global')
const { subscribe } = require('../utils/mediator')
const { events } = require('../utils/enums')
const Player = require('../player')
const Enemies = require('../enemy/controller')
const Friends = require('../friend/controller')
const { renderParticles } = require('../particle/controller')
const Levels = require('../level')
const { canvas, ctx } = require('../canvas')
const { cacheCtx, cacheCanvas } = require('../cache-canvas')

let frameId = 0
let lastTime = 0

subscribe(events.PAUSE, pause)
subscribe(events.RESUME, resume)

function preShake () {
  ctx.save()

  ctx.translate(
    Math.random() * config.SHAKE_MAGNITUDE,
    Math.random() * config.SHAKE_MAGNITUDE
  )

  config.SHAKE_MAGNITUDE -= 0.5
}

function postShake () {
  ctx.restore()
}

function frame (timeStamp) {
  const delta = lastTime - timeStamp
  lastTime = timeStamp

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (config.SHAKE_MAGNITUDE > 0) preShake()

  ctx.drawImage(cacheCanvas, 0, 0)

  Enemies.render(ctx, delta)
  Friends.render(ctx, delta)
  Player.render(ctx, delta)
  renderParticles(ctx, delta)

  if (config.SHAKE_MAGNITUDE > 0) postShake()

  frameId = window.requestAnimationFrame(frame)
}

function resume () {
  Levels.renderGrid(cacheCtx)
  frameId = window.requestAnimationFrame(frame)
}

function pause () {
  window.cancelAnimationFrame(frameId)
}
