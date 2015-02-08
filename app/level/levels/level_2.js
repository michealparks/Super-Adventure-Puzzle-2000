import {scaleFactor} from 'canvas/controller';
import {RandomlyGeneratedTerrain} from 'level/levels/generator';

var data = new RandomlyGeneratedTerrain(/* width */ 15, /* height */ 24);

data.colorKey = [];
data.colorKey[0] = '#A89887';
data.colorKey[1] = '#8D7567';
data.colorKey[2] = '#44262C';
data.colorKey[3] = '#5F3C46';

data.storyStage = 0;
data.story = [
{
  execute () {

  }
},{
  execute () {

  }
},{
  execute () {

  }
},{
  execute () {

  }
}];

data.characters = [

];

data.executeStoryArc = function* executeStoryArc () {
  while (true) {
    yield data.story[data.storyStage]();
  }
};

export {data};
