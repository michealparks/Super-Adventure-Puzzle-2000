import {ctx} from 'canvas/controller';
import {levels} from 'level/model';
import {configs} from 'config/model';

const tileSize = configs.tileSize;
const curLevel = levels.current;

class SquareBeing {
  constructor (x, y, v) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.velocity = v || 0.5;
    this.moveId = null;
    this.isOnPath = false;
  }

  setMovement (x, y) {
    this.dx = x;
    this.dy = y;
  }

  makeMovement () {
    let that = this;

    function movementFrame () {
      if (that.detectWallCollision()) {
        that.isOnPath = false;
        return;
      }

      that.x += (that.velocity*that.dx);
      that.y += (that.velocity*that.dy);
      that.moveId = window.setTimeout(movementFrame, 1000/60);
    }

    this.moveId = window.setTimeout(movementFrame, 1000/60);
    this.isOnPath = true;
  }

  stopMovement () {
    window.clearTimeout(this.moveId);
    this.x = this.x | 0;
    this.y = this.y | 0;
  }

  detectWallCollision () {
    const grid = levels[curLevel()].grid;
    const x = this.x;
    const y = this.y;

    if (Math.floor(x) !== x ||
    Math.floor(y) !== y) return false;

    // right
    if (this.dx > 0) {
      if (x+1 === grid.length) return true;
      if (grid[x+1][y] === 1) return true;
      // left
    } else if (this.dx < 0) {
      if (x === 0) return true;
      if (grid[x-1][y] === 1) return true;
      // down
    } else if (this.dy > 0) {
      if (y+1 === grid[x].length) return true;
      if (grid[x][y+1] === 1) return true;
      // up
    } else if (this.dy < 0) {
      if (y === 0) return true;
      if (grid[x][this.y-1] === 1) return true;
    }

    return false;
  }

  render () {
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x*tileSize, this.y*tileSize, tileSize, tileSize);
  }
}

export {SquareBeing};
