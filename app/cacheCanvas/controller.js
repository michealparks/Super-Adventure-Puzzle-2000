const { canvas } = require('../canvas/controller')
const cacheCanvas = document.createElement('canvas')
const cacheCtx = cacheCanvas.getContext('2d')

cacheCanvas.height = canvas.height
cacheCanvas.width = canvas.width

module.exports = {
  cacheCanvas,
  cacheCtx
}
