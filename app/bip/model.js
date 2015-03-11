import {subscribe} from 'utils/mediator';
import {ctx}       from 'canvas/controller';

import SquareBeing from 'square_being/model';

export default class Bip extends SquareBeing {
  constructor (x, y, v) {
    super(x, y, v);
    this.type = 'bip';
    this.image = new Image();
    this.image.src = `img/bip.png`;
    this.fill = '#ffffff'
    this.shieldFill = '#f1c40f';
    this.shieldAnimLevel = 1;
    this.shieldLevel = 1;
    this.shieldLevelDiff = 0;
    this.shieldChange = false;
    this.shieldAlpha = 0;
    this.isEntering = true;

    subscribe('GLOBAL::resume', this.makeMovement.bind(this));
    subscribe('GLOBAL::immobile', this.stopMovement.bind(this));
  }

  renderShieldChange() {
    if (this.shieldAnimLevel == this.shieldLevel) {
      if (this.shieldAlpha == 1) {
        this.shieldChange = false;
        return;
      } else {
        this.shieldAlpha -= 0.01;
      }
    } else {
      this.shieldAnimLevel = Math.round((this.shieldAnimLevel+this.shieldLevelDiff) * 100) / 100;
      if (this.shieldAlpha < 1) this.shieldAlpha += 0.05;
    }

    ctx.save();
    ctx.fillStyle = `rgba(241, 196, 15, ${this.shieldAlpha})`;
    ctx.fillRect(0, 0, window.innerWidth * this.shieldAnimLevel, 10);
    ctx.restore();
  }

  changeShieldLevel(x) {
    this.shieldLevel = x;
    this.shieldLevelDiff = x < this.shieldAnimLevel? -0.02: 0.02;
    this.shieldChange = true;
  }
}
