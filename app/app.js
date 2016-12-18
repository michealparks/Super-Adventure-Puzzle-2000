
const Levels = require('./level')

require('./level/events')
require('./render')
require('./input')
require('./collision')

Levels.load(1)
