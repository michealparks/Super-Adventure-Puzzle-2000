import {scaleFactor} from 'canvas/controller';
import {RandomlyGeneratedTerrain} from 'level/levels/generator';

import {Bip} from 'bip/model';
import {Enemy} from 'enemy/model';

var data = new RandomlyGeneratedTerrain(
  /** width  */ 15,
  /** height */ 24
);

data.title = 'The Randomly Generated Rocks of the Rhombicuboctahedron'

data.colorKey = [];
data.colorKey[0] = '#333333';
data.colorKey[1] = '#555555';
data.colorKey[2] = '#262626';
data.colorKey[3] = '#222222';

data.storyStage = 0;
data.story = [
{
  requirements: [],
  execute () {
    Bip.add(new Bip(data.entrancePoint.x, data.entrancePoint.y, 0.25));
  },

},{
  requirements: [
    {
      type: 'location',
      criteria: [data.exitPoint.x, data.exitPoint.y],
    }
  ],
  execute () {
    for (let i = 0; i < 5; i++) Enemy.addEnemy(new Enemy(0, 0, 0.125));
  }
},{
  requirements: [
    {
      type: 'time',
      criteria: [200*1000],
    }
  ],
  execute () {

  }
},{
  execute () {

  }
}];

data.characters = [

];

data.executeEvent = function () {
  const upcomingEvent = data.story[data.storyStage];
}

data.storyArcGenerator = function* storyArcGenerator () {
  while (true) {
    yield data.story[data.storyStage].execute();
    data.storyStage++;
  }
};

export {data};
