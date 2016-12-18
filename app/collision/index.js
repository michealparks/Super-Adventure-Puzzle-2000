const { publish, subscribe } = require('../utils/mediator')
const { events } = require('../utils/enums')
const Player = require('../player')
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
  let e = Enemies.array
  let i = e.length
  let enemy

  if (detectWallCollision('player', Player.x, Player.y, Player.dx, Player.dy, grid)) {
    Player.stopMovement()
    Effects.play('hit.wav')
  }

  while (i-- > 0) {
    enemy = e[i]

    if (detectWallCollision('enemy', enemy.x, enemy.y, enemy.dx, enemy.dy, grid)) {
      enemy.stopMovement()
    }

    if (detectEnemyCollision(Player.x, Player.y, enemy.x, enemy.y)) {
      Player.changeShieldLevel(Math.round((Player.shieldLevel - 0.10) * 100) / 100)

      if (Player.shieldLevel === 0) {
        Player.explode()
      }

      Enemies.explode(i)
      Effects.play('explosion.wav')
    }
  }

  timerId = window.setTimeout(seekCollisions, 1000 / 60)
}

function detectWallCollision (type, x, y, dx, dy, grid) {
  if ((dx === 0 && dy === 0) ||
      Math.floor(x) !== x ||
      Math.floor(y) !== y) return false

  if (type === 'player') {
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
