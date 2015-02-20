import {GLOBAL}  from 'utils/global';
import {publish} from 'utils/mediator';

import {levels} from 'level/controller';

class Load {
  constructor() {

  }

  level(name, done = () => {}) {
    levels.current = name;
    levels.current.startEvent();

    publish('load::level', levels.current);

    done();
  }
}

export let load = new Load();




