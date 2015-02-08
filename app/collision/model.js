import {Bip} from 'bip/model';
import {Enemy} from 'enemy/model';
import {createExplosion} from 'particle/controller';
import {tileSize} from 'level/model'

const centerOffset = tileSize / 2;

function seekCollisions () {
  window.setTimeout(seekCollisions, 1000/30);

  let bipLoc = Bip.getLocations();
  let enemyLoc = Enemy.getLocations();

  let i = bipLoc[0].length;
  while (i-- > 0) {
    let j = enemyLoc[0].length;
    while (j-- > 0) {
      if (bipLoc[0][i] === enemyLoc[0][j] &&
          bipLoc[1][i] === enemyLoc[1][j]) {
        Bip.delete(i);
        Enemy.delete(j);
        createExplosion(
          enemyLoc[0][j] * tileSize + centerOffset,
          enemyLoc[1][j] * tileSize + centerOffset,
          '#89414e');
        createExplosion(
          bipLoc[0][i] * tileSize + centerOffset,
          bipLoc[1][i] * tileSize + centerOffset,
          '#ffffff');
      }
    }
  }
}

window.setTimeout(seekCollisions, 1000/60);
