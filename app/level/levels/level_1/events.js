const config = require('./config')
const { events } = require('../../../utils/enums')
const { publish } = require('../../../utils/mediator')
const Dialog = require('../../../dialog')
const Enemy = require('../../../enemy/model')
const Player = require('../../../player')
const Enemies = require('../../../enemy/controller')

module.exports = [
  /**
   * Level start
   */
  {
    blocking: true,
    requirements: {},
    execute (next) {
      const entrance = config.gridData.entrances.get('2,0')
      Player.setLocation(entrance.x, entrance.y)
      next()
    }
  },

  /**
   *
   */
  {
    blocking: true,
    requirements: {},
    execute (next) {
      for (let i = 0; i < 6; i++) {
        Enemies.add(new Enemy(0, 0, 0.125))
      }

      function checkForEnemies () {
        if (Enemies.array.length > 0) {
          window.setTimeout(checkForEnemies, 400)
        } else {
          next()
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
    execute (next) {
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
      ], next)
    }
  }
]
