import {subscribe} from 'utils/mediator';

import {levels}    from 'level/controller';
import {particles} from 'particle/controller';

import {bips}    from 'bip/controller';
import {enemies} from 'enemy/controller';
import {friends} from 'friend/controller';

import {ctx}                   from 'canvas/controller';
import {cacheCtx, cacheCanvas} from 'cacheCanvas/controller';

let frameId = 0;

subscribe('GLOBAL::pause', pause);
subscribe('GLOBAL::resume', resume);

function frame() {
  ctx.drawImage(cacheCanvas, 0, 0);
  bips.render(ctx);
  enemies.render(ctx);
  friends.render(ctx);
  particles.render(ctx);

  frameId = window.requestAnimationFrame(frame);
}

function resume() {
  levels.renderGrid(cacheCtx);
  frameId = window.requestAnimationFrame(frame);
}

function pause() {
  window.cancelAnimationFrame(frameId);
}

