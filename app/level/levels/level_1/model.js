const Level = require('../../model')
const config = require('./config')
const events = require('./events')

module.exports = new Level(config, events)
