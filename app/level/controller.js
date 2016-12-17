const config = require('../utils/global')
const { events } = require('../utils/enums')
const { publish } = require('../utils/mediator')
const level1 = require('./levels/level_1/model')
const level2 = require('./levels/level_2/model')
const tileSize = config.TILE_SIZE

class Levels {
  constructor () {
    this._current = null
    this.level_1 = level1
    this.level_2 = level2
    this.canvasNode = document.getElementById('canvas')
    this.name = null
    this.done = null

    this.finishLoad = this.finishLoad.bind(this)
  }

  get current () {
    return this._current
  }

  set current (name) {
    this._current = this[name]
  }

  get currentGrid () {
    return this._current.gridData.grid
  }

  load (name, done) {
    this.name = name
    this.done = done
    this.canvasNode.classList.add('faded')
    publish(events.PAUSE)
    publish(events.EXIT_LEVEL)

    setTimeout(this.finishLoad, 300)
  }

  finishLoad () {
    this._current && this._current.clean()
    this._current = this[this.name]
    this._current.build()
    this._current.startEvent()
    publish(events.LOAD_LEVEL, this._current)
    publish(events.RESUME)

    if (this.done) this.done()

    this.canvasNode.classList.remove('faded')
  }

  renderGrid (ctx) {
    const level = this._current
    const data = level.gridData
    const grid = data.grid
    const posX = data.position.x * tileSize
    const posY = data.position.y * tileSize
    const entrances = data.entrances
    const exits = data.exits

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
}

module.exports = new Levels()
