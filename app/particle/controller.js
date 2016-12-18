const { spliceArray } = require('../utils/core')
const config = require('../utils/global')
const Particle = require('./model')

const array = []
const minRadius = 10
const maxRadius = 40
const count = 10
const minSpeed = 100.0
const maxSpeed = 300.0
const minScaleSpeed = 1.0
const maxScaleSpeed = 4.0

function randomFloat (min, max) {
  return min + Math.random() * (max - min)
}

function createExplosion (x, y, color, shake) {
  config.SHAKE_MAGNITUDE = shake || 0

  for (let angle = 0, speed; angle < 360; angle += Math.round(360 / count)) {
    speed = randomFloat(minSpeed, maxSpeed)

    array.push(new Particle(
      x,
      y,
      color,
      randomFloat(minRadius, maxRadius),
      randomFloat(minScaleSpeed, maxScaleSpeed),
      speed * Math.cos(angle * Math.PI / 180.0),
      speed * Math.sin(angle * Math.PI / 180.0)
    ))
  }
}

function renderParticles (ctx) {
  // Reverse loop is necessary to prevent indexing issues
  // since array is spliced during the loop.
  let i = array.length
  while (i-- > 0) {
    let particle = array[i]
    if (particle.update()) {
      particle.render(ctx)
    } else {
      spliceArray(array, i)
    }
  }
}

module.exports = {
  createExplosion,
  renderParticles
}
