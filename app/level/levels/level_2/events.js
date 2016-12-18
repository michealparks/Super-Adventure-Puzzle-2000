const config = require('./config')
const { events } = require('../../../utils/enums')
const { publish } = require('../../../utils/mediator')
const Dialog = require('../../../dialog')
const Enemy = require('../../../enemy/model')
const Friend = require('../../../friend/model')
const Player = require('../../../player')
const Enemies = require('../../../enemy/controller')
const Friends = require('../../../friend/controller')
const Music = require('../../../sound/music')

module.exports = [
  /**
   * Level start
   */
  {
    blocking: true,
    requirements: {},
    execute (done) {
      const entrance = config.gridData.entrances.values().next().value
      Player.setLocation(entrance.x, entrance.y)
      done()
    }
  },

  /**
   *
   */
  {
    blocking: true,
    requirements: {
      type: 'location',
      criteria: [0, 5]
    },
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
      Friends.add(new Friend(3, 2, 0.5))

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
  },

  /**
   *
   */
  {
    blocking: true,
    requirements: {},
    execute (done) {
      for (let i = 0; i < 40; i++) {
        Enemies.add(new Enemy(0, 0, 0.125))
      }

      Music.play('travel_2.mp3')
      done()
    }
  }
]
