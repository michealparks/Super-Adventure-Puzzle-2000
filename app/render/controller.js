import {renderGrid} from 'grid/controller';
import {renderBip} from 'bip/controller';
import {renderEnemies} from 'enemies/controller';
import {curLevel} from 'config/model';

var frameId;
var level;

function renderLoopFrame (stamp) {
  renderGrid(level);
  renderBip();
  renderEnemies();

  window.requestAnimationFrame(renderLoopFrame);
}

function toggleRenderLoop (toResume) {
  if (toResume) {
    level = curLevel();
    frameId = window.requestAnimationFrame(renderLoopFrame);
  } else {
    window.cancelAnimationFrame(renderLoopFrame);
  }
}

export {toggleRenderLoop};
