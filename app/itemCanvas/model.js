const { canvas } = require('../canvas/controller')
const { cacheCanvas } = require('../cacheCanvas/controller')

const itemCanvas = document.document.getElementById('item-canvas')
const itemCtx = cacheCanvas.getContext('2d')

cacheCanvas.height = canvas.height
cacheCanvas.width = canvas.width

module.exports = {
  itemCanvas,
  itemCtx
}
