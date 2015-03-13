import GLOBAL      from 'utils/global';
import {subscribe} from 'utils/mediator';

import Bips      from 'bip/controller';
import Enemies   from 'enemy/controller';
import Friends   from 'friend/controller';
import Particles from 'particle/controller';
import Levels    from 'level/controller';

import {ctx}                   from 'canvas/controller';
import {cacheCtx, cacheCanvas} from 'cacheCanvas/controller';

let frameId  = 0;
let lastTime = 0;

subscribe('GLOBAL::pause', pause);
subscribe('GLOBAL::resume', resume);

function preShake() {
  ctx.save();
  var dx = Math.random() * GLOBAL.shakeLevel;
  var dy = Math.random() * GLOBAL.shakeLevel;
  ctx.translate(dx, dy);  

  GLOBAL.shakeLevel = GLOBAL.shakeLevel - 0.5;
}

function postShake() {
  ctx.restore();
}

function frame(timeStamp) {
  const delta = lastTime - timeStamp;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (GLOBAL.shakeLevel) preShake();

  ctx.drawImage(cacheCanvas, 0, 0);

  Bips.render(ctx, delta);
  Enemies.render(ctx, delta);
  Friends.render(ctx, delta);
  Particles.render(ctx, delta);

  if (GLOBAL.shakeLevel) postShake();

  frameId = window.requestAnimationFrame(frame);
}

function resume() {
  Levels.renderGrid(cacheCtx);
  frameId = window.requestAnimationFrame(frame);
}

function pause() {
  window.cancelAnimationFrame(frameId);
}

