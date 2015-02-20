import {audioCtx} from 'sound/context';

import {Sound} from 'sound/model';

class Effects extends Sound {
  constructor() {
    let sounds = [
      'hit.wav',
      'explosion.wav'
    ];

    super(sounds, 'effects');
  }

}

export let effects = new Effects();