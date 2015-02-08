import {levels} from 'level/model';

function level (levelName, cb) {
  levels.current(levelName);

  const levelData = levels[levels.current()];
  const entrancePoint = levelData.entrancePoint;

  const stageIterator = leve

  cb();
}

export {level};

