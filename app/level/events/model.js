import GLOBAL      from 'utils/global';

import {subscribe} from 'utils/mediator';
import Levels      from 'level/controller';
import Bips        from 'bip/controller';
import Bip         from 'bip/model';


export default class defaultEvents {
  constructor() {
    this.level      = null;
    this.gridData   = null;
    this.canvasNode = document.getElementById('canvas');

    subscribe('Levels::load', this.onLevelLoad.bind(this));
    subscribe('Bip::location', this.onLocationChange.bind(this));
  }

  onLevelLoad(level) {
    this.level = level;
    this.gridData = level.gridData;
  }

  onLocationChange(location) {

    if (this.gridData.grid[location[0]][location[1]] == 1) {
      const entrance = this.gridData.entrances.get(`${location[0]},${location[1]}`);
      if (! entrance.leadsTo || Bips.array[0].isEntering) {
        return;
      }
      console.log(location, Bips.array[0], Bips.array[0].isEntering)
      Bips.delete(0);
      return Levels.load(entrance.leadsTo.level);
    }

    if (this.gridData.grid[location[0]][location[1]] == 2) {
      const exit = this.gridData.exits.get(`${location[0]},${location[1]}`);
      if (! exit.leadsTo) return;
      Bips.delete(0);
      return Levels.load(exit.leadsTo.level);
    }

    Bips.array[0].isEntering = false;
  }
}

export default new defaultEvents();