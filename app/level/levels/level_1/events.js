import {publish} from 'utils/mediator';

import config from 'level/levels/level_1/config';

import Dialog from 'dialog/model';
import Bip    from 'bip/model';
import Enemy  from 'enemy/model';
import Friend from 'friend/model';

import Bips    from 'bip/controller';
import Enemies from 'enemy/controller';
import Friends from 'friend/controller';

import Music   from 'sound/music';
import Effects from 'sound/effects';

export default [

/**
 * Level start
 */
{
  blocking: true,
  requirements: {},
  execute(done) {
    const entrance = config.gridData.entrances.get('2,0');
    Bips.add(new Bip(entrance.x, entrance.y, 0.25));
    done();
  }
},

/**
 *
 */
{
  blocking: true,
  requirements: {},
  execute(done) {
    for (let i = 0; i < 6; i++) Enemies.add(new Enemy(0, 0, 0.125));

    function checkForEnemies() {
      if (Enemies.array.length > 0) {
        window.setTimeout(checkForEnemies, 400);
      } else {
        done();
      }
    }

    checkForEnemies();
  }
},

/**
 *
 */
{
  blocking: true,
  requirements: {},
  execute(done) {
    publish('GLOBAL::immobile');
    //Friends.add(new Friend(3, 2, 0.5));

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
    ], done);
  }
},

];