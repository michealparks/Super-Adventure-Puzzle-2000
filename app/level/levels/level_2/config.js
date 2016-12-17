const GeneratedTerrain = require('../generator')

let config = {}

config.levelName = ''

config.canExit = false

config.position = {x: 0, y: 0}
config.width = 15
config.height = 24

config.gridData = new GeneratedTerrain(
  config.width,
  config.height,
  config.position
)

config.colorKey = []

config.colorKey[0] = '#333333' // Ground
config.colorKey[1] = '#262626' // Entrance
config.colorKey[2] = '#222222' // Exit
config.colorKey[3] = '#555555' // Wall

module.exports = config

