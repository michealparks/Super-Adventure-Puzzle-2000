import {ctx} from 'canvas/controller';
import {levels, tileSize} from 'level/model';


function detectWallCollision (x, y, dx, dy, grid) {
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

class SquareBeing {
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
    let that = this;

    function movementFrame () {

      if (detectWallCollision(that.x, that.y, that.dx, that.dy, that.grid)) { //that.detectWallCollision()) {
        that.isOnPath = false;
        return;
      }

      that.x += (that.velocity*that.dx);
      that.y += (that.velocity*that.dy);

      that.moveId = window.setTimeout(movementFrame, 1000/60);
    }

    this.grid = levels.getCurrentGrid().grid;
    this.moveId = window.setTimeout(movementFrame, 1000/60);
    this.isOnPath = true;
  }

  stopMovement () {
    window.clearTimeout(this.moveId);
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
  }

  detectWallCollision () {

    if (Math.floor(this.x) !== this.x ||
        Math.floor(this.y) !== this.y) return false;

    // right
    if (this.dx > 0) {
      if (this.x+1 === this.grid.length) return true;
      if (this.grid[this.x+1][this.y] === 1) return true;
      // left
    } else if (this.dx < 0) {
      if (this.x === 0) return true;
      if (this.grid[this.x-1][this.y] === 1) return true;
      // down
    } else if (this.dy > 0) {
      if (this.y+1 === this.grid[this.x].length) return true;
      if (this.grid[this.x][this.y+1] === 1) return true;
      // up
    } else if (this.dy < 0) {
      if (this.y === 0) return true;
      if (this.grid[this.x][this.y-1] === 1) return true;
    }

    return false;
  }

  render () {
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x*tileSize, this.y*tileSize, tileSize, tileSize);
  }
}

export {SquareBeing};
