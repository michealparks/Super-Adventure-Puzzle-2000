import {ctx} from 'canvas/controller';
import {levels, tileSize} from 'level/controller';

export class SquareBeing {
  constructor (x, y, v) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.velocity = v || 0.5;
    this.moveId = null;
    this.isOnPath = false;
    this.grid = null;
  }

  setMovement (x, y) {
    this.dx = x;
    this.dy = y;
  }

  makeMovement () {
    let movementFrame = () => {

      if (this.detectWallCollision(this.x, this.y, this.dx, this.dy, this.grid)) {
        this.isOnPath = false;
        return;
      }

      this.x += (this.velocity*this.dx);
      this.y += (this.velocity*this.dy);

      this.moveId = window.setTimeout(movementFrame, 1000/60);
    }

    this.grid = levels.getCurrentGrid();
    this.moveId = window.setTimeout(movementFrame, 1000/60);
    this.isOnPath = true;
  }

  detectWallCollision (x, y, dx, dy, grid) {
    if (Math.floor(x) !== x ||
        Math.floor(y) !== y) return false;

    // right
    if (dx > 0) {
      if (x+1 === grid.length) return true;
      if (grid[x+1][y] === 1) return true;
      // left
    } else if (dx < 0) {
      if (x === 0) return true;
      if (grid[x-1][y] === 1) return true;
      // down
    } else if (dy > 0) {
      if (y+1 === grid[x].length) return true;
      if (grid[x][y+1] === 1) return true;
      // up
    } else if (dy < 0) {
      if (y === 0) return true;
      if (grid[x][y-1] === 1) return true;
    }

    return false;
  }

  stopMovement () {
    window.clearTimeout(this.moveId);
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
  }

  render () {
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x*tileSize, this.y*tileSize, tileSize, tileSize);
  }
}
