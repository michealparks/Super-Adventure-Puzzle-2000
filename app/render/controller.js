import {renderGrid} from 'level/controller';
import {Bip} from 'bip/model';
import {Enemy} from 'enemy/model';
import {levels} from 'level/model';

var frameId;
var level;

function frame (stamp) {

  renderGrid(level);

  Bip.renderAll();
  Enemy.renderAll();

  frameId = window.requestAnimationFrame(frame);
}

function toggleRender (toResume) {
  if (toResume) {
    level = levels.current();
    frameId = window.requestAnimationFrame(frame);
  } else {
    window.cancelAnimationFrame(frame);
  }
}

export {toggleRender};
