import {renderGrid} from 'level/controller';
import {Bip} from 'bip/model';
import {Enemy} from 'enemy/model';
import {status} from 'config/model';
import {levels} from 'level/model';

var frameId;
var level;

function renderLoopFrame (stamp) {
  renderGrid(level);

  Bip.renderAll();
  Enemy.renderAll();

  window.requestAnimationFrame(renderLoopFrame);
}

function toggleRenderLoop (toResume) {
  if (toResume) {
    level = levels.current();
    frameId = window.requestAnimationFrame(renderLoopFrame);
  } else {
    window.cancelAnimationFrame(renderLoopFrame);
  }
}


export {toggleRenderLoop};
