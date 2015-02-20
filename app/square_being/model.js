import {GLOBAL}    from 'utils/global';
import {subscribe} from 'utils/mediator';

const tileSize = GLOBAL.tileSize;

export class SquareBeing {
  constructor(x, y, v = 0.5) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.velocity = v;
    this.moveId = null;
    
    this.isOnPath = false;
    this.stopRequested = false;

    subscribe('GLOBAL::pause', this.pauseMovement.bind(this));

  }

  set direction(loc) {
    this.dx = loc[0];
    this.dy = loc[1];
  }

  makeMovement() {
    let movementFrame = () => {
      this.x += (this.velocity*this.dx);
      this.y += (this.velocity*this.dy);
      this.moveId = window.setTimeout(movementFrame, 1000/60);
    }

    this.isOnPath = true;
    this.moveId = window.setTimeout(movementFrame, 1000/60);
  }

  pauseMovement() {
    window.clearTimeout(this.moveId);
  }

  stopMovement() {
    window.clearTimeout(this.moveId);
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.dx = 0;
    this.dy = 0;
    this.isOnPath = false;
  }

  render(ctx) {
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x*tileSize, this.y*tileSize, tileSize, tileSize);
  }
}
