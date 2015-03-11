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
}

];