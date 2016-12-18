const { subscribe } = require('../../utils/mediator')
const { events } = require('../../utils/enums')
const Levels = require('../../level')
const Player = require('../../player')

let grid
let entrances
let exits

subscribe(events.LOAD_LEVEL, onLevelLoad)
subscribe(events.PLAYER_LOCATION, onLocationChange)

function onLevelLoad (data) {
  grid = data.gridData.grid
  entrances = data.gridData.entrances
  exits = data.gridData.exits
}

function onLocationChange (location) {
  if (grid[location[0]][location[1]] === 1) {
    const entrance = entrances.get(`${location[0]},${location[1]}`)

    if (!entrance.leadsTo || Player.isEntering) {
      return
    }

    return Levels.load(entrance.leadsTo.level)
  }

  if (grid[location[0]][location[1]] === 2) {
    const exit = exits.get(`${location[0]},${location[1]}`)

    if (!exit.leadsTo) return

    return Levels.load(exit.leadsTo.level)
  }

  Player.isEntering = false
}
