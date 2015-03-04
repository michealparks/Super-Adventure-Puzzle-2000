import {publish} from 'utils/mediator';
import Levels    from 'level/controller';

import 'render/controller';
import 'bip/controller';
import 'user_input/controller';

import 'collision/model';

level.load('level_1', () => {
  publish('GLOBAL::resume');
});
