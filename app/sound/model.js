class Sound {
  constructor (sounds, dir) {
    this.sounds = {}
    this.dir = dir

    for (let i = 0, il = sounds.length; i < il; i++) {
      this.createAudio(sounds[i])
    }
  }

  createAudio (name) {
    let audio = new window.Audio()
    audio.src = `sound/${this.dir}/${name}`
    audio.controls = false
    audio.autoplay = false
    audio.loop = false
    audio.onerror = function (e) {}

    this.sounds[name] = audio
  }

  play (name) {
    this.sounds[name].play()
  }
}

module.exports = Sound
