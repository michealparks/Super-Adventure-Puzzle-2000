import {ctx} from 'canvas/controller';
import {levels} from 'grid/model';
import {configs} from 'config/model';

const tileSize = configs.tileSize;
const curLevel = levels.current;

class SquareBeing {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.velocity = 0.5;
    this.moveId = null;
    this.fill = '#ffffff';
  }

  setMovement (x, y) {
    this.dx = x;
    this.dy = y;
  }

  makeMovement () {
    let that = this;

    function movementFrame () {
      if (that.detectWallCollision()) return;

      that.x += (that.velocity*that.dx);
      that.y += (that.velocity*that.dy);
      that.moveId = window.setTimeout(movementFrame, 1000/60);
    }

    this.moveId = window.setTimeout(movementFrame, 1000/60);
  }

  stopMovement () {
    window.clearTimeout(this.moveId);
  }

  detectWallCollision () {
    const grid = levels[curLevel()].grid;

    if (Math.floor(this.x) !== this.x ||
    Math.floor(this.y) !== this.y) return false;

    // right
    if (this.dx > 0) {
      if (this.x+1 === grid.length) return true;
      if (grid[this.x+1][this.y] === 1) return true;
      // left
    } else if (this.dx < 0) {
      if (this.x === 0) return true;
      if (grid[this.x-1][this.y] === 1) return true;
      // down
    } else if (this.dy > 0) {
      if (this.y+1 === grid[this.x].length) return true;
      if (grid[this.x][this.y+1] === 1) return true;
      // up
    } else if (this.dy < 0) {
      if (this.y === 0) return true;
      if (grid[this.x][this.y-1] === 1) return true;
    }

    return false;
  }

  render () {
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x*tileSize, this.y*tileSize, tileSize, tileSize);
  }
}

export {SquareBeing};
