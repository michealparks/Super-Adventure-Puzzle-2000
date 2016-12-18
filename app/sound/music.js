const Sound = require('./model')

class Music extends Sound {
  constructor () {
    super([
      'travel_1.mp3',
      'travel_2.mp3'
    ], 'music')
  }
}

module.exports = new Music()
