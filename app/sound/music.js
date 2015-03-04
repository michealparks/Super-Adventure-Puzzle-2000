import {audioCtx} from 'sound/context';
import Sound      from 'sound/model';

class Music extends Sound {
  constructor() {
    let sounds = [
      'travel_1.mp3'
    ];

    super(sounds, 'music');

    // let analyser = audioCtx.createAnalyser();
    // let audio0 = new Audio();   
    // let source = audioCtx.createMediaElementSource(audio0)
    // audio0.src = 'sound/music/travel_1.mp3';
    // audio0.controls = false;
    // audio0.autoplay = false;
    // audio0.loop = false;
    // source.connect(analyser);
    // analyser.connect(audioCtx.destination);
    // audio0.onerror = (e) => {};
    // audio0.play();
  }
}


export default new Music();