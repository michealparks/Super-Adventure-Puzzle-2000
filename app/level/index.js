const config = require('../utils/global')
const { events } = require('../utils/enums')
const { publish } = require('../utils/mediator')
const tileSize = config.TILE_SIZE
const canvasCL = document.getElementById('canvas').classList

const levels = [
  require('./levels/level_1/model'),
  require('./levels/level_2/model')
]

let currentLevel
let levelNum
let onLoadDone

function load (num, done) {
  levelNum = num
  onLoadDone = done
  canvasCL.add('faded')
  publish(events.PAUSE)
  publish(events.EXIT_LEVEL)

  setTimeout(finishLoad, 300)
}

function finishLoad () {
  if (currentLevel) currentLevel.clean()

  currentLevel = levels[levelNum]
  currentLevel.build()
  currentLevel.startEvent()

  publish(events.LOAD_LEVEL, currentLevel)
  publish(events.RESUME)

  if (onLoadDone) onLoadDone()

  canvasCL.remove('faded')
}

function renderGrid (ctx) {
  const level = currentLevel
  const data = level.gridData
  const {grid, entrances, exits} = data
  const posX = data.position.x * tileSize
  const posY = data.position.y * tileSize

  for (let i = 0, il = level.colorKey.length; i < il; i++) {
    ctx.fillStyle = level.colorKey[i]

    for (let j = 0, jl = grid.length; j < jl; j++) {
      for (let k = 0, kl = grid[j].length; k < kl; k++) {
        if (grid[j][k] === i) {
          if (i === 1 || i === 2) {
            let tile

            if (i === 1) tile = entrances.get(`${j},${k}`)
            if (i === 2) tile = exits.get(`${j},${k}`)

            if (tile.leadsTo === null) {
              ctx.fillStyle = level.colorKey[0]
              ctx.fillRect(posX + (j * tileSize), posY + (k * tileSize), tileSize, tileSize)
            } else {
              ctx.fillRect(posX + (j * tileSize), posY + (k * tileSize), tileSize, tileSize)

              const gx = posX + ((j + tile.dir.x) * tileSize)
              const gy = posY + ((k + tile.dir.y) * tileSize)
              const gradient = ctx.createLinearGradient(
                gx,
                gy,
                gx + (tile.dir.x * tileSize),
                gy + (tile.dir.y * tileSize)
              )
              gradient.addColorStop(0, 'rgba(255,255,255,1)')
              gradient.addColorStop(1, 'rgba(255,255,255,0)')

              ctx.fillStyle = gradient
              ctx.fillRect(gx, gy, tileSize, tileSize)
            }
          } else {
            ctx.fillRect(posX + (j * tileSize), posY + (k * tileSize), tileSize, tileSize)
          }
        }
      }
    }
  }
}

module.exports = {
  load,
  renderGrid
}
