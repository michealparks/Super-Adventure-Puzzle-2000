const { ptrup } = require('../utils/device')
const Effects = require('../sound/effects')

class LevelTitle {
  constructor () {
    this.rootEl = document.querySelector('#level-title')
    this.textEl = this.rootEl.querySelector('#text')

    this.rootEl.addEventListener(ptrup, this.onPtrUp.bind(this))
  }

  show (text, time) {
    this.textEl.innerHTML = text

    let style = window.getComputedStyle(this.textEl)

    this.textEl.style.margin = `-${style.height.replace('px', '') / 2}px -${style.width.replace('px', '') / 2}px`
    this.rootEl.classList.add('active')
  }

  onPtrUp () {
    Effects.play('hit.wav')
    this.rootEl.classList.remove('active')
  }
}

module.exports = new LevelTitle()
