const { canvas } = require('../canvas')
const { cacheCanvas } = require('../cache-canvas')

const itemCanvas = document.getElementById('item-canvas')
const itemCtx = cacheCanvas.getContext('2d')

cacheCanvas.height = canvas.height
cacheCanvas.width = canvas.width

module.exports = {
  itemCanvas,
  itemCtx
}
