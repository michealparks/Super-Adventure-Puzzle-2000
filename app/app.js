import {publish} from 'utils/mediator';

import 'render/controller';
import 'bip/controller';
import 'user_input/controller';

import 'collision/model';

import {load} from 'load/model';

load.level('level_1', () => {
  console.log('here1')
  publish('GLOBAL::resume');
});
