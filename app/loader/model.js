import {levels} from 'level/controller';

function level (levelName, done) {
  levels.current(levelName);

  const levelData = levels[levels.current()];
  const entrancePoint = levelData.entrancePoint;


  done();
}

export {level};

