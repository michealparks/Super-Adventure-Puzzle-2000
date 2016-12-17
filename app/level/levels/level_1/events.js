const config = require('./config')
const { events } = require('../../../utils/enums')
const { publish } = require('../../../utils/mediator')
const Dialog = require('../../../dialog/model')
const Bip = require('../../../bip/model')
const Enemy = require('../../../enemy/model')
const Bips = require('../../../bip/controller')
const Enemies = require('../../../enemy/controller')

module.exports = [
  /**
   * Level start
   */
  {
    blocking: true,
    requirements: {},
    execute (done) {
      const entrance = config.gridData.entrances.get('2,0')
      Bips.add(new Bip(entrance.x, entrance.y, 0.25))
      done()
    }
  },

  /**
   *
   */
  {
    blocking: true,
    requirements: {},
    execute (done) {
      for (let i = 0; i < 6; i++) {
        Enemies.add(new Enemy(0, 0, 0.125))
      }

      function checkForEnemies () {
        if (Enemies.array.length > 0) {
          window.setTimeout(checkForEnemies, 400)
        } else {
          done()
        }
      }

      checkForEnemies()
    }
  },

  /**
   *
   */
  {
    blocking: true,
    requirements: {},
    execute (done) {
      publish(events.PLAYER_FROZEN)
      // Friends.add(new Friend(3, 2, 0.5));

      Dialog([
        {
          type: 'statement',
          text: 'Egad!'
        }, {
          type: 'statement',
          text: 'There are enemies afoot!'
        }, {
          type: 'question',
          text: 'Do you have your powerShield antigraviton annihilator equipped?',
          response: [
            'Well, I\'m sorry to say this, but you\'re quite screwed!',
            'Thank Descartes!'
          ]
        }, {
          type: 'statement',
          text: 'Good luck!'
        }
      ], done)
    }
  }
]
