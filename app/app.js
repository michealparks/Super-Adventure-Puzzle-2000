import {toggleRenderLoop} from 'render/controller';
import {curLevel} from 'config/model';
import {Bip} from 'bip/model';

Bip.addBip(new Bip(0, 0));
curLevel('level_1');
toggleRenderLoop(true);
