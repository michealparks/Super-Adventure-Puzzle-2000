const { publish, subscribe } = require('../utils/mediator')
const { events } = require('../utils/enums')
const Bips = require('../bip/controller')
const Enemies = require('../enemy/controller')
const Effects = require('../sound/effects')

let grid
let timerId

subscribe(events.LOAD_LEVEL, function (level) {
  if (timerId) {
    clearTimeout(timerId)
    timerId = null
  }

  grid = level.gridData.grid
  timerId = setTimeout(seekCollisions, 1000 / 60)
})

function seekCollisions () {
  // Reverse loops are necessary to prevent indexing issues
  // since array is spliced during the loop.
  let b = Bips.array
  let e = Enemies.array
  let i = b.length
  let bip, enemy, j

  while (i-- > 0) {
    bip = b[i]

    if (detectWallCollision('bip', bip.x, bip.y, bip.dx, bip.dy, grid)) {
      bip.stopMovement()
      Effects.play('hit.wav')
    }

    j = e.length
    while (j-- > 0) {
      enemy = e[j]

      if (detectWallCollision('enemy', enemy.x, enemy.y, enemy.dx, enemy.dy, grid)) {
        enemy.stopMovement()
      }

      if (detectEnemyCollision(bip.x, bip.y, enemy.x, enemy.y)) {
        bip.changeShieldLevel(Math.round((bip.shieldLevel - 0.10) * 100) / 100)
        if (bip.shieldLevel === 0) {
          Bips.explode(i)
        }
        Enemies.explode(j)
        Effects.play('explosion.wav')
      }
    }
  }

  timerId = window.setTimeout(seekCollisions, 1000 / 60)
}

function detectWallCollision (type, x, y, dx, dy, grid) {
  if ((dx === 0 && dy === 0) ||
      Math.floor(x) !== x ||
      Math.floor(y) !== y) return false

  if (type === 'bip') {
    publish(events.PLAYER_LOCATION, [x, y])
  }

    // >
  if (dx > 0) {
    if (x + 1 === grid.length) return true
    if (grid[x + 1][y] === 3) return true
    // <
  } else if (dx < 0) {
    if (x === 0) return true
    if (grid[x - 1][y] === 3) return true
    // v
  } else if (dy > 0) {
    if (y + 1 === grid[x].length) return true
    if (grid[x][y + 1] === 3) return true
    // ^
  } else if (dy < 0) {
    if (y === 0) return true
    if (grid[x][y - 1] === 3) return true
  }

  return false
}

function detectEnemyCollision (playerX, playerY, enemyX, enemyY) {
  if (playerY === enemyY) {
    // left
    if (enemyX - playerX < 1 && enemyX - playerX > 0) return true
    // right
    if (playerX - enemyX < 1 && playerX - enemyX > 0) return true
  }

  if (playerX === enemyX) {
    // top
    if (playerY - enemyY < 1 && playerY - enemyY > 0) return true
    // bottom
    if (enemyY - playerY < 1 && enemyY - playerY > 0) return true
  }
}
