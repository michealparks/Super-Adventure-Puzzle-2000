import GLOBAL      from 'utils/global';
import {subscribe} from 'utils/mediator';

const tileSize = GLOBAL.tileSize;

export default class SquareBeing {
  constructor(x, y, v = 0.5) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.velocity = v;
    this.moveId = null;
    this.gridPosition = { x: 0, y: 0 };
    
    this.isOnPath = false;
    this.stopRequested = false;

    subscribe('GLOBAL::pause', this.pauseMovement.bind(this));
    subscribe('Levels::load', this.onLevelLoad.bind(this));
  }

  set direction(loc) {
    this.dx = loc[0];
    this.dy = loc[1];
  }

  onLevelLoad(level) {
    this.gridPosition.x = level.gridData.position.x * tileSize;
    this.gridPosition.y = level.gridData.position.y * tileSize;
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

    ctx.drawImage(
      this.image, 
      this.gridPosition.x + (this.x*tileSize), 
      this.gridPosition.y + (this.y*tileSize), 
      tileSize, 
      tileSize
    );

    // ctx.fillRect(
    //   this.gridPosition.x + (this.x*tileSize), 
    //   this.gridPosition.y + (this.y*tileSize), 
    //   tileSize, 
    //   tileSize);
  }
}
