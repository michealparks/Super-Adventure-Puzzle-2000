import {publish} from 'utils/mediator';

import {config} from 'level/levels/level_1/config';

import {Dialog} from 'dialog/model';
import {Bip}    from 'bip/model';
import {Enemy}  from 'enemy/model';
import {Friend} from 'friend/model';

import {bips}    from 'bip/controller';
import {enemies} from 'enemy/controller';
import {friends} from 'friend/controller';

import {music}   from 'sound/music';
import {effects} from 'sound/effects';

export let events = [

/**
 * Level start
 */
{
  requirements: {},
  execute(done) {
    bips.add(new Bip(config.gridData.entrancePoint.x, config.gridData.entrancePoint.y, 0.25));
    done();
  }
},

/**
 *
 */
{
  requirements: {
    type: 'location',
    criteria: [8, 0]
  },
  execute(done) {
    for (let i = 0; i < 5; i++) enemies.add(new Enemy(0, 0, 0.125));
    done();
  }
},

/**
 *
 */
{
  requirements: {
    type: 'time',
    criteria: 10*1000,
  },
  execute(done) {
    publish('GLOBAL::immobile');
    friends.add(new Friend(3, 2, 0.5));
    
    window.setTimeout(() => {
      publish('GLOBAL::pause');

      let dialog;
      dialog = new Dialog(50, [
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
      ], () => {
        dialog = null;
        done();
        publish('GLOBAL::resume');
      });
    }, 100);
  }
},

/**
 *
 */
{
  requirements: {},
  execute(done) {
    music.play('travel_1.mp3')
    for (let i = 0; i < 30; i++) enemies.add(new Enemy(0, 0, 0.125));
    done();
  }
},

/**
 *
 */
{
  requirements: {},
  execute() {

  }
}

];