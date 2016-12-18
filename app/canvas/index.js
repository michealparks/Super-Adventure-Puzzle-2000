const config = require('../utils/global')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const cacheCanvas = document.createElement('canvas')
const cacheCtx = cacheCanvas.getContext('2d')

cacheCanvas.height = canvas.height = config.CANVAS_HEIGHT
cacheCanvas.width = canvas.width = config.CANVAS_WIDTH

let curZoom = 1
let curTranslateX = 0
let curTranslateY = 0
let desiredZoom = 1

function zoomToPoint (point, toSize, time, easingName) {
  desiredZoom = toSize

  cacheCtx.drawImage(canvas, 0, 0)

  const centerX = Math.round(canvas.width / 2)
  const centerY = Math.round(canvas.height / 2)
  const distanceX = -(centerX - (point.x * config.TILE_SIZE))
  const distanceY = -(centerY - (point.y * config.TILE_SIZE))
  const velocityX = distanceX / time
  const velocityY = distanceY / time
  const zoomSpeed = Math.abs(toSize - curZoom) / time

  function frame () {
    if (curZoom >= desiredZoom) {
      curZoom = desiredZoom
      return
    }

    curZoom += zoomSpeed
    curTranslateX += (velocityX / curZoom)
    curTranslateY += (velocityY / curZoom)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.scale(curZoom, curZoom)
    ctx.translate(centerX + curTranslateX, centerY + curTranslateY)
    ctx.drawImage(cacheCanvas, -centerX, -centerY)
    ctx.restore()

    window.requestAnimationFrame(frame)
  }

  window.requestAnimationFrame(frame)
}

module.exports = {
  canvas,
  ctx,
  zoomToPoint
}
