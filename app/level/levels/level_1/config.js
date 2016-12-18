let config = {}

config.levelName = 'The Cramped Caverns of Confusion'

config.canExit = true

config.position = { x: 3, y: 9 }
config.width = 9
config.height = 9

let entrances = new Map()
entrances.set('2,0', {
  x: 2,
  y: 0,
  leadsTo: null
})

let exits = new Map()
exits.set('4,0', {
  x: 4,
  y: 0,
  dir: { x: 0, y: 1 },
  leadsTo: {
    level: 1,
    entrance: 0
  }
})
exits.set('8,8', {
  x: 8,
  y: 8,
  dir: { x: -1, y: 0 },
  leadsTo: {
    level: 2,
    entrance: 0
  }
})

config.gridData = (function (width, height) {
  let grid = []
  for (let i = 0; i < width; i++) {
    grid.push(new Int8Array(height))
  }

  grid[2][0] = 1
  grid[4][0] = 2

  return {
    grid,
    position: config.position,
    width,
    height,
    entrances,
    exits
  }
})(config.width, config.height)

config.colorKey = []
config.colorKey[0] = '#333333' // Ground
config.colorKey[1] = '#ffffff' // Entrance
config.colorKey[2] = '#ffffff' // Exit
config.colorKey[3] = '#555555' // Wall

module.exports = config
