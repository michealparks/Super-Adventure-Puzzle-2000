const config = require('../utils/global')
const { subscribe } = require('../utils/mediator')
const { events } = require('../utils/enums')
const Bips = require('../bip/controller')
const Enemies = require('../enemy/controller')
const Friends = require('../friend/controller')
const Particles = require('../particle/controller')
const Levels = require('../level/controller')
const { canvas, ctx } = require('../canvas/controller')
const { cacheCtx, cacheCanvas } = require('../cacheCanvas/controller')

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

  Bips.render(ctx, delta)
  Enemies.render(ctx, delta)
  Friends.render(ctx, delta)
  Particles.render(ctx, delta)

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
