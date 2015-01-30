import {Bip} from 'bip/model';
import {Enemy} from 'enemy/model';
import {createExplosion} from 'particle/controller';
import {tileSize} from 'level/model'

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
        Enemy.delete(j);
        Bip.delete(i);
        createExplosion(enemyLoc[0][j]*tileSize+25, enemyLoc[1][j]*tileSize+25, '#89414e');
        createExplosion(bipLoc[0][i]*tileSize+25, bipLoc[1][i]*tileSize+25, '#ffffff');
      }
    }
  }
}


window.setTimeout(seekCollisions, 1000/30);
