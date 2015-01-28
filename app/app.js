import {toggleRender} from 'render/controller';
import {levels} from 'level/model';
import {Bip} from 'bip/model';
import {Enemy} from 'enemy/model';
import 'bip/controller';

levels.current('level_1');

const entrancePoint = levels[levels.current()].entrancePoint;

for (let i = 0; i < 800; i++) {
  Enemy.addEnemy(new Enemy(0, 0, 0.125));
}

Bip.addBip(new Bip(entrancePoint.x, entrancePoint.y, 0.25));

window.setTimeout(() => {
  toggleRender(true);
}, 100);
