const { publish } = require('../utils/mediator')
const { events } = require('../utils/enums')
const Effects = require('../sound/effects')
const { ptrup } = require('../utils/device')
const { zoomToPoint } = require('../canvas')
const Player = require('../player')

const container = document.querySelector('.dialog')
const textDiv = container.children[0]
const nextBtn = container.children[1]
const choiceDiv = container.children[2]

let speed = 25
let done
let iterator = 0
let dialog
let currentDialog

choiceDiv.children[0].addEventListener(ptrup, function () {
  currentDialog.type = 'statement'
  typeText(currentDialog.response[1])
})

choiceDiv.children[1].addEventListener(ptrup, function () {
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
  container.classList.add('active')

  publish(events.PAUSE)
  // zoomToPoint(
  //   /* coord */ Player,
  //   /* zoom */ 2,
  //   /* time */ 20,
  //   /* ease */ 'easeInOutQuart'
  // )
  next()
}

function next () {
  if (step()) remove()
}

function step () {
  currentDialog = dialog[iterator++]

  if (!currentDialog) return true

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
    setTimeout(typeLetter, speed)
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
  container.classList.remove('active')

  publish(events.RESUME)
  done()
}

module.exports = show
