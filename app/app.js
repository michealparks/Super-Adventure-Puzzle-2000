import {toggleRender} from 'render/controller';

import 'bip/controller';
import 'collision/model';

import load from 'loader/model';

load.level('level_1', () => { toggleRender(true); });
