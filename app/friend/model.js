const SquareBeing = require('../square_being/model')

class Friend extends SquareBeing {
  constructor (x, y, v) {
    super(x, y, v)
    this.type = 'friend'
    this.fill = '#38cd91'
    this.image = new window.Image()
    this.image.src = 'img/friend.png'
  }
}

module.exports = Friend
