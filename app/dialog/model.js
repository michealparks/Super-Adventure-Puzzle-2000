const { publish } = require('../utils/mediator')
const { events } = require('../utils/enums')
const Effects = require('../sound/effects')
const { ptrup } = require('../utils/device')
const { zoomToPoint } = require('../canvas/controller')
const Bips = require('../bip/controller')

const topDiv = document.querySelector('.dialog')
const textDiv = topDiv.firstChild
const nextBtn = topDiv.children[1]
const choiceDiv = topDiv.lastChild

let speed = 25
let done
let iterator = 0
let dialog
let currentDialog

choiceDiv.firstChild.addEventListener(ptrup, function () {
  currentDialog.type = 'statement'
  typeText(currentDialog.response[1])
})

choiceDiv.lastChild.addEventListener(ptrup, function () {
  currentDialog.type = 'statement'
  typeText(currentDialog.response[0])
})

nextBtn.addEventListener(ptrup, function () {
  next()
})

function show (newDialog, callback) {
  dialog = newDialog
  done = callback
  iterator = 0
  topDiv.classList.add('active')

  publish(events.PAUSE)
  // zoomToPoint(
  //   /* coord */ Bips.array[0],
  //   /* zoom */ 2,
  //   /* time */ 20,
  //   /* ease */ 'easeInOutQuart'
  // )
  next()
}

function next () {
  if (step()) {
    remove()
  }
}

function step () {
  currentDialog = dialog[iterator++]

  if (currentDialog === undefined) return true

  typeText(currentDialog.text)
  return false
}

function typeText (text, done) {
  textDiv.innerHTML = ''
  nextBtn.classList.remove('active')
  choiceDiv.classList.remove('active')

  let i = 0

  function typeLetter () {
    if (i === text.length) {
      return onTypeTextDone()
    }

    Effects.play('talk.wav')
    textDiv.innerHTML += text.charAt(i++)
    window.setTimeout(typeLetter, speed)
  }

  typeLetter()
}

function onTypeTextDone () {
  if (currentDialog.type === 'statement') {
    nextBtn.classList.add('active')
  } else {
    choiceDiv.classList.add('active')
  }
}

function remove () {
  topDiv.classList.remove('active')

  publish(events.RESUME)
  done()
}

module.exports = show
