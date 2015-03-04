import SquareBeing from 'square_being/model';

export class Friend extends SquareBeing {
  constructor(x, y, v) {
    super(x, y, v);
    this.type = 'friend';
    this.fill = '#38cd91';
  }
}
