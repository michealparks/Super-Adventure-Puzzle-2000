export class Sound {
  constructor(sounds, dir) {
    this.dict = {};
    this.dir = dir;

    for (let i = 0, il = sounds.length; i < il; i++) {
      this.createAudio(sounds[i]);
    }
  }

  createAudio(name) {
    let audio = new Audio();
    audio.src = `sound/${this.dir}/${name}`;
    audio.controls = false;
    audio.autoplay = false;
    audio.loop = false;
    audio.onerror = (e) => {};

    this.dict[name] = audio;
  }

  play(name) {
    this.dict[name].play();
  }
}