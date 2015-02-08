import {SquareBeing} from 'square_being/model';
import {levels} from 'level/model';

export class Friend extends SquareBeing {
  constructor (x, y, v) {
    super(x, y, v);
    this.fill = '#38cd91';
  }
}
