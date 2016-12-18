const Level = require('../../model')

module.exports = new Level(
  require('./config'),
  require('./events')
)
