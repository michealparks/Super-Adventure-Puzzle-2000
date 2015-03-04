import {subscribe} from 'utils/mediator';

class Global {
  constructor() {
    // MUTABLE STATES
    this._isInGame   = false;
    this._isImmobile = false;

    // PHYSICAL CONSTANTS
    this.scaleFactor = window.devicePixelRatio || 1;
    this.tileSize    = 25 * this.scaleFactor;

    this._canvas = {width: null, height: null};

    subscribe('GLOBAL::pause',    () => { this._isInGame = false;   });
    subscribe('GLOBAL::resume',   () => { this._isInGame = true;    });
    subscribe('GLOBAL::immobile', () => { this._isImmobile = true;  });
    subscribe('GLOBAL::mobile',   () => { this._isImmobile = false; });
  }

  get isInGame()     { return this._isInGame; }
  get isImmobile()   { return this._isImmobile; }
  get canvasHeight() { return this._canvas.height; }
  get canvasWidth()  { return this._canvas.width; }

  set canvasHeight(x) { this._canvas.height = x; }
  set canvasWidth(x)  { this._canvas.width  = x; }
}

export default new Global();