const config = require('../utils/global')
const cacheCanvas = document.createElement('canvas')
const cacheCtx = cacheCanvas.getContext('2d')

cacheCanvas.height = config.CANVAS_HEIGHT
cacheCanvas.width = config.CANVAS_WIDTH

module.exports = {
  cacheCanvas,
  cacheCtx
}
