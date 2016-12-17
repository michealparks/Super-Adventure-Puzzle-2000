const Sound = require('./model')

class Effects extends Sound {
  constructor () {
    super([
      'hit.wav',
      'explosion.wav',
      'talk.wav'
    ], 'effects')
  }

}

module.exports = new Effects()
