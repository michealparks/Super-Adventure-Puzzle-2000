import SquareBeing from 'square_being/model';

export default class Friend extends SquareBeing {
  constructor(x, y, v) {
    super(x, y, v);
    this.type = 'friend';
    this.fill = '#38cd91';
    this.image = new Image();
    this.image.src = 'img/friend.png';
  }
}
