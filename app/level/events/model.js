const { subscribe } = require('../../utils/mediator')
const { events } = require('../../utils/enums')
const Levels = require('../../level/controller')
const Bips = require('../../bip/controller')

class DefaultEvents {
  constructor () {
    this.level = null
    this.gridData = null
    this.canvasNode = document.getElementById('canvas')

    subscribe(events.LOAD_LEVEL, this.onLevelLoad.bind(this))
    subscribe(events.PLAYER_LOCATION, this.onLocationChange.bind(this))
  }

  onLevelLoad (level) {
    this.level = level
    this.gridData = level.gridData
  }

  onLocationChange (location) {
    if (this.gridData.grid[location[0]][location[1]] === 1) {
      const entrance = this.gridData.entrances.get(`${location[0]},${location[1]}`)

      if (!entrance.leadsTo || Bips.array[0].isEntering) {
        return
      }

      Bips.delete(0)
      return Levels.load(entrance.leadsTo.level)
    }

    if (this.gridData.grid[location[0]][location[1]] === 2) {
      const exit = this.gridData.exits.get(`${location[0]},${location[1]}`)

      if (!exit.leadsTo) return

      Bips.delete(0)

      return Levels.load(exit.leadsTo.level)
    }

    Bips.array[0].isEntering = false
  }
}

module.exports = new DefaultEvents()
