import {subscribe} from 'utils/mediator';

class Global {
  constructor() {
    // MUTABLE STATES
    this._isInGame   = false;
    this._isImmobile = false;
    this._canExit    = false;

    // PHYSICAL CONSTANTS
    this.scaleFactor = window.devicePixelRatio || 1;
    this.tileSize    = 25 * this.scaleFactor;

    this._canvas = { width: null, height: null };

    this._shakeLevel = 0;

    subscribe('GLOBAL::pause',    () => { this._isInGame = false;   });
    subscribe('GLOBAL::resume',   () => { this._isInGame = true;    });
    subscribe('GLOBAL::immobile', () => { this._isImmobile = true;  });
    subscribe('GLOBAL::mobile',   () => { this._isImmobile = false; });
  }

  get isInGame()     { return this._isInGame; }
  get isImmobile()   { return this._isImmobile; }
  get canExit()      { return this._canExit; }

  get canvasHeight() { return this._canvas.height; }
  get canvasWidth()  { return this._canvas.width; }
  get shakeLevel()   { return this._shakeLevel; }

  set canExit(x)      { this._canExit = x; }

  set canvasHeight(x) { this._canvas.height = x; }
  set canvasWidth(x)  { this._canvas.width  = x; }

  set shakeLevel(x)   { this._shakeLevel = x; }


}

export default new Global();