import {renderGrid, renderGridFromCache} from 'level/controller';
import {renderParticles} from 'particle/controller';
import {Bip} from 'bip/model';
import {Enemy} from 'enemy/model';
import {levels} from 'level/model';

var frameId;
var level;

function frame (stamp) {
  renderGridFromCache();

  Bip.renderAll();
  Enemy.renderAll();

  renderParticles();

  frameId = window.requestAnimationFrame(frame);
}

function resumeRendering () {
  renderGrid(levels.current(), true);
  frameId = window.requestAnimationFrame(frame);
}

function stopRendering () {
  window.cancelAnimationFrame(frame);
}

function toggleRender (toResume) {
  if (toResume) resumeRendering();
  else stopRendering();
}

export {toggleRender};
