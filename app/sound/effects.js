import {audioCtx} from 'sound/context';
import Sound      from 'sound/model';

class Effects extends Sound {
  constructor() {
    let sounds = [
      'hit.wav',
      'explosion.wav',
      'talk.wav'
    ];

    super(sounds, 'effects');
  }

}

export default new Effects();