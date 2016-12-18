const { ptrup } = require('../utils/device')
const Effects = require('../sound/effects')

const rootEl = document.querySelector('#level-title')
const textEl = rootEl.querySelector('#text')

rootEl.addEventListener(ptrup, function () {
  Effects.play('hit.wav')
  rootEl.classList.remove('active')
})

function show (text, time) {
  textEl.innerHTML = text

  let style = window.getComputedStyle(textEl)

  textEl.style.margin = `-${style.height.replace('px', '') / 2}px -${style.width.replace('px', '') / 2}px`
  rootEl.classList.add('active')
}

module.exports = {
  show
}
