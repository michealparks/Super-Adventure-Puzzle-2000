
const Levels = require('./level/controller')

require('./render/controller')
require('./bip/controller')
require('./user_input/controller')
require('./level/events/model')

require('./collision/model')

Levels.load('level_2')
