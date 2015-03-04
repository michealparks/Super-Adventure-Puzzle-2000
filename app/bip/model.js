import {subscribe} from 'utils/mediator';

import SquareBeing from 'square_being/model';

export default class Bip extends SquareBeing {
  constructor (x, y, v) {
    super(x, y, v);
    this.type = 'bip';
    this.fill = '#ffffff'
    this.hasShield = true;

    subscribe('GLOBAL::resume', this.makeMovement.bind(this));
    subscribe('GLOBAL::immobile', this.stopMovement.bind(this));
  }

}
