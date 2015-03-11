import {publish} from 'utils/mediator';
import Levels    from 'level/controller';

import 'render/controller';
import 'bip/controller';
import 'user_input/controller';
import 'level/events/model';

import 'collision/model';

Levels.load('level_1');
