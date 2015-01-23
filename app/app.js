import {toggleRenderLoop} from 'render/controller';
import {levels} from 'grid/model';
import {Bip} from 'bip/model';
import {Enemy} from 'enemy/model';
import 'bip/controller';

levels.current('level_1');

const entrancePoint = levels[levels.current()].entrancePoint;

Bip.addBip(new Bip(entrancePoint.x, entrancePoint.y));
Enemy.addEnemy(new Enemy(0, 0));

toggleRenderLoop(true);
